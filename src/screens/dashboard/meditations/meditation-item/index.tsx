import React from "react";
import { Button, List } from "react-native-paper";

import { convertTimestamp } from "../utils";
import { PlayButton, ButtonRow, ItemView } from "./styles";

const getDescription = (
  title: string,
  duration: number,
  type: string,
  dbCreatedAt: string,
) => {
  const createdAt = convertTimestamp(dbCreatedAt);

  let meditationType = "";
  switch (type) {
    case "micro":
      meditationType = "Micro Meditation";
      break;
    case "course":
      meditationType = "Course";
      break;
    case "personalized":
      meditationType = "Single Meditation";
      break;
    default:
      break;
  }

  return `${meditationType} - ${duration} minutes. Created on ${createdAt}. `;
};

const MeditationItem = ({ item, onPlay, onDelete, isDeleting }: any) => {
  if (!item) return null;

  return (
    <List.AccordionGroup>
      <List.Accordion
        title={`${item.title}`}
        description={getDescription(
          item.title,
          item.duration,
          item.type,
          item.createdAt,
        )}
        id={item.id}
      >
        <ItemView>
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
