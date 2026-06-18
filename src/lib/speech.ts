let currentAudio: HTMLAudioElement | null = null;
let currentGeneration = 0;

function speakViaSynthesis(text: string) {
  if (!("speechSynthesis" in window)) return;
  window.speechSynthesis.cancel();

  const doSpeak = () => {
    const voices = window.speechSynthesis.getVoices();
    const thaiVoice = voices.find((v) => v.lang.startsWith("th"));
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "th-TH";
    utterance.rate = 0.8;
    utterance.pitch = 1;
    if (thaiVoice) utterance.voice = thaiVoice;
    window.speechSynthesis.speak(utterance);
  };

  if (window.speechSynthesis.getVoices().length > 0) {
    doSpeak();
  } else {
    window.speechSynthesis.addEventListener("voiceschanged", doSpeak, { once: true });
  }
}

export function speakThai(text: string): void {
  if (typeof window === "undefined") return;

  // Strip romanization in parentheses, e.g. "พ่อ (pho)" → "พ่อ"
  const thaiOnly = text.replace(/\s*\([^)]*\)\s*/g, "").trim();

  if (currentAudio) {
    currentAudio.pause();
    currentAudio.src = "";
    currentAudio = null;
  }
  if ("speechSynthesis" in window) window.speechSynthesis.cancel();

  // Increment generation so stale callbacks from previous calls are ignored.
  // Setting src="" above can fire an "error" event on the old element — without
  // this guard, that would trigger speakViaSynthesis with the wrong (old) text.
  const generation = ++currentGeneration;

  const audio = new Audio(`/api/tts?v=3&t=${encodeURIComponent(thaiOnly)}`);
  currentAudio = audio;

  let didFallback = false;
  const fallback = () => {
    if (didFallback || generation !== currentGeneration) return;
    didFallback = true;
    currentAudio = null;
    speakViaSynthesis(thaiOnly);
  };

  audio.addEventListener("error", fallback, { once: true });
  audio.play().catch(fallback);
}
