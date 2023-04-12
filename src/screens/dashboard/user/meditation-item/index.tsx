import React from "react";
import { Button, List } from "react-native-paper";

import {
  typeOfDays,
  techniques,
  meditationTypes,
} from "@constants/meditations";

import { convertTimestamp } from "../utils";

import { PlayButton, ItemText, ButtonRow, ItemView, Row } from "./styles";

const MeditationItem = ({ item, onPlay, onDelete, isDeleting }: any) => {
  if (!item) return null;

  const meditationId = meditationTypes.filter(
    (type) => type.value === item.type,
  )[0].id;
  const technique = techniques[meditationId].filter(
    (tech) => tech.id === item.technique,
  )[0].value;

  const typeOfDay = typeOfDays.filter((day) => day.id === item.typeOfDay)[0]
    .value;
  const createdAt = convertTimestamp(item.createdAt);

  return (
    <List.AccordionGroup>
      <List.Accordion
        title={`${typeOfDay} ${item.type}`}
        description={`Created ${createdAt}`}
        id={item.id}
      >
        <ItemView>
          <Row>
            <ItemText>Technique: {technique}</ItemText>
          </Row>
          <Row>
            <ItemText>Time: {item.duration} minutes</ItemText>
          </Row>
          <Row>
            <ItemText>Goal: {item.goal}</ItemText>
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
