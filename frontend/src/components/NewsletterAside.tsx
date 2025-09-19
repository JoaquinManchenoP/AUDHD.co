"use client";

import { motion } from "framer-motion";
import NewsletterForm from "@/components/forms/NewsletterForm";

export default function NewsletterAside() {
  return (
    <>
      {/* Newsletter - Desktop (fixed right) */}
      <div className="hidden md:block fixed top-[100px] right-4 sm:right-8 w-[280px] sm:w-[300px] z-10">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white border border-gray-100 shadow-lg rounded-xl overflow-hidden"
        >
          <div className="bg-gradient-to-r from-[#fcc029]/10 via-[#fcc029]/5 to-transparent p-4 sm:p-6">
            <p className="text-sm sm:text-base font-medium text-gray-900 mb-3">
              Get weekly strategies and lessons on ADHD and Autism straight to
              your inbox.
            </p>
            <p>Join here! (It's free)</p>
            <NewsletterForm />
          </div>
        </motion.div>
      </div>

      {/* Newsletter - Mobile (fixed bottom) */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white shadow-lg border-t border-gray-100 p-3 sm:p-4 z-10">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-gradient-to-r from-[#fcc029]/10 via-[#fcc029]/5 to-transparent p-3 sm:p-4"
        >
          <p className="text-sm sm:text-base font-medium text-gray-900 mb-3 text-center">
            For more strategies and lessons on ADHD and Autism, subscribe to my
            weekly newsletter.
          </p>
          <NewsletterForm />
        </motion.div>
      </div>
    </>
  );
}
