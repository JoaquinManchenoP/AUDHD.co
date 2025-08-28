"use client";

import Image from "next/image";
import Link from "next/link";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
} from "framer-motion";
import { useRef, useEffect } from "react";

export default function BioSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress, scrollY } = useScroll();
  const isScrolling = useMotionValue(false);
  const blur = useMotionValue(0);
  const lastScrollY = useRef(0);

  // Even gentler spring for the y position
  const springY = useSpring(0, {
    stiffness: 120, // Increased for tighter control
    damping: 25, // Increased for less bounce
    mass: 1.4, // Increased for more "weight"
  });

  useEffect(() => {
    // Handle scroll events for blur effect
    let scrollTimeout: NodeJS.Timeout;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollDelta = currentScrollY - lastScrollY.current;
      const maxScroll =
        document.documentElement.scrollHeight - window.innerHeight;

      isScrolling.set(true);
      blur.set(2); // Apply blur when scrolling

      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        // When scrolling stops
        isScrolling.set(false);
        blur.set(0); // Remove blur when stopped

        // Add bounce based on scroll direction when stopping
        if (Math.abs(scrollDelta) > 30) {
          // Only bounce if there was significant scroll
          const bounceAmount = Math.min(Math.abs(scrollDelta) * 0.07, 8); // Reduced multiplier and max bounce
          const direction = scrollDelta > 0 ? -1 : 1; // Bounce opposite to scroll direction

          // Don't bounce if we're at the boundaries
          if (!(currentScrollY <= 0 || currentScrollY >= maxScroll)) {
            springY.set(bounceAmount * direction);
            setTimeout(() => springY.set(0), 350); // Slightly faster reset
          }
        }
      }, 150);

      // Boundary bounces
      if (currentScrollY <= 0) {
        // At top - gentler bounce down
        springY.set(8); // Reduced from 12
        setTimeout(() => springY.set(0), 350); // Increased from 200
      } else if (currentScrollY >= maxScroll) {
        // At bottom - gentler bounce up
        springY.set(-8); // Reduced from -12
        setTimeout(() => springY.set(0), 350); // Increased from 200
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(scrollTimeout);
    };
  }, []);

  return (
    <motion.div
      ref={ref}
      className="w-80 shrink-0"
      style={{
        y: springY,
        filter: useTransform(blur, (value) => `blur(${value}px)`),
      }}
    >
      <div className="sticky top-8">
        <div className="flex flex-col w-full">
          <div>
            <Image
              src="/logo.jpg"
              alt="AuDHD Brain Logo"
              width={120}
              height={120}
              className="object-cover rounded-lg hover:scale-105 transition-transform duration-300 -ml-2"
              priority
            />
          </div>

          <div className="mt-8 w-full">
            <div className="space-y-3">
              <div className="flex items-center gap-32">
                <Link
                  href="#"
                  className="font-medium text-xl hover:text-primary"
                >
                  <h3 className="font-bold text-[25px]">AuDHD.co</h3>
                </Link>
              </div>

              <div className="space-y-3">
                <p className="text-gray-700">
                  Most of my life felt like a struggle.{" "}
                  <span className="mt-1">
                    Getting diagnosed with ADHD and Autism helped me understand
                    why. Now I share what I’ve learned about working with my
                    brain, hoping it helps others too.
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
