"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import NewsletterForm from "@/components/forms/NewsletterForm";

export default function AboutPage() {
  return (
    <div className="max-w-[1050px] mx-auto">
      <div className="max-w-[650px] mx-auto px-4 py-8 md:py-16 flex flex-col items-center">
        {/* Title */}
        <div className="relative mb-12 md:mb-16 w-full text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold">
            About
          </h1>
          <div className="absolute left-1/2 -translate-x-1/2 bottom-0 transform translate-y-2">
            <div className="h-2 md:h-3 bg-[#fcc029] rounded-sm w-[180px] transform -rotate-1 blur-[0.5px]"></div>
          </div>
        </div>

        {/* Content */}
        <div className="space-y-6 text-lg max-w-[550px]">
          <p>Hey there</p>
          <p>
            I’m JJ. For most of my life, I felt like I was always struggling,
            socially, academically, emotionally. Everything just seemed so hard.
          </p>
          <p>
            I was great at the things I loved, like playing guitar, gaming, and
            even sports. But when it came to school, work, or relationships, I
            constantly felt like I behind everyone else.
          </p>
          <p>
            For years, I thought all of this came was because of my childhood
            trauma. It wasn’t until I was 29 years old that I finally found out
            what was going on: I was diagnosed with ADHD and Autism.
          </p>
          <p>
            That moment changed everything. Once I understood what was really
            going on, I dedicated myself to learning how my brain works. Over
            time, through experiments, mistakes, and persistence, I found ways
            to make my life feel simpler, healthier, and far less overwhelming.
          </p>
          <p>
            Today, I am happier, more positive, and less anxious than I have
            ever been. And now I share what I have learned so others with the
            same struggles can find an easier way.
          </p>
        </div>
      </div>

      {/* Newsletter - Desktop */}
      <div className="hidden lg:block fixed top-[100px] right-8 w-[300px] z-10">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white border border-gray-100 shadow-lg rounded-xl overflow-hidden"
        >
          <div className="bg-gradient-to-r from-[#fcc029]/10 via-[#fcc029]/5 to-transparent p-6">
            <p className="text-base font-medium text-gray-900 mb-3">
              Get weekly strategies and lessons on ADHD and Autism straight to
              your inbox.
            </p>
            <p>Join here! (It's free)</p>
            <NewsletterForm />
          </div>
        </motion.div>
      </div>

      {/* Newsletter - Mobile */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white shadow-lg border-t border-gray-100 p-4 z-10">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-gradient-to-r from-[#fcc029]/10 via-[#fcc029]/5 to-transparent p-4"
        >
          <p className="text-base font-medium text-gray-900 mb-3">
            Get weekly strategies and lessons on ADHD and Autism straight to
            your inbox.
          </p>
          <NewsletterForm />
        </motion.div>
      </div>
    </div>
  );
}
