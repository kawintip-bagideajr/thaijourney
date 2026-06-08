export type UserRole = "user" | "admin" | "moderator";
export type LearningGoal = "travel" | "work" | "study" | "fluency";
export type Track = "beginner" | "intermediate" | "advanced";
export type LessonType = "vocabulary" | "grammar" | "culture" | "listening" | "speaking";
export type ExerciseType =
  | "multiple_choice"
  | "drag_drop"
  | "match_pairs"
  | "fill_blank"
  | "listening"
  | "pronunciation";
export type LessonStatus = "not_started" | "in_progress" | "completed" | "mastered";
export type ChatRole = "user" | "assistant";

export interface Profile {
  id: string;
  username: string;
  display_name: string | null;
  avatar_url: string | null;
  bio: string | null;
  country: string | null;
  learning_goal: LearningGoal | null;
  daily_goal_minutes: number;
  level: number;
  total_xp: number;
  current_streak: number;
  longest_streak: number;
  hearts: number;
  hearts_updated_at: string;
  role: UserRole;
  created_at: string;
  updated_at: string;
}

export interface Province {
  id: string;
  name_en: string;
  name_th: string;
  region: string;
  description: string | null;
  key_phrase: string | null;
  key_phrase_translation: string | null;
  image_url: string | null;
  map_x: number | null;
  map_y: number | null;
  unlock_xp: number;
  order_index: number;
}

export interface Module {
  id: string;
  slug: string;
  title: string;
  description: string | null;
  track: Track;
  order_index: number;
  icon: string | null;
  color: string | null;
  province_id: string | null;
  required_xp: number;
  is_published: boolean;
  created_at: string;
}

export interface Lesson {
  id: string;
  module_id: string;
  slug: string;
  title: string;
  description: string | null;
  lesson_type: LessonType;
  order_index: number;
  xp_reward: number;
  is_published: boolean;
  created_at: string;
}

export interface Exercise {
  id: string;
  lesson_id: string;
  exercise_type: ExerciseType;
  order_index: number;
  question: ExerciseQuestion;
  correct_answer: unknown;
  options: unknown | null;
  audio_url: string | null;
  image_url: string | null;
  explanation: string | null;
  difficulty: number;
}

export interface ExerciseQuestion {
  text: string;
  thai?: string;
  romanization?: string;
  translation?: string;
  instruction?: string;
}

export interface VocabularyItem {
  id: string;
  thai: string;
  romanization: string;
  english: string;
  audio_url: string | null;
  image_url: string | null;
  example_sentence_th: string | null;
  example_sentence_en: string | null;
  cultural_note: string | null;
  category: string;
  difficulty: number;
}

export interface UserLessonProgress {
  id: string;
  user_id: string;
  lesson_id: string;
  status: LessonStatus;
  score: number;
  attempts: number;
  completed_at: string | null;
}

export interface UserProvince {
  user_id: string;
  province_id: string;
  unlocked_at: string;
  completion_pct: number;
}

export interface XPTransaction {
  id: string;
  user_id: string;
  amount: number;
  reason: string;
  metadata: Record<string, unknown> | null;
  created_at: string;
}

export interface Achievement {
  id: string;
  slug: string;
  title: string;
  description: string;
  icon: string;
  category: string;
  condition: AchievementCondition;
  xp_reward: number;
}

export interface AchievementCondition {
  type: string;
  value: number;
}

export interface UserAchievement {
  user_id: string;
  achievement_id: string;
  earned_at: string;
  achievement?: Achievement;
}

export interface DailyActivity {
  user_id: string;
  activity_date: string;
  xp_earned: number;
  lessons_completed: number;
  minutes_studied: number;
}

export interface ChatMessage {
  id: string;
  user_id: string;
  role: ChatRole;
  content: string;
  created_at: string;
}
