"use client";

import { motion } from "framer-motion";
import NewsletterForm from "@/components/forms/NewsletterForm";

export default function NewsletterAside() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white border border-gray-100 shadow-lg rounded-xl overflow-hidden"
    >
      <div className="bg-gradient-to-r from-[#fcc029]/10 via-[#fcc029]/5 to-transparent p-6">
        <p className="text-base font-medium text-gray-900 mb-3">
          For more strategies and lessons on ADHD and Autism, subscribe to my weekly newsletter.
        </p>
        <NewsletterForm />
      </div>
    </motion.div>
  );
}


