export const times = [
  {
    id: "short",
    value: "Short (2-5 minutes)",
    duration: 5,
    words: 450,
  },
  {
    id: "medium",
    value: "Medium (5-10 minutes)",
    duration: 10,
    words: 600,
  },
  {
    id: "long",
    value: "Long (10-20 minutes)",
    duration: 15,
    words: 900,
  },
];

export const personalizedMeditation = {
  id: "personalized",
  questions: [
    {
      title: "What is your primary goal or intention for this meditation?",
      placeholder:
        "e.g., stress relief, increased focus, emotional healing, better sleep",
      id: "goal",
      type: "text",
    },
    {
      title:
        "What specific challenges or concerns would you like to address through this meditation? ",
      placeholder:
        "e.g., anxiety, self-esteem, anger management, physical pain",
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
  ],
  title: "Personalized Meditation",
  type: "personalized",
  color: "#5588BB",
  prompt: ({ goal, challenge, feel, technique, userName }) =>
    `Please create a personalized meditation for ${userName} based on the user's goal of '${goal}', addressing their specific challenges or concerns related to '${challenge}', leaving them feeling '${feel}'. Incorporate the meditation techniques they prefer, such as '${technique}'.`,
};

const Mindfulness = "mindfulness";
const Visualization = "visualization";
const Mantra = "mantra";
const Movement = "movement";

export const microHits = [
  {
    id: Mindfulness,
    type: "micro",
    technique: {
      id: "mindful-breathing",
      value: "Mindful Breathing",
    },
    title: "Mindfulness Meditation",
    description:
      "Boost self-awareness and emotional balance with quick, non-judgmental observation",
    color: "#5588BB",
    questions: [
      {
        title:
          "What specific area of your life would you like to focus on during this mindfulness meditation?",
        placeholder: "e.g., work stress, relationships, personal growth",
        id: "usersFocusArea",
        type: "text",
      },
      {
        title: "How would you like to feel after this mindfulness meditation?",
        placeholder: "e.g., calm, focused, recharged, energized, balanced, joy",
        id: "usersDesiredFeeling",
        type: "text",
      },
    ],
    prompt: ({ usersFocusArea, usersDesiredFeeling, userName }) =>
      `Please write a mindfulness meditation for ${userName} that helps the user to focus on '${usersFocusArea}' and leaves them feeling '${usersDesiredFeeling}'.`,
  },
  {
    id: Visualization,
    type: "micro",
    technique: {
      id: "guided-imagery",
      value: "Guided Imagery",
    },
    title: "Visualization Meditation",
    description: "Unleash rapid relaxation with short, vivid mental images",
    placeholder: "e.g., success, happiness, peace, love",
    color: "#4477AA",
    questions: [
      {
        title:
          "What specific goal or intention would you like to focus on during this visualization meditation?",
        placeholder: "e.g., relaxation, confidence, inner peace",
        type: "text",
        id: "usersGoal",
      },
      {
        title:
          "What environment or setting helps you feel the most relaxed or at peace?",
        placeholder: "e.g., beach, forest, mountain",
        type: "text",
        id: "usersEnvironment",
      },
      {
        title: "Which emotions would you like to evoke during this meditation?",
        placeholder: "e.g., calmness, joy, gratitude",
        type: "text",
        id: "usersEmotions",
      },
    ],
    prompt: ({ usersGoal, usersEnvironment, usersEmotions, userName }) =>
      `Please write a visualization meditation for ${userName} that guides the user through imagining a '${usersEnvironment}' and evokes the feelings of '${usersEmotions}'. The meditation should focus on the goal of '${usersGoal}'.`,
  },
  {
    id: Mantra,
    type: "micro",
    title: "Mantra Meditation",
    placeholder: "e.g., peace, love, om, shanti",
    description:
      "Find instant calm by briefly repeating a meaningful word or phrase",
    technique: {
      id: "repetition",
      value: "Repetition",
    },
    color: "#336699",
    questions: [
      {
        title: "What word or phrase would you like to use as your mantra?",
        placeholder: "e.g., peace, love, om",
        id: "usersMantra",
        type: "text",
      },
      {
        title: "How do you want to feel after completing this meditation?",
        placeholder: "e.g., relaxed, focused, energized",
        id: "usersDesiredFeeling",
        type: "text",
      },
    ],
    prompt: ({ usersMantra, usersDesiredFeeling, userName }) =>
      `Please write a mantra meditation for ${userName} using the chosen mantra '${usersMantra}' and focusing on evoking the feeling of '${usersDesiredFeeling}'.`,
  },
  {
    id: Movement,
    type: "micro",
    title: "Movement Meditation",
    description:
      "Quickly harmonize mind and body with brief, focused physical motions",
    technique: {
      id: "walking",
      value: "Walking",
    },
    color: "#225588",
    questions: [
      {
        title:
          "What type of movement would you like to incorporate into your meditation?",
        placeholder: "e.g., stretching, tai chi, yoga",
        id: "usersMovement",
        type: "text",
      },
      {
        title: "How do you want to feel after completing this meditation?",
        placeholder: "e.g., relaxed, balanced, energized",
        id: "usersDesiredFeeling",
        type: "text",
      },
    ],
    prompt: ({ usersMovement, usersDesiredFeeling, userName }) =>
      `Please write a movement meditation for ${userName} focusing on '${usersMovement}' to evoke the feeling of '${usersDesiredFeeling}' in the user.`,
  },
];

const SleepEnhancement = "sleep-enhancement";
const StressManagement = "stress-management";
const EmotionalWellBeing = "emotional-well-being";
const MindfulLiving = "mindful-living";
const PersonalGrowth = "personal-growth";
const RelationshipCompassion = "relationship-compassion";
const Beginner = "beginner-meditation";
const ConfidenceSelfEsteem = "confidence-self-esteem";
const PainManagementHealing = "pain-management-healing";
const CreativityInspiration = "creativity-inspiration";

export const coursesPt1 = [
  {
    id: MindfulLiving,
    title: "Mindful Living for You",
    description:
      "Discover a customized program that helps you integrate mindfulness into your everyday life, improving focus, productivity, and overall well-being. This course provides personalized mindfulness exercises, techniques for mindful communication, and tips for cultivating mindful habits that suit your lifestyle.",
    color: "#4C7F9E",
    time: "10 meditations",
    type: "course",
  },
  {
    id: SleepEnhancement,
    title: "Custom Sleep Enhancement Course",
    description:
      "Immerse yourself in a course dedicated to improving your sleep quality by addressing your specific sleep issues such as insomnia, night-time anxiety, and restlessness. This personalized program offers sleep-inducing meditations, relaxation techniques, and sleep hygiene tips adapted to your individual sleep patterns.",
    color: "#334D66",
    time: "8 meditations",
    type: "course",
  },
  {
    id: StressManagement,
    title: "Personalized Stress Management Course",
    description:
      "Experience a tailored program designed specifically for you, focusing on managing and reducing stress through meditation, mindfulness, and breathing techniques. This course includes customized guided meditations, stress-relief tips, and relaxation exercises based on your unique needs and preferences.",
    color: "#7AA6D6",
    time: "8 meditations",
    type: "course",
  },
  {
    id: EmotionalWellBeing,
    title: "Emotional Well-being Journey",
    description:
      "Embark on a bespoke course that focuses on enhancing your emotional well-being by addressing your personal emotional challenges, such as anxiety, depression, and anger management. This tailored program includes guided meditations, emotional intelligence exercises, and mindfulness practices designed just for you.",
    color: "#99CCE5",
    time: "8 meditations",
    type: "course",
  },
];

export const coursesPt2 = [
  {
    id: PersonalGrowth,
    title: "Personal Growth & Goal Achievement Quest",
    description:
      "Unlock your potential and achieve your aspirations with a program designed specifically for your personal development and goal-setting needs. This custom course provides visualization meditations, affirmations, and practical guidance for setting and reaching your personal goals.",
    color: "#3D6B99",
    time: "11 meditations",
    type: "course",
  },
  {
    id: CreativityInspiration,
    title: "Creativity & Inspiration Quest",
    description:
      "Unleash your creative potential with a customized course that helps you overcome creative blocks and find inspiration through meditation, mindfulness practices, and exercises for enhancing imagination. Explore new ways to connect with your inner artist and unlock the power of your creative mind.",
    color: "#B3D3A3",
    time: "8 meditations",
    type: "course",
  },
  {
    id: ConfidenceSelfEsteem,
    title: "Confidence & Self-esteem Boost",
    description:
      "Boost your self-confidence and self-esteem with a personalized course that focuses on developing a positive self-image through guided meditations, affirmations, and self-compassion practices. Learn to embrace your strengths, overcome insecurities, and build unshakeable confidence in every aspect of your life.",
    color: "#D6A575",
    time: "8 meditations",
    type: "course",
  },
];

export const coursesPt3 = [
  {
    id: PainManagementHealing,
    title: "Pain Management & Healing Path",
    description:
      "Embark on a healing journey designed to help you manage chronic pain, physical discomfort, or recover from injury through meditation techniques, breathwork, and visualization exercises. This tailored course addresses your specific pain-related challenges and promotes holistic healing.",
    color: "#A3BFD9",
    time: "8 meditations",
    type: "course",
  },
  {
    id: RelationshipCompassion,
    title: "Relationship & Compassion Path",
    description:
      "Deepen your connections and foster empathy, understanding, and compassion with a course tailored to your unique relationship experiences. This personalized program includes loving-kindness meditations, communication exercises, and guidance for navigating difficult emotions in your relationships.",
    color: "#A3BFD9",
    time: "9 meditations",
    type: "course",
  },
  {
    id: Beginner,
    title: "Beginner's Meditation Experience",
    description:
      "Start your meditation journey with a course specifically designed for you, providing foundational meditation techniques and guidance on establishing a regular practice. This personalized program offers an introduction to various meditation styles tailored to your preferences and initial experience.",
    color: "#83B0D4",
    time: "7 meditations",
    type: "course",
  },
];

export const meditationsByCourseType = {
  [CreativityInspiration]: [
    {
      title: "Visualizing Creativity and Inspiration",
      description:
        "Experience a guided visualization to unlock your creativity and inspire new ideas.",
      time: "1 question",
      questions: [
        {
          title: "What creative project or goal are you currently working on?",
          placeholder:
            "e.g., writing a novel, painting, brainstorming for work",
          id: "creativeProject",
          type: "text",
        },
      ],
      prompt: ({ creativeProject, userName }) =>
        `Please create a guided visualization meditation for ${userName} to help them unlock their creativity and inspire new ideas related to their current creative project or goal: ${creativeProject}.`,
    },
    {
      title: "Mindfulness for Creativity",
      description:
        "Learn how to use mindfulness techniques to enhance your creativity and focus.",
      time: "1 question",
      questions: [
        {
          title:
            "What challenges do you face when trying to access your creative side?",
          placeholder: "e.g., distractions, self-doubt, lack of motivation",
          id: "creativeChallenges",
          type: "text",
        },
      ],
      prompt: ({ creativeChallenges, userName }) =>
        `Please create a guided mindfulness meditation for ${userName} that helps them overcome challenges they face when trying to access their creative side, such as ${creativeChallenges}, and enhance their creativity and focus.`,
    },
    {
      title: "Affirmations for Creativity and Inspiration",
      description:
        "Use positive affirmations to boost your self-confidence and spark your creativity.",
      time: "1 question",
      questions: [
        {
          title: "What aspect of your creativity do you want to strengthen?",
          placeholder: "e.g., imagination, originality, motivation",
          id: "creativityAspect",
          type: "text",
        },
      ],
      prompt: ({ creativityAspect, userName }) =>
        `Please create a guided meditation with positive affirmations for ${userName} that focuses on strengthening their desired aspect of creativity, such as ${creativityAspect}, and inspiring their creative work.`,
    },
    {
      title: "Overcoming Creative Blocks",
      description:
        "Discover techniques to overcome creative blocks and reignite your passion for your projects.",
      time: "1 question",
      questions: [
        {
          title: "What is a creative block you've recently experienced?",
          placeholder:
            "e.g., writer's block, lack of inspiration, fear of failure",
          id: "creativeBlock",
          type: "text",
        },
      ],
      prompt: ({ creativeBlock, userName }) =>
        `Please create a guided meditation for ${userName} to help them overcome their recent creative block, such as ${creativeBlock}, and reignite their passion for their projects.`,
    },
    {
      title: "Connecting with Your Inner Artist",
      description:
        "Explore your inner artist and unleash your creative potential through meditation.",
      time: "1 question",
      questions: [
        {
          title: "What type of art or creative expression do you most enjoy?",
          placeholder: "e.g., writing, painting, music, dance",
          id: "creativeExpression",
          type: "text",
        },
      ],
      prompt: ({ creativeExpression, userName }) =>
        `Please create a guided meditation for ${userName} that helps them connect with their inner artist and unleash their creative potential through their preferred form of creative expression: ${creativeExpression}.`,
    },
    {
      title: "Meditation for Creative Flow",
      description:
        "Cultivate a state of creative flow through a guided meditation designed to help you tap into your natural creativity.",
      time: "1 question",
      questions: [
        {
          title:
            "What specific activity or project do you want to achieve creative flow in?",
          placeholder:
            "e.g., writing, painting, brainstorming, problem-solving",
          id: "creativeFlowActivity",
          type: "text",
        },
      ],
      prompt: ({ creativeFlowActivity, userName }) =>
        `Please create a guided meditation for ${userName} that helps them cultivate a state of creative flow during their specific activity or project: ${creativeFlowActivity}.`,
    },
    {
      title: "Fostering a Creative Environment",
      description:
        "Learn how to create a supportive environment that nurtures your creativity and inspiration.",
      time: "1 question",
      questions: [
        {
          title:
            "What aspects of your current environment hinder your creativity?",
          placeholder:
            "e.g., noise, clutter, distractions, lack of inspiration",
          id: "environmentHinder",
          type: "text",
        },
      ],
      prompt: ({ environmentHinder, userName }) =>
        `Please create a guided meditation for ${userName} that helps them learn how to create a supportive environment that nurtures their creativity and inspiration, while addressing the aspects of their current environment that hinder their creativity, such as ${environmentHinder}.`,
    },
    {
      title: "Exploring Creative Visualization",
      description:
        "Expand your imagination and inspire new ideas through creative visualization techniques.",
      time: "1 question",
      questions: [
        {
          title:
            "What area of your life do you want to spark new ideas and imagination in?",
          placeholder: "e.g., career, relationships, personal growth",
          id: "newIdeasArea",
          type: "text",
        },
      ],
      prompt: ({ newIdeasArea, userName }) =>
        `Please create a guided meditation for ${userName} that helps them expand their imagination and inspire new ideas in the specific area of their life they want to focus on: ${newIdeasArea}, using creative visualization techniques.`,
    },
  ],
  [PainManagementHealing]: [
    {
      title: "Mindful Body Scan for Pain Relief",
      description:
        "Learn how to perform a mindful body scan to alleviate pain and promote healing.",
      time: "1 question",
      questions: [
        {
          title: "Where in your body are you experiencing pain or discomfort?",
          placeholder: "e.g., lower back, neck, knees",
          id: "painLocation",
          type: "text",
        },
      ],
      prompt: ({ painLocation, userName }) =>
        `Please create a guided mindful body scan meditation to help ${userName} alleviate pain and promote healing, focusing on the area of their body where they experience pain or discomfort, such as ${painLocation}.`,
    },
    {
      title: "Breathing Techniques for Pain Management",
      description:
        "Discover different breathing techniques that can help you manage pain more effectively.",
      time: "1 question",
      questions: [
        {
          title: "What type of pain are you experiencing?",
          placeholder: "e.g., chronic, acute, sharp, dull",
          id: "painType",
          type: "text",
        },
      ],
      prompt: ({ painType, userName }) =>
        `Please create a guided meditation that teaches ${userName} breathing techniques to manage their ${painType} pain more effectively.`,
    },
    {
      title: "Guided Imagery for Healing",
      description:
        "Experience a guided imagery meditation designed to promote healing and recovery.",
      time: "1 question",
      questions: [
        {
          title:
            "What health issue or physical condition are you seeking to heal from?",
          placeholder: "e.g., injury, surgery, chronic illness",
          id: "healthIssue",
          type: "text",
        },
      ],
      prompt: ({ healthIssue, userName }) =>
        `Please create a guided imagery meditation for ${userName} that focuses on promoting healing and recovery from their specific health issue or physical condition, such as ${healthIssue}.`,
    },
    {
      title: "Progressive Muscle Relaxation for Pain Relief",
      description:
        "Learn how to practice progressive muscle relaxation to reduce pain and tension.",
      time: "1 question",
      questions: [
        {
          title:
            "In what areas of your body do you hold the most tension or experience pain?",
          placeholder: "e.g., shoulders, lower back, jaw",
          id: "tensionAreas",
          type: "text",
        },
      ],
      prompt: ({ tensionAreas, userName }) =>
        `Please create a guided progressive muscle relaxation meditation for ${userName} that focuses on reducing pain and tension in the areas of their body where they hold the most tension or experience pain, such as ${tensionAreas}.`,
    },
    {
      title: "Meditation for Emotional Aspects of Pain",
      description:
        "Explore a meditation that addresses the emotional aspects of pain and discomfort.",
      time: "1 question",
      questions: [
        {
          title: "What emotions do you associate with your pain or discomfort?",
          placeholder: "e.g., frustration, sadness, anger",
          id: "painEmotions",
          type: "text",
        },
      ],
      prompt: ({ painEmotions, userName }) =>
        `Please create a guided meditation for ${userName} that addresses the emotional aspects of their pain or discomfort, such as feelings of ${painEmotions}.`,
    },
    {
      title: "Self-Compassion Meditation for Pain Management",
      description:
        "Practice self-compassion to help cope with the challenges of living with pain.",
      time: "1 question",
      questions: [
        {
          title:
            "What challenges have you faced due to your pain or discomfort?",
          placeholder:
            "e.g., missed activities, sleep disturbances, emotional stress",
          id: "painChallenges",
          type: "text",
        },
      ],
      prompt: ({ painChallenges, userName }) =>
        `Please create a guided self-compassion meditation for ${userName} that helps them cope with the challenges they have faced due to their pain or discomfort, such as ${painChallenges}.`,
    },
    {
      title: "Affirmations for Pain Management and Healing",
      description:
        "Use positive affirmations to support pain management and promote healing.",
      time: "1 question",
      questions: [
        {
          title:
            "What aspects of your life do you feel are most affected by your pain?",
          placeholder: "e.g., relationships, work, self-esteem",
          id: "painAffectedAspects",
          type: "text",
        },
      ],
      prompt: ({ painAffectedAspects, userName }) =>
        `Please create a guided meditation with positive affirmations for ${userName} that focuses on pain management and promoting healing, targeting the aspects of their life most affected by their pain, such as ${painAffectedAspects}.`,
    },
    {
      title: "Mindfulness Meditation for Pain Management",
      description:
        "Learn how to use mindfulness techniques to manage pain and cultivate resilience.",
      time: "1 question",
      questions: [
        {
          title: "What situations or activities tend to exacerbate your pain?",
          placeholder:
            "e.g., sitting for long periods, stress, physical activity",
          id: "painExacerbatingSituations",
          type: "text",
        },
      ],
      prompt: ({ painExacerbatingSituations, userName }) =>
        `Please create a guided mindfulness meditation for ${userName} that teaches them how to manage their pain and cultivate resilience, especially during situations or activities that tend to exacerbate their pain, such as ${painExacerbatingSituations}.`,
    },
  ],
  [ConfidenceSelfEsteem]: [
    {
      title: "Embracing Your Authentic Self",
      description:
        "Learn to embrace your true self and let go of self-doubt through guided meditation and reflection.",
      time: "1 question",
      questions: [
        {
          title: "What aspects of yourself do you struggle to embrace?",
          placeholder: "e.g., physical appearance, personality traits",
          id: "struggleToEmbrace",
          type: "text",
        },
      ],
      prompt: ({ struggleToEmbrace, userName }) =>
        `Please guide ${userName} through a meditation that helps them embrace their true self, focusing on the aspects they struggle with, such as ${struggleToEmbrace}.`,
    },
    {
      title: "Building Self-compassion",
      description:
        "Develop self-compassion and kindness towards yourself through a guided meditation.",
      time: "1 question",
      questions: [
        {
          title:
            "What situations or experiences tend to trigger self-criticism for you?",
          placeholder: "e.g., making mistakes, receiving criticism",
          id: "selfCriticismTriggers",
          type: "text",
        },
      ],
      prompt: ({ selfCriticismTriggers, userName }) =>
        `Create a meditation that helps ${userName} build self-compassion and kindness, especially during situations that trigger self-criticism, such as ${selfCriticismTriggers}.`,
    },
    {
      title: "Overcoming Fear of Failure",
      description:
        "Let go of the fear of failure and embrace the learning process through a guided meditation.",
      time: "1 question",
      questions: [
        {
          title: "What specific situations or tasks do you fear failing at?",
          placeholder: "e.g., public speaking, job interviews",
          id: "fearOfFailureSituations",
          type: "text",
        },
      ],
      prompt: ({ fearOfFailureSituations, userName }) =>
        `Please create a meditation that helps ${userName} overcome their fear of failure in situations like ${fearOfFailureSituations}, and embrace the learning process.`,
    },
    {
      title: "Cultivating Positive Self-talk",
      description:
        "Replace negative self-talk with positive affirmations through a guided meditation.",
      time: "1 question",
      questions: [
        {
          title:
            "What negative thoughts or beliefs do you often tell yourself?",
          placeholder: "e.g., I'm not good enough, I can't do it",
          id: "negativeSelfTalk",
          type: "text",
        },
      ],
      prompt: ({ negativeSelfTalk, userName }) =>
        `Craft a meditation for ${userName} that helps them replace negative self-talk like ${negativeSelfTalk} with positive affirmations.`,
    },
    {
      title: "Developing a Growth Mindset",
      description:
        "Cultivate a growth mindset and embrace challenges through a guided meditation.",
      time: "1 question",
      questions: [
        {
          title:
            "What challenges or obstacles do you feel hold you back from personal growth?",
          placeholder: "e.g., fear of failure, perfectionism",
          id: "growthObstacles",
          type: "text",
        },
      ],
      prompt: ({ growthObstacles, userName }) =>
        `Design a meditation for ${userName} to help them develop a growth mindset and embrace challenges, focusing on the obstacles they face, such as ${growthObstacles}.`,
    },
    {
      title: "Enhancing Body Confidence",
      description:
        "Improve your body confidence and self-acceptance through a guided meditation.",
      time: "1 question",
      questions: [
        {
          title: "What aspects of your body do you feel most insecure about?",
          placeholder: "e.g., weight, height, facial features",
          id: "bodyInsecurities",
          type: "text",
        },
      ],
      prompt: ({ bodyInsecurities, userName }) =>
        `Please create a meditation that helps ${userName} enhance their body confidence and self-acceptance, focusing on the areas they feel insecure about, such as ${bodyInsecurities}.`,
    },
    {
      title: "Strengthening Assertiveness",
      description:
        "Build assertiveness and self-assurance through a guided meditation.",
      time: "1 question",
      questions: [
        {
          title:
            "In what situations do you struggle to assert yourself or express your needs?",
          placeholder: "e.g., at work, in relationships, with friends",
          id: "assertivenessStruggles",
          type: "text",
        },
      ],
      prompt: ({ assertivenessStruggles, userName }) =>
        `Craft a meditation for ${userName} that helps them strengthen their assertiveness and self-assurance, particularly in situations where they struggle to express themselves, such as ${assertivenessStruggles}.`,
    },
    {
      title: "Boosting Confidence in Social Situations",
      description:
        "Improve your self-confidence and ease in social situations through a guided meditation.",
      time: "1 question",
      questions: [
        {
          title:
            "What specific social situations do you feel most anxious or insecure in?",
          placeholder: "e.g., meeting new people, public speaking",
          id: "socialSituationAnxiety",
          type: "text",
        },
      ],
      prompt: ({ socialSituationAnxiety, userName }) =>
        `Please create a meditation that helps ${userName} boost their confidence and feel more at ease in social situations, particularly in situations where they feel most anxious or insecure, such as ${socialSituationAnxiety}.`,
    },
  ],
  [SleepEnhancement]: [
    {
      title: "Breathing Techniques for Sleep",
      description:
        "Learn various breathing techniques to help you relax and fall asleep more easily.",
      time: "1 question",
      questions: [
        {
          title:
            "What specific thoughts or feelings prevent you from falling asleep easily?",
          placeholder: "e.g., racing thoughts, anxiety, stress",
          id: "sleepObstacles",
          type: "text",
        },
      ],
      prompt: ({ sleepObstacles, userName }) =>
        `Please write a guided breathing exercises to help ${userName} fall asleep, considering their thoughts or feelings on ${sleepObstacles}.`,
    },
    {
      title: "Progressive Muscle Relaxation for Sleep",
      description:
        "Practice progressive muscle relaxation to release tension from your body and prepare for sleep.",
      time: "1 question",
      questions: [
        {
          title:
            "Which areas of your body hold the most tension before bedtime?",
          placeholder: "e.g., shoulders, jaw, legs",
          id: "tensionAreas",
          type: "text",
        },
      ],
      prompt: ({ userName, tensionAreas }) =>
        `Please write a meditation guides ${userName} through a progressive muscle relaxation exercise for sleep, focusing on the areas of tension: ${tensionAreas}.`,
    },
    {
      title: "Sleep Visualization",
      description:
        "Visualize calming scenes to help you transition into a peaceful and restful sleep.",
      time: "1 question",
      questions: [
        {
          title: "Describe your ideal relaxing environment for sleep.",
          placeholder: "e.g., a quiet bedroom, a cabin, a beach house",
          id: "relaxingEnvironment",
          type: "text",
        },
      ],
      prompt: ({ userName, relaxingEnvironment }) =>
        `Please write a meditation guides ${userName} through a sleep visualization exercise of their ideal relaxing environment: ${relaxingEnvironment}.`,
    },
    {
      title: "Mindfulness Meditation for Sleep",
      description:
        "Practice mindfulness meditation to become more aware of your thoughts and feelings and prepare your mind for sleep.",
      time: "1 question",
      questions: [
        {
          title:
            "What are some recurring thoughts or feelings that keep you awake at night?",
          placeholder: "e.g., racing thoughts, anxiety, stress",
          id: "recurringThoughtsFeelings",
          type: "text",
        },
      ],
      prompt: ({ userName, recurringThoughtsFeelings }) =>
        `Please write a meditation that guides ${userName} through a mindfulness meditation for sleep, focusing on avoiding their recurring thoughts and feelings: ${recurringThoughtsFeelings}.`,
    },
    {
      title: "Gratitude Meditation for Sleep",
      description:
        "Develop an attitude of gratitude to shift your focus from daily stressors to blessings, helping you relax and sleep better.",
      time: "1 question",
      questions: [
        {
          title: "What are three things you are grateful for?",
          placeholder: "e.g., family, friends, health",
          id: "gratefulItems",
          type: "text",
        },
      ],
      prompt: ({ userName, gratefulItems }) =>
        `Please write a meditation that guides ${userName} through a gratitude meditation for sleep, focusing on these three things: ${gratefulItems}.`,
    },
    {
      title: "Positive Affirmations for Sleep",
      description:
        "Use positive affirmations to change negative thought patterns and create a peaceful mindset for sleep.",
      time: "1 question",
      questions: [
        {
          title: "What negative thoughts or beliefs keep you awake at night?",
          placeholder:
            "e.g., I'm not good enough, I'm not smart enough, I'm not worthy",
          id: "negativeThoughtsBeliefs",
          type: "text",
        },
      ],
      prompt: ({ userName, negativeThoughtsBeliefs }) =>
        `Please write a meditation that guides ${userName} through a series of sleep affirmations to counter their negative thoughts and beliefs: ${negativeThoughtsBeliefs}.`,
    },
    {
      title: "Self-Compassion Meditation for Sleep",
      description:
        "Cultivate self-compassion to help you cope with stress and difficult emotions that may interfere with sleep.",
      time: "1 question",
      questions: [
        {
          title:
            "Describe a recent situation where you struggled with sleep due to stress or emotions.",
          placeholder:
            "e.g., a stressful workday, a fight with a friend, a family conflict",
          id: "sleepStruggleSituation",
          type: "text",
        },
      ],
      prompt: ({ userName, sleepStruggleSituation }) =>
        `Please write a meditation that guides ${userName} through a self-compassion meditation for sleep based on the situation they described: ${sleepStruggleSituation}.`,
    },
    {
      title: "Yoga Nidra for Sleep",
      description:
        "Experience deep relaxation through the practice of yoga nidra to help you transition into a restful sleep.",
      time: "1 question",
      questions: [
        {
          title:
            "What is your preferred relaxation position (e.g., lying down, seated)?",
          placeholder: "e.g., lying down, seated",
          id: "relaxationPosition",
          type: "text",
        },
      ],
      prompt: ({ userName, relaxationPosition }) =>
        `Please write a meditation that guides ${userName} through a yoga nidra practice for sleep, tailored to their preferred relaxation position: ${relaxationPosition}.`,
    },
  ],
  [StressManagement]: [
    {
      title: "Breathing Techniques for Stress Relief",
      description:
        "Learn various breathing techniques to help you manage stress effectively.",
      time: "2 question",
      questions: [
        {
          title: "What is your current stress level (1-10)?",
          placeholder: "e.g., 2, 5, 10",
          id: "stressLevel",
          type: "number",
        },
        {
          title: "What specific stressors are you dealing with right now?",
          placeholder: "e.g., work, family, finances",
          id: "specificStressors",
          type: "text",
        },
      ],
      prompt: ({ userName, stressLevel, specificStressors }) =>
        `Please write a breathing exercise to help ${userName} with their stress level of ${stressLevel} and stressors ${specificStressors}.`,
    },
    {
      title: "Progressive Muscle Relaxation",
      description:
        "Practice progressive muscle relaxation to release tension from your body.",
      time: "1 question",
      questions: [
        {
          title: "Which areas of your body hold the most tension?",
          placeholder: "e.g., shoulders, neck, back",
          id: "tensionAreas",
          type: "text",
        },
      ],
      prompt: ({ userName, tensionAreas }) =>
        `Please write a meditation that guides ${userName} through a progressive muscle relaxation exercise, focusing on the areas of tension: ${tensionAreas}.`,
    },
    {
      title: "Visualization for Stress Reduction",
      description:
        "Visualize calming scenes to help you reduce stress and find inner peace.",
      time: "1 question",
      questions: [
        {
          title: "Describe your ideal relaxing environment.",
          placeholder: "e.g., a beach, a forest, a mountain",
          id: "relaxingEnvironment",
          type: "text",
        },
      ],
      prompt: ({ userName, relaxingEnvironment }) =>
        `Please write a meditation that guides ${userName} through a visualization exercise of their ideal relaxing environment: ${relaxingEnvironment}.`,
    },
    {
      title: "Mindfulness Meditation for Stress",
      description:
        "Practice mindfulness meditation to become more aware of your thoughts and feelings and reduce stress.",
      time: "1 question",
      questions: [
        {
          title:
            "What are some recurring thoughts or feelings that contribute to your stress?",
          placeholder:
            "e.g., I'm not good enough, I'm not smart enough, I'm not worthy",
          id: "recurringThoughtsFeelings",
          type: "text",
        },
      ],
      prompt: ({ userName, recurringThoughtsFeelings }) =>
        `Please write a meditation that guides ${userName} through a mindfulness meditation focusing on their recurring thoughts and feelings: ${recurringThoughtsFeelings}.`,
    },
    {
      title: "Cultivating Gratitude",
      description:
        "Develop an attitude of gratitude to shift your focus from stressors to blessings.",
      time: "1 question",
      questions: [
        {
          title: "List three things you are grateful for right now.",
          placeholder: "e.g., my family, my friends, my health",
          id: "gratefulItems",
          type: "text",
        },
      ],
      prompt: ({ userName, gratefulItems }) =>
        `Please write a meditation that guides ${userName} through a gratitude meditation, focusing on these three things: ${gratefulItems}.`,
    },
    {
      title: "Affirmations for Stress Relief",
      description:
        "Use positive affirmations to change negative thought patterns and alleviate stress.",
      time: "1 question",
      questions: [
        {
          title: "What negative thoughts or beliefs contribute to your stress?",
          placeholder: "e.g., I'm not good enough, I'm not smart enough",
          id: "negativeThoughtsBeliefs",
          type: "text",
        },
      ],
      prompt: ({ userName, negativeThoughtsBeliefs }) =>
        `Please write a meditation that guides ${userName} through a series of affirmations to counter their negative thoughts and beliefs: ${negativeThoughtsBeliefs}.`,
    },
    {
      title: "Self-Compassion Meditation",
      description:
        "Cultivate self-compassion to help you cope with stress and difficult emotions.",
      time: "1 question",
      questions: [
        {
          title: "Describe a recent situation where you were hard on yourself.",
          placeholder: "e.g., I didn't get a promotion at work",
          id: "hardOnSelfSituation",
          type: "text",
        },
      ],
      prompt: ({ userName, hardOnSelfSituation }) =>
        `Please write a meditation that guides ${userName} through a self-compassion meditation based on the situation they described: ${hardOnSelfSituation}.`,
    },
    {
      title: "Stress-Reducing Yoga Nidra",
      description:
        "Experience deep relaxation through the practice of yoga nidra to alleviate stress.",
      time: "1 question",
      questions: [
        {
          title:
            "What is your preferred relaxation position (e.g., lying down, seated)?",
          placeholder: "e.g., lying down, seated",
          id: "preferred_position",
          type: "text",
        },
      ],
      prompt: ({ userName, preferredPosition }) =>
        `Please write a meditation that guides ${userName} through a stress-reducing yoga nidra practice in their preferred relaxation position: ${preferredPosition}.`,
    },
  ],
  [EmotionalWellBeing]: [
    {
      title: "Emotional Awareness",
      description:
        "Develop a deeper understanding of your emotions and learn to manage them effectively.",
      time: "1 question",
      questions: [
        {
          title:
            "What emotion do you want to better understand or manage today?",
          placeholder: "e.g., anger, sadness, fear, happiness, joy",
          id: "emotion",
          type: "text",
        },
      ],
      prompt: ({ emotion, userName }) =>
        `Please write a meditation on emotional awareness meditation to help ${userName} develop a deeper understanding and learn to manage their emotions, focusing on the emotion '${emotion}'.`,
    },
    {
      title: "Self-Compassion",
      description:
        "Cultivate self-compassion and learn to treat yourself with kindness.",
      time: "1 question",
      questions: [
        {
          title: "What aspect of yourself do you find difficult to accept?",
          placeholder: "e.g., my body, my emotions, my thoughts",
          id: "difficultAspect",
          type: "text",
        },
      ],
      prompt: ({ difficultAspect, userName }) =>
        `Please write a self-compassion meditation to help ${userName} cultivate self-compassion and learn to treat themselves with kindness, especially when thinking about the aspect '${difficultAspect}'.`,
    },
    {
      title: "Healing Emotional Pain",
      description: "Release emotional pain and find inner peace.",
      time: "1 question",
      questions: [
        {
          title:
            "What emotional pain or past experience would you like to heal?",
          placeholder: "e.g., a breakup, a loss, a trauma",
          id: "painExperience",
          type: "text",
        },
      ],
      prompt: ({ painExperience, userName }) =>
        `Please write a meditation on healing emotional pain meditation to help ${userName} release emotional pain and find inner peace, focusing on healing the pain or past experience related to '${painExperience}'.`,
    },
    {
      title: "Overcoming Anxiety",
      description: "Ease anxiety and embrace a calmer state of mind.",
      time: "1 question",
      questions: [
        {
          title:
            "What specific situation or area of your life causes you anxiety?",
          placeholder: "e.g., work, relationships, finances",
          id: "anxietyArea",
          type: "text",
        },
      ],
      prompt: ({ anxietyArea, userName }) =>
        `Please write a meditation on overcoming anxiety meditation to help ${userName} ease anxiety and embrace a calmer state of mind, focusing on the specific situation or area '${anxietyArea}'.`,
    },
    {
      title: "Coping with Stress",
      description:
        "Discover healthy ways to manage stress and cultivate inner resilience.",
      time: "1 question",
      questions: [
        {
          title: "What is a current source of stress in your life?",
          placeholder: "e.g., work, relationships, finances",
          id: "stressSource",
          type: "text",
        },
      ],
      prompt: ({ stressSource, userName }) =>
        `Please write a meditation on coping with stress meditation to help ${userName} discover healthy ways to manage stress and cultivate inner resilience, focusing on the current source of stress '${stressSource}'.`,
    },
    {
      title: "Dealing with Anger",
      description:
        "Transform anger into constructive energy and find inner balance.",
      time: "1 question",
      questions: [
        {
          title:
            "What is a situation that triggers anger or frustration for you?",
          placeholder: "e.g., a coworker, a family member, a traffic jam",
          id: "angerTrigger",
          type: "text",
        },
      ],
      prompt: ({ angerTrigger, userName }) =>
        `Please write a meditation dealing with anger meditation to help ${userName} transform anger into constructive energy and find inner balance, focusing on the situation '${angerTrigger}'.`,
    },
    {
      title: "Overcoming Sadness",
      description:
        "Learn to navigate sadness with mindfulness and find emotional balance.",
      time: "1 question",
      questions: [
        {
          title:
            "What is a recent event or situation that has caused you sadness?",
          placeholder: "e.g., a breakup, a loss, a trauma",
          id: "sadEvent",
          type: "text",
        },
      ],
      prompt: ({ sadEvent, userName }) =>
        `Please write a meditation overcoming sadness meditation to help ${userName} navigate sadness with mindfulness and find emotional balance, focusing on the recent event or situation '${sadEvent}'.`,
    },
    {
      title: "Building Emotional Resilience",
      description:
        "Strengthen your ability to cope with life's challenges and bounce back from adversity.",
      time: "1 question",
      questions: [
        {
          title: "What challenge or difficulty are you currently facing?",
          placeholder: "e.g., work, relationships, finances",
          id: "currentChallenge",
          type: "text",
        },
      ],
      prompt: ({ currentChallenge, userName }) =>
        `Please write a meditation on building emotional resilience meditation to help ${userName} strengthen their ability to cope with life's challenges and bounce back from adversity, focusing on the challenge or difficulty '${currentChallenge}'.`,
    },
  ],
  [MindfulLiving]: [
    {
      title: "Morning Intentions",
      description: "Start your day with a clear and focused mind.",
      time: "1 question",
      questions: [
        {
          title: "What is your main goal for today?",
          placeholder: "e.g., get a promotion, lose weight, be more productive",
          id: "goal",
          type: "text",
        },
      ],
      prompt: ({ goal, userName }) =>
        `Please write a morning intentions meditation, guiding ${userName} to start their day with a clear and focused mind, working towards their goal of '${goal}'.`,
    },
    {
      title: "Mindful Eating",
      description: "Experience the fullness and joy of eating mindfully.",
      time: "1 question",
      questions: [
        {
          title:
            "What is a meal you often eat and would like to enjoy mindfully?",
          placeholder: "e.g., breakfast, lunch, dinner",
          id: "meal",
          type: "text",
        },
      ],
      prompt: ({ meal, userName }) =>
        `Please write a mindful eating meditation to guide ${userName} in experiencing the fullness and joy of eating '${meal}' mindfully.`,
    },
    {
      title: "Mindful Communication",
      description:
        "Improve your listening and speaking skills through mindfulness.",
      time: "1 question",
      questions: [
        {
          title: "Who is someone you'd like to communicate better with?",
          placeholder: "e.g., a coworker, a family member, a friend",
          id: "person",
          type: "text",
        },
      ],
      prompt: ({ person, userName }) =>
        `Please write a mindful communication meditation to help ${userName} improve their listening and speaking skills, particularly when communicating with '${person}'.`,
    },
    {
      title: "Mindfulness at Work",
      description:
        "Bring mindfulness into your work life for increased productivity and wellbeing.",
      time: "1 question",
      questions: [
        {
          title: "What is your current profession or primary daily activity?",
          placeholder: "e.g., a teacher, a lawyer, a software engineer",
          id: "profession",
          type: "text",
        },
      ],
      prompt: ({ profession, userName }) =>
        `Please write a mindfulness at work meditation to help ${userName} integrate mindfulness into their daily activities at their '${profession}', improving productivity and wellbeing.`,
    },
    {
      title: "Mindful Movement Break",
      description: "Take a mindful break with simple movements and stretches.",
      time: "1 question",
      questions: [
        {
          title: "What type of movement or stretch do you find most relaxing?",
          placeholder: "e.g., yoga, tai chi, walking",
          id: "movement",
          type: "text",
        },
      ],
      prompt: ({ movement, userName }) =>
        `Please write a mindful movement break meditation, guiding ${userName} through simple movements and stretches, incorporating '${movement}' for relaxation.`,
    },
    {
      title: "Evening Reflection",
      description: "Reflect on your day and set intentions for the next day.",
      time: "1 question",
      questions: [
        {
          title: "What is one positive thing that happened today?",
          placeholder: "e.g., a promotion, a new friend, a compliment",
          id: "positiveThing",
          type: "text",
        },
      ],
      prompt: ({ positiveThing, userName }) =>
        `Please write a evening reflection meditation to help ${userName} reflect on their day, focusing on the positive aspects, such as '${positiveThing}', and setting intentions for the next day.`,
    },
    {
      title: "Mindful Sleep Preparation",
      description: "Prepare your mind and body for a restful night's sleep.",
      time: "1 question",
      questions: [
        {
          title: "What is a common thought that keeps you awake at night?",
          placeholder: "e.g., a worry, a fear, a regret",
          id: "thought",
          type: "text",
        },
      ],
      prompt: ({ thought, userName }) =>
        `Please write a mindful sleep preparation meditation to help ${userName} prepare their mind and body for a restful night's sleep, addressing the common thought '${thought}' that keeps them awake.`,
    },
    {
      title: "Mindful Break from Technology",
      description:
        "Recharge and refresh your mind by taking a break from technology.",
      time: "1 question",
      questions: [
        {
          title: "What is a technology you'd like to take a break from?",
          placeholder: "e.g., a phone, a computer, a television",
          id: "device",
          type: "text",
        },
      ],
      prompt: ({ device, userName }) =>
        `Please write a mindful break from technology meditation to help ${userName} recharge and refresh their mind by taking a break from '${device}'.`,
    },
    {
      title: "Cultivating Gratitude",
      description:
        "Develop a grateful mindset to appreciate the good things in life.",
      time: "1 question",
      questions: [
        {
          title: "Name something you're grateful for today.",
          placeholder: "e.g., a family member, a friend, a pet",
          id: "gratefulFor",
          type: "text",
        },
      ],
      prompt: ({ gratefulFor, userName }) =>
        `Please write a cultivating gratitude meditation to help ${userName} develop a grateful mindset, focusing on appreciating the good things in life, such as '${gratefulFor}'.`,
    },
    {
      title: "Mindful Presence in Nature",
      description:
        "Connect with the natural world and experience the benefits of being present.",
      time: "1 question",
      questions: [
        {
          title:
            "What is your favorite natural environment (e.g., forest, beach, mountain)?",
          placeholder: "e.g., a forest, a beach, a mountain",
          id: "environment",
          type: "text",
        },
      ],
      prompt: ({ environment, userName }) =>
        `Please write a mindful presence in nature meditation to help ${userName} connect with the natural world, guiding them to be present and experience the benefits of being in their favorite environment, the '${environment}'.`,
    },
  ],
  [PersonalGrowth]: [
    {
      title: "Setting Clear Goals",
      description:
        "A meditation to help you gain clarity on your goals and set achievable targets.",
      time: "2 questions",
      questions: [
        {
          title: "What is your main goal?",
          placeholder: "e.g., a career goal, a personal goal, a health goal",
          id: "mainGoal",
          type: "text",
        },
        {
          title: "What steps will you take to achieve it?",
          placeholder: "e.g., work on this project, talk to this person, etc.",
          id: "steps",
          type: "text",
        },
      ],
      prompt: ({ mainGoal, steps, userName }) =>
        `Please write a meditation to help ${userName} gain clarity on their goal '${mainGoal}' and plan the steps '${steps}' they will take to achieve it.`,
    },
    {
      title: "Overcoming Procrastination",
      description:
        "A meditation to help you identify and overcome procrastination habits.",
      time: "2 questions",
      questions: [
        {
          title: "What tasks or projects do you tend to procrastinate on?",
          placeholder: "e.g., a career goal, a personal goal, a health goal",
          id: "tasks",
          type: "text",
        },
        {
          title: "What are the reasons behind your procrastination?",
          placeholder: "e.g., a career goal, a personal goal, a health goal",
          id: "reasons",
          type: "text",
        },
      ],
      prompt: ({ tasks, reasons, userName }) =>
        `Please write a meditation to help ${userName} overcome procrastination on tasks '${tasks}' by addressing the reasons '${reasons}' behind their procrastination.`,
    },
    {
      title: "Cultivating Self-Discipline",
      description:
        "A meditation to support you in developing self-discipline and consistency.",
      time: "2 questions",
      questions: [
        {
          title:
            "What areas of your life do you need to improve self-discipline?",
          placeholder: "e.g., a career goal, a personal goal, a health goal",
          id: "areas",
          type: "text",
        },
        {
          title:
            "What is one habit you want to develop to enhance self-discipline?",
          placeholder: "e.g., a career goal, a personal goal, a health goal",
          id: "habit",
          type: "text",
        },
      ],
      prompt: ({ areas, habit, userName }) =>
        `Please write a meditation to help ${userName} improve self-discipline in '${areas}' by developing the habit '${habit}'.`,
    },
    {
      title: "Embracing Failure",
      description:
        "A meditation to help you reframe failure as an opportunity for growth and learning.",
      time: "2 questions",
      questions: [
        {
          title: "What recent failures have you experienced?",
          placeholder: "e.g., a career goal, a personal goal, a health goal",
          id: "failures",
          type: "text",
        },
        {
          title: "What lessons can you learn from these failures?",
          placeholder: "e.g., a career goal, a personal goal, a health goal",
          id: "lessons",
          type: "text",
        },
      ],
      prompt: ({ failures, lessons, userName }) =>
        `Please write a meditation to help ${userName} reframe recent failures '${failures}' as opportunities for growth by focusing on the lessons '${lessons}' they can learn.`,
    },
    {
      title: "Building Resilience",
      description:
        "A meditation to help you develop resilience in the face of challenges and setbacks.",
      time: "2 questions",
      questions: [
        {
          title: "What challenges are you currently facing?",
          placeholder: "e.g., a career goal, a personal goal, a health goal",
          id: "challenges",
          type: "text",
        },
        {
          title:
            "What strengths do you possess that can help you overcome these challenges?",
          placeholder: "e.g., focused, determined, creative",
          id: "strengths",
          type: "text",
        },
      ],
      prompt: ({ challenges, strengths, userName }) =>
        `Please write a meditation to help ${userName} develop resilience in the face of challenges '${challenges}' by tapping into their strengths '${strengths}'.`,
    },
    {
      title: "Creating a Vision",
      description:
        "A meditation to help you create a vision for your future and align your actions accordingly.",
      time: "2 questions",
      questions: [
        {
          title: "What does your ideal future look like?",
          placeholder: "e.g., think big",
          id: "idealFuture",
          type: "text",
        },
        {
          title: "What steps can you take to make your vision a reality?",
          placeholder: "e.g., think big",
          id: "steps",
          type: "text",
        },
      ],
      prompt: ({ idealFuture, steps, userName }) =>
        `Please write a meditation to help ${userName} create a vision for their ideal future '${idealFuture}' and align their actions with the steps '${steps}' to make it a reality.`,
    },
    {
      title: "Boosting Confidence",
      description:
        "A meditation to help you build self-confidence and embrace your unique qualities.",
      time: "2 questions",
      questions: [
        {
          title: "What are your strengths and unique qualities?",
          placeholder: "e.g., determined, creative, focused",
          id: "strengths",
          type: "text",
        },
        {
          title: "What situations make you feel less confident?",
          placeholder: "e.g., public speaking, job interviews, networking",
          id: "situations",
          type: "text",
        },
      ],
      prompt: ({ strengths, situations, userName }) =>
        `Please write a meditation to help ${userName} build self-confidence by embracing their strengths '${strengths}' and addressing the situations '${situations}' that make them feel less confident.`,
    },

    {
      title: "Developing a Growth Mindset",
      description:
        "A meditation to support you in cultivating a growth mindset and embracing continuous improvement.",
      time: "2 questions",
      questions: [
        {
          title:
            "What areas of your life do you feel you have a fixed mindset?",
          placeholder: "e.g., family, career, health",
          id: "areas",
          type: "text",
        },
        {
          title:
            "What are some strategies you can adopt to shift towards a growth mindset?",
          placeholder: "e.g., think outside of the box and embrace challenges",
          id: "strategies",
          type: "text",
        },
      ],
      prompt: ({ areas, strategies, userName }) =>
        `Please write a meditation to help ${userName} cultivate a growth mindset in the areas '${areas}' by adopting strategies '${strategies}' to embrace continuous improvement.`,
    },
    {
      title: "Staying Motivated",
      description:
        "A meditation to help you maintain motivation and stay focused on your goals.",
      time: "3 questions",
      questions: [
        {
          title: "What is your ultimate goal?",
          placeholder: "e.g., career, personal, health",
          id: "ultimateGoal",
          type: "text",
        },
        {
          title: "What is your motivation behind this goal?",
          placeholder: "e.g., financial freedom, personal growth, health",
          id: "motivation",
          type: "text",
        },
        {
          title:
            "What are some obstacles that you foresee in achieving this goal?",
          placeholder: "e.g., lack of time, lack of resources, lack of support",
          id: "obstacles",
          type: "text",
        },
      ],
      prompt: ({ ultimateGoal, motivation, obstacles, userName }) =>
        `Please write a meditation to help ${userName} stay motivated and focused on their ultimate goal '${ultimateGoal}' by connecting with their motivation '${motivation}' and addressing potential obstacles '${obstacles}'.`,
    },
    {
      title: "Embracing Change",
      description:
        "A meditation to help you become more adaptable and open to change in your personal and professional life.",
      time: "3 questions",
      questions: [
        {
          title: "What changes are you currently experiencing?",
          placeholder: "e.g., new job, new relationship, new city",
          id: "changes",
          type: "text",
        },
        {
          title: "What aspects of change do you find most challenging?",
          placeholder: "e.g., meeting new people, learning new skills, etc.",
          id: "challenges",
          type: "text",
        },
        {
          title: "How can you become more adaptable to change?",
          placeholder: "e.g., take risks, be open to new experiences, etc.",
          id: "strategies",
          type: "text",
        },
      ],
      prompt: ({ changes, challenges, strategies, userName }) =>
        `Please write a meditation to help ${userName} embrace changes '${changes}' they are experiencing by addressing the challenges '${challenges}' they face and helping them become more adaptable through strategies '${strategies}'.`,
    },
  ],
  [RelationshipCompassion]: [
    {
      title: "Cultivating Compassion",
      description:
        "A meditation to help you develop greater compassion for yourself and others.",
      time: "1 question",
      questions: [
        {
          title:
            "In what areas of your life would you like to be more compassionate?",
          placeholder: "e.g., family, career, health",
          id: "areas",
          type: "text",
        },
      ],
      prompt: ({ areas, userName }) =>
        `Please write a meditation to help ${userName} cultivate greater compassion in the area(s) '${areas}' of their life.`,
    },
    {
      title: "Deepening Connection",
      description:
        "A meditation to strengthen your emotional connection with a loved one.",
      time: "1 question",
      questions: [
        {
          title:
            "Who is the person you would like to deepen your connection with?",
          placeholder: "e.g., friend, family member, partner",
          id: "person",
          type: "text",
        },
        {
          title: "What are some qualities you appreciate about this person?",
          placeholder: "e.g., kind, caring, thoughtful",
          id: "qualities",
          type: "text",
        },
      ],
      prompt: ({ person, qualities, userName }) =>
        `Please write a meditation to help ${userName} deepen their emotional connection with '${person}', focusing on appreciating the qualities '${qualities}' they value in them.`,
    },
    {
      title: "Forgiveness and Letting Go",
      description:
        "A meditation to support you in the process of forgiving someone and releasing negative emotions.",
      time: "2 questions",
      questions: [
        {
          title: "Who would you like to forgive?",
          placeholder: "e.g., friend, family member, partner",
          id: "person",
          type: "text",
        },
        {
          title: "What emotions are you holding onto in this situation?",
          placeholder: "e.g., anger, resentment, sadness",
          id: "emotions",
          type: "text",
        },
      ],
      prompt: ({ person, emotions, userName }) =>
        `Please write a meditation to help ${userName} forgive '${person}' and release the emotions '${emotions}' they are holding onto.`,
    },
    {
      title: "Empathetic Listening",
      description:
        "A meditation to enhance your ability to listen empathetically and improve your relationships.",
      time: "1 question",
      questions: [
        {
          title:
            "In which relationships do you want to improve your empathetic listening skills?",
          placeholder: "e.g., friend, family member, partner",
          id: "relationships",
          type: "text",
        },
      ],
      prompt: ({ relationships, userName }) =>
        `Please write a meditation to help ${userName} develop empathetic listening skills in their relationships with '${relationships}'.`,
    },
    {
      title: "Self-Compassion",
      description:
        "A meditation to nurture self-compassion and treat yourself with kindness.",
      time: "1 question",
      questions: [
        {
          title:
            "In what areas of your life do you find it difficult to be compassionate with yourself?",
          placeholder: "e.g., career, personal life, health",
          id: "areas",
          type: "text",
        },
      ],
      prompt: ({ areas, userName }) =>
        `Please write a meditation to help ${userName} develop self-compassion in the area(s) '${areas}' of their life where they find it difficult to be kind to themselves.`,
    },
    {
      title: "Resolving Conflict",
      description:
        "A meditation to help you approach conflict resolution with a calm and open mindset.",
      time: "2 questions",
      questions: [
        {
          title:
            "What is a recent or ongoing conflict you would like to resolve?",
          placeholder: "e.g., friend, family member, partner",
          id: "conflict",
          type: "text",
        },
        {
          title: "What are the main issues involved in this conflict?",
          placeholder: "e.g., friend, family member, partner",
          id: "issues",
          type: "text",
        },
      ],
      prompt: ({ conflict, issues, userName }) =>
        `Please write a meditation to help ${userName} approach conflict resolution with '${conflict}' in a calm and open mindset, addressing the main issues '${issues}'.`,
    },
    {
      title: "Building Trust",
      description:
        "A meditation to support you in fostering trust in your relationships.",
      time: "1 question",
      questions: [
        {
          title: "In which relationship(s) do you want to build more trust?",
          placeholder: "e.g., friend, family member, partner",
          id: "relationships",
          type: "text",
        },
      ],
      prompt: ({ relationships, userName }) =>
        `Please write a meditation to help ${userName} foster trust in their relationship(s) with '${relationships}'.`,
    },
    {
      title: "Gratitude for Loved Ones",
      description:
        "A meditation to help you cultivate gratitude for the people in your life.",
      time: "1 question",
      questions: [
        {
          title: "Who are the people you feel grateful for in your life?",
          placeholder: "e.g., friend, family member, partner",
          id: "people",
          type: "text",
        },
      ],
      prompt: ({ people, userName }) =>
        `Please write a meditation to help ${userName} cultivate gratitude for the people '${people}' in their life.`,
    },
    {
      title: "Loving-Kindness for All",
      description:
        "A meditation to expand your heart and practice loving-kindness for all beings.",
      time: "1 question",
      questions: [
        {
          title:
            "What is a situation where you found it challenging to practice loving-kindness for others?",
          placeholder: "e.g., personal conflict, difficult situation, etc.",
          id: "situation",
          type: "text",
        },
      ],
      prompt: ({ situation, userName }) =>
        `Please write a loving-kindness meditation to help ${userName} expand their heart and practice loving-kindness for all beings, including in challenging situations such as '${situation}'.`,
    },
  ],
  [Beginner]: [
    {
      title: "Breath Awareness",
      description:
        "An introduction to meditation, focusing on breath awareness.",
      time: "1 question",
      questions: [
        {
          title: "What is your main goal for starting meditation?",
          placeholder: "e.g., reduce stress, improve sleep, etc.",
          id: "goal",
          type: "text",
        },
      ],
      prompt: ({ goal, userName }) =>
        `Please write a breath awareness meditation for ${userName} who is a beginner, helping the user achieve their goal of '${goal}'.`,
    },
    {
      title: "Body Scan",
      description: "Learn to observe sensations in the body without judgment.",
      time: "1 question",
      questions: [
        {
          title: "Which part of your body do you feel holds the most tension?",
          placeholder: "e.g., shoulders, back, etc.",
          id: "tensionArea",
          type: "text",
        },
      ],
      prompt: ({ tensionArea, userName }) =>
        `Please write a body scan meditation, guiding ${userName} to observe sensations in their body without judgment, and paying special attention to the area of tension in '${tensionArea}'.`,
    },
    {
      title: "Mindful Movement",
      description: "Integrate mindfulness into simple movements and stretches.",
      time: "1 question",
      questions: [
        {
          title: "Which type of movement or stretch do you enjoy the most?",
          placeholder: "e.g., yoga, tai chi, etc.",
          id: "movement",
          type: "text",
        },
      ],
      prompt: ({ movement, userName }) =>
        `Please write a mindful movement meditation guiding ${userName} that incorporates '${movement}' as a way for the user to integrate mindfulness into their daily activities.`,
    },
    {
      title: "Cultivating Gratitude",
      description:
        "A meditation to help you appreciate the good things in life.",
      time: "1 question",
      questions: [
        {
          title:
            "What is one thing in your life you are grateful for right now?",
          placeholder: "e.g., family, friends, health, etc.",
          id: "gratefulFor",
          type: "text",
        },
      ],
      prompt: ({ gratefulFor, userName }) =>
        `Please write a meditation for ${userName} to cultivate gratitude, guiding the user to appreciate the good things in their life, including '${gratefulFor}'.`,
    },
    {
      title: "Managing Stress",
      description: "A meditation to help you recognize and cope with stress.",
      time: "1 question",
      questions: [
        {
          title: "What is a common stressor in your life?",
          placeholder: "e.g., work, family, etc.",
          id: "stressor",
          type: "text",
        },
      ],
      prompt: ({ stressor, userName }) =>
        `Please write a meditation to help ${userName} recognize and cope with stress, particularly in relation to the stressor '${stressor}'.`,
    },
    {
      title: "Building Focus",
      description:
        "A meditation to improve concentration and reduce distractions.",
      time: "1 question",
      questions: [
        {
          title: "What is one area in your life where you struggle with focus?",
          placeholder: "e.g., work, school, etc.",
          id: "focusArea",
          type: "text",
        },
      ],
      prompt: ({ focusArea, userName }) =>
        `Please write a meditation to help ${userName} build focus and reduce distractions, specifically in the area of '${focusArea}'.`,
    },
    {
      title: "Developing Self-Compassion",
      description:
        "A meditation to cultivate self-compassion and self-kindness.",
      time: "1 question",
      questions: [
        {
          title:
            "What is a situation in which you find it difficult to be kind to yourself?",
          placeholder: "e.g., personal conflict, difficult situation, etc.",
          id: "situation",
          type: "text",
        },
      ],
      prompt: ({ situation, userName }) =>
        `Please write a meditation to help ${userName} develop self-compassion and self-kindness, particularly in challenging situations such as '${situation}'.`,
    },
  ],
};
