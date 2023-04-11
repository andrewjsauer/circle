import React, { useState } from "react";
import { TouchableWithoutFeedback, Keyboard, Platform } from "react-native";
import Filter from "bad-words";

import functions from "@react-native-firebase/functions";
import firestore from "@react-native-firebase/firestore";

import CloseButton from "@components/close-button";
import * as routes from "@constants/routes";
import { questions as questionsList } from "@constants/meditations";
import { Navigation } from "@types";

import Dropdown from "./dropdown";

import TextInput from "./text-input";
import {
  QuestionWrapper,
  CompleteTitle,
  CompleteSubTitle,
  LoadingSpinner,
  ProgressBarWrapper,
  Layout,
  ProgressText,
  NextButton,
  ProgressBar,
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

  const questions = questionsList(meditationType.id);
  const isLastQuestion = currentQuestionIndex === questions.length - 1;

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

  const handleNextQuestion = async () => {
    if (isLastQuestion) {
      setIsUploading(true);
      setUploadError(null);

      const payload = {
        ...answers,
        ...meditationType,
        type: meditationType.value,
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
        <CompleteTitle>Creating your meditation...</CompleteTitle>
        <CompleteSubTitle>
          This can take up to a minute or so. We will start your meditation once
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
    const { title, options, id, type } = questions[currentQuestionIndex];

    content = (
      <>
        <CloseButton
          onPress={() => navigation.navigate(routes.DASHBOARD_SCREEN)}
        />
        <QuestionWrapper
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          {type !== "text" ? (
            <Dropdown
              options={options}
              onSelect={(option) => handleOptionSelect(id, option)}
              selectedOption={answers[id]}
              title={title}
            />
          ) : (
            <TextInput
              color={meditationType.backgroundColor}
              errorMessage={textInputError}
              onChangeText={(text) => handleOptionSelect(id, text)}
              placeholder={meditationType.placeholder}
              title={title}
              value={answers[id]}
            />
          )}
          <ProgressBarWrapper>
            <ProgressBar
              progress={(currentQuestionIndex + 1) / questions.length}
              color={meditationType.color}
              style={{ backgroundColor: meditationType.backgroundColor }}
            />
            <ProgressText>
              {currentQuestionIndex + 1} of {questions.length} questions
              answered
            </ProgressText>
          </ProgressBarWrapper>
          <NextButton
            mode="contained"
            disabled={!answers[id] || !!textInputError}
            onPress={handleNextQuestion}
          >
            {isLastQuestion ? "Submit" : "Next"}
          </NextButton>
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
