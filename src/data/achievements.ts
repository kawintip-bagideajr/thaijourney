export interface AchievementDef {
  slug: string;
  title: string;
  description: string;
  icon: string;
  category: "streak" | "xp" | "lessons" | "provinces" | "social" | "special";
  condition: { type: string; value: number };
  xp_reward: number;
}

export const ACHIEVEMENTS: AchievementDef[] = [
  // Streak
  { slug: "streak_3", title: "On a Roll", description: "Maintain a 3-day streak", icon: "🔥", category: "streak", condition: { type: "streak_days", value: 3 }, xp_reward: 20 },
  { slug: "streak_7", title: "Week Warrior", description: "Maintain a 7-day streak", icon: "🔥", category: "streak", condition: { type: "streak_days", value: 7 }, xp_reward: 50 },
  { slug: "streak_30", title: "Month Master", description: "Maintain a 30-day streak", icon: "🏆", category: "streak", condition: { type: "streak_days", value: 30 }, xp_reward: 200 },
  { slug: "streak_100", title: "Century Streak", description: "Maintain a 100-day streak", icon: "💎", category: "streak", condition: { type: "streak_days", value: 100 }, xp_reward: 500 },
  { slug: "streak_365", title: "Year of Thai", description: "Maintain a 365-day streak", icon: "🌟", category: "streak", condition: { type: "streak_days", value: 365 }, xp_reward: 2000 },

  // XP milestones
  { slug: "xp_100", title: "First Steps", description: "Earn 100 XP", icon: "⭐", category: "xp", condition: { type: "total_xp", value: 100 }, xp_reward: 10 },
  { slug: "xp_500", title: "Rising Star", description: "Earn 500 XP", icon: "🌠", category: "xp", condition: { type: "total_xp", value: 500 }, xp_reward: 25 },
  { slug: "xp_1000", title: "XP Champion", description: "Earn 1,000 XP", icon: "🏅", category: "xp", condition: { type: "total_xp", value: 1000 }, xp_reward: 50 },
  { slug: "xp_5000", title: "XP Legend", description: "Earn 5,000 XP", icon: "🥇", category: "xp", condition: { type: "total_xp", value: 5000 }, xp_reward: 200 },

  // Lessons completed
  { slug: "lessons_1", title: "First Lesson", description: "Complete your first lesson", icon: "📚", category: "lessons", condition: { type: "lessons_completed", value: 1 }, xp_reward: 15 },
  { slug: "lessons_10", title: "Dedicated Learner", description: "Complete 10 lessons", icon: "📖", category: "lessons", condition: { type: "lessons_completed", value: 10 }, xp_reward: 30 },
  { slug: "lessons_50", title: "Thai Scholar", description: "Complete 50 lessons", icon: "🎓", category: "lessons", condition: { type: "lessons_completed", value: 50 }, xp_reward: 100 },
  { slug: "lessons_100", title: "Thai Master", description: "Complete 100 lessons", icon: "👨‍🏫", category: "lessons", condition: { type: "lessons_completed", value: 100 }, xp_reward: 300 },

  // Province unlocks
  { slug: "province_1", title: "Bangkok Explorer", description: "Start your journey in Bangkok", icon: "🏙️", category: "provinces", condition: { type: "provinces_unlocked", value: 1 }, xp_reward: 20 },
  { slug: "province_3", title: "Adventurer", description: "Unlock 3 provinces", icon: "🗺️", category: "provinces", condition: { type: "provinces_unlocked", value: 3 }, xp_reward: 75 },
  { slug: "province_5", title: "Traveller", description: "Unlock 5 provinces", icon: "✈️", category: "provinces", condition: { type: "provinces_unlocked", value: 5 }, xp_reward: 150 },
  { slug: "province_10", title: "Thailand Expert", description: "Unlock 10 provinces", icon: "🌏", category: "provinces", condition: { type: "provinces_unlocked", value: 10 }, xp_reward: 500 },

  // Special
  { slug: "perfect_lesson", title: "Perfect Score", description: "Complete a lesson without any mistakes", icon: "💯", category: "special", condition: { type: "perfect_lessons", value: 1 }, xp_reward: 30 },
  { slug: "early_bird", title: "Early Bird", description: "Study before 8am", icon: "🐦", category: "special", condition: { type: "early_study", value: 1 }, xp_reward: 20 },
  { slug: "night_owl", title: "Night Owl", description: "Study after 10pm", icon: "🦉", category: "special", condition: { type: "late_study", value: 1 }, xp_reward: 20 },
];
