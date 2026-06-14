"use client";
import { useCallback } from "react";

let sharedCtx: AudioContext | null = null;

function getAudioCtx(): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (!sharedCtx) sharedCtx = new AudioContext();
  if (sharedCtx.state === "suspended") sharedCtx.resume();
  return sharedCtx;
}

function tone(freq: number, duration: number, type: OscillatorType = "sine", gain = 0.2, delay = 0) {
  const ac = getAudioCtx();
  if (!ac) return;
  const osc = ac.createOscillator();
  const g = ac.createGain();
  osc.connect(g);
  g.connect(ac.destination);
  osc.type = type;
  osc.frequency.value = freq;
  const t = ac.currentTime + delay;
  g.gain.setValueAtTime(0, t);
  g.gain.linearRampToValueAtTime(gain, t + 0.01);
  g.gain.exponentialRampToValueAtTime(0.001, t + duration);
  osc.start(t);
  osc.stop(t + duration + 0.02);
}

export function useSound() {
  const playClick = useCallback(() => {
    tone(700, 0.05, "square", 0.1);
  }, []);

  const playCorrect = useCallback(() => {
    tone(523.25, 0.12, "sine", 0.22);
    tone(659.25, 0.12, "sine", 0.22, 0.1);
    tone(783.99, 0.22, "sine", 0.22, 0.2);
  }, []);

  const playWrong = useCallback(() => {
    tone(220, 0.12, "sawtooth", 0.18);
    tone(185, 0.18, "sawtooth", 0.15, 0.13);
  }, []);

  const playComplete = useCallback(() => {
    [523.25, 659.25, 783.99, 1046.5].forEach((f, i) => {
      tone(f, 0.2, "sine", 0.2, i * 0.13);
    });
  }, []);

  const playUnlock = useCallback(() => {
    [392, 523.25, 659.25, 783.99, 1046.5].forEach((f, i) => {
      tone(f, 0.15, "triangle", 0.18, i * 0.09);
    });
  }, []);

  return { playClick, playCorrect, playWrong, playComplete, playUnlock };
}
