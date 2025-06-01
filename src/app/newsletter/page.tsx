import NewsletterForm from "@/components/forms/NewsletterForm";

const benefits = [
  {
    title: "Expert Insights",
    description:
      "Get the latest research and professional advice on ADHD and autism.",
    emoji: "🧠",
  },
  {
    title: "Practical Strategies",
    description: "Learn actionable tips and techniques for daily challenges.",
    emoji: "💡",
  },
  {
    title: "Community Stories",
    description:
      "Read inspiring stories from others in the neurodivergent community.",
    emoji: "👥",
  },
  {
    title: "Resource Updates",
    description: "Stay informed about new tools, apps, and support services.",
    emoji: "🛠️",
  },
  {
    title: "Early Access",
    description: "Be the first to know about upcoming events and resources.",
    emoji: "🎯",
  },
  {
    title: "Exclusive Content",
    description: "Receive subscriber-only guides and worksheets.",
    emoji: "🎁",
  },
];

export default function NewsletterPage() {
  return (
    <div className="flex flex-col items-center">
      {/* Hero Section */}
      <section className="w-full bg-gradient-to-b from-[#fcc029] to-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <span className="inline-block bg-white/20 px-4 py-2 rounded-full text-charcoal font-medium mb-6">
            Join 5,000+ subscribers
          </span>
          <h1 className="font-display text-5xl md:text-6xl text-charcoal mb-6">
            Your Weekly Guide to
            <span className="block text-white drop-shadow-lg">
              Neurodivergent Success
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-charcoal mb-8 max-w-2xl mx-auto">
            Get practical tips, latest research, and community stories delivered
            straight to your inbox.
          </p>
          <div className="max-w-md mx-auto">
            <NewsletterForm />
            <p className="mt-4 text-sm text-charcoal/70">
              Join our community of neurodivergent individuals and allies. No
              spam, unsubscribe anytime.
            </p>
          </div>
        </div>
      </section>

      {/* Benefits Grid */}
      <section className="w-full py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-display text-3xl md:text-4xl text-charcoal text-center mb-12">
            What You'll Get
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit) => (
              <div
                key={benefit.title}
                className="bg-white p-6 rounded-2xl shadow-lg hover:transform hover:-translate-y-1 transition-transform"
              >
                <div className="text-4xl mb-4">{benefit.emoji}</div>
                <h3 className="font-display text-xl text-charcoal mb-2">
                  {benefit.title}
                </h3>
                <p className="text-gray-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="w-full py-16 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-display text-3xl md:text-4xl text-charcoal mb-12">
            What Our Subscribers Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <blockquote className="bg-white p-6 rounded-2xl shadow-lg">
              <p className="text-gray-600 mb-4">
                "The weekly newsletter has been a game-changer for me. The
                practical tips and community stories make me feel less alone in
                my journey."
              </p>
              <footer className="text-charcoal font-medium">
                - Sarah K., ADHD Community Member
              </footer>
            </blockquote>
            <blockquote className="bg-white p-6 rounded-2xl shadow-lg">
              <p className="text-gray-600 mb-4">
                "I love how the newsletter combines scientific research with
                real-world applications. It's exactly what I needed."
              </p>
              <footer className="text-charcoal font-medium">
                - Michael R., Parent & Advocate
              </footer>
            </blockquote>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="w-full bg-charcoal py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-display text-3xl md:text-4xl text-white mb-6">
            Ready to Transform Your Journey?
          </h2>
          <p className="text-lg text-white/80 mb-8">
            Join our community and get weekly insights that make a difference.
          </p>
          <div className="max-w-md mx-auto">
            <NewsletterForm />
            <p className="mt-4 text-sm text-white/60">
              You'll receive one newsletter per week. No spam, ever.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
