import React, { useState } from "react";

import CloseButton from "@components/close-button";
import * as routes from "@constants/routes";
import { Navigation } from "@types";

import Dropdown from "./dropdown";
import questionList from "./questions";
import {
  QuestionWrapper,
  ProgressBarWrapper,
  Layout,
  QuestionTitle,
  ProgressText,
  NextButton,
  ProgressBar,
} from "./styles";

interface Props {
  navigation: Navigation;
}

const QuestionaireScreen = ({ navigation }: Props) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({ type: null });

  const questions = questionList(answers.type);
  const isLastQuestion = currentQuestionIndex === questions.length - 1;

  const handleOptionSelect = (questionId, optionId) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: optionId,
    }));
  };

  const handleNextQuestion = () => {
    if (isLastQuestion) {
      console.log("answers", answers);
      return;
    }

    setCurrentQuestionIndex(currentQuestionIndex + 1);
  };

  const { title, options, id } = questions[currentQuestionIndex];
  return (
    <Layout>
      <CloseButton
        onPress={() => navigation.navigate(routes.DASHBOARD_SCREEN)}
      />
      <QuestionWrapper>
        <QuestionTitle>{title}</QuestionTitle>
        <Dropdown
          options={options}
          onSelect={(option) => handleOptionSelect(id, option)}
          selectedOption={answers[id]}
        />
      </QuestionWrapper>
      <ProgressBarWrapper>
        <ProgressBar progress={(currentQuestionIndex + 1) / questions.length} />
        <ProgressText>
          {currentQuestionIndex + 1} of {questions.length} questions answered
        </ProgressText>
      </ProgressBarWrapper>
      <NextButton
        mode="contained"
        disabled={!answers[id]}
        onPress={handleNextQuestion}
      >
        {isLastQuestion ? "Submit" : "Next"}
      </NextButton>
    </Layout>
  );
};

export default QuestionaireScreen;