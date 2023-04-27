import React, { useState } from "react";
import { TouchableWithoutFeedback, Keyboard, Platform } from "react-native";
import { useSelector } from "react-redux";
import Filter from "bad-words";

import functions from "@react-native-firebase/functions";
import firestore from "@react-native-firebase/firestore";

import CloseButton from "@components/close-button";
import * as routes from "@constants/routes";
import { times } from "@constants/meditations";

import { Navigation } from "@types";
import { selectUserData } from "@store/user/selectors";
import { getTimeOfDay } from "@utils";

import Dropdown from "./dropdown";
import TextInput from "./text-input";
import BreathingCircle from "./breathing-circle";

import {
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

  const { questions } = meditation;
  const questionsLength = questions.length;

  const isLastQuestion = currentQuestionIndex === questionsLength - 1;
  const isFirstQuestion = currentQuestionIndex === 0;

  const handleOptionSelect = (questionId, optionValue, isTextInput = false) => {
    if (isTextInput) {
      const maxWords = 120;
      const filter = new Filter();

      if (filter.isProfane(optionValue)) {
        return setTextInputError("Please avoid using inappropriate content.");
      } else if (optionValue.length > maxWords) {
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

  const handlePreviousQuestion = () => {
    setCurrentQuestionIndex(currentQuestionIndex - 1);
  };

  const handleNextQuestion = async () => {
    if (isLastQuestion) {
      setUploadMessage("Creating your personalized meditation...");
      setIsUploading(true);
      setUploadError(null);

      const userAnswers = {
        ...answers,
        ...(answers.time && { time: times.find((t) => t.id === answers.time) }),
      };

      const prompt = meditation.prompt({ ...userAnswers, user_name: name });

      const payload = {
        ...userAnswers,
        ...meditation,
        prompt,
        typeOfDay: getTimeOfDay(),
        voice: userData?.voice || "female",
        createdAt: firestore.FieldValue.serverTimestamp(),
      };

      delete payload.questions;

      const { data: contentData } = await functions().httpsCallable(
        "getContent",
      )({ prompt });

      const { content, error: contentError } = contentData;

      if (contentError) {
        setUploadError(
          `Looks like there was an error creating your meditation. Please try again later. Error: ${error}`,
        );
        setIsUploading(false);
        return;
      }

      setUploadMessage("Almost done! Converting your meditation into audio...");

      const { data: audioData } = await functions().httpsCallable("getAudio")({
        content,
      });

      const { audioId, error: audioError } = audioData;

      if (audioError) {
        setUploadError(
          `Looks like there was an error turning your meditation into audio. Please try again later. Error: ${audioError}`,
        );
        setIsUploading(false);
        return;
      }

      navigation.navigate(routes.PLAYER_SCREEN, {
        data: payload,
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
          Please allow up to a minute or so. In the meantime, let&apos;s take a
          few deep breaths.
        </CompleteSubTitle>
        <BreathingCircleView>
          <BreathingCircle />
        </BreathingCircleView>
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
