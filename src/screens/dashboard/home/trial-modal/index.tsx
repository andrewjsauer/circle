import React from "react";
import { Dialog, Portal } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialIcons";

import { CloseButton, Description, Title, SubscribeButton } from "./styles";

const TrialModal = ({
  isVisible,
  onClose,
  onSubscribe,
  isSubscribing,
}: any) => {
  return (
    <Portal>
      <Dialog
        style={{ backgroundColor: "#2c7da0" }}
        visible={isVisible}
        onDismiss={onClose}
      >
        <>
          <CloseButton onPress={onClose}>
            <Icon name="close" size={24} color="#fff" />
          </CloseButton>
          <Dialog.Title>
            <Title>Upgrade to Circle Plus</Title>
          </Dialog.Title>
          <Dialog.Content>
            <Description>
              Get unlimited access to personalized meditations, micro hits, and
              courses.
            </Description>
          </Dialog.Content>
          <Dialog.Actions>
            <SubscribeButton
              loading={isSubscribing}
              disabled={isSubscribing}
              onPress={onSubscribe}
            >
              Go Plus for $12.99 / Month
            </SubscribeButton>
          </Dialog.Actions>
        </>
      </Dialog>
    </Portal>
  );
};

export default TrialModal;
