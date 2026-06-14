let currentAudio: HTMLAudioElement | null = null;

export function speakThai(text: string): void {
  if (typeof window === "undefined") return;

  // Stop any currently playing audio
  if (currentAudio) {
    currentAudio.pause();
    currentAudio.src = "";
    currentAudio = null;
  }

  const audio = new Audio(`/api/tts?t=${encodeURIComponent(text)}`);
  currentAudio = audio;

  audio.play().catch(() => {
    // Fallback to Web Speech API if TTS proxy fails
    if (!("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "th-TH";
    utterance.rate = 0.85;
    utterance.pitch = 1;
    window.speechSynthesis.speak(utterance);
  });
}
