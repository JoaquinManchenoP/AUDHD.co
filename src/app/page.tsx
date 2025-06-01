import Image from "next/image";
import Link from "next/link";
import NewsletterForm from "@/components/forms/NewsletterForm";
import BioSection from "@/components/BioSection";

export default function Home() {
  return (
    <div className="min-h-screen">
      <div className="max-w-[1000px] mx-auto px-4 py-8 md:py-12">
        <div className="flex flex-col lg:flex-row lg:gap-24">
          {/* Main Content */}
          <div className="flex-1 max-w-[520px]">
            <div className="space-y-8 md:space-y-16">
              {/* Main Content Section */}
              <div>
                <h1 className="font-display text-[32px] leading-tight md:text-4xl lg:text-4xl font-bold text-gray-900">
                  Practical frameworks & tools
                  <span className="text-primary block mt-1">
                    for neurodivergent minds
                  </span>
                </h1>
                <div className="mt-4 md:mt-6">
                  <p className="text-base md:text-lg text-gray-700">
                    I write{" "}
                    <span className="font-medium">Neurodivergent Notes</span> –
                    a weekly letter with actionable strategies, productivity
                    frameworks, and ways to work with (not against) your brain.
                  </p>
                  <p className="mt-2 text-gray-600">
                    5,000+ neurodivergent individuals read it. You might find it
                    helpful too.
                  </p>
                </div>
                <div className="mt-6 md:mt-8">
                  <NewsletterForm />
                  <p className="mt-3 text-sm text-gray-500">
                    2,132+ evidence-based strategies shared since 2020
                  </p>
                </div>
              </div>

              {/* Bio Section on Mobile */}
              <div className="lg:hidden">
                <BioSection />
              </div>

              {/* Popular Guides */}
              <div className="space-y-4">
                <h2 className="font-display text-xl font-semibold text-gray-900">
                  Popular guides
                </h2>

                <div className="space-y-3">
                  <Link
                    href="/guides/executive-function"
                    className="block group p-4 md:p-5 bg-white border border-gray-200 rounded-lg hover:border-[#fcc029]/30 hover:shadow-lg active:scale-98 active:shadow-sm active:border-[#fcc029] transition-all duration-300"
                  >
                    <div className="flex items-start justify-between">
                      <div className="space-y-2">
                        <h3 className="font-display text-lg font-semibold text-gray-900 group-hover:text-[#fcc029] transition-colors">
                          The Executive Function Playbook
                        </h3>
                        <p className="text-gray-600 text-sm">
                          My complete system for managing time, tasks, and
                          energy with ADHD. Includes visual frameworks and
                          step-by-step implementation guides.
                        </p>
                      </div>
                      <span className="text-[#fcc029] text-xl inline-block motion-safe:animate-[float_3s_ease-in-out_infinite] group-hover:text-2xl group-hover:animate-none group-hover:translate-x-2 group-hover:-translate-y-1 group-active:translate-x-3 group-active:scale-90 transition-all duration-300">
                        →
                      </span>
                    </div>
                  </Link>

                  <Link
                    href="/guides/sensory-toolkit"
                    className="block group p-4 md:p-5 bg-white border border-gray-200 rounded-lg hover:border-[#fcc029]/30 hover:shadow-lg active:scale-98 active:shadow-sm active:border-[#fcc029] transition-all duration-300"
                  >
                    <div className="flex items-start justify-between">
                      <div className="space-y-2">
                        <h3 className="font-display text-lg font-semibold text-gray-900 group-hover:text-[#fcc029] transition-colors">
                          The Sensory Processing Toolkit
                        </h3>
                        <p className="text-gray-600 text-sm">
                          30+ tools and strategies to manage sensory overwhelm.
                          Design your environment for focus, comfort, and
                          reduced meltdowns.
                        </p>
                      </div>
                      <span className="text-[#fcc029] text-xl inline-block motion-safe:animate-[float_3s_ease-in-out_infinite] group-hover:text-2xl group-hover:animate-none group-hover:translate-x-2 group-hover:-translate-y-1 group-active:translate-x-3 group-active:scale-90 transition-all duration-300">
                        →
                      </span>
                    </div>
                  </Link>

                  <Link
                    href="/guides/relationships"
                    className="block group p-4 md:p-5 bg-white border border-gray-200 rounded-lg hover:border-[#fcc029]/30 hover:shadow-lg active:scale-98 active:shadow-sm active:border-[#fcc029] transition-all duration-300"
                  >
                    <div className="flex items-start justify-between">
                      <div className="space-y-2">
                        <h3 className="font-display text-lg font-semibold text-gray-900 group-hover:text-[#fcc029] transition-colors">
                          The Communication Guide
                        </h3>
                        <p className="text-gray-600 text-sm">
                          Practical frameworks for better relationships, clearer
                          communication, and navigating social situations as a
                          neurodivergent person.
                        </p>
                      </div>
                      <span className="text-[#fcc029] text-xl inline-block motion-safe:animate-[float_3s_ease-in-out_infinite] group-hover:text-2xl group-hover:animate-none group-hover:translate-x-2 group-hover:-translate-y-1 group-active:translate-x-3 group-active:scale-90 transition-all duration-300">
                        →
                      </span>
                    </div>
                  </Link>

                  <Link
                    href="/guides/work-strategies"
                    className="block group p-4 md:p-5 bg-white border border-gray-200 rounded-lg hover:border-[#fcc029]/30 hover:shadow-lg active:scale-98 active:shadow-sm active:border-[#fcc029] transition-all duration-300"
                  >
                    <div className="flex items-start justify-between">
                      <div className="space-y-2">
                        <h3 className="font-display text-lg font-semibold text-gray-900 group-hover:text-[#fcc029] transition-colors">
                          Work Strategies That Work
                        </h3>
                        <p className="text-gray-600 text-sm">
                          How to leverage your neurodivergent strengths at work.
                          From focus techniques to workplace accommodations that
                          make a real difference.
                        </p>
                      </div>
                      <span className="text-[#fcc029] text-xl inline-block motion-safe:animate-[float_3s_ease-in-out_infinite] group-hover:text-2xl group-hover:animate-none group-hover:translate-x-2 group-hover:-translate-y-1 group-active:translate-x-3 group-active:scale-90 transition-all duration-300">
                        →
                      </span>
                    </div>
                  </Link>
                </div>
              </div>

              {/* Enhanced Newsletter Section */}
              <div className="mt-12 pt-12 border-t border-gray-100">
                <div className="md:text-center space-y-6">
                  <h2 className="font-display text-[32px] leading-tight md:text-4xl font-bold text-gray-900">
                    Join 5,000+ People Getting
                    <span className="block mt-1">
                      Weekly Neurodivergent Insights
                    </span>
                  </h2>

                  <div className="md:bg-white md:rounded-xl md:border md:border-gray-200 md:p-6 mx-auto">
                    <p className="text-lg md:text-xl font-medium text-gray-900 mb-6">
                      18 Evidence-Based Strategies That Will Make You
                      <span className="block mt-1">
                        Thrive With Your Neurodivergent Brain
                      </span>
                    </p>
                    <div className="max-w-md mx-auto">
                      <NewsletterForm />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bio Section on Desktop */}
          <div className="hidden lg:block w-80">
            <div className="sticky top-24">
              <BioSection />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
