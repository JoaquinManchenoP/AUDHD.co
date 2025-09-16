import NewsletterForm from "@/components/forms/NewsletterForm";

export default function ADHDPage() {
  return (
    <div className="flex flex-col items-center">
      {/* Hero Section */}
      <section className="w-full bg-gradient-to-b from-[#fcc029] to-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="font-display text-5xl md:text-6xl text-charcoal mb-6">
            Living With ADHD
            <span className="block text-white drop-shadow-lg">
              Your Guide to Success
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-charcoal mb-8 max-w-2xl mx-auto">
            Discover strategies, tools, and community support to thrive with
            ADHD.
          </p>
          <NewsletterForm />
        </div>
      </section>

      {/* Content Sections */}
      <section className="w-full py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="mb-16">
            <h2 className="font-display text-3xl text-charcoal mb-6">
              Understanding ADHD
            </h2>
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-600">
                ADHD is more than just difficulty focusing – it's a unique way
                of processing the world around us. Understanding how ADHD
                affects different aspects of life is the first step toward
                developing effective strategies.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <h3 className="font-display text-2xl text-charcoal mb-4">
                Common Challenges
              </h3>
              <ul className="space-y-3 text-gray-600">
                <li>• Time Management</li>
                <li>• Organization</li>
                <li>• Focus and Concentration</li>
                <li>• Emotional Regulation</li>
                <li>• Task Completion</li>
              </ul>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <h3 className="font-display text-2xl text-charcoal mb-4">
                Strengths
              </h3>
              <ul className="space-y-3 text-gray-600">
                <li>• Creativity</li>
                <li>• Hyperfocus</li>
                <li>• Problem-solving</li>
                <li>• Adaptability</li>
                <li>• Energy and Enthusiasm</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full bg-charcoal py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-display text-3xl md:text-4xl text-white mb-6">
            Get Weekly ADHD Tips and Strategies
          </h2>
          <p className="text-lg text-white/80 mb-8">
            Join our community and receive practical advice, success stories,
            and the latest research.
          </p>
          <div className="max-w-md mx-auto">
            <NewsletterForm />
          </div>
        </div>
      </section>
    </div>
  );
}
