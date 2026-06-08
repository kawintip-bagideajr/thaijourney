-- =============================================
-- ThaiJourney: paste this entire file into
-- Supabase SQL Editor → New query → Run
-- =============================================

CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TABLE provinces (
  id TEXT PRIMARY KEY,
  name_en TEXT NOT NULL,
  name_th TEXT NOT NULL,
  region TEXT NOT NULL,
  description TEXT,
  key_phrase TEXT,
  key_phrase_translation TEXT,
  image_url TEXT,
  map_x FLOAT,
  map_y FLOAT,
  unlock_xp INTEGER DEFAULT 0,
  order_index INTEGER NOT NULL,
  emoji TEXT,
  color TEXT
);

CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  username TEXT UNIQUE NOT NULL,
  display_name TEXT,
  avatar_url TEXT,
  bio TEXT,
  country TEXT,
  learning_goal TEXT CHECK (learning_goal IN ('travel','work','study','fluency')),
  daily_goal_minutes INTEGER DEFAULT 10,
  level INTEGER DEFAULT 1,
  total_xp INTEGER DEFAULT 0,
  current_streak INTEGER DEFAULT 0,
  longest_streak INTEGER DEFAULT 0,
  hearts INTEGER DEFAULT 5,
  hearts_updated_at TIMESTAMPTZ DEFAULT NOW(),
  role TEXT DEFAULT 'user' CHECK (role IN ('user','admin','moderator')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER AS $$
BEGIN
  INSERT INTO profiles (id, username, display_name)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'username', split_part(NEW.email, '@', 1)),
    COALESCE(NEW.raw_user_meta_data->>'display_name', split_part(NEW.email, '@', 1))
  );
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

CREATE TABLE modules (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  track TEXT NOT NULL CHECK (track IN ('beginner','intermediate','advanced')),
  order_index INTEGER NOT NULL,
  icon TEXT,
  color TEXT,
  province_id TEXT REFERENCES provinces(id),
  required_xp INTEGER DEFAULT 0,
  is_published BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE lessons (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  module_id UUID NOT NULL REFERENCES modules(id) ON DELETE CASCADE,
  slug TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  lesson_type TEXT NOT NULL CHECK (lesson_type IN ('vocabulary','grammar','culture','listening','speaking')),
  order_index INTEGER NOT NULL,
  xp_reward INTEGER DEFAULT 10,
  is_published BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(module_id, slug)
);

CREATE TABLE exercises (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  lesson_id UUID NOT NULL REFERENCES lessons(id) ON DELETE CASCADE,
  exercise_type TEXT NOT NULL CHECK (exercise_type IN ('multiple_choice','drag_drop','match_pairs','fill_blank','listening','pronunciation')),
  order_index INTEGER NOT NULL,
  question JSONB NOT NULL,
  correct_answer JSONB NOT NULL,
  options JSONB,
  audio_url TEXT,
  image_url TEXT,
  explanation TEXT,
  difficulty INTEGER DEFAULT 1 CHECK (difficulty BETWEEN 1 AND 5)
);

CREATE TABLE vocabulary (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  thai TEXT NOT NULL,
  romanization TEXT NOT NULL,
  english TEXT NOT NULL,
  audio_url TEXT,
  image_url TEXT,
  example_sentence_th TEXT,
  example_sentence_en TEXT,
  cultural_note TEXT,
  category TEXT NOT NULL,
  difficulty INTEGER DEFAULT 1
);

CREATE TABLE user_lesson_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  lesson_id UUID NOT NULL REFERENCES lessons(id) ON DELETE CASCADE,
  status TEXT DEFAULT 'not_started' CHECK (status IN ('not_started','in_progress','completed','mastered')),
  score INTEGER DEFAULT 0,
  attempts INTEGER DEFAULT 0,
  completed_at TIMESTAMPTZ,
  UNIQUE(user_id, lesson_id)
);

CREATE TABLE user_provinces (
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  province_id TEXT REFERENCES provinces(id) ON DELETE CASCADE,
  unlocked_at TIMESTAMPTZ DEFAULT NOW(),
  completion_pct INTEGER DEFAULT 0,
  PRIMARY KEY (user_id, province_id)
);

CREATE TABLE xp_transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  amount INTEGER NOT NULL,
  reason TEXT NOT NULL,
  metadata JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE achievements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  icon TEXT NOT NULL,
  category TEXT NOT NULL,
  condition JSONB NOT NULL,
  xp_reward INTEGER DEFAULT 0
);

CREATE TABLE user_achievements (
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  achievement_id UUID REFERENCES achievements(id) ON DELETE CASCADE,
  earned_at TIMESTAMPTZ DEFAULT NOW(),
  PRIMARY KEY (user_id, achievement_id)
);

CREATE TABLE daily_activity (
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  activity_date DATE NOT NULL,
  xp_earned INTEGER DEFAULT 0,
  lessons_completed INTEGER DEFAULT 0,
  minutes_studied INTEGER DEFAULT 0,
  PRIMARY KEY (user_id, activity_date)
);

CREATE TABLE chat_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  role TEXT NOT NULL CHECK (role IN ('user','assistant')),
  content TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_lesson_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_provinces ENABLE ROW LEVEL SECURITY;
ALTER TABLE xp_transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE daily_activity ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE modules ENABLE ROW LEVEL SECURITY;
ALTER TABLE lessons ENABLE ROW LEVEL SECURITY;

CREATE POLICY "profiles_select" ON profiles FOR SELECT USING (true);
CREATE POLICY "profiles_update_own" ON profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "modules_select" ON modules FOR SELECT TO authenticated USING (is_published = true);
CREATE POLICY "lessons_select" ON lessons FOR SELECT TO authenticated USING (is_published = true);
CREATE POLICY "own_progress" ON user_lesson_progress USING (auth.uid() = user_id);
CREATE POLICY "own_provinces" ON user_provinces USING (auth.uid() = user_id);
CREATE POLICY "own_xp" ON xp_transactions FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "own_achievements" ON user_achievements USING (auth.uid() = user_id);
CREATE POLICY "own_activity" ON daily_activity USING (auth.uid() = user_id);
CREATE POLICY "own_chat" ON chat_messages USING (auth.uid() = user_id);

CREATE INDEX idx_profiles_username ON profiles(username);
CREATE INDEX idx_user_progress_user ON user_lesson_progress(user_id);
CREATE INDEX idx_xp_transactions_user ON xp_transactions(user_id, created_at DESC);
CREATE INDEX idx_daily_activity_user_date ON daily_activity(user_id, activity_date DESC);
CREATE INDEX idx_chat_messages_user ON chat_messages(user_id, created_at DESC);
