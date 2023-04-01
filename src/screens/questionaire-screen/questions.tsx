/* eslint-disable @typescript-eslint/naming-convention */

const techniques = {
  mindfulness: [
    { id: "body-scan", value: "Body scan" },
    { id: "mindful-breathing", value: "Mindful breathing" },
    { id: "loving-kindness", value: "Loving-kindness" },
    { id: "noting", value: "Noting" },
    { id: "labeling", value: "Labeling" },
    { id: "scanning", value: "Scanning" },
    { id: "open-awareness", value: "Open awareness" },
    { id: "no-preference", value: "No preference" },
  ],
  spiritual: [
    { id: "contemplation", value: "Contemplation" },
    { id: "chanting", value: "Chanting" },
    { id: "prayer", value: "Prayer" },
    { id: "visualization", value: "Visualization" },
    { id: "reflection", value: "Reflection" },
    { id: "no-preference", value: "No preference" },
  ],
  focused: [
    { id: "breath", value: "Breath" },
    { id: "sound", value: "Sound" },
    { id: "object", value: "Object" },
    { id: "visualization", value: "Visualization" },
    { id: "no-preference", value: "No preference" },
  ],
  movement: [
    { id: "yoga", value: "Yoga" },
    { id: "tai-chi", value: "Tai chi" },
    { id: "qi-gong", value: "Qi gong" },
    { id: "walking", value: "Walking" },
    { id: "no-preference", value: "No preference" },
  ],
  mantra: [
    { id: "repetition", value: "Repetition" },
    { id: "chanting", value: "Chanting" },
    { id: "visualization", value: "Visualization" },
    { id: "no-preference", value: "No preference" },
  ],
  transcendental: [
    { id: "repetition", value: "Repetition" },
    { id: "mantra", value: "Mantra" },
    { id: "visualization", value: "Visualization" },
    { id: "no-preference", value: "No preference" },
  ],
  "progressive-relaxation": [
    { id: "body-scan", value: "Body scan" },
    {
      id: "tensing-and-releasing-muscles",
      value: "Tensing and releasing muscles",
    },
    { id: "visualization", value: "Visualization" },
    { id: "no-preference", value: "No preference" },
  ],
  "loving-kindness": [
    { id: "visualization", value: "Visualization" },
    { id: "metta", value: "Metta" },
    { id: "compassion", value: "Compassion" },
    { id: "no-preference", value: "No preference" },
  ],
  visualization: [
    { id: "guided-imagery", value: "Guided imagery" },
    { id: "color-visualization", value: "Color visualization" },
    { id: "journeying", value: "Journeying" },
    { id: "no-preference", value: "No preference" },
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
    { id: "breath", value: "Breath" },
    { id: "body-sensations", value: "Body Sensations" },
    { id: "movement", value: "Movement" },
    { id: "balance", value: "Balance" },
    { id: "alignment", value: "Alignment" },
    { id: "no-preference", value: "No preference" },
  ],
  mantra: [
    { id: "breath", value: "Breath" },
    { id: "mantra", value: "Mantra" },
    { id: "chakra", value: "Chakra" },
    { id: "energy centers", value: "Energy Centers" },
    { id: "sacred symbol", value: "Sacred Symbol" },
    { id: "no-preference", value: "No preference" },
  ],
  transcendental: [
    { id: "breath", value: "Breath" },
    { id: "mantra", value: "Mantra" },
    { id: "chakra", value: "Chakra" },
    { id: "energy-centers", value: "Energy Centers" },
    { id: "higher-self", value: "Higher Self" },
    { id: "no-preference", value: "No preference" },
  ],
  "progressive-relaxation": [
    { id: "body-sensations", value: "Body Sensations" },
    { id: "breath", value: "Breath" },
    { id: "muscles", value: "Muscles" },
    { id: "tension", value: "Tension" },
    { id: "relaxation", value: "Relaxation" },
    { id: "no-preference", value: "No preference" },
  ],
  "loving-kindness": [
    { id: "breath", value: "Breath" },
    { id: "heart", value: "Heart" },
    { id: "compassion", value: "Compassion" },
    { id: "love", value: "Love" },
    { id: "kindness", value: "Kindness" },
    { id: "no-preference", value: "No preference" },
  ],
  visualization: [
    { id: "breath", value: "Breath" },
    { id: "visualization", value: "Visualization" },
    { id: "sensations", value: "Sensations" },
    { id: "emotions", value: "Emotions" },
    { id: "external-environment", value: "External Environment" },
    { id: "no-preference", value: "No preference" },
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

const questions = (meditationId) => [
  {
    title: "What type of meditation practice would you like to do today?",
    id: "type",
    options: meditations,
  },
  {
    title:
      "Are you interested in incorporating any specific techniques into this practice?",
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
        id: "male",
        value: "Male",
      },
      {
        id: "female",
        value: "Female",
      },
      {
        id: "no-preference",
        value: "No preference",
      },
    ],
  },
  {
    title: "What about music?",
    id: "music",
    options: [
      {
        id: "nature-sounds",
        value: "Nature sounds",
      },
      {
        id: "ambient-music",
        value: "Ambient music",
      },
      {
        id: "instrumental-music",
        value: "Instrumental music",
      },
      {
        id: "no-music",
        value: "No music",
      },
    ],
  },
  {
    title: "How much time do you have for this session?",
    id: "time",
    options: [
      {
        id: "5-minutes",
        value: "5 minutes",
      },
      {
        id: "10-minutes",
        value: "10 minutes",
      },
      {
        id: "15-minutes",
        value: "15 minutes",
      },
      {
        id: "20-minutes",
        value: "20 minutes",
      },
      {
        id: "30-minutes",
        value: "30 minutes",
      },
      {
        id: "45-minutes",
        value: "45 minutes",
      },
      {
        id: "60-minutes",
        value: "60 minutes",
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
