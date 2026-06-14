"use client";
import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Camera, Edit3, Loader2, Upload } from "lucide-react";
import { useAuthStore } from "@/store/authStore";
import { LevelBadge } from "@/components/gamification/LevelBadge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { xpProgressInLevel, formatNumber, cn } from "@/lib/utils";
import { ProgressBar } from "@/components/shared/ProgressBar";
import { Badge } from "@/components/ui/badge";
import { ACHIEVEMENTS } from "@/data/achievements";
import { db } from "@/lib/firebase/client";
import { doc, updateDoc } from "firebase/firestore";
import type { LearningGoal } from "@/types/database";

const GOALS = [
  { value: "travel", label: "🌏 Travel" },
  { value: "work", label: "💼 Work" },
  { value: "study", label: "📚 Study" },
  { value: "fluency", label: "🎯 Full Fluency" },
] as const;

const AVATAR_PRESETS = ["🐻", "🦊", "🐼", "🐱", "🦁", "🐯", "🐬", "🦋", "🌸", "🐲", "🦝", "🎭"];

const BG_PRESETS = [
  { id: "thai", label: "Thai Gold", from: "#F59E0B", to: "#EF4444" },
  { id: "ocean", label: "Ocean", from: "#3B82F6", to: "#06B6D4" },
  { id: "purple", label: "Purple", from: "#8B5CF6", to: "#EC4899" },
  { id: "forest", label: "Forest", from: "#10B981", to: "#14B8A6" },
  { id: "sunset", label: "Sunset", from: "#F59E0B", to: "#EF4444" },
  { id: "midnight", label: "Midnight", from: "#6366F1", to: "#8B5CF6" },
  { id: "rose", label: "Rose", from: "#F43F5E", to: "#EC4899" },
  { id: "jade", label: "Jade", from: "#14B8A6", to: "#22C55E" },
];

function getBgStyle(bgId: string | null | undefined): React.CSSProperties {
  const preset = BG_PRESETS.find((b) => b.id === bgId) ?? BG_PRESETS[0];
  return { background: `linear-gradient(135deg, ${preset.from}, ${preset.to})` };
}

function isEmojiAvatar(val: string | null | undefined): boolean {
  if (!val) return false;
  return val.length <= 8 && !val.startsWith("http") && !val.startsWith("data:");
}

async function compressImage(file: File, maxPx = 128): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(file);
    img.onload = () => {
      const scale = Math.min(maxPx / img.width, maxPx / img.height, 1);
      const canvas = document.createElement("canvas");
      canvas.width = Math.round(img.width * scale);
      canvas.height = Math.round(img.height * scale);
      const ctx = canvas.getContext("2d");
      if (!ctx) { reject(new Error("canvas")); return; }
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      resolve(canvas.toDataURL("image/jpeg", 0.75));
      URL.revokeObjectURL(url);
    };
    img.onerror = reject;
    img.src = url;
  });
}

export default function ProfilePage() {
  const profile = useAuthStore((s) => s.profile);
  const setProfile = useAuthStore((s) => s.setProfile);
  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [uploadingPhoto, setUploadingPhoto] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [editForm, setEditForm] = useState({
    display_name: "",
    bio: "",
    country: "",
    learning_goal: "" as string,
    daily_goal_minutes: 10,
    avatar_url: "" as string,
    profile_bg: "thai" as string,
  });

  if (!profile) return null;
  const { current, needed, pct } = xpProgressInLevel(profile.total_xp);
  const displayedAchievements = ACHIEVEMENTS.slice(0, 6);

  const startEditing = () => {
    setEditForm({
      display_name: profile.display_name ?? "",
      bio: profile.bio ?? "",
      country: profile.country ?? "",
      learning_goal: profile.learning_goal ?? "",
      daily_goal_minutes: profile.daily_goal_minutes ?? 10,
      avatar_url: profile.avatar_url ?? "",
      profile_bg: profile.profile_bg ?? "thai",
    });
    setIsEditing(true);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const updated = {
        display_name: editForm.display_name || null,
        bio: editForm.bio || null,
        country: editForm.country || null,
        learning_goal: (editForm.learning_goal || null) as LearningGoal | null,
        daily_goal_minutes: Number(editForm.daily_goal_minutes),
        avatar_url: editForm.avatar_url || null,
        profile_bg: editForm.profile_bg || "thai",
        updated_at: new Date().toISOString(),
      };
      await updateDoc(doc(db, "users", profile.id), updated);
      setProfile({ ...profile, ...updated });
      setIsEditing(false);
    } catch (e) {
      console.error("Failed to save profile:", e);
    } finally {
      setSaving(false);
    }
  };

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingPhoto(true);
    try {
      const dataUrl = await compressImage(file, 128);
      setEditForm((f) => ({ ...f, avatar_url: dataUrl }));
    } catch {
      // ignore
    } finally {
      setUploadingPhoto(false);
    }
  };

  const avatarDisplay = isEditing ? editForm.avatar_url : profile.avatar_url;
  const bgStyle = isEditing ? getBgStyle(editForm.profile_bg) : getBgStyle(profile.profile_bg);

  return (
    <div className="max-w-2xl mx-auto px-4 py-6 space-y-6">
      {/* Profile card */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden"
      >
        {/* Cover */}
        <div className="h-32 relative transition-all duration-300" style={bgStyle}>
          {isEditing && (
            <div className="absolute inset-0 flex items-center justify-center">
              <p className="text-white/80 text-xs font-semibold">Choose background below</p>
            </div>
          )}
        </div>

        {/* Avatar + info */}
        <div className="px-6 pb-6 -mt-10">
          <div className="flex items-end justify-between mb-4">
            <div className="relative">
              <div className="w-20 h-20 rounded-2xl border-4 border-white flex items-center justify-center shadow-lg overflow-hidden"
                style={isEmojiAvatar(avatarDisplay) || !avatarDisplay ? bgStyle : {}}>
                {avatarDisplay ? (
                  isEmojiAvatar(avatarDisplay) ? (
                    <span className="text-3xl">{avatarDisplay}</span>
                  ) : (
                    <img src={avatarDisplay} alt="avatar" className="w-full h-full object-cover" />
                  )
                ) : (
                  <span className="text-3xl font-black text-white">
                    {(profile.display_name ?? profile.username)[0].toUpperCase()}
                  </span>
                )}
              </div>
              <div className="absolute -bottom-1 -right-1">
                <LevelBadge level={profile.level} size="sm" />
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={isEditing ? () => setIsEditing(false) : startEditing}
              className="gap-2"
            >
              <Edit3 size={14} />
              {isEditing ? "Cancel" : "Edit Profile"}
            </Button>
          </div>

          {!isEditing ? (
            <>
              <h1 className="text-2xl font-black text-gray-900">{profile.display_name ?? profile.username}</h1>
              <p className="text-gray-500">@{profile.username}</p>
              {profile.bio && <p className="text-gray-600 text-sm mt-2">{profile.bio}</p>}
              {profile.country && (
                <div className="mt-2"><Badge variant="secondary">{profile.country}</Badge></div>
              )}
            </>
          ) : (
            <div className="space-y-4 mt-2">
              {/* Avatar picker */}
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-2">Avatar</label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {AVATAR_PRESETS.map((emoji) => (
                    <button
                      key={emoji}
                      type="button"
                      onClick={() => setEditForm((f) => ({ ...f, avatar_url: emoji }))}
                      className={cn(
                        "w-10 h-10 rounded-xl flex items-center justify-center text-xl border-2 transition-all",
                        editForm.avatar_url === emoji
                          ? "border-orange-400 bg-orange-50 scale-110"
                          : "border-gray-200 bg-white hover:border-gray-300"
                      )}
                    >
                      {emoji}
                    </button>
                  ))}
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className={cn(
                      "w-10 h-10 rounded-xl flex items-center justify-center border-2 transition-all text-gray-400 hover:text-gray-600",
                      !isEmojiAvatar(editForm.avatar_url) && editForm.avatar_url
                        ? "border-orange-400 bg-orange-50"
                        : "border-dashed border-gray-300 bg-gray-50 hover:border-gray-400"
                    )}
                    title="Upload photo"
                  >
                    {uploadingPhoto ? <Loader2 size={14} className="animate-spin" /> : <Upload size={14} />}
                  </button>
                  <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handlePhotoUpload} />
                </div>
                {!isEmojiAvatar(editForm.avatar_url) && editForm.avatar_url && (
                  <div className="flex items-center gap-2">
                    <img src={editForm.avatar_url} alt="" className="w-8 h-8 rounded-lg object-cover" />
                    <span className="text-xs text-gray-500">Custom photo selected</span>
                    <button
                      type="button"
                      onClick={() => setEditForm((f) => ({ ...f, avatar_url: "" }))}
                      className="text-xs text-red-400 hover:text-red-600"
                    >
                      Remove
                    </button>
                  </div>
                )}
              </div>

              {/* Background picker */}
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-2">Profile Background</label>
                <div className="flex flex-wrap gap-2">
                  {BG_PRESETS.map((bg) => (
                    <button
                      key={bg.id}
                      type="button"
                      onClick={() => setEditForm((f) => ({ ...f, profile_bg: bg.id }))}
                      className={cn(
                        "w-8 h-8 rounded-lg transition-all border-2",
                        editForm.profile_bg === bg.id ? "border-gray-900 scale-110" : "border-transparent hover:scale-105"
                      )}
                      style={{ background: `linear-gradient(135deg, ${bg.from}, ${bg.to})` }}
                      title={bg.label}
                    />
                  ))}
                </div>
              </div>

              {/* Text fields */}
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1">Display Name</label>
                <Input
                  value={editForm.display_name}
                  onChange={(e) => setEditForm((f) => ({ ...f, display_name: e.target.value }))}
                  placeholder="Your display name"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1">Bio</label>
                <textarea
                  value={editForm.bio}
                  onChange={(e) => setEditForm((f) => ({ ...f, bio: e.target.value }))}
                  placeholder="A little about yourself..."
                  rows={2}
                  className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-orange-400"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1">Country</label>
                <Input
                  value={editForm.country}
                  onChange={(e) => setEditForm((f) => ({ ...f, country: e.target.value }))}
                  placeholder="e.g. United States"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1">Learning Goal</label>
                  <select
                    value={editForm.learning_goal}
                    onChange={(e) => setEditForm((f) => ({ ...f, learning_goal: e.target.value }))}
                    className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 bg-white"
                  >
                    <option value="">Select goal</option>
                    {GOALS.map((g) => (
                      <option key={g.value} value={g.value}>{g.label}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1">Daily Goal</label>
                  <select
                    value={editForm.daily_goal_minutes}
                    onChange={(e) => setEditForm((f) => ({ ...f, daily_goal_minutes: Number(e.target.value) }))}
                    className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 bg-white"
                  >
                    {[5, 10, 15, 20, 30].map((m) => (
                      <option key={m} value={m}>{m} min / day</option>
                    ))}
                  </select>
                </div>
              </div>
              <Button onClick={handleSave} disabled={saving} className="w-full gap-2">
                {saving ? <><Loader2 size={16} className="animate-spin" /> Saving...</> : "Save Changes"}
              </Button>
            </div>
          )}

          {/* XP progress */}
          <div className="mt-4 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="font-medium text-gray-600">Level {profile.level}</span>
              <span className="text-gray-400">{current} / {needed} XP to Level {profile.level + 1}</span>
            </div>
            <ProgressBar value={pct} />
          </div>
        </div>
      </motion.div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: "Total XP", value: formatNumber(profile.total_xp), icon: "⚡", color: "text-amber-600" },
          { label: "Streak", value: `${profile.current_streak}d`, icon: "🔥", color: "text-orange-500" },
          { label: "Best Streak", value: `${profile.longest_streak}d`, icon: "🏆", color: "text-purple-500" },
          { label: "Hearts", value: `${profile.hearts}/5`, icon: "❤️", color: "text-red-500" },
        ].map((stat) => (
          <div key={stat.label} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 text-center">
            <p className="text-2xl mb-1">{stat.icon}</p>
            <p className={`text-xl font-black ${stat.color}`}>{stat.value}</p>
            <p className="text-xs text-gray-400 mt-0.5">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Achievements */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-bold text-gray-900">Achievements</h2>
          <Button variant="ghost" size="sm">View All</Button>
        </div>
        <div className="grid grid-cols-3 gap-3">
          {displayedAchievements.map((ach) => (
            <div key={ach.slug} className="flex flex-col items-center gap-1 p-3 rounded-xl bg-gray-50">
              <span className="text-3xl">{ach.icon}</span>
              <p className="text-xs font-bold text-gray-700 text-center leading-tight">{ach.title}</p>
              <p className="text-[10px] text-amber-500 font-bold">+{ach.xp_reward} XP</p>
            </div>
          ))}
        </div>
      </div>

      {/* Learning goal */}
      {profile.learning_goal && (
        <div className="bg-orange-50 rounded-2xl border border-orange-100 p-5">
          <h2 className="font-bold text-orange-900 mb-1">Learning Goal</h2>
          <p className="text-orange-700 capitalize text-sm">
            {profile.learning_goal === "travel" && "🌏 Learning Thai for Travel"}
            {profile.learning_goal === "work" && "💼 Learning Thai for Work"}
            {profile.learning_goal === "study" && "📚 Learning Thai for Study"}
            {profile.learning_goal === "fluency" && "🎯 Aiming for Full Fluency"}
          </p>
          <p className="text-orange-500 text-xs mt-1">Daily goal: {profile.daily_goal_minutes} minutes</p>
        </div>
      )}
    </div>
  );
}
