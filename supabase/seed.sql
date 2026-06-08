-- =============================================
-- ThaiJourney Seed Data
-- =============================================

-- Insert provinces
INSERT INTO provinces (id, name_en, name_th, region, description, key_phrase, key_phrase_translation, unlock_xp, order_index, map_x, map_y, emoji, color)
VALUES
  ('bangkok', 'Bangkok', 'กรุงเทพมหานคร', 'Central', 'The vibrant capital city — start your Thai journey here', 'สวัสดีครับ/ค่ะ', 'Hello (polite)', 0, 1, 50, 68, '🏙️', '#F59E0B'),
  ('chiang_mai', 'Chiang Mai', 'เชียงใหม่', 'North', 'The Rose of the North — temples, mountains, and night markets', 'กินข้าวแล้วหรือยัง', 'Have you eaten yet?', 100, 2, 28, 22, '🌸', '#8B5CF6'),
  ('phuket', 'Phuket', 'ภูเก็ต', 'South', 'Paradise island with stunning beaches and vibrant nightlife', 'ทะเลสวยมาก', 'The sea is very beautiful', 250, 3, 22, 88, '🏖️', '#0EA5E9'),
  ('ayutthaya', 'Ayutthaya', 'พระนครศรีอยุธยา', 'Central', 'Ancient capital with UNESCO World Heritage temples', 'ประวัติศาสตร์ไทย', 'Thai history', 150, 5, 46, 59, '🛕', '#D97706'),
  ('krabi', 'Krabi', 'กระบี่', 'South', 'Dramatic limestone cliffs and emerald waters', 'ล่องเรือไหม', 'Want to go on a boat?', 350, 6, 25, 84, '🌊', '#06B6D4');

-- Insert achievements
INSERT INTO achievements (slug, title, description, icon, category, condition, xp_reward)
VALUES
  ('streak_3', 'On a Roll', 'Maintain a 3-day streak', '🔥', 'streak', '{"type":"streak_days","value":3}', 20),
  ('streak_7', 'Week Warrior', 'Maintain a 7-day streak', '🔥', 'streak', '{"type":"streak_days","value":7}', 50),
  ('streak_30', 'Month Master', 'Maintain a 30-day streak', '🏆', 'streak', '{"type":"streak_days","value":30}', 200),
  ('xp_100', 'First Steps', 'Earn 100 XP', '⭐', 'xp', '{"type":"total_xp","value":100}', 10),
  ('xp_500', 'Rising Star', 'Earn 500 XP', '🌠', 'xp', '{"type":"total_xp","value":500}', 25),
  ('lessons_1', 'First Lesson', 'Complete your first lesson', '📚', 'lessons', '{"type":"lessons_completed","value":1}', 15),
  ('lessons_10', 'Dedicated Learner', 'Complete 10 lessons', '📖', 'lessons', '{"type":"lessons_completed","value":10}', 30),
  ('province_1', 'Bangkok Explorer', 'Start your journey in Bangkok', '🏙️', 'provinces', '{"type":"provinces_unlocked","value":1}', 20),
  ('perfect_lesson', 'Perfect Score', 'Complete a lesson without any mistakes', '💯', 'special', '{"type":"perfect_lessons","value":1}', 30);

-- Insert beginner module
INSERT INTO modules (id, slug, title, description, track, order_index, icon, color, required_xp, is_published)
VALUES
  (gen_random_uuid(), 'greetings', 'Greetings & Politeness', 'Learn to say hello and be polite', 'beginner', 1, '👋', '#F59E0B', 0, true),
  (gen_random_uuid(), 'numbers', 'Numbers & Counting', 'Thai numerals from 1 to 1,000', 'beginner', 2, '🔢', '#3B82F6', 50, true),
  (gen_random_uuid(), 'food', 'Food & Restaurants', 'Order food and eat like a local', 'beginner', 3, '🍜', '#EF4444', 100, true);
