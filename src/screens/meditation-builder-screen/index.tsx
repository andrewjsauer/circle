import React, { useState } from "react";
import { TouchableWithoutFeedback, Keyboard, Platform } from "react-native";
import { useSelector } from "react-redux";
import Filter from "bad-words";

import functions from "@react-native-firebase/functions";
import firestore from "@react-native-firebase/firestore";

import CloseButton from "@components/close-button";
import * as routes from "@constants/routes";
import {
  questions,
  customQuestions,
  meditationTypes,
} from "@constants/meditations";
import { Navigation } from "@types";
import { selectUserData } from "@store/user/selectors";

import Dropdown from "./dropdown";
import TextInput from "./text-input";
import { getTimeOfDay } from "./utils";

import {
  PreviousButton,
  ButtonWrapper,
  ErrorButton,
  QuestionWrapper,
  CompleteTitle,
  CompleteSubTitle,
  LoadingSpinner,
  ProgressBarWrapper,
  Layout,
  ProgressText,
  NextButton,
  ProgressBar,
  QuestionTitle,
} from "./styles";

interface Props {
  navigation: Navigation;
  route: {
    params: {
      meditationType: any;
    };
  };
}

const MeditationBuilderScreen = ({ navigation, route }: Props) => {
  const { meditationType } = route.params;

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState(null);
  const [textInputError, setTextInputError] = useState("");

  const userData = useSelector(selectUserData);

  const questionsList =
    meditationType.id === "custom"
      ? customQuestions(answers?.meditationType)
      : questions;

  const isLastQuestion = currentQuestionIndex === questionsList.length - 1;
  const isFirstQuestion = currentQuestionIndex === 0;

  const handleOptionSelect = (questionId, optionValue) => {
    if (questionId === "goal") {
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
      setIsUploading(true);
      setUploadError(null);

      const typeOfDay = getTimeOfDay();
      const meditationValue =
        answers.meditationType &&
        meditationTypes.filter((type) => type.id === answers.meditationType)[0]
          .value;

      const payload = {
        ...answers,
        ...meditationType,
        typeOfDay,
        voice: userData?.voice || "female",
        type: meditationType?.value || meditationValue,
        createdAt: firestore.FieldValue.serverTimestamp(),
      };

      const { data: meditationId } = await functions().httpsCallable(
        "createMeditation",
      )(payload);

      if (typeof meditationId === "string") {
        navigation.navigate(routes.PLAYER_SCREEN, {
          data: { ...payload, ...meditationType },
          meditationId,
          isSavedMeditation: false,
        });
      } else {
        setUploadError(
          "Looks like there was an error creating your meditation. Please try again later.",
        );
      }

      setIsUploading(false);
      return;
    }

    setCurrentQuestionIndex(currentQuestionIndex + 1);
  };

  let content;

  if (isUploading) {
    content = (
      <>
        <LoadingSpinner size="large" />
        <CompleteTitle>Creating your personalized meditation...</CompleteTitle>
        <CompleteSubTitle>
          Please allow up to a minute or so. We will start your meditation once
          it&apos;s ready.
        </CompleteSubTitle>
      </>
    );
  } else if (uploadError) {
    content = (
      <>
        <CompleteTitle>Oops!</CompleteTitle>
        <CompleteSubTitle>{uploadError}</CompleteSubTitle>
        <ErrorButton mode="contained">Restart</ErrorButton>
      </>
    );
  } else {
    const { title, options, id, type } = questionsList[currentQuestionIndex];

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
              color={meditationType.backgroundColor}
              errorMessage={textInputError}
              onChangeText={(text) => handleOptionSelect(id, text)}
              placeholder={meditationType.placeholder}
              value={answers[id]}
            />
          )}
          <ProgressBarWrapper>
            <ProgressBar
              progress={(currentQuestionIndex + 1) / questionsList.length}
              color={meditationType.color}
              style={{ backgroundColor: meditationType.backgroundColor }}
            />
            <ProgressText>
              {currentQuestionIndex + 1} of {questionsList.length} questions
              answered
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
      <Layout color={meditationType.backgroundColor}>{content}</Layout>
    </TouchableWithoutFeedback>
  );
};

export default MeditationBuilderScreen;
