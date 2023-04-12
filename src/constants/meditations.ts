/* eslint-disable @typescript-eslint/naming-convention */

export const typeOfDays = [
  {
    id: "morning",
    value: "Morning",
  },
  {
    id: "afternoon",
    value: "Afternoon",
  },
  {
    id: "evening",
    value: "Evening",
  },
  {
    id: "no-preference",
    value: "No preference",
  },
];

export const meditationTypes = [
  {
    id: "mindfulness",
    value: "Mindfulness",
  },
  {
    id: "visualization",
    value: "Visualization",
  },
  {
    id: "mantra",
    value: "Mantra",
  },
  {
    id: "focused",
    value: "Focused",
  },
  {
    id: "movement",
    value: "Movement",
  },
  {
    id: "transcendental",
    value: "Transcendental",
  },
  {
    id: "progressive-relaxation",
    value: "Progressive Relaxation",
  },
  {
    id: "loving-kindness",
    value: "Loving-Kindness",
  },
  {
    id: "spiritual",
    value: "Spiritual",
  },
];

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

export const techniques = {
  mindfulness: [
    { id: "body-scan", value: "Body scan" },
    { id: "mindful-breathing", value: "Mindful breathing" },
    { id: "loving-kindness", value: "Loving-kindness" },
    { id: "noting", value: "Noting" },
    { id: "labeling", value: "Labeling" },
    { id: "scanning", value: "Scanning" },
    { id: "open-awareness", value: "Open awareness" },
  ],
  spiritual: [
    { id: "contemplation", value: "Contemplation" },
    { id: "chanting", value: "Chanting" },
    { id: "prayer", value: "Prayer" },
    { id: "visualization", value: "Visualization" },
    { id: "reflection", value: "Reflection" },
  ],
  focused: [
    { id: "breath", value: "Breath" },
    { id: "sound", value: "Sound" },
    { id: "object", value: "Object" },
    { id: "visualization", value: "Visualization" },
  ],
  movement: [
    { id: "yoga", value: "Yoga" },
    { id: "tai-chi", value: "Tai chi" },
    { id: "qi-gong", value: "Qi gong" },
    { id: "walking", value: "Walking" },
  ],
  mantra: [
    { id: "repetition", value: "Repetition" },
    { id: "chanting", value: "Chanting" },
    { id: "visualization", value: "Visualization" },
  ],
  transcendental: [
    { id: "repetition", value: "Repetition" },
    { id: "mantra", value: "Mantra" },
    { id: "visualization", value: "Visualization" },
  ],
  "progressive-relaxation": [
    { id: "body-scan", value: "Body scan" },
    {
      id: "tensing-and-releasing-muscles",
      value: "Tensing and releasing muscles",
    },
    { id: "visualization", value: "Visualization" },
  ],
  "loving-kindness": [
    { id: "visualization", value: "Visualization" },
    { id: "metta", value: "Metta" },
    { id: "compassion", value: "Compassion" },
  ],
  visualization: [
    { id: "guided-imagery", value: "Guided imagery" },
    { id: "color-visualization", value: "Color visualization" },
    { id: "journeying", value: "Journeying" },
  ],
};
export const questions = [
  {
    title: "What's your goal for this meditation?",
    description:
      "This is used to personalize your experience when creating your meditation.",
    id: "goal",
    type: "text",
  },
  {
    title: "What is your preferred duration?",
    id: "time",
    options: times,
  },
];

export const customQuestions = (meditationId) => [
  {
    title: "Select a meditation type",
    id: "meditationType",
    options: meditationTypes,
  },
  {
    title:
      "Are there any specific meditation techniques you would like to explore?",
    options: techniques[meditationId],
    id: "technique",
  },
  {
    title: "What is your goal for this meditation session?",
    id: "goal",
    type: "text",
  },
  {
    title: "What is your preferred session duration?",
    id: "time",
    options: times,
  },
];

export const homeScreenOptions = [
  {
    id: "mindfulness",
    value: "Mindfulness",
    technique: "mindful-breathing",
    color: "#5588BB",
    backgroundColor: "rgba(116, 166, 208, 0.3)",
    placeholder:
      "e.g. this can be anything from cultivate awareness to reduce stress, etc.",
  },
  {
    id: "visualization",
    value: "Visualization",
    technique: "guided-imagery",
    color: "#4477AA",
    backgroundColor: "rgba(92, 133, 169, 0.3)",
    placeholder:
      "e.g. this can be anything from enhance focus to visualize success and good fortune.",
  },
  {
    id: "mantra",
    value: "Mantra",
    technique: "repetition",
    color: "#336699",
    backgroundColor: "rgba(116, 166, 208, 0.3)",
    placeholder:
      "e.g. this can be anything from inner peace to self-compassion, success, etc.",
  },
  {
    id: "movement",
    value: "Movement",
    technique: "walking",
    color: "#225588",
    backgroundColor: "rgba(108, 155, 195, 0.3)",
    placeholder:
      "e.g. this can be anything from achieve mindfulness through physical activities like yoga or walking.",
  },
  {
    id: "custom",
    value: "Custom",
    color: "#114477",
    backgroundColor: "rgba(100, 144, 182, 0.3)",
    placeholder: "e.g. create your own meditation session.",
  },
];

// Need to download and upload audio files to Firebase Storage. Will need duration of each duration we offer
// {
//   title: "What about music?",
//   id: "music",
//   options: [
//     {
//       id: "nature-sounds",
//       value: "Nature sounds",
//     },
//     {
//       id: "ambient-music",
//       value: "Ambient music",
//     },
//     {
//       id: "instrumental-music",
//       value: "Instrumental music",
//     },
//     {
//       id: "no-music",
//       value: "No music",
//     },
//   ],
// },
