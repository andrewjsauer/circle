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
    color: "#547A9C",
    backgroundColor: "rgba(84, 122, 156, 0.3)",
    placeholder:
      "e.g. cultivate awareness of the present moment and reduce stress.",
  },
  {
    id: "visualization",
    value: "Visualization",
    color: "#5C85A9",
    backgroundColor: "rgba(92, 133, 169, 0.3)",
    placeholder: "e.g. enhance focus and clarity through mental imagery.",
  },
  {
    id: "focused",
    value: "Focused",
    color: "#6490B6",
    backgroundColor: "rgba(100, 144, 182, 0.3)",
    placeholder:
      "e.g. improve concentration and mental focus on a specific object or thought.",
  },
  {
    id: "movement",
    value: "Movement",
    color: "#6C9BC3",
    backgroundColor: "rgba(108, 155, 195, 0.3)",
    placeholder:
      "e.g. achieve mindfulness through physical activities like yoga or walking.",
  },
  {
    id: "mantra",
    value: "Mantra",
    color: "#7496D0",
    backgroundColor: "rgba(116, 166, 208, 0.3)",
    placeholder:
      "e.g. experience inner peace and transformation through the repetition of sacred sounds",
  },
  {
    id: "transcendental",
    value: "Transcendental",
    color: "#7CA1DD",
    backgroundColor: "rgba(124, 177, 221, 0.3)",
    placeholder:
      "e.g. access deep states of rest and expanded awareness through the use of a personal mantra",
  },
  {
    id: "progressive-relaxation",
    value: "Progressive Relaxation",
    color: "#84ACEA",
    backgroundColor: "rgba(132, 188, 234, 0.3)",
    placeholder:
      "e.g. release tension and promote relaxation by progressively tensing and relaxing muscle groups.",
  },
  {
    id: "loving-kindness",
    value: "Loving-Kindness",
    color: "#8CB7F7",
    backgroundColor: "rgba(140, 199, 247, 0.3)",
    placeholder:
      "e.g. develop compassion and love for oneself and others through the practice of sending well-wishes",
  },
  {
    id: "spiritual",
    value: "Spiritual",
    color: "#94C2FF",
    backgroundColor: "rgba(148, 210, 255, 0.3)",
    placeholder:
      "e.g. connect with a higher power or greater sense of purpose in life.",
  },
];

export const times = [
  {
    id: "2",
    value: "Short (2-5 minutes)",
  },
  {
    id: "4",
    value: "Medium (5-10 minutes)",
  },
  {
    id: "6",
    value: "Long (10-20 minutes)",
  },
  {
    id: "8",
    value: "Very long (20+ minutes)",
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

export const questions = (meditationId) => [
  {
    title: "What is your primary goal for this meditation session?",
    id: "goal",
    type: "text",
  },
  {
    title:
      "Are there any specific meditation techniques you would like to explore?",
    options: techniques[meditationId],
    id: "technique",
  },
  {
    title: "Do you want to incorporate the type of day into your session?",
    id: "typeOfDay",
    options: typeOfDays,
  },
  {
    title: "Do you prefer a male or female voice?",
    id: "voice",
    options: [
      {
        id: "male",
        value: "Male",
      },
      {
        id: "female",
        value: "Female",
      },
    ],
  },
  {
    title: "What is your preferred session duration?",
    id: "time",
    options: times,
  },
  {
    title: "How familiar are you with meditation?",
    id: "experience",
    options: [
      {
        id: "beginner",
        value: "Beginner",
      },
      {
        id: "intermediate",
        value: "Intermediate",
      },
      {
        id: "advanced",
        value: "Advanced",
      },
      {
        id: "expert",
        value: "Expert",
      },
    ],
  },
];
