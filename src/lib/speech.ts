let currentAudio: HTMLAudioElement | null = null;

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

  // getVoices() populates asynchronously on first load
  if (window.speechSynthesis.getVoices().length > 0) {
    doSpeak();
  } else {
    window.speechSynthesis.addEventListener("voiceschanged", doSpeak, { once: true });
  }
}

export function speakThai(text: string): void {
  if (typeof window === "undefined") return;

  if (currentAudio) {
    currentAudio.pause();
    currentAudio.src = "";
    currentAudio = null;
  }

  const audio = new Audio(`/api/tts?v=2&t=${encodeURIComponent(text)}`);
  currentAudio = audio;

  // Both network error and HTTP error (e.g. 503) trigger the fallback
  audio.addEventListener("error", () => speakViaSynthesis(text), { once: true });
  audio.play().catch(() => speakViaSynthesis(text));
}
