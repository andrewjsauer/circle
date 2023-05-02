import React, { useEffect, useState } from "react";
import { TouchableWithoutFeedback, Keyboard, Platform } from "react-native";
import { useSelector } from "react-redux";
import Filter from "bad-words";

import functions from "@react-native-firebase/functions";
import firestore from "@react-native-firebase/firestore";
import crashlytics from "@react-native-firebase/crashlytics";

import CloseButton from "@components/close-button";
import * as routes from "@constants/routes";

import { Navigation } from "@types";
import { selectUserData, selectUserId } from "@store/user/selectors";
import { getTimeOfDay } from "@utils";
import { trackScreen, trackEvent } from "@utils/analytics";

import Dropdown from "./dropdown";
import TextInput from "./text-input";
import BreathingCircle from "./breathing-circle";

import {
  BreathingText,
  PreviousButton,
  ButtonWrapper,
  ErrorButton,
  QuestionWrapper,
  CompleteTitle,
  CompleteSubTitle,
  ProgressBarWrapper,
  Layout,
  ProgressText,
  NextButton,
  ProgressBar,
  QuestionTitle,
  BreathingCircleView,
} from "./styles";

interface Props {
  navigation: Navigation;
  route: {
    params: {
      meditation: any;
      name: string;
    };
  };
}

const MeditationBuilderScreen = ({ navigation, route }: Props) => {
  const { meditation, name } = route.params;

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [isUploading, setIsUploading] = useState(false);
  const [uploadMessage, setUploadMessage] = useState("");
  const [uploadError, setUploadError]: any = useState(null);
  const [textInputError, setTextInputError] = useState("");

  const userData = useSelector(selectUserData);
  const userId = useSelector(selectUserId);

  const { questions } = meditation;
  const questionsLength = questions.length;

  const isLastQuestion = currentQuestionIndex === questionsLength - 1;
  const isFirstQuestion = currentQuestionIndex === 0;

  useEffect(() => {
    trackScreen(routes.MEDITATION_BUILDER_SCREEN);
  }, []);

  const handleOptionSelect = async (
    questionId,
    optionValue,
    isTextInput = false,
  ) => {
    if (isTextInput) {
      const maxWords = 120;
      const filter = new Filter();

      if (filter.isProfane(optionValue)) {
        trackEvent("meditation_builder_inappropriate_content");
        return setTextInputError("Please avoid using inappropriate content.");
      } else if (optionValue.length > maxWords) {
        trackEvent("meditation_builder_input_too_long");
        return setTextInputError("Please limit your input to 120 characters.");
      } else {
        setTextInputError("");
      }
    }

    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: optionValue,
    }));
  };

  const handlePreviousQuestion = async () => {
    trackEvent("meditation_builder_previous_question");
    setCurrentQuestionIndex(currentQuestionIndex - 1);
  };

  const handleNextQuestion = async () => {
    if (isLastQuestion) {
      trackEvent("meditation_builder_submitted");

      setUploadMessage("Creating your meditation...");
      setIsUploading(true);
      setUploadError(null);

      const prompt = meditation.prompt({ ...answers, userName: name });

      const payload = {
        ...answers,
        ...meditation,
        prompt,
        typeOfDay: getTimeOfDay(),
        voice: userData?.voice || "female",
        createdAt: firestore.FieldValue.serverTimestamp(),
      };

      delete payload.questions;
      let contentData: any = {};

      try {
        ({ data: contentData } = await functions().httpsCallable("getContent", {
          timeout: 5 * 60 * 1000,
        })({ prompt }));
      } catch (error: any) {
        crashlytics().recordError(error);

        setUploadError(
          `Looks like there was an error creating your meditation. Please try again later. Error: ${error}`,
        );
        setIsUploading(false);
        return;
      }

      const { content, usage, error: contentError } = contentData;

      if (contentError) {
        setUploadError(
          `Looks like there was an error creating your meditation. Please try again later. Error: ${error}`,
        );
        setIsUploading(false);
        crashlytics().log(contentError);
        return;
      }

      setUploadMessage("Almost done!");
      let audioData: any = {};

      try {
        ({ data: audioData } = await functions().httpsCallable("getAudio")({
          content,
          userId,
        }));
      } catch (error: any) {
        crashlytics().recordError(error);

        setUploadError(
          `Looks like there was an error turning your meditation into audio. Please try again. Error: ${error}`,
        );
        setIsUploading(false);
        return;
      }

      const { audioId, error: audioError } = audioData;

      if (audioError) {
        setUploadError(
          `Looks like there was an error turning your meditation into audio. Please try again. Error: ${audioError}`,
        );
        setIsUploading(false);

        crashlytics().log(audioError);
        return;
      }

      navigation.navigate(routes.PLAYER_SCREEN, {
        data: { ...payload, content, usage },
        audioId,
        isSavedMeditation: false,
      });

      setIsUploading(false);
      setUploadMessage("");
      return;
    }

    setCurrentQuestionIndex(currentQuestionIndex + 1);
  };

  let content;

  if (isUploading) {
    content = (
      <>
        <CompleteTitle>{uploadMessage}</CompleteTitle>
        <CompleteSubTitle>
          We use a the latest AI models to create your personalized meditation
          which can be slow, so please allow up to a minute or so.
        </CompleteSubTitle>
        <BreathingCircleView>
          <BreathingCircle />
        </BreathingCircleView>
        <BreathingText>
          In the meantime, let&apos;s take a few deep breaths.
        </BreathingText>
      </>
    );
  } else if (uploadError) {
    content = (
      <>
        <CompleteTitle>Oops!</CompleteTitle>
        <CompleteSubTitle>{uploadError}</CompleteSubTitle>
        <ErrorButton onPress={handleNextQuestion} mode="contained">
          Restart
        </ErrorButton>
      </>
    );
  } else {
    const { title, options, placeholder, id, type } =
      questions[currentQuestionIndex];

    content = (
      <>
        <CloseButton
          onPress={() => navigation.navigate(routes.DASHBOARD_SCREEN)}
        />
        <QuestionWrapper
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <QuestionTitle>{title}</QuestionTitle>

          {type !== "text" ? (
            <Dropdown
              onSelect={(option) => handleOptionSelect(id, option)}
              options={options}
              selectedOption={answers[id]}
            />
          ) : (
            <TextInput
              errorMessage={textInputError}
              onChangeText={(text) => handleOptionSelect(id, text, true)}
              placeholder={placeholder}
              value={answers[id] || ""}
            />
          )}
          <ProgressBarWrapper>
            <ProgressBar
              progress={(currentQuestionIndex + 1) / questionsLength}
              color={meditation.color}
            />
            <ProgressText>
              {currentQuestionIndex + 1} of {questionsLength} questions
            </ProgressText>
          </ProgressBarWrapper>
          <ButtonWrapper>
            <PreviousButton
              onPress={handlePreviousQuestion}
              disabled={isFirstQuestion}
            >
              Previous
            </PreviousButton>
            <NextButton
              mode="contained"
              disabled={!answers[id] || !!textInputError}
              onPress={handleNextQuestion}
            >
              {isLastQuestion ? "Submit" : "Next"}
            </NextButton>
          </ButtonWrapper>
        </QuestionWrapper>
      </>
    );
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Layout>{content}</Layout>
    </TouchableWithoutFeedback>
  );
};

export default MeditationBuilderScreen;
