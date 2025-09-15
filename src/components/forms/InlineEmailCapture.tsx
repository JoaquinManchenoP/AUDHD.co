"use client";

import { useState } from "react";

export default function InlineEmailCapture() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    console.log("[InlineEmailCapture] Submitted email:", email);
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        console.error("[InlineEmailCapture] Subscription failed:", err);
        return;
      }
      setEmail("");
    } catch (error) {
      console.error("[InlineEmailCapture] Unexpected error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="max-w-sm mx-auto" onSubmit={handleSubmit}>
      <div className="flex gap-3">
        <input
          type="email"
          id="email"
          name="email"
          required
          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#fcc029] focus:border-[#fcc029] transition-colors placeholder-gray-400 text-sm"
          placeholder="your@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-[#fcc029] text-white font-medium py-2 px-4 rounded-lg hover:bg-[#fcc029]/90 active:scale-98 transition-all duration-300 text-sm whitespace-nowrap disabled:opacity-60"
        >
          {isSubmitting ? "Submitting..." : "Get Access"}
        </button>
      </div>
    </form>
  );
}
