"use client";
import { Volume2, VolumeX } from "lucide-react";
import { useAudio } from "@/hooks/useAudio";
import { cn } from "@/lib/utils";

interface AudioPlayerProps {
  url?: string;
  onPlay?: () => void;
  size?: "sm" | "md" | "lg";
  className?: string;
  label?: string;
}

export function AudioPlayer({ url, onPlay, size = "md", className, label }: AudioPlayerProps) {
  const { play, isPlaying } = useAudio(url);

  const handlePlay = () => {
    play();
    onPlay?.();
  };

  const sizeClass = {
    sm: "w-8 h-8",
    md: "w-10 h-10",
    lg: "w-14 h-14",
  }[size];

  const iconSize = { sm: 14, md: 18, lg: 24 }[size];

  return (
    <button
      onClick={handlePlay}
      disabled={!url}
      className={cn(
        "flex items-center justify-center rounded-full transition-all duration-200",
        "bg-orange-100 hover:bg-orange-200 text-orange-600",
        "disabled:opacity-40 disabled:cursor-not-allowed",
        isPlaying && "animate-pulse bg-orange-200",
        sizeClass,
        className
      )}
      aria-label={label ?? "Play audio"}
    >
      {isPlaying ? <VolumeX size={iconSize} /> : <Volume2 size={iconSize} />}
    </button>
  );
}
