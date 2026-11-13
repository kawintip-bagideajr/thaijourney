"use client";
import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Camera, Edit3, Loader2, Upload } from "lucide-react";
import { useAuthStore } from "@/store/authStore";
import { LevelBadge } from "@/components/gamification/LevelBadge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { xpProgressInLevel, formatNumber, cn, calcCurrentHearts, MAX_HEARTS } from "@/lib/utils";
import { ProgressBar } from "@/components/shared/ProgressBar";
import { Badge } from "@/components/ui/badge";
import { ACHIEVEMENTS } from "@/data/achievements";
import { db } from "@/lib/firebase/client";
import { doc, updateDoc } from "firebase/firestore";
import { useTranslation } from "@/lib/i18n/useTranslation";
import type { LearningGoal } from "@/types/database";
import { cosmeticBannerStyle } from "@/data/cosmetics";
import { AvatarFrame, TitleTag } from "@/components/cosmetics/Cosmetics";
import { CollectionPanel } from "@/components/cosmetics/CollectionPanel";

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
  const won = cosmeticBannerStyle(bgId);
  if (won) return won;
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
  const { t } = useTranslation();
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


  const fieldLabel = "block text-[11px] font-extrabold text-gray-500 mb-1.5";
  const rawField = "w-full rounded-2xl border-2 border-[var(--game-edge)] bg-white px-4 font-bold text-sm text-gray-800 focus:border-orange-300 focus:ring-4 focus:ring-orange-100 outline-none transition";

  return (
    <div className="max-w-2xl mx-auto px-4 py-5 space-y-5">
      {/* Profile card */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="game-card overflow-hidden"
      >
        {/* Cover */}
        <div className="h-32 relative transition-all duration-300 border-b-2 border-[var(--game-edge)]" style={bgStyle}>
          <div
            className="absolute inset-0 opacity-30"
            style={{ backgroundImage: "radial-gradient(circle at 12px 12px, rgba(255,255,255,0.7) 2px, transparent 2.5px)", backgroundSize: "24px 24px" }}
            aria-hidden="true"
          />
          {isEditing && (
            <div className="absolute inset-0 flex items-center justify-center">
              <p className="bg-white/85 backdrop-blur rounded-full px-3 py-1 border-2 border-white text-gray-700 text-xs font-extrabold">
                <span aria-hidden="true">🎨 </span>{t("profile.chooseBg")}
              </p>
            </div>
          )}
        </div>

        {/* Avatar + info */}
        <div className="px-5 sm:px-6 pb-6 -mt-10">
          <div className="flex items-end justify-between gap-3 mb-4">
            <div className="relative shrink-0">
              <AvatarFrame frameId={profile.equipped_frame} thickness={5}>
              <div className="w-20 h-20 rounded-3xl border-4 border-white flex items-center justify-center shadow-[0_4px_0_var(--game-edge)] overflow-hidden"
                style={isEmojiAvatar(avatarDisplay) || !avatarDisplay ? bgStyle : {}}>
                {avatarDisplay ? (
                  isEmojiAvatar(avatarDisplay) ? (
                    <span className="text-4xl">{avatarDisplay}</span>
                  ) : (
                    <img src={avatarDisplay} alt="avatar" className="w-full h-full object-cover" />
                  )
                ) : (
                  <span className="text-3xl font-display text-white">
                    {(profile.display_name ?? profile.username)[0].toUpperCase()}
                  </span>
                )}
              </div>
              </AvatarFrame>
              <div className="absolute -bottom-1 -right-1">
                <LevelBadge level={profile.level} size="sm" />
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={isEditing ? () => setIsEditing(false) : startEditing}
              className="gap-2 rounded-2xl"
            >
              <Edit3 size={14} />
              {isEditing ? t("profile.cancel") : t("profile.editProfile")}
            </Button>
          </div>

          {!isEditing ? (
            <>
              <h1 className="font-display text-2xl sm:text-3xl text-gray-900 leading-tight break-words">{profile.display_name ?? profile.username}</h1>
              <p className="text-sm font-bold text-gray-500">@{profile.username}</p>
              {profile.equipped_title && <div className="mt-1.5"><TitleTag titleId={profile.equipped_title} /></div>}
              {profile.bio && <p className="text-gray-600 text-sm font-semibold mt-2">{profile.bio}</p>}
              {profile.country && (
                <div className="mt-2"><Badge variant="secondary"><span aria-hidden="true">📍</span>{profile.country}</Badge></div>
              )}
            </>
          ) : (
            <div className="space-y-4 mt-2">
              {/* Avatar picker */}
              <div className="rounded-2xl bg-orange-50 border-2 border-orange-100 p-3">
                <label className={fieldLabel}>{t("profile.avatar")}</label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {AVATAR_PRESETS.map((emoji) => (
                    <button
                      key={emoji}
                      type="button"
                      onClick={() => setEditForm((f) => ({ ...f, avatar_url: emoji }))}
                      className={cn(
                        "w-11 h-11 rounded-2xl flex items-center justify-center text-xl border-2 transition-all hover:-translate-y-0.5",
                        editForm.avatar_url === emoji
                          ? "border-orange-400 bg-white scale-110 shadow-[0_3px_0_#fdba74]"
                          : "border-[var(--game-edge)] bg-white shadow-[0_3px_0_var(--game-edge)] hover:border-orange-200"
                      )}
                    >
                      {emoji}
                    </button>
                  ))}
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className={cn(
                      "w-11 h-11 rounded-2xl flex items-center justify-center border-2 transition-all text-gray-400 hover:text-gray-600 hover:-translate-y-0.5",
                      !isEmojiAvatar(editForm.avatar_url) && editForm.avatar_url
                        ? "border-orange-400 bg-white shadow-[0_3px_0_#fdba74]"
                        : "border-dashed border-gray-300 bg-white/70 hover:border-orange-300"
                    )}
                    title={t("profile.uploadPhoto")}
                  >
                    {uploadingPhoto ? <Loader2 size={16} className="animate-spin" /> : <Upload size={16} />}
                  </button>
                  <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handlePhotoUpload} />
                </div>
                {!isEmojiAvatar(editForm.avatar_url) && editForm.avatar_url && (
                  <div className="flex items-center gap-2">
                    <img src={editForm.avatar_url} alt="" className="w-8 h-8 rounded-xl object-cover border-2 border-white" />
                    <span className="text-xs font-bold text-gray-500">{t("profile.customPhoto")}</span>
                    <button
                      type="button"
                      onClick={() => setEditForm((f) => ({ ...f, avatar_url: "" }))}
                      className="text-xs font-extrabold text-red-400 hover:text-red-600"
                    >
                      {t("profile.remove")}
                    </button>
                  </div>
                )}
              </div>

              {/* Background picker */}
              <div className="rounded-2xl bg-orange-50 border-2 border-orange-100 p-3">
                <label className={fieldLabel}>{t("profile.profileBg")}</label>
                <div className="flex flex-wrap gap-2">
                  {BG_PRESETS.map((bg) => (
                    <button
                      key={bg.id}
                      type="button"
                      onClick={() => setEditForm((f) => ({ ...f, profile_bg: bg.id }))}
                      className={cn(
                        "w-10 h-10 rounded-2xl transition-all border-[3px] shadow-[0_3px_0_rgba(0,0,0,0.15)]",
                        editForm.profile_bg === bg.id ? "border-gray-900 scale-110" : "border-white hover:-translate-y-0.5"
                      )}
                      style={{ background: `linear-gradient(135deg, ${bg.from}, ${bg.to})` }}
                      title={bg.label}
                    />
                  ))}
                </div>
              </div>

              {/* Text fields */}
              <div>
                <label className={fieldLabel}>{t("profile.displayName")}</label>
                <Input
                  value={editForm.display_name}
                  onChange={(e) => setEditForm((f) => ({ ...f, display_name: e.target.value }))}
                  placeholder={t("profile.displayNamePh")}
                />
              </div>
              <div>
                <label className={fieldLabel}>{t("profile.bio")}</label>
                <textarea
                  value={editForm.bio}
                  onChange={(e) => setEditForm((f) => ({ ...f, bio: e.target.value }))}
                  placeholder={t("profile.bioPh")}
                  rows={2}
                  className={cn(rawField, "py-3 resize-none")}
                />
              </div>
              <div>
                <label className={fieldLabel}>{t("profile.country")}</label>
                <Input
                  value={editForm.country}
                  onChange={(e) => setEditForm((f) => ({ ...f, country: e.target.value }))}
                  placeholder={t("profile.countryPh")}
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className={fieldLabel}>{t("profile.learningGoal")}</label>
                  <select
                    value={editForm.learning_goal}
                    onChange={(e) => setEditForm((f) => ({ ...f, learning_goal: e.target.value }))}
                    className={cn(rawField, "h-12")}
                  >
                    <option value="">{t("profile.selectGoal")}</option>
                    {GOALS.map((g) => (
                      <option key={g.value} value={g.value}>{g.label}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className={fieldLabel}>{t("profile.dailyGoal")}</label>
                  <select
                    value={editForm.daily_goal_minutes}
                    onChange={(e) => setEditForm((f) => ({ ...f, daily_goal_minutes: Number(e.target.value) }))}
                    className={cn(rawField, "h-12")}
                  >
                    {[5, 10, 15, 20, 30].map((m) => (
                      <option key={m} value={m}>{t("common.minPerDay", { n: m })}</option>
                    ))}
                  </select>
                </div>
              </div>
              <Button onClick={handleSave} disabled={saving} size="lg" className="w-full gap-2 font-display">
                {saving ? <><Loader2 size={16} className="animate-spin" /> {t("common.saving")}</> : t("profile.saveChanges")}
              </Button>
            </div>
          )}

          {/* XP progress */}
          <div className="mt-5 rounded-2xl bg-amber-50 border-2 border-amber-200 p-3 space-y-2">
            <div className="flex justify-between items-center gap-2 text-sm">
              <span className="font-display text-gray-800"><span aria-hidden="true">⭐ </span>{t("common.level", { n: profile.level })}</span>
              <span className="text-[11px] font-extrabold text-gray-500 tabular-nums text-right">{t("profile.xpToNext", { current, needed, n: profile.level + 1 })}</span>
            </div>
            <ProgressBar value={pct} />
          </div>
        </div>
      </motion.div>

      {/* Stats grid */}
      <div className="game-panel grid grid-cols-2 sm:grid-cols-4 gap-y-4 py-4">
        {[
          { label: t("profile.totalXp"), value: formatNumber(profile.total_xp), icon: "⚡", color: "text-amber-600", tile: "bg-amber-50 border-amber-200" },
          { label: t("profile.streak"), value: t("common.dayShort", { n: profile.current_streak }), icon: "🔥", color: "text-orange-500", tile: "bg-orange-50 border-orange-200" },
          { label: t("profile.bestStreak"), value: t("common.dayShort", { n: profile.longest_streak }), icon: "🏆", color: "text-purple-500", tile: "bg-purple-50 border-purple-200" },
          { label: t("profile.hearts"), value: `${calcCurrentHearts(profile.hearts, profile.hearts_updated_at)}/${MAX_HEARTS}`, icon: "❤️", color: "text-red-500", tile: "bg-red-50 border-red-200" },
        ].map((stat) => (
          <div key={stat.label} className="px-2 flex flex-col items-center text-center">
            <div className={cn("w-9 h-9 rounded-xl flex items-center justify-center text-lg border-2 mb-1.5", stat.tile)} aria-hidden="true">
              {stat.icon}
            </div>
            <p className={cn("font-display text-xl tabular-nums leading-tight", stat.color)}>{stat.value}</p>
            <p className="text-[11px] font-extrabold text-gray-500 mt-0.5 leading-tight">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Cosmetics won from guardians */}
      <CollectionPanel />

      {/* Achievements */}
      <div className="game-panel p-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg text-gray-900"><span aria-hidden="true">🏅 </span>{t("profile.achievements")}</h2>
          <Button variant="secondary" size="sm" className="rounded-2xl">{t("common.viewAll")}</Button>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {displayedAchievements.map((ach) => (
            <div key={ach.slug} className="flex flex-col items-center gap-1 p-3 rounded-xl bg-amber-50 border-2 border-amber-200">
              <span className="text-3xl drop-shadow-sm">{ach.icon}</span>
              <p className="text-xs font-extrabold text-gray-700 text-center leading-tight">{ach.title}</p>
              <p className="text-[10px] text-amber-600 font-black tabular-nums bg-white rounded-full px-2 py-0.5 border border-amber-200">+{ach.xp_reward} XP</p>
            </div>
          ))}
        </div>
      </div>

      {/* Learning goal */}
      {profile.learning_goal && (
        <div className="flex items-center gap-4 px-1">
          <div className="w-12 h-12 shrink-0 rounded-2xl flex items-center justify-center text-2xl border-2 bg-orange-50 border-orange-200" aria-hidden="true">
            🎯
          </div>
          <div className="min-w-0">
            <h2 className="text-lg text-gray-900 leading-tight">{t("profile.learningGoalTitle")}</h2>
            <p className="text-orange-600 font-extrabold capitalize text-sm">
              {profile.learning_goal === "travel" && t("profile.goalTravel")}
              {profile.learning_goal === "work" && t("profile.goalWork")}
              {profile.learning_goal === "study" && t("profile.goalStudy")}
              {profile.learning_goal === "fluency" && t("profile.goalFluency")}
            </p>
            <p className="text-[11px] font-extrabold text-gray-500 mt-0.5"><span aria-hidden="true">⏱️ </span>{t("profile.dailyGoalMinutes", { n: profile.daily_goal_minutes })}</p>
          </div>
        </div>
      )}
    </div>
  );
}
