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
    {
      title: "How long would you like for this meditation to be?",
      id: "time",
      options: times,
    },
  ],
  title: "Personalized Meditation",
  type: "personalized",
  color: "#5588BB",
  prompt: ({ goal, challenge, feel, technique, time }) =>
    `Please create a ${time.duration}-minute (approximately ${time.words} words, not including SSML tags) personalized meditation based on the user's goal of '${goal}', addressing their specific challenges or concerns related to '${challenge}', leaving them feeling '${feel}'. Incorporate the meditation techniques they prefer, such as '${technique}'. Make sure the meditation script is around ${time.words} words in length.`,
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
        id: "users_focus_area",
        type: "text",
      },
      {
        title: "How would you like to feel after this mindfulness meditation?",
        placeholder: "e.g., calm, focused, recharged, energized, balanced, joy",
        id: "users_desired_feeling",
        type: "text",
      },
    ],
    prompt: ({ users_focus_area, users_desired_feeling }) =>
      `Please write a 5-minute (approximately 450 words, not including SSML tags) mindfulness meditation that helps the user to focus on '${users_focus_area}' and leaves them feeling '${users_desired_feeling}'. Make sure the meditation script is around 450 words in length.`,
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
        id: "users_goal",
      },
      {
        title:
          "What environment or setting helps you feel the most relaxed or at peace?",
        placeholder: "e.g., beach, forest, mountain",
        type: "text",
        id: "users_environment",
      },
      {
        title: "Which emotions would you like to evoke during this meditation?",
        placeholder: "e.g., calmness, joy, gratitude",
        type: "text",
        id: "users_emotions",
      },
    ],
    prompt: ({ users_goal, users_environment, users_emotions }) =>
      `Please write a 5-minute (approximately 450 words, not including SSML tags) visualization meditation that guides the user through imagining a '${users_environment}' and evokes the feelings of '${users_emotions}'. The meditation should focus on the goal of '${users_goal}'. Make sure the meditation script is around 450 words in length.`,
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
        id: "users_mantra",
        type: "text",
      },
      {
        title: "How do you want to feel after completing this meditation?",
        placeholder: "e.g., relaxed, focused, energized",
        id: "users_desired_feeling",
        type: "text",
      },
    ],
    prompt: ({ users_mantra, users_desired_feeling }) =>
      `Please write a 5-minute (approximately 450 words, not including SSML tags) mantra meditation using the chosen mantra '${users_mantra}' and focusing on evoking the feeling of '${users_desired_feeling}'. Make sure the meditation script is around 450 words in length.`,
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
        id: "users_movement",
        type: "text",
      },
      {
        title: "How do you want to feel after completing this meditation?",
        placeholder: "e.g., relaxed, balanced, energized",
        id: "users_desired_feeling",
        type: "text",
      },
    ],
    prompt: ({ users_movement, users_desired_feeling }) =>
      `Please write a 5-minute (approximately 450 words, not including SSML tags) movement meditation focusing on '${users_movement}' to evoke the feeling of '${users_desired_feeling}' in the user. Make sure the meditation script is around 450 words in length.`,
  },
];

const SleepEnhancement = "sleep-enhancement";
const StressManagement = "stress-management";
const EmotionalWellBeing = "emotional-well-being";
const MindfulLiving = "mindful-living";
const PersonalGrowth = "personal-growth";
const RelationshipCompassion = "relationship-compassion";
const Beginner = "beginner-meditation";

export const coursesPt1 = [
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
  {
    id: MindfulLiving,
    title: "Mindful Living for You",
    description:
      "Discover a customized program that helps you integrate mindfulness into your everyday life, improving focus, productivity, and overall well-being. This course provides personalized mindfulness exercises, techniques for mindful communication, and tips for cultivating mindful habits that suit your lifestyle.",
    color: "#4C7F9E",
    time: "10 meditations",
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
  [SleepEnhancement]: [
    {
      title: "Breathing Techniques for Sleep",
      description:
        "Learn various breathing techniques to help you relax and fall asleep more easily.",
      time: "15 minutes",
      questions: [
        {
          title:
            "What specific thoughts or feelings prevent you from falling asleep easily?",
          placeholder: "e.g., racing thoughts, anxiety, stress",
          id: "sleep_obstacles",
          type: "text",
        },
      ],
      prompt: ({ user_name, sleep_obstacles }) =>
        `Please write a 15-minute (approximately 600 words, not including SSML tags) guided breathing exercises to help ${user_name} fall asleep, considering their thoughts or feelings on ${sleep_obstacles}.`,
    },
    {
      title: "Progressive Muscle Relaxation for Sleep",
      description:
        "Practice progressive muscle relaxation to release tension from your body and prepare for sleep.",
      time: "15 minutes",
      questions: [
        {
          title:
            "Which areas of your body hold the most tension before bedtime?",
          placeholder: "e.g., shoulders, jaw, legs",
          id: "tension_areas",
          type: "text",
        },
      ],
      prompt: ({ user_name, tension_areas }) =>
        `Please write a 15-minute (approximately 600 words, not including SSML tags) that guides ${user_name} through a progressive muscle relaxation exercise for sleep, focusing on the areas of tension: ${tension_areas}.`,
    },
    {
      title: "Sleep Visualization",
      description:
        "Visualize calming scenes to help you transition into a peaceful and restful sleep.",
      time: "15 minutes",
      questions: [
        {
          title: "Describe your ideal relaxing environment for sleep.",
          placeholder: "e.g., a quiet bedroom, a cabin, a beach house",
          id: "relaxing_environment",
          type: "text",
        },
      ],
      prompt: ({ user_name, relaxing_environment }) =>
        `Please write a 15-minute (approximately 600 words, not including SSML tags) that guides ${user_name} through a sleep visualization exercise of their ideal relaxing environment: ${relaxing_environment}.`,
    },
    {
      title: "Mindfulness Meditation for Sleep",
      description:
        "Practice mindfulness meditation to become more aware of your thoughts and feelings and prepare your mind for sleep.",
      time: "20 minutes",
      questions: [
        {
          title:
            "What are some recurring thoughts or feelings that keep you awake at night?",
          placeholder: "e.g., racing thoughts, anxiety, stress",
          id: "recurring_thoughts_feelings",
          type: "text",
        },
      ],
      prompt: ({ user_name, recurring_thoughts_feelings }) =>
        `Please write a 20-minute (approximately 600 words, not including SSML tags) that guides ${user_name} through a mindfulness meditation for sleep, focusing on their recurring thoughts and feelings: ${recurring_thoughts_feelings}.`,
    },
    {
      title: "Gratitude Meditation for Sleep",
      description:
        "Develop an attitude of gratitude to shift your focus from daily stressors to blessings, helping you relax and sleep better.",
      time: "15 minutes",
      questions: [
        {
          title: "What are three things you are grateful for?",
          placeholder: "e.g., family, friends, health",
          id: "grateful_items",
          type: "text",
        },
      ],
      prompt: ({ user_name, grateful_items }) =>
        `Please write a 15-minute (approximately 600 words, not including SSML tags) that guides ${user_name} through a gratitude meditation for sleep, focusing on these three things: ${grateful_items}.`,
    },
    {
      title: "Positive Affirmations for Sleep",
      description:
        "Use positive affirmations to change negative thought patterns and create a peaceful mindset for sleep.",
      time: "10 minutes",
      questions: [
        {
          title: "What negative thoughts or beliefs keep you awake at night?",
          placeholder:
            "e.g., I'm not good enough, I'm not smart enough, I'm not worthy",
          id: "negative_thoughts_beliefs",
          type: "text",
        },
      ],
      prompt: ({ user_name, negative_thoughts_beliefs }) =>
        `Please write a 10-minute (approximately 500 words, not including SSML tags) that guides ${user_name} through a series of sleep affirmations to counter their negative thoughts and beliefs: ${negative_thoughts_beliefs}.`,
    },
    {
      title: "Self-Compassion Meditation for Sleep",
      description:
        "Cultivate self-compassion to help you cope with stress and difficult emotions that may interfere with sleep.",
      time: "15 minutes",
      questions: [
        {
          title:
            "Describe a recent situation where you struggled with sleep due to stress or emotions.",
          placeholder:
            "e.g., a stressful workday, a fight with a friend, a family conflict",
          id: "sleep_struggle_situation",
          type: "text",
        },
      ],
      prompt: ({ user_name, sleep_struggle_situation }) =>
        `Please write a 15-minute (approximately 650 words, not including SSML tags) that guides ${user_name} through a self-compassion meditation for sleep based on the situation they described: ${sleep_struggle_situation}.`,
    },
    {
      title: "Yoga Nidra for Sleep",
      description:
        "Experience deep relaxation through the practice of yoga nidra to help you transition into a restful sleep.",
      time: "30 minutes",
      questions: [
        {
          title:
            "What is your preferred relaxation position (e.g., lying down, seated)?",
          placeholder: "e.g., lying down, seated",
          id: "relaxation_position",
          type: "text",
        },
      ],
      prompt: ({ user_name, relaxation_position }) =>
        `Please write a 30-minute (approximately 900 words, not including SSML tags) that guides ${user_name} through a yoga nidra practice for sleep, tailored to their preferred relaxation position: ${relaxation_position}.`,
    },
  ],
  [StressManagement]: [
    {
      title: "Breathing Techniques for Stress Relief",
      description:
        "Learn various breathing techniques to help you manage stress effectively.",
      time: "15 minutes",
      questions: [
        {
          title: "What is your current stress level (1-10)?",
          placeholder: "e.g., 2, 5, 10",
          id: "stress_level",
          type: "number",
        },
        {
          title: "What specific stressors are you dealing with right now?",
          placeholder: "e.g., work, family, finances",
          id: "specific_stressors",
          type: "text",
        },
      ],
      prompt: ({ user_name, stress_level, specific_stressors }) =>
        `Please write a 15-minute (approximately 650 words, not including SSML tags) breathing exercise to help ${user_name} with their stress level of ${stress_level} and stressors ${specific_stressors}.`,
    },
    {
      title: "Progressive Muscle Relaxation",
      description:
        "Practice progressive muscle relaxation to release tension from your body.",
      time: "15 minutes",
      questions: [
        {
          title: "Which areas of your body hold the most tension?",
          placeholder: "e.g., shoulders, neck, back",
          id: "tension_areas",
          type: "text",
        },
      ],
      prompt: ({ user_name, tension_areas }) =>
        `Please write a 15-minute (approximately 650 words, not including SSML tags) that guides ${user_name} through a progressive muscle relaxation exercise, focusing on the areas of tension: ${tension_areas}.`,
    },
    {
      title: "Visualization for Stress Reduction",
      description:
        "Visualize calming scenes to help you reduce stress and find inner peace.",
      time: "15 minutes",
      questions: [
        {
          title: "Describe your ideal relaxing environment.",
          placeholder: "e.g., a beach, a forest, a mountain",
          id: "relaxing_environment",
          type: "text",
        },
      ],
      prompt: ({ user_name, relaxing_environment }) =>
        `Please write a 15-minute (approximately 650 words, not including SSML tags) that guides ${user_name} through a visualization exercise of their ideal relaxing environment: ${relaxing_environment}.`,
    },
    {
      title: "Mindfulness Meditation for Stress",
      description:
        "Practice mindfulness meditation to become more aware of your thoughts and feelings and reduce stress.",
      time: "15 minutes",
      questions: [
        {
          title:
            "What are some recurring thoughts or feelings that contribute to your stress?",
          placeholder:
            "e.g., I'm not good enough, I'm not smart enough, I'm not worthy",
          id: "recurring_thoughts_feelings",
          type: "text",
        },
      ],
      prompt: ({ user_name, recurring_thoughts_feelings }) =>
        `Please write a 15-minute (approximately 650 words, not including SSML tags) that guides ${user_name} through a mindfulness meditation focusing on their recurring thoughts and feelings: ${recurring_thoughts_feelings}.`,
    },
    {
      title: "Cultivating Gratitude",
      description:
        "Develop an attitude of gratitude to shift your focus from stressors to blessings.",
      time: "15 minutes",
      questions: [
        {
          title: "List three things you are grateful for right now.",
          placeholder: "e.g., my family, my friends, my health",
          id: "grateful_items",
          type: "text",
        },
      ],
      prompt: ({ user_name, grateful_items }) =>
        `Please write a 15-minute (approximately 650 words, not including SSML tags) that guides ${user_name} through a gratitude meditation, focusing on these three things: ${grateful_items}.`,
    },
    {
      title: "Affirmations for Stress Relief",
      description:
        "Use positive affirmations to change negative thought patterns and alleviate stress.",
      time: "10 minutes",
      questions: [
        {
          title: "What negative thoughts or beliefs contribute to your stress?",
          placeholder: "e.g., I'm not good enough, I'm not smart enough",
          id: "negative_thoughts_beliefs",
          type: "text",
        },
      ],
      prompt: ({ user_name, negative_thoughts_beliefs }) =>
        `Please write a 10-minute (approximately 500 words, not including SSML tags) that guides ${user_name} through a series of affirmations to counter their negative thoughts and beliefs: ${negative_thoughts_beliefs}.`,
    },
    {
      title: "Self-Compassion Meditation",
      description:
        "Cultivate self-compassion to help you cope with stress and difficult emotions.",
      time: "15 minutes",
      questions: [
        {
          title: "Describe a recent situation where you were hard on yourself.",
          placeholder: "e.g., I didn't get a promotion at work",
          id: "hard_on_self_situation",
          type: "text",
        },
      ],
      prompt: ({ user_name, hard_on_self_situation }) =>
        `Please write a 15-minute (approximately 650 words, not including SSML tags) that guides ${user_name} through a self-compassion meditation based on the situation they described: ${hard_on_self_situation}.`,
    },
    {
      title: "Stress-Reducing Yoga Nidra",
      description:
        "Experience deep relaxation through the practice of yoga nidra to alleviate stress.",
      time: "30 minutes",
      questions: [
        {
          title:
            "What is your preferred relaxation position (e.g., lying down, seated)?",
          placeholder: "e.g., lying down, seated",
          id: "preferred_position",
          type: "text",
        },
      ],
      prompt: ({ user_name, preferred_position }) =>
        `Please write a 15-minute (approximately 650 words, not including SSML tags, and 60 second breaks) that guides ${user_name} through a stress-reducing yoga nidra practice in their preferred relaxation position: ${preferred_position}.`,
    },
  ],
  [EmotionalWellBeing]: [
    {
      title: "Emotional Awareness",
      description:
        "Develop a deeper understanding of your emotions and learn to manage them effectively.",
      time: "10 minutes",
      questions: [
        {
          title:
            "What emotion do you want to better understand or manage today?",
          placeholder: "e.g., anger, sadness, fear, happiness, joy",
          id: "emotion",
          type: "text",
        },
      ],
      prompt: ({ emotion }) =>
        `Please write a 10-minute (approximately 500 words, not including SSML tags) emotional awareness meditation to help the user develop a deeper understanding and learn to manage their emotions, focusing on the emotion '${emotion}'.`,
    },
    {
      title: "Self-Compassion",
      description:
        "Cultivate self-compassion and learn to treat yourself with kindness.",
      time: "12 minutes",
      questions: [
        {
          title: "What aspect of yourself do you find difficult to accept?",
          placeholder: "e.g., my body, my emotions, my thoughts",
          id: "difficult_aspect",
          type: "text",
        },
      ],
      prompt: ({ difficult_aspect }) =>
        `Please write a 12-minute (approximately 550 words, not including SSML tags) self-compassion meditation to help the user cultivate self-compassion and learn to treat themselves with kindness, especially when thinking about the aspect '${difficult_aspect}'.`,
    },
    {
      title: "Healing Emotional Pain",
      description: "Release emotional pain and find inner peace.",
      time: "15 minutes",
      questions: [
        {
          title:
            "What emotional pain or past experience would you like to heal?",
          placeholder: "e.g., a breakup, a loss, a trauma",
          id: "pain_experience",
          type: "text",
        },
      ],
      prompt: ({ pain_experience }) =>
        `Please write a 15-minute (approximately 650 words, not including SSML tags) on healing emotional pain meditation to help the user release emotional pain and find inner peace, focusing on healing the pain or past experience related to '${pain_experience}'.`,
    },
    {
      title: "Overcoming Anxiety",
      description: "Ease anxiety and embrace a calmer state of mind.",
      time: "10 minutes",
      questions: [
        {
          title:
            "What specific situation or area of your life causes you anxiety?",
          placeholder: "e.g., work, relationships, finances",
          id: "anxiety_area",
          type: "text",
        },
      ],
      prompt: ({ anxiety_area }) =>
        `Please write a 10-minute (approximately 550 words, not including SSML tags) on overcoming anxiety meditation to help the user ease anxiety and embrace a calmer state of mind, focusing on the specific situation or area '${anxiety_area}'.`,
    },
    {
      title: "Coping with Stress",
      description:
        "Discover healthy ways to manage stress and cultivate inner resilience.",
      time: "12 minutes",
      questions: [
        {
          title: "What is a current source of stress in your life?",
          placeholder: "e.g., work, relationships, finances",
          id: "stress_source",
          type: "text",
        },
      ],
      prompt: ({ stress_source }) =>
        `Please write a 12-minute (approximately 600 words, not including SSML tags) on coping with stress meditation to help the user discover healthy ways to manage stress and cultivate inner resilience, focusing on the current source of stress '${stress_source}'.`,
    },
    {
      title: "Dealing with Anger",
      description:
        "Transform anger into constructive energy and find inner balance.",
      time: "10 minutes",
      questions: [
        {
          title:
            "What is a situation that triggers anger or frustration for you?",
          placeholder: "e.g., a coworker, a family member, a traffic jam",
          id: "anger_trigger",
          type: "text",
        },
      ],
      prompt: ({ anger_trigger }) =>
        `Please write a 10-minute (approximately 500 words, not including SSML tags) dealing with anger meditation to help the user transform anger into constructive energy and find inner balance, focusing on the situation '${anger_trigger}'.`,
    },
    {
      title: "Overcoming Sadness",
      description:
        "Learn to navigate sadness with mindfulness and find emotional balance.",
      time: "15 minutes",
      questions: [
        {
          title:
            "What is a recent event or situation that has caused you sadness?",
          placeholder: "e.g., a breakup, a loss, a trauma",
          id: "sad_event",
          type: "text",
        },
      ],
      prompt: ({ sad_event }) =>
        `Please write a 15-minute (approximately 650 words, not including SSML tags) overcoming sadness meditation to help the user navigate sadness with mindfulness and find emotional balance, focusing on the recent event or situation '${sad_event}'.`,
    },
    {
      title: "Building Emotional Resilience",
      description:
        "Strengthen your ability to cope with life's challenges and bounce back from adversity.",
      time: "12 minutes",
      questions: [
        {
          title: "What challenge or difficulty are you currently facing?",
          placeholder: "e.g., work, relationships, finances",
          id: "current_challenge",
          type: "text",
        },
      ],
      prompt: ({ current_challenge }) =>
        `Please write a 12-minute (approximately 500 words, not including SSML tags) on building emotional resilience meditation to help the user strengthen their ability to cope with life's challenges and bounce back from adversity, focusing on the challenge or difficulty '${current_challenge}'.`,
    },
  ],
  [MindfulLiving]: [
    {
      title: "Morning Intentions",
      description: "Start your day with a clear and focused mind.",
      time: "10 minutes",
      questions: [
        {
          title: "What is your main goal for today?",
          placeholder: "e.g., get a promotion, lose weight, be more productive",
          id: "goal",
          type: "text",
        },
      ],
      prompt: ({ goal }) =>
        `Please write a 10-minute (approximately 500 words, not including SSML tags) morning intentions meditation, guiding the user to start their day with a clear and focused mind, working towards their goal of '${goal}'.`,
    },
    {
      title: "Mindful Eating",
      description: "Experience the fullness and joy of eating mindfully.",
      time: "15 minutes",
      questions: [
        {
          title:
            "What is a meal you often eat and would like to enjoy mindfully?",
          placeholder: "e.g., breakfast, lunch, dinner",
          id: "meal",
          type: "text",
        },
      ],
      prompt: ({ meal }) =>
        `Please write a 15-minute (approximately 650 words, not including SSML tags) mindful eating meditation to guide the user in experiencing the fullness and joy of eating '${meal}' mindfully.`,
    },
    {
      title: "Mindful Communication",
      description:
        "Improve your listening and speaking skills through mindfulness.",
      time: "12 minutes",
      questions: [
        {
          title: "Who is someone you'd like to communicate better with?",
          placeholder: "e.g., a coworker, a family member, a friend",
          id: "person",
          type: "text",
        },
      ],
      prompt: ({ person }) =>
        `Please write a 12-minute (approximately 600 words, not including SSML tags) mindful communication meditation to help the user improve their listening and speaking skills, particularly when communicating with '${person}'.`,
    },
    {
      title: "Mindfulness at Work",
      description:
        "Bring mindfulness into your work life for increased productivity and wellbeing.",
      time: "15 minutes",
      questions: [
        {
          title: "What is your current profession or primary daily activity?",
          placeholder: "e.g., a teacher, a lawyer, a software engineer",
          id: "profession",
          type: "text",
        },
      ],
      prompt: ({ profession }) =>
        `Please write a 15-minute (approximately 650 words, not including SSML tags) mindfulness at work meditation to help the user integrate mindfulness into their daily activities at their '${profession}', improving productivity and wellbeing.`,
    },
    {
      title: "Mindful Movement Break",
      description: "Take a mindful break with simple movements and stretches.",
      time: "10 minutes",
      questions: [
        {
          title: "What type of movement or stretch do you find most relaxing?",
          placeholder: "e.g., yoga, tai chi, walking",
          id: "movement",
          type: "text",
        },
      ],
      prompt: ({ movement }) =>
        `Please write a 10-minute (approximately 500 words, not including SSML tags) mindful movement break meditation, guiding the user through simple movements and stretches, incorporating '${movement}' for relaxation.`,
    },
    {
      title: "Evening Reflection",
      description: "Reflect on your day and set intentions for the next day.",
      time: "12 minutes",
      questions: [
        {
          title: "What is one positive thing that happened today?",
          placeholder: "e.g., a promotion, a new friend, a compliment",
          id: "positive_thing",
          type: "text",
        },
      ],
      prompt: ({ positive_thing }) =>
        `Please write a 12-minute (approximately 550 words, not including SSML tags) evening reflection meditation to help the user reflect on their day, focusing on the positive aspects, such as '${positive_thing}', and setting intentions for the next day.`,
    },
    {
      title: "Mindful Sleep Preparation",
      description: "Prepare your mind and body for a restful night's sleep.",
      time: "15 minutes",
      questions: [
        {
          title: "What is a common thought that keeps you awake at night?",
          placeholder: "e.g., a worry, a fear, a regret",
          id: "thought",
          type: "text",
        },
      ],
      prompt: ({ thought }) =>
        `Please write a 15-minute (approximately 650 words, not including SSML tags) mindful sleep preparation meditation to help the user prepare their mind and body for a restful night's sleep, addressing the common thought '${thought}' that keeps them awake.`,
    },
    {
      title: "Mindful Break from Technology",
      description:
        "Recharge and refresh your mind by taking a break from technology.",
      time: "10 minutes",
      questions: [
        {
          title: "What is a technology you'd like to take a break from?",
          placeholder: "e.g., a phone, a computer, a television",
          id: "device",
          type: "text",
        },
      ],
      prompt: ({ device }) =>
        `Please write a 10-minute (approximately 500 words, not including SSML tags) mindful break from technology meditation to help the user recharge and refresh their mind by taking a break from '${device}'.`,
    },
    {
      title: "Cultivating Gratitude",
      description:
        "Develop a grateful mindset to appreciate the good things in life.",
      time: "12 minutes",
      questions: [
        {
          title: "Name something you're grateful for today.",
          placeholder: "e.g., a family member, a friend, a pet",
          id: "grateful_for",
          type: "text",
        },
      ],
      prompt: ({ grateful_for }) =>
        `Please write a 12-minute (approximately 600 words, not including SSML tags) cultivating gratitude meditation to help the user develop a grateful mindset, focusing on appreciating the good things in life, such as '${grateful_for}'.`,
    },
    {
      title: "Mindful Presence in Nature",
      description:
        "Connect with the natural world and experience the benefits of being present.",
      time: "15 minutes",
      questions: [
        {
          title:
            "What is your favorite natural environment (e.g., forest, beach, mountain)?",
          placeholder: "e.g., a forest, a beach, a mountain",
          id: "environment",
          type: "text",
        },
      ],
      prompt: ({ environment }) =>
        `Please write a 15-minute (approximately 650 words, not including SSML tags) mindful presence in nature meditation to help the user connect with the natural world, guiding them to be present and experience the benefits of being in their favorite environment, the '${environment}'.`,
    },
  ],
  [PersonalGrowth]: [
    {
      title: "Setting Clear Goals",
      description:
        "A meditation to help you gain clarity on your goals and set achievable targets.",
      time: "12 minutes",
      questions: [
        {
          title: "What is your main goal?",
          placeholder: "e.g., a career goal, a personal goal, a health goal",
          id: "main_goal",
          type: "text",
        },
        {
          title: "What steps will you take to achieve it?",
          placeholder: "e.g., work on this project, talk to this person, etc.",
          id: "steps",
          type: "text",
        },
      ],
      prompt: ({ main_goal, steps }) =>
        `Please write a 12-minute (approximately 650 words, not including SSML tags) to help the user gain clarity on their goal '${main_goal}' and plan the steps '${steps}' they will take to achieve it.`,
    },
    {
      title: "Overcoming Procrastination",
      description:
        "A meditation to help you identify and overcome procrastination habits.",
      time: "10 minutes",
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
      prompt: ({ tasks, reasons }) =>
        `Please write a 10-minute (approximately 500 words, not including SSML tags) to help the user overcome procrastination on tasks '${tasks}' by addressing the reasons '${reasons}' behind their procrastination.`,
    },
    {
      title: "Cultivating Self-Discipline",
      description:
        "A meditation to support you in developing self-discipline and consistency.",
      time: "10 minutes",
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
      prompt: ({ areas, habit }) =>
        `Please write a 10-minute (approximately 500 words, not including SSML tags) to help the user improve self-discipline in '${areas}' by developing the habit '${habit}'.`,
    },
    {
      title: "Embracing Failure",
      description:
        "A meditation to help you reframe failure as an opportunity for growth and learning.",
      time: "12 minutes",
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
      prompt: ({ failures, lessons }) =>
        `Please write a 12-minute (approximately 600 words, not including SSML tags) meditation to help the user reframe recent failures '${failures}' as opportunities for growth by focusing on the lessons '${lessons}' they can learn.`,
    },
    {
      title: "Building Resilience",
      description:
        "A meditation to help you develop resilience in the face of challenges and setbacks.",
      time: "15 minutes",
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
      prompt: ({ challenges, strengths }) =>
        `Please write a 15-minute (approximately 650 words, not including SSML tags) meditation to help the user develop resilience in the face of challenges '${challenges}' by tapping into their strengths '${strengths}'.`,
    },
    {
      title: "Creating a Vision",
      description:
        "A meditation to help you create a vision for your future and align your actions accordingly.",
      time: "15 minutes",
      questions: [
        {
          title: "What does your ideal future look like?",
          placeholder: "e.g., think big",
          id: "ideal_future",
          type: "text",
        },
        {
          title: "What steps can you take to make your vision a reality?",
          placeholder: "e.g., think big",
          id: "steps",
          type: "text",
        },
      ],
      prompt: ({ ideal_future, steps }) =>
        `Please write a 15-minute (approximately 650 words, not including SSML tags) meditation to help the user create a vision for their ideal future '${ideal_future}' and align their actions with the steps '${steps}' to make it a reality.`,
    },
    {
      title: "Boosting Confidence",
      description:
        "A meditation to help you build self-confidence and embrace your unique qualities.",
      time: "10 minutes",
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
      prompt: ({ strengths, situations }) =>
        `Please write a 10-minute (approximately 500 words, not including SSML tags) meditation to help the user build self-confidence by embracing their strengths '${strengths}' and addressing the situations '${situations}' that make them feel less confident.`,
    },

    {
      title: "Developing a Growth Mindset",
      description:
        "A meditation to support you in cultivating a growth mindset and embracing continuous improvement.",
      time: "12 minutes",
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
      prompt: ({ areas, strategies }) =>
        `Please write a 12-minute (approximately 650 words, not including SSML tags) meditation to help the user cultivate a growth mindset in the areas '${areas}' by adopting strategies '${strategies}' to embrace continuous improvement.`,
    },
    {
      title: "Staying Motivated",
      description:
        "A meditation to help you maintain motivation and stay focused on your goals.",
      time: "12 minutes",
      questions: [
        {
          title: "What is your ultimate goal?",
          placeholder: "e.g., career, personal, health",
          id: "ultimate_goal",
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
      prompt: ({ ultimate_goal, motivation, obstacles }) =>
        `Please write a 12-minute (approximately 650 words, not including SSML tags) meditation to help the user stay motivated and focused on their ultimate goal '${ultimate_goal}' by connecting with their motivation '${motivation}' and addressing potential obstacles '${obstacles}'.`,
    },
    {
      title: "Embracing Change",
      description:
        "A meditation to help you become more adaptable and open to change in your personal and professional life.",
      time: "15 minutes",
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
      prompt: ({ changes, challenges, strategies }) =>
        `Please write a 15-minute (approximately 650 words, not including SSML tags) meditation to help the user embrace changes '${changes}' they are experiencing by addressing the challenges '${challenges}' they face and helping them become more adaptable through strategies '${strategies}'.`,
    },
  ],
  [RelationshipCompassion]: [
    {
      title: "Cultivating Compassion",
      description:
        "A meditation to help you develop greater compassion for yourself and others.",
      time: "10 minutes",
      questions: [
        {
          title:
            "In what areas of your life would you like to be more compassionate?",
          placeholder: "e.g., family, career, health",
          id: "areas",
          type: "text",
        },
      ],
      prompt: ({ areas }) =>
        `Please write a 10-minute (approximately 600 words, not including SSML tags) meditation to help the user cultivate greater compassion in the area(s) '${areas}' of their life.`,
    },
    {
      title: "Deepening Connection",
      description:
        "A meditation to strengthen your emotional connection with a loved one.",
      time: "12 minutes",
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
      prompt: ({ person, qualities }) =>
        `Please write a 15-minute (approximately 650 words, not including SSML tags) meditation to help the user deepen their emotional connection with '${person}', focusing on appreciating the qualities '${qualities}' they value in them.`,
    },
    {
      title: "Forgiveness and Letting Go",
      description:
        "A meditation to support you in the process of forgiving someone and releasing negative emotions.",
      time: "15 minutes",
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
      prompt: ({ person, emotions }) =>
        `Please write a 15-minute (approximately 650 words, not including SSML tags) meditation to help the user forgive '${person}' and release the emotions '${emotions}' they are holding onto.`,
    },
    {
      title: "Empathetic Listening",
      description:
        "A meditation to enhance your ability to listen empathetically and improve your relationships.",
      time: "10 minutes",
      questions: [
        {
          title:
            "In which relationships do you want to improve your empathetic listening skills?",
          placeholder: "e.g., friend, family member, partner",
          id: "relationships",
          type: "text",
        },
      ],
      prompt: ({ relationships }) =>
        `Please write a 10-minute (approximately 600 words, not including SSML tags) meditation to help the user develop empathetic listening skills in their relationships with '${relationships}'.`,
    },
    {
      title: "Self-Compassion",
      description:
        "A meditation to nurture self-compassion and treat yourself with kindness.",
      time: "10 minutes",
      questions: [
        {
          title:
            "In what areas of your life do you find it difficult to be compassionate with yourself?",
          placeholder: "e.g., career, personal life, health",
          id: "areas",
          type: "text",
        },
      ],
      prompt: ({ areas }) =>
        `Please write a 10-minute (approximately 600 words, not including SSML tags) meditation to help the user develop self-compassion in the area(s) '${areas}' of their life where they find it difficult to be kind to themselves.`,
    },
    {
      title: "Resolving Conflict",
      description:
        "A meditation to help you approach conflict resolution with a calm and open mindset.",
      time: "12 minutes",
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
      prompt: ({ conflict, issues }) =>
        `Please write a 12-minute (approximately 650 words, not including SSML tags) meditation to help the user approach conflict resolution with '${conflict}' in a calm and open mindset, addressing the main issues '${issues}'.`,
    },
    {
      title: "Building Trust",
      description:
        "A meditation to support you in fostering trust in your relationships.",
      time: "10 minutes",
      questions: [
        {
          title: "In which relationship(s) do you want to build more trust?",
          placeholder: "e.g., friend, family member, partner",
          id: "relationships",
          type: "text",
        },
      ],
      prompt: ({ relationships }) =>
        `Please write a 10-minute (approximately 600 words, not including SSML tags) meditation to help the user foster trust in their relationship(s) with '${relationships}'.`,
    },
    {
      title: "Gratitude for Loved Ones",
      description:
        "A meditation to help you cultivate gratitude for the people in your life.",
      time: "10 minutes",
      questions: [
        {
          title: "Who are the people you feel grateful for in your life?",
          placeholder: "e.g., friend, family member, partner",
          id: "people",
          type: "text",
        },
      ],
      prompt: ({ people }) =>
        `Please write a 10-minute (approximately 600 words, not including SSML tags) meditation to help the user cultivate gratitude for the people '${people}' in their life.`,
    },
    {
      title: "Loving-Kindness for All",
      description:
        "A meditation to expand your heart and practice loving-kindness for all beings.",
      time: "15 minutes",
      questions: [
        {
          title:
            "What is a situation where you found it challenging to practice loving-kindness for others?",
          placeholder: "e.g., personal conflict, difficult situation, etc.",
          id: "situation",
          type: "text",
        },
      ],
      prompt: ({ situation }) =>
        `Please write a 15-minute (approximately 650 words, not including SSML tags) loving-kindness meditation to help the user expand their heart and practice loving-kindness for all beings, including in challenging situations such as '${situation}'.`,
    },
  ],
  [Beginner]: [
    {
      title: "Breath Awareness",
      description:
        "An introduction to meditation, focusing on breath awareness.",
      time: "10 minutes",
      questions: [
        {
          title: "What is your main goal for starting meditation?",
          placeholder: "e.g., reduce stress, improve sleep, etc.",
          id: "goal",
          type: "text",
        },
      ],
      prompt: ({ goal }) =>
        `Please write a 10-minute (approximately 600 words, not including SSML tags) breath awareness meditation for beginners, helping the user achieve their goal of '${goal}'.`,
    },
    {
      title: "Body Scan",
      description: "Learn to observe sensations in the body without judgment.",
      time: "12 minutes",
      questions: [
        {
          title: "Which part of your body do you feel holds the most tension?",
          placeholder: "e.g., shoulders, back, etc.",
          id: "tension_area",
          type: "text",
        },
      ],
      prompt: ({ tension_area }) =>
        `Please write a 12-minute (approximately 650 words, not including SSML tags) body scan meditation, guiding the user to observe sensations in their body without judgment, and paying special attention to the area of tension in '${tension_area}'.`,
    },
    {
      title: "Mindful Movement",
      description: "Integrate mindfulness into simple movements and stretches.",
      time: "15 minutes",
      questions: [
        {
          title: "Which type of movement or stretch do you enjoy the most?",
          placeholder: "e.g., yoga, tai chi, etc.",
          id: "movement",
          type: "text",
        },
      ],
      prompt: ({ movement }) =>
        `Please write a 15-minute (approximately 650 words, not including SSML tags) mindful movement meditation incorporating '${movement}' as a way for the user to integrate mindfulness into their daily activities.`,
    },
    {
      title: "Cultivating Gratitude",
      description:
        "A meditation to help you appreciate the good things in life.",
      time: "10 minutes",
      questions: [
        {
          title:
            "What is one thing in your life you are grateful for right now?",
          placeholder: "e.g., family, friends, health, etc.",
          id: "grateful_for",
          type: "text",
        },
      ],
      prompt: ({ grateful_for }) =>
        `Please write a 10-minute (approximately 600 words, not including SSML tags) meditation to cultivate gratitude, guiding the user to appreciate the good things in their life, including '${grateful_for}'.`,
    },
    {
      title: "Managing Stress",
      description: "A meditation to help you recognize and cope with stress.",
      time: "12 minutes",
      questions: [
        {
          title: "What is a common stressor in your life?",
          placeholder: "e.g., work, family, etc.",
          id: "stressor",
          type: "text",
        },
      ],
      prompt: ({ stressor }) =>
        `Please write a 12-minute (approximately 650 words, not including SSML tags) meditation to help the user recognize and cope with stress, particularly in relation to the stressor '${stressor}'.`,
    },
    {
      title: "Building Focus",
      description:
        "A meditation to improve concentration and reduce distractions.",
      time: "15 minutes",
      questions: [
        {
          title: "What is one area in your life where you struggle with focus?",
          placeholder: "e.g., work, school, etc.",
          id: "focus_area",
          type: "text",
        },
      ],
      prompt: ({ focus_area }) =>
        `Please write a 15-minute (approximately 650 words, not including SSML tags) meditation to help the user build focus and reduce distractions, specifically in the area of '${focus_area}'.`,
    },
    {
      title: "Developing Self-Compassion",
      description:
        "A meditation to cultivate self-compassion and self-kindness.",
      time: "10 minutes",
      questions: [
        {
          title:
            "What is a situation in which you find it difficult to be kind to yourself?",
          placeholder: "e.g., personal conflict, difficult situation, etc.",
          id: "situation",
          type: "text",
        },
      ],
      prompt: ({ situation }) =>
        `Please write a 10-minute (approximately 600 words, not including SSML tags) meditation to help the user develop self-compassion and self-kindness, particularly in challenging situations such as '${situation}'.`,
    },
  ],
};
