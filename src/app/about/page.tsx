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
          <p>Hi! 👋</p>

          <p>Thanks for checking us out.</p>

          <p>
            AuDHD.co started because we got tired of seeing the same old advice
            that just doesn't work for neurodivergent brains. You know the ones
            - "just make a list" or "try harder to focus." Yeah, right.
          </p>

          <p>
            We're building something different here. A place where ADHD and
            autistic folks can find strategies that actually make sense for how
            our brains work. No BS, no "miracle cures," just real stuff that
            helps.
          </p>

          <p>Here's what we're about:</p>

          <ul className="space-y-4 list-none">
            <li className="pl-4 border-l-2 border-[#fcc029]">
              • We're all neurodivergent here. No outside "experts" telling us
              what to do - just real people sharing what actually works.
            </li>
            <li className="pl-4 border-l-2 border-[#fcc029]">
              • We only share stuff we've tried ourselves. If it doesn't work in
              real life, you won't find it here.
            </li>
            <li className="pl-4 border-l-2 border-[#fcc029]">
              • Our community keeps growing - over 5,000 people read our weekly
              notes. Pretty cool to see we're not alone in this.
            </li>
          </ul>

          <p>
            Look, we've tried all those fancy productivity systems and life
            hacks too. Most of them flopped hard. But that's okay - each fail
            taught us something new about what actually works for brains like
            ours.
          </p>

          <p>
            Now we share what works through our newsletter and guides. No fluff,
            no corporate speak, just straightforward strategies you can actually
            use.
          </p>

          <p>Stick around - we think you'll like it here.</p>

          <div className="pt-8">
            <p className="font-display text-2xl">AuDHD.co</p>
          </div>
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
              For more strategies and lessons on ADHD and Autism, subscribe to
              my weekly newsletter.
            </p>
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
            For more strategies and lessons on ADHD and Autism, subscribe to my
            weekly newsletter.
          </p>
          <NewsletterForm />
        </motion.div>
      </div>
    </div>
  );
}
