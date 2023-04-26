import React, { useEffect, useState } from "react";
import { View, Animated } from "react-native";
import styled from "styled-components/native";

const Circle = styled(Animated.View)`
  position: absolute;
  justify-content: center;
  align-items: center;
  border-radius: 100px;
`;

const BreathingCircle = ({ duration = 5000, pauseDuration = 1000 }: any) => {
  const [scale] = useState(new Animated.Value(1));

  useEffect(() => {
    const animateBreathing = () => {
      Animated.sequence([
        Animated.timing(scale, {
          toValue: 1.5,
          duration: duration / 2,
          useNativeDriver: true,
        }),
        Animated.delay(pauseDuration),
        Animated.timing(scale, {
          toValue: 1,
          duration: duration / 2,
          useNativeDriver: true,
        }),
        Animated.delay(pauseDuration),
      ]).start();
    };

    animateBreathing();
    const interval = setInterval(
      animateBreathing,
      duration + 2 * pauseDuration,
    );

    return () => clearInterval(interval);
  }, [duration, pauseDuration, scale]);

  const circleStyle = (width, height, color) => ({
    width,
    height,
    borderRadius: width / 2,
    backgroundColor: color,
    transform: [{ scale }],
  });

  return (
    <View style={{ justifyContent: "center", alignItems: "center" }}>
      <Circle style={circleStyle(200, 200, "#6699CC")} />
      <Circle style={circleStyle(150, 150, "#7AA7D6")} />
      <Circle style={circleStyle(100, 100, "#8FB5E0")} />
      <Circle style={circleStyle(50, 50, "#A5C3EA")} />
    </View>
  );
};

export default BreathingCircle;
