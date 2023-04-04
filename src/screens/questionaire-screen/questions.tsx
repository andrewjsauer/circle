/* eslint-disable @typescript-eslint/naming-convention */

// create level of quality for voices
// handle no preferences answers when constructing the query

const techniques = {
  mindfulness: [
    { id: "no-preference", value: "No preference" },
    { id: "body-scan", value: "Body scan" },
    { id: "mindful-breathing", value: "Mindful breathing" },
    { id: "loving-kindness", value: "Loving-kindness" },
    { id: "noting", value: "Noting" },
    { id: "labeling", value: "Labeling" },
    { id: "scanning", value: "Scanning" },
    { id: "open-awareness", value: "Open awareness" },
  ],
  spiritual: [
    { id: "no-preference", value: "No preference" },
    { id: "contemplation", value: "Contemplation" },
    { id: "chanting", value: "Chanting" },
    { id: "prayer", value: "Prayer" },
    { id: "visualization", value: "Visualization" },
    { id: "reflection", value: "Reflection" },
  ],
  focused: [
    { id: "no-preference", value: "No preference" },
    { id: "breath", value: "Breath" },
    { id: "sound", value: "Sound" },
    { id: "object", value: "Object" },
    { id: "visualization", value: "Visualization" },
  ],
  movement: [
    { id: "no-preference", value: "No preference" },
    { id: "yoga", value: "Yoga" },
    { id: "tai-chi", value: "Tai chi" },
    { id: "qi-gong", value: "Qi gong" },
    { id: "walking", value: "Walking" },
  ],
  mantra: [
    { id: "no-preference", value: "No preference" },
    { id: "repetition", value: "Repetition" },
    { id: "chanting", value: "Chanting" },
    { id: "visualization", value: "Visualization" },
  ],
  transcendental: [
    { id: "no-preference", value: "No preference" },
    { id: "repetition", value: "Repetition" },
    { id: "mantra", value: "Mantra" },
    { id: "visualization", value: "Visualization" },
  ],
  "progressive-relaxation": [
    { id: "no-preference", value: "No preference" },
    { id: "body-scan", value: "Body scan" },
    {
      id: "tensing-and-releasing-muscles",
      value: "Tensing and releasing muscles",
    },
    { id: "visualization", value: "Visualization" },
  ],
  "loving-kindness": [
    { id: "no-preference", value: "No preference" },
    { id: "visualization", value: "Visualization" },
    { id: "metta", value: "Metta" },
    { id: "compassion", value: "Compassion" },
  ],
  visualization: [
    { id: "no-preference", value: "No preference" },
    { id: "guided-imagery", value: "Guided imagery" },
    { id: "color-visualization", value: "Color visualization" },
    { id: "journeying", value: "Journeying" },
  ],
};

const areasOfFocus = {
  mindfulness: [
    { id: "breath", value: "Breath" },
    { id: "sensations", value: "Sensations" },
    { id: "thoughts", value: "Thoughts" },
    { id: "emotions", value: "Emotions" },
    { id: "external-environment", value: "External Environment" },
    { id: "no-preference", value: "No preference" },
  ],
  spiritual: [
    { id: "heart", value: "Heart" },
    { id: "third-eye", value: "Third Eye" },
    { id: "crown", value: "Crown" },
    { id: "higher-power", value: "Higher Power" },
    { id: "sacred-symbol", value: "Sacred Symbol" },
    { id: "no-preference", value: "No preference" },
  ],
  focused: [
    { id: "breath", value: "Breath" },
    { id: "mantra", value: "Mantra" },
    { id: "object", value: "Object" },
    { id: "chakra", value: "Chakra" },
    { id: "energy-centers", value: "Energy Centers" },
    { id: "no-preference", value: "No preference" },
  ],
  movement: [
    { id: "no-preference", value: "No preference" },
    { id: "breath", value: "Breath" },
    { id: "body-sensations", value: "Body Sensations" },
    { id: "movement", value: "Movement" },
    { id: "balance", value: "Balance" },
    { id: "alignment", value: "Alignment" },
  ],
  mantra: [
    { id: "no-preference", value: "No preference" },
    { id: "breath", value: "Breath" },
    { id: "mantra", value: "Mantra" },
    { id: "chakra", value: "Chakra" },
    { id: "energy centers", value: "Energy Centers" },
    { id: "sacred symbol", value: "Sacred Symbol" },
  ],
  transcendental: [
    { id: "no-preference", value: "No preference" },
    { id: "breath", value: "Breath" },
    { id: "mantra", value: "Mantra" },
    { id: "chakra", value: "Chakra" },
    { id: "energy-centers", value: "Energy Centers" },
    { id: "higher-self", value: "Higher Self" },
  ],
  "progressive-relaxation": [
    { id: "no-preference", value: "No preference" },
    { id: "body-sensations", value: "Body Sensations" },
    { id: "breath", value: "Breath" },
    { id: "muscles", value: "Muscles" },
    { id: "tension", value: "Tension" },
    { id: "relaxation", value: "Relaxation" },
  ],
  "loving-kindness": [
    { id: "no-preference", value: "No preference" },
    { id: "breath", value: "Breath" },
    { id: "heart", value: "Heart" },
    { id: "compassion", value: "Compassion" },
    { id: "love", value: "Love" },
    { id: "kindness", value: "Kindness" },
  ],
  visualization: [
    { id: "no-preference", value: "No preference" },
    { id: "breath", value: "Breath" },
    { id: "visualization", value: "Visualization" },
    { id: "sensations", value: "Sensations" },
    { id: "emotions", value: "Emotions" },
    { id: "external-environment", value: "External Environment" },
  ],
};

const meditations = [
  {
    id: "mindfulness",
    value: "Mindfulness",
  },
  {
    id: "spiritual",
    value: "Spiritual",
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
    id: "mantra",
    value: "Mantra",
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
    id: "visualization",
    value: "Visualization",
  },
];

const goals = [
  {
    id: "no-preference",
    value: "No preference",
  },
  {
    id: "stress",
    value: "Reduce stress and anxiety",
  },
  {
    id: "pain",
    value: "Mindfulness and presence",
  },
  {
    id: "focus",
    value: "Focus and concentration",
  },
  {
    id: "gratitude",
    value: "Feelings of gratitude and joy",
  },
  {
    id: "emotions",
    value: "Emotional regulation and resilience",
  },
  {
    id: "spirituality",
    value: "Spiritual connection or insight",
  },
  {
    id: "sleep",
    value: "Relaxation and better sleep",
  },
  {
    id: "self-awareness",
    value: "Self-awareness and self-reflection",
  },
  {
    id: "well-being",
    value: "Well-being and quality of life",
  },
  {
    id: "compassion",
    value: "Compassion and empathy for oneself and others",
  },
  {
    id: "peace",
    value: "Inner peace and contentment",
  },
  {
    id: "creativity",
    value: "Creativity and intuition",
  },
  {
    id: "healing",
    value: "Physical and mental healing",
  },
  {
    id: "self-acceptance",
    value: "Self-acceptance and self-love",
  },
  {
    id: "relationships",
    value: "Relationships with others and reduce conflict",
  },
  {
    id: "purpose",
    value: "Greater sense of purpose or meaning in life",
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

const questions = (meditationId) => [
  {
    title: "What type of meditation practice would you like to do today?",
    id: "type",
    options: meditations,
  },
  {
    title:
      "Are you interested in incorporating any specific techniques into this type of meditation?",
    options: techniques[meditationId],
    id: "technique",
  },
  {
    title: "Any areas to focus on?",
    options: areasOfFocus[meditationId],
    id: "focus",
  },
  {
    title: "Do you prefer a male or female voice?",
    id: "voice",
    options: [
      {
        id: "no-preference",
        value: "No preference",
      },
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
    title: "How much time do you have for this session?",
    id: "time",
    options: [
      {
        id: "short",
        value: "Short (2-5 minutes)",
      },
      {
        id: "medium",
        value: "Medium (5-10 minutes)",
      },
      {
        id: "long",
        value: "Long (10-20 minutes)",
      },
      {
        id: "very-long",
        value: "Very long (20+ minutes)",
      },
    ],
  },
  {
    title: "What are your goals or intentions for this practice?",
    id: "goals",
    options: goals,
  },
];

export default questions;
