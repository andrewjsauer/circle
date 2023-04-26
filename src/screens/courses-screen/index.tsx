import React, { useState, useEffect, memo } from "react";
import { List, Text } from "react-native-paper";

import { Navigation } from "@types";
import * as routes from "@constants/routes";

import BackButton from "@components/back-button";

import { meditationsByCourseType } from "@constants/meditations";

import CardCourse from "../dashboard/home/card-course";
import { CardWrapper, LessonList, Content, Layout, Title } from "./styles";

interface Props {
  navigation: Navigation;
  route: {
    params: {
      meditation: any;
      name: string;
    };
  };
}

const CoursesScreen = ({ navigation, route }: Props) => {
  const { meditation, name } = route.params;

  const lessons = meditationsByCourseType[meditation.id];
  return (
    <Layout>
      <BackButton goBack={() => navigation.goBack()} />
      <Content>
        <Title>{meditation.title}</Title>
        <LessonList>
          {lessons.map((lesson) => (
            <CardWrapper key={lesson.title}>
              <CardCourse
                title={lesson.title}
                description={lesson.description}
                time={lesson.time}
                color={meditation.color}
                onPress={() =>
                  navigation.navigate(routes.MEDITATION_BUILDER_SCREEN, {
                    meditation: { ...lesson, ...meditation },
                    name,
                  })
                }
              />
            </CardWrapper>
          ))}
        </LessonList>
      </Content>
    </Layout>
  );
};

export default memo(CoursesScreen);
