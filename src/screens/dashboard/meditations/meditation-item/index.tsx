import React from "react";
import { Button, List } from "react-native-paper";

import { convertTimestamp } from "../utils";

import { PlayButton, ItemText, ButtonRow, ItemView, Row } from "./styles";

const typeOfDays = {
  morning: "Morning",
  afternoon: "Afternoon",
  evening: "Evening",
};

const MeditationItem = ({ item, onPlay, onDelete, isDeleting }: any) => {
  if (!item) return null;

  const createdAt = convertTimestamp(item.createdAt);
  const title = item?.value
    ? `${item.value} Micro Meditation`
    : `Personalized ${typeOfDays[item.typeOfDay]} Meditation`;
  const technique = item?.technique?.value || item?.technique;
  return (
    <List.AccordionGroup>
      <List.Accordion
        title={title}
        description={`Created ${createdAt}`}
        id={item.id}
      >
        <ItemView>
          <Row>
            <ItemText>Intention: {item.goal}</ItemText>
          </Row>
          <Row>
            <ItemText>Technique: {technique}</ItemText>
          </Row>
          <Row>
            <ItemText>Time: {item.duration} minutes</ItemText>
          </Row>
          <ButtonRow>
            <PlayButton
              onPress={() => onPlay(item.id)}
              compact
              mode="contained-tonal"
              disabled={isDeleting}
            >
              Play
            </PlayButton>
            <Button
              loading={isDeleting}
              disabled={isDeleting}
              onPress={() => onDelete(item.id)}
              compact
            >
              Delete
            </Button>
          </ButtonRow>
        </ItemView>
      </List.Accordion>
    </List.AccordionGroup>
  );
};

export default MeditationItem;
