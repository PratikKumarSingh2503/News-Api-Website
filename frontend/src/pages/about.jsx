import React from "react";

const About = () => {
  return (
    <section className="bg-neutral-50 py-16">
      <div className="mx-auto max-w-7xl px-4">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-4">
            About PulseNews
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            PulseNews brings you the latest headlines, trending stories, and
            in-depth news analysis from around the world. Our mission is to keep
            you informed, engaged, and connected with current events that
            matter.
          </p>
        </div>

        {/* Features / Values */}
        <div className="grid gap-8 md:grid-cols-3">
          <div className="p-6 bg-white rounded-2xl shadow hover:shadow-lg transition">
            <h2 className="text-xl font-bold mb-3">📰 Up-to-date News</h2>
            <p className="text-gray-600">
              Stay ahead with real-time updates on global events, technology,
              sports, entertainment, and more.
            </p>
          </div>
          <div className="p-6 bg-white rounded-2xl shadow hover:shadow-lg transition">
            <h2 className="text-xl font-bold mb-3">🌐 Global Coverage</h2>
            <p className="text-gray-600">
              Explore news from multiple sources worldwide to get diverse
              perspectives and stay informed.
            </p>
          </div>
          <div className="p-6 bg-white rounded-2xl shadow hover:shadow-lg transition">
            <h2 className="text-xl font-bold mb-3">💡 Insightful Analysis</h2>
            <p className="text-gray-600">
              Not just headlines — we provide context, trends, and analysis to
              help you understand the bigger picture.
            </p>
          </div>
        </div>

        {/* Team / Mission */}
        <div className="mt-16 text-center">
          <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
          <p className="text-gray-600 max-w-3xl mx-auto mb-8">
            At PulseNews, we believe in delivering accurate, trustworthy, and
            timely news to our readers. We strive to create a platform where
            quality journalism meets accessibility, keeping everyone informed no
            matter where they are.
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            <div className="bg-white rounded-xl shadow p-6 w-60">
              <h3 className="text-lg font-semibold mb-2">Pratik Kumar Singh</h3>
              <p className="text-gray-500 text-sm">Editor-in-Chief</p>
            </div>
            <div className="bg-white rounded-xl shadow p-6 w-60">
              <h3 className="text-lg font-semibold mb-2">Pratik Kumar Singh</h3>
              <p className="text-gray-500 text-sm">Head of Technology</p>
            </div>
            <div className="bg-white rounded-xl shadow p-6 w-60">
              <h3 className="text-lg font-semibold mb-2">Pratik Kumar Singh</h3>
              <p className="text-gray-500 text-sm">Lead Reporter</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
// import React from "react";

// export default function About() {
//   return (
//     <section className="bg-neutral-50 min-h-screen py-16 px-6">
//       <div className="mx-auto max-w-5xl text-center">
//         <h1 className="text-4xl font-bold text-gray-900 mb-6">About PulseNews</h1>
//         <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
//           PulseNews is your one-stop destination for the latest headlines, in-depth stories,
//           and trending updates from around the globe. We bring news directly from trusted
//           sources, covering categories like business, technology, sports, health, and more.
//         </p>

//         <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
//           <div className="rounded-xl bg-white p-6 shadow hover:shadow-md transition">
//             <h3 className="text-xl font-semibold text-rose-600 mb-2">Fast Updates</h3>
//             <p className="text-gray-600 text-sm">
//               Stay informed with real-time news updates so you never miss a story.
//             </p>
//           </div>
//           <div className="rounded-xl bg-white p-6 shadow hover:shadow-md transition">
//             <h3 className="text-xl font-semibold text-rose-600 mb-2">Trusted Sources</h3>
//             <p className="text-gray-600 text-sm">
//               Our news feed comes directly from reliable publishers worldwide.
//             </p>
//           </div>
//           <div className="rounded-xl bg-white p-6 shadow hover:shadow-md transition">
//             <h3 className="text-xl font-semibold text-rose-600 mb-2">Personalized</h3>
//             <p className="text-gray-600 text-sm">
//               Browse categories and search topics tailored to your interests.
//             </p>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }
