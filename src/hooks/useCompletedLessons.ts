"use client";
import { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/lib/firebase/client";

const EMPTY: ReadonlySet<string> = new Set();

/**
 * Lesson slugs (including adventure stage ids) the player has finished.
 * `loaded` stays false until the first fetch returns, so gates don't flash "locked".
 */
export function useCompletedLessons(userId: string | undefined) {
  const [state, setState] = useState<{ uid?: string; completed: ReadonlySet<string> }>({ completed: EMPTY });

  useEffect(() => {
    if (!userId) return;
    let alive = true;
    getDocs(query(collection(db, "user_lesson_progress"), where("user_id", "==", userId)))
      .then((snap) => {
        if (alive) setState({ uid: userId, completed: new Set(snap.docs.map((d) => d.data().lesson_slug as string)) });
      })
      .catch(() => { if (alive) setState({ uid: userId, completed: EMPTY }); });
    return () => { alive = false; };
  }, [userId]);

  return { completed: state.completed, loaded: !!userId && state.uid === userId };
}
