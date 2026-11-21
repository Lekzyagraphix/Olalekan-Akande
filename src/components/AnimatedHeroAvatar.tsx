import React, { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';

interface AnimatedHeroAvatarProps {
  src: string;
  alt: string;
  onError?: () => void;
}

/**
 * Interactive 3D cutout avatar animation for the Homepage Hero:
 * - Natural rhythmic eye blinking + occasional double blink mapped 1:1 to PNG eye bounds
 * - Subtle breathing & head sway (honours prefers-reduced-motion)
 */
export function AnimatedHeroAvatar({ src, alt, onError }: AnimatedHeroAvatarProps) {
  const shouldReduceMotion = useReducedMotion();
  const [isBlinking, setIsBlinking] = useState(false);

  // Lifelike blink timer (single blinks every ~3.4s + occasional double-blink)
  useEffect(() => {
    if (shouldReduceMotion) return;

    let cancelled = false;
    let blinkCount = 0;
    const timers: number[] = [];

    const triggerBlink = (doubleBlink: boolean) => {
      if (cancelled) return;
      setIsBlinking(true);
      timers.push(
        window.setTimeout(() => {
          if (cancelled) return;
          setIsBlinking(false);
          if (doubleBlink) {
            timers.push(
              window.setTimeout(() => {
                if (cancelled) return;
                setIsBlinking(true);
                timers.push(
                  window.setTimeout(() => {
                    if (!cancelled) setIsBlinking(false);
                  }, 135)
                );
              }, 115)
            );
          }
        }, 150)
      );
    };

    const scheduleNext = () => {
      const delay = 2600 + ((blinkCount * 733) % 1400);
      blinkCount += 1;
      timers.push(
        window.setTimeout(() => {
          if (cancelled) return;
          triggerBlink(blinkCount % 3 === 0);
          scheduleNext();
        }, delay)
      );
    };

    // Quick welcoming first blink shortly after mount
    timers.push(window.setTimeout(() => triggerBlink(false), 900));
    scheduleNext();

    return () => {
      cancelled = true;
      timers.forEach((id) => window.clearTimeout(id));
    };
  }, [shouldReduceMotion]);

  const handleInteract = () => {
    if (shouldReduceMotion) return;
    setIsBlinking(true);
    window.setTimeout(() => setIsBlinking(false), 160);
  };

  return (
    <div
      onMouseEnter={handleInteract}
      onClick={handleInteract}
      className="relative z-10 w-72 sm:w-80 md:w-[390px] aspect-[613/614] flex items-end justify-center cursor-pointer select-none"
    >
      {/* Gentle Living Body & Head Motion */}
      <motion.div
        animate={
          shouldReduceMotion
            ? undefined
            : {
                y: [0, -5, 0],
                rotate: [-0.45, 0.55, -0.45],
              }
        }
        transition={{
          duration: 4.4,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="relative w-full h-full origin-bottom"
      >
        <img
          src={src}
          alt={alt}
          loading="eager"
          referrerPolicy="no-referrer"
          onError={onError}
          className="w-full h-full object-contain object-bottom drop-shadow-[0_18px_36px_rgba(17,17,17,0.18)] dark:drop-shadow-[0_22px_42px_rgba(0,0,0,0.65)]"
        />

        {/* Pixel-Matched SVG Overlay: Blinking Eyelids */}
        <svg
          viewBox="0 0 613 614"
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 w-full h-full overflow-visible"
        >
          <defs>
            {/* 3D Warm Brown Eyelid Gradient matching forehead/lid lighting */}
            <radialGradient id="lekzy-lid-grad-left" cx="48%" cy="32%" r="70%">
              <stop offset="0%" stopColor="#BC6234" />
              <stop offset="55%" stopColor="#9D4B22" />
              <stop offset="100%" stopColor="#6D2F13" />
            </radialGradient>
            <radialGradient id="lekzy-lid-grad-right" cx="45%" cy="32%" r="70%">
              <stop offset="0%" stopColor="#B85F33" />
              <stop offset="55%" stopColor="#984821" />
              <stop offset="100%" stopColor="#6B2D12" />
            </radialGradient>

            {/* Exact Eye Contour Clips mapped to PNG sclera + iris coordinates */}
            <clipPath id="lekzy-left-eye-clip">
              <path d="M 216 184 C 216 158, 269 152, 275 182 C 276 202, 224 205, 216 184 Z" />
            </clipPath>
            <clipPath id="lekzy-right-eye-clip">
              <path d="M 320 194 C 322 166, 376 167, 381 196 C 380 216, 324 216, 320 194 Z" />
            </clipPath>
          </defs>

          {/* Left Eye Blinking Lid */}
          <g clipPath="url(#lekzy-left-eye-clip)">
            <motion.g
              initial={false}
              animate={{ scaleY: isBlinking ? 1 : 0.02, opacity: isBlinking ? 1 : 0 }}
              transition={{ duration: 0.11, ease: 'easeInOut' }}
              style={{ transformBox: 'view-box', transformOrigin: '245px 154px' }}
            >
              <rect x="212" y="152" width="68" height="58" fill="url(#lekzy-lid-grad-left)" />
              {/* Curved upper lash crease when closed */}
              <path
                d="M 216 196 Q 245 204 274 196"
                fill="none"
                stroke="#261209"
                strokeWidth="3.5"
                strokeLinecap="round"
              />
            </motion.g>
          </g>

          {/* Right Eye Blinking Lid */}
          <g clipPath="url(#lekzy-right-eye-clip)">
            <motion.g
              initial={false}
              animate={{ scaleY: isBlinking ? 1 : 0.02, opacity: isBlinking ? 1 : 0 }}
              transition={{ duration: 0.11, ease: 'easeInOut' }}
              style={{ transformBox: 'view-box', transformOrigin: '350px 166px' }}
            >
              <rect x="316" y="164" width="70" height="58" fill="url(#lekzy-lid-grad-right)" />
              <path
                d="M 321 207 Q 350 216 379 207"
                fill="none"
                stroke="#261209"
                strokeWidth="3.5"
                strokeLinecap="round"
              />
            </motion.g>
          </g>
        </svg>
      </motion.div>
    </div>
  );
}
