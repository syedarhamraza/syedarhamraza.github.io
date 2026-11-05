"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { BackspaceIcon, PhoneIcon } from "@phosphor-icons/react";

const KEYS: [string, string][] = [
  ["1", ""], ["2", "ABC"], ["3", "DEF"],
  ["4", "GHI"], ["5", "JKL"], ["6", "MNO"],
  ["7", "PQRS"], ["8", "TUV"], ["9", "WXYZ"],
  ["*", ""], ["0", "+"], ["#", ""],
];
const DIGIT: Record<string, string> = {};
for (const [d, letters] of KEYS) for (const l of letters) DIGIT[l.toLowerCase()] = d;

// Made-up people, as in the Play screenshots.
const PEOPLE = [
  ["Alex Morgan", "555-0100"], ["Alicia Chen", "555-0101"], ["Ben Carter", "555-0102"], ["Chloe Rivera", "555-0103"],
  ["Daniel Kim", "555-0104"], ["Emma Wilson", "555-0105"], ["Ethan Brooks", "555-0106"], ["Grace Patel", "555-0107"],
  ["Hannah Lee", "555-0108"], ["Isaac Nguyen", "555-0109"], ["Liam Foster", "555-0110"], ["Mia Johnson", "555-0111"],
  ["Noah Davis", "555-0112"], ["Olivia Martin", "555-0113"], ["Sophia Turner", "555-0114"],
] as const;
const COLORS = ["#7fd7a8", "#f08bb4", "#b59cf5", "#f5b36b", "#7cc8f0", "#86d1c0"];

type Hit = { name: string; number: string; word: number; len: number; inNumber: boolean };

/** The app's T9 search: digits match the start of any name word, or anywhere in the number. */
function search(digits: string): Hit[] {
  if (!digits) return [];
  const hits: Hit[] = [];
  for (const [name, number] of PEOPLE) {
    const words = name.split(" ");
    const word = words.findIndex((w) => [...w.toLowerCase()].map((c) => DIGIT[c]).join("").startsWith(digits));
    if (word >= 0) hits.push({ name, number, word, len: digits.length, inNumber: false });
    else if (number.replace(/\D/g, "").includes(digits)) hits.push({ name, number, word: -1, len: 0, inNumber: true });
  }
  return hits.slice(0, 3);
}

function Name({ hit }: { hit: Hit }) {
  return (
    <>
      {hit.name.split(" ").map((w, i) => (
        <span key={i}>
          {i > 0 && " "}
          {i === hit.word ? (
            <>
              <span className="text-accent">{w.slice(0, hit.len)}</span>
              {w.slice(hit.len)}
            </>
          ) : (
            w
          )}
        </span>
      ))}
    </>
  );
}

// The keypad's call-glass key: top-lit body, rim light, a soft press glow.
const key =
  "relative grid h-[clamp(52px,7.4vw,66px)] place-items-center rounded-full bg-[linear-gradient(180deg,rgb(86_86_92/0.9),rgb(48_48_52/0.92)_55%,rgb(36_36_40/0.95))] shadow-[0_8px_22px_rgb(0_0_0/0.55),inset_0_1px_0_rgb(255_255_255/0.16)] transition-[transform,box-shadow] duration-150 active:scale-[0.95] active:shadow-[0_0_28px_rgb(255_255_255/0.18),inset_0_1px_0_rgb(255_255_255/0.22)] select-none";

/** A working copy of the app's T9 keypad: tap or type digits and matching contacts appear above. */
export function KeypadDemo() {
  const [digits, setDigits] = useState("25");
  const hits = search(digits);
  const press = (d: string) => setDigits((v) => (v.length < 14 ? v + d : v));

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey || (e.target as HTMLElement).closest("input,textarea")) return;
      if (/^[0-9*#]$/.test(e.key)) press(e.key);
      else if (e.key === "Backspace") setDigits((v) => v.slice(0, -1));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div className="mx-auto w-full max-w-[400px] rounded-[40px] bg-[#141416] p-5 shadow-[0_40px_120px_-30px_rgb(0_0_0/0.9),0_0_0_1px_rgb(255_255_255/0.06)] sm:p-6">
      {/* T9 results, as above the app's keypad sheet. */}
      <div className="h-[204px] overflow-hidden" aria-live="polite">
        <AnimatePresence mode="popLayout" initial={false}>
          {hits.map((h) => (
            <motion.div
              key={h.name}
              layout
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ type: "spring", stiffness: 420, damping: 34 }}
              className="flex items-center gap-4 px-2 py-2.5"
            >
              <span
                className="grid h-12 w-12 shrink-0 place-items-center rounded-full text-[17px] font-medium text-white"
                style={{ background: COLORS[PEOPLE.findIndex((p) => p[0] === h.name) % COLORS.length] }}
              >
                {h.name.split(" ").map((w) => w[0]).join("")}
              </span>
              <span className="min-w-0">
                <span className="block truncate text-[19px]">
                  <Name hit={h} />
                </span>
                <span className="block text-[15px] text-ink-2">{h.number}</span>
              </span>
            </motion.div>
          ))}
        </AnimatePresence>
        {digits && hits.length === 0 && <p className="px-2 pt-6 text-[16px] text-ink-3">No contacts. Tap Call to dial it.</p>}
      </div>

      <div className="mx-auto mt-2 mb-4 h-1 w-10 rounded-full bg-white/20" />
      <p className="tabular h-12 truncate text-center text-[clamp(30px,4.6vw,38px)] font-normal tracking-[0.02em]">{digits}</p>

      <div className="mt-4 grid grid-cols-3 gap-2.5">
        {KEYS.map(([d, l]) => (
          <button key={d} type="button" onClick={() => press(d)} className={key} aria-label={l ? `${d} ${l}` : d}>
            <span className="flex flex-col items-center leading-none">
              <span className="text-[clamp(24px,3.4vw,30px)]">{d}</span>
              {l && <span className="mt-1 text-[11px] tracking-[0.08em] text-ink-2">{l}</span>}
            </span>
          </button>
        ))}
        <span />
        <button
          type="button"
          onClick={() => setDigits("")}
          aria-label="Call"
          className={`${key} bg-[linear-gradient(180deg,#4fae55,#5fbf68_60%,#8dd393)] shadow-[0_10px_32px_rgb(80_190_100/0.45),inset_0_1px_0_rgb(255_255_255/0.3)]`}
        >
          <PhoneIcon size={28} weight="fill" />
        </button>
        <button type="button" onClick={() => setDigits((v) => v.slice(0, -1))} aria-label="Delete" className={key}>
          <BackspaceIcon size={26} weight="fill" className="text-ink-2" />
        </button>
      </div>
    </div>
  );
}
