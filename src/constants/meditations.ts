export const times = [
  {
    id: "1",
    value: "Short (2-5 minutes)",
  },
  {
    id: "3",
    value: "Medium (5-10 minutes)",
  },
  {
    id: "5",
    value: "Long (10-20 minutes)",
  },
];

export const microHitQuestions = [
  {
    title: "What is your primary goal or intention for this meditation?",
    placeholder:
      "e.g., stress relief, increased focus, emotional healing, better sleep",
    id: "goal",
    type: "text",
  },
];

export const personalizedQuestions = [
  {
    title: "What is your primary goal or intention for this meditation?",
    placeholder:
      "e.g., stress relief, increased focus, emotional healing, better sleep",
    id: "goal",
    type: "text",
  },
  {
    title:
      "Are there any specific challenges or concerns you'd like to address through this meditation? ",
    placeholder: "e.g., anxiety, self-esteem, anger management, physical pain",
    id: "challenge",
    type: "text",
  },
  {
    title: "How would you like to feel after completing this meditation?",
    placeholder:
      "e.g., relaxed, energized, inspired, balanced, calm, peaceful, joyful",
    id: "feel",
    type: "text",
  },
  {
    title:
      "Are there any specific meditation techniques you'd like to include?",
    placeholder: "e.g., guided imagery, breath work, affirmations, body scan",
    id: "technique",
    type: "text",
  },
  {
    title: "How long would you like for this meditation to be?",
    id: "time",
    options: times,
  },
];

export const microHits = [
  {
    id: "mindfulness",
    value: "Mindfulness",
    technique: {
      id: "mindful-breathing",
      value: "Mindful Breathing",
    },
    title: "Mindfulness Meditation",
    description:
      "Boost self-awareness and emotional balance with quick, non-judgmental observation",
    time: times[0].id,
    color: "#5588BB",
  },
  {
    id: "visualization",
    value: "Visualization",
    technique: {
      id: "guided-imagery",
      value: "Guided Imagery",
    },
    title: "Visualization Meditation",
    description: "Unleash rapid relaxation with short, vivid mental images",
    time: times[0].id,
    color: "#4477AA",
  },
  {
    id: "mantra",
    value: "Mantra",
    title: "Mantra Meditation",
    description:
      "Find instant calm by briefly repeating a meaningful word or phrase",
    technique: {
      id: "repetition",
      value: "Repetition",
    },
    time: times[0].id,
    color: "#336699",
  },
  {
    id: "movement",
    value: "Movement",
    title: "Movement Meditation",
    description:
      "Quickly harmonize mind and body with brief, focused physical motions",
    technique: {
      id: "walking",
      value: "Walking",
    },
    time: times[0].id,
    color: "#225588",
  },
];
