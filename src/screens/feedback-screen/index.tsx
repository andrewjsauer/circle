import React, { useState } from "react";
import { useSelector } from "react-redux";

import { selectSubscriptions } from "@store/user/selectors";

import { onSave } from "./utils";
import {
  Description,
  SubmitButton,
  SkipButton,
  Section,
  Title,
  Layout,
  SectionTitle,
  TextInputField,
  LoadingSpinner,
  ErrorButton,
  ErrorText,
} from "./styles";

const FeedbackForm = ({ navigation, route }: any) => {
  const { audioId, data } = route.params;
  const userSubscriptions: any = useSelector(selectSubscriptions);

  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState(null);
  const [notHelpful, setNotHelpful] = useState("");
  const [helpful, setHelpful] = useState("");

  const handleSubmit = (didSkip) => {
    setIsSaving(true);

    const { isSubscribed } = userSubscriptions;
    const numOfSubscriptionsLeft = userSubscriptions[data.type];

    try {
      onSave(
        audioId,
        data,
        { notHelpful, helpful, didSkip },
        { isSubscribed, numOfSubscriptionsLeft },
      );
    } catch (e: any) {
      console.log("Error saving feedback", e);

      setError(e);
    }

    setIsSaving(false);
    navigation.navigate("Dashboard");
  };

  if (error) {
    return (
      <Layout>
        <ErrorText>
          Oops, something went wrong when saving this session
        </ErrorText>
        <ErrorButton onPress={() => handleSubmit(false)} mode="contained">
          Try Again
        </ErrorButton>
      </Layout>
    );
  }

  return (
    <Layout>
      {isSaving ? (
        <>
          <LoadingSpinner size="large" />
          <SectionTitle>Saving your session...</SectionTitle>
        </>
      ) : (
        <>
          <Section>
            <Title>We would love to hear your feedback</Title>
            <Description>
              This feedback is used to train our AI model to provide you with a
              better experience next time.
            </Description>
          </Section>
          <Section>
            <SectionTitle>
              What aspects of the meditation did you find most helpful?
            </SectionTitle>
            <TextInputField
              value={helpful}
              onChangeText={setHelpful}
              mode="outlined"
              multiline
              autoFocus
            />
          </Section>
          <Section>
            <SectionTitle>
              Were there any parts of the meditation that you felt were not
              helpful or relevant to you?
            </SectionTitle>
            <TextInputField
              value={notHelpful}
              onChangeText={setNotHelpful}
              mode="outlined"
              multiline
            />
          </Section>
          <Section>
            <SubmitButton mode="contained" onPress={() => handleSubmit(false)}>
              Submit
            </SubmitButton>
            <SkipButton onPress={() => handleSubmit(true)}>Skip</SkipButton>
          </Section>
        </>
      )}
    </Layout>
  );
};

export default FeedbackForm;
