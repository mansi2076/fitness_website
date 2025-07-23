import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Home = () => {
  const { user } = useAuth();

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://tempo.fit/_next/image?url=https%3A%2F%2Fwww.datocms-assets.com%2F135987%2F1723915932-hiit_in_line.jpeg&w=1920&q=80"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        </div>

        <div className="relative z-10 text-center text-green-500 max-w-4xl mx-auto px-4">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6 animate-fade-in text-green-600 drop-shadow-[0_0_20px_rgba(255,255,255,0.4)]">
  Transform Your
  <span className="block bg-gradient-to-r from-green-300 via-white to-purple-400 bg-clip-text text-transparent animate-pulse">
    Mind & Body
  </span>
</h1>

          <p className="text-xl md:text-2xl mb-8 text-gray-200 animate-slide-up">
            Discover your path to wellness with personalized meditation, yoga, nutrition, and fitness guidance
          </p>
          <Link
            to={user ? "/dashboard" : "/register"}
            className="inline-block bg-primary-500 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-primary-600 transform hover:scale-105 transition-all duration-300 shadow-lg animate-slide-up"
          >
            {user ? "Go to Dashboard" : "Start Your Journey"}
          </Link>
        </div>
      </section>

      {/* Features Section */}

<section className="py-24 bg-gradient-to-br from-blue-50 to-green-50 relative">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="text-center mb-16">
      <h2 className="text-4xl font-extrabold text-gray-800 tracking-tight mb-4">
        Explore Your Wellness Journey
      </h2>
      <p className="text-lg text-gray-600 max-w-2xl mx-auto">
        Powerful, calming, and personalized resources to nurture your mind and body.
      </p>
    </div>

    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
     
      <div className="group backdrop-blur-md bg-white/70 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-2 hover:rotate-1 duration-300 ease-in-out">
        <div className="relative w-16 h-16 mx-auto mb-5">
          <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-blue-400 to-purple-500 blur-xl opacity-20 group-hover:opacity-60 transition-all duration-300"></div>
          <div className="w-full h-full rounded-full flex items-center justify-center bg-white shadow-md relative z-10">
            <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          </div>
        </div>
        <h3 className="text-xl font-semibold text-gray-800 mb-2">Mindful Meditation</h3>
        <p className="text-sm text-gray-600">
          Calm your mind with personalized guided meditations.
        </p>
      </div>

   
      <div className="group backdrop-blur-md bg-white/70 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-2 hover:rotate-1 duration-300 ease-in-out">
        <div className="relative w-16 h-16 mx-auto mb-5">
          <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-pink-400 to-orange-400 blur-xl opacity-20 group-hover:opacity-60 transition-all duration-300"></div>
          <div className="w-full h-full rounded-full flex items-center justify-center bg-white shadow-md relative z-10">
            <svg className="w-8 h-8 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
        </div>
        <h3 className="text-xl font-semibold text-gray-800 mb-2">Yoga Practice</h3>
        <p className="text-sm text-gray-600">
          Energize and stretch with calming yoga sessions.
        </p>
      </div>

     
      <div className="group backdrop-blur-md bg-white/70 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-2 hover:rotate-1 duration-300 ease-in-out">
        <div className="relative w-16 h-16 mx-auto mb-5">
          <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-yellow-400 to-red-400 blur-xl opacity-20 group-hover:opacity-60 transition-all duration-300"></div>
          <div className="w-full h-full rounded-full flex items-center justify-center bg-white shadow-md relative z-10">
            <svg className="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16l-3-1m3 1l3-1" />
            </svg>
          </div>
        </div>
        <h3 className="text-xl font-semibold text-gray-800 mb-2">Nutrition Guide</h3>
        <p className="text-sm text-gray-600">
          Simple recipes and plans to fuel your body smartly.
        </p>
      </div>

    
      <div className="group backdrop-blur-md bg-white/70 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-2 hover:rotate-1 duration-300 ease-in-out">
        <div className="relative w-16 h-16 mx-auto mb-5">
          <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-green-400 to-emerald-500 blur-xl opacity-20 group-hover:opacity-60 transition-all duration-300"></div>
          <div className="w-full h-full rounded-full flex items-center justify-center bg-white shadow-md relative z-10">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
        </div>
        <h3 className="text-xl font-semibold text-gray-800 mb-2">Progress Tracking</h3>
        <p className="text-sm text-gray-600">
          Visual dashboards to monitor your wellness efforts.
        </p>
      </div>
    </div>
  </div>
</section>



      {/* Call to Action */}


<section className="py-24 bg-gray-100">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="grid md:grid-cols-2 gap-12 items-center">
      {/* Content Section - Left Side */}
      <div className="space-y-8">
        <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight">
          Ready to Begin Your Wellness Journey?
        </h2>
        <p className="text-lg text-gray-700 leading-relaxed">
          Join thousands who have transformed their lives through mindful practice and healthy living.
        </p>
        {!user && (
          <Link
            to="/register"
            className="inline-block px-8 py-3 bg-blue-600 text-white rounded-full text-lg font-bold shadow-md hover:bg-orange-700 transition duration-300 transform hover:scale-105"
          >
            Start Free Today
          </Link>
        )}
      </div>

      {/* Image Section - Right Side */}
      <div className="relative h-80 md:h-full rounded-xl overflow-hidden shadow-xl">
        <img
          src="https://img.freepik.com/free-photo/athlete-playing-sport-with-hand-drawn-doodles_23-2150036348.jpg" // Replace with your image path
          alt="People practicing wellness activities"
          className="w-full h-full object-cover"
        />
        {/* Optional decorative element */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-gray-100 opacity-20"></div>
      </div>
    </div>
  </div>
</section>

<section className="relative py-20 bg-gradient-to-br from-indigo-100 via-white to-green-100 overflow-hidden">
  {/* Background blobs */}
  <div className="absolute -top-32 -left-32 w-80 h-80 bg-purple-200 rounded-full opacity-30 blur-3xl animate-pulse"></div>
  <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-green-200 rounded-full opacity-30 blur-3xl animate-pulse"></div>

  <div className="relative max-w-6xl mx-auto px-4">
    <h2 className="text-4xl font-bold text-center text-green-800 mb-14 drop-shadow-md">
      What Our Community Says
    </h2>

    <div className="flex gap-6 overflow-x-auto pb-4 px-1 scrollbar-thin scrollbar-thumb-green-300">
      {[
        {
          img: "https://www.unesco.org/sites/default/files/styles/paragraph_medium_desktop/public/2022-04/godwin-angeline-benjo-An7LvVMb6rY-unsplash.jpeg?itok=WiXdfGRk",
          name: "Priya Sharma",
          desc: "Yoga Instructor, Delhi",
          rating: 5,
          quote:
            "Fitness Hub transformed my yoga practice with their guided sessions. The meditation programs help me maintain peace in my busy life.",
        },
        {
          img: "https://www.lenmed.co.za/wp-content/uploads/7-Factors-men-should-know-that-will-affect-their-health.jpg",
          name: "Rahul Patel",
          desc: "Gym Trainer, Mumbai",
          rating: 5,
          quote:
            "The workout plans are excellent! My clients have seen remarkable progress using Fitness Hub's personalized training programs.",
        },
        {
          img: "https://img.freepik.com/free-photo/happy-brunette-woman-confident-with-natural-hair-feeling-satisfied_482257-87906.jpg?semt=ais_hybrid&w=740",
          name: "Ananya Gupta",
          desc: "Homemaker, Bangalore",
          rating: 4,
          quote:
            "As a busy mom, the quick home workouts have been a lifesaver. I've lost 8kg in 3 months without leaving my house!",
        },
        {
          img: "https://primedirectcarega.com/wp-content/uploads/2024/11/13-copy.png",
          name: "Vikram Singh",
          desc: "Software Engineer, Pune",
          rating: 5,
          quote:
            "Perfect for IT professionals like me who sit all day. The posture correction exercises eliminated my back pain completely.",
        },
        {
          img: "https://images.unsplash.com/photo-1622782262026-6a327a45014f?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW5kaWFuJTIwZ2lybHxlbnwwfHwwfHx8MA%3D%3D",
          name: "Neha Kapoor",
          desc: "College Student, Chennai",
          rating: 5,
          quote:
            "The student discount made premium fitness accessible to me. Now I'm the fittest in my friend group!",
        },
        {
          img: "https://thumbs.dreamstime.com/b/portrait-young-handsome-man-white-shirt-outdoor-portrait-young-handsome-man-white-shirt-outdoor-nice-appearance-131934608.jpg",
          name: "Arjun Reddy",
          desc: "Marathon Runner, Hyderabad",
          rating: 4,
          quote:
            "The running training plans helped me shave 15 minutes off my half-marathon time. Nutrition guides are spot on!",
        },
      ].map((t, i) => (
        <div
          key={i}
          className="bg-white/70 backdrop-blur-lg rounded-2xl shadow-lg ring-1 ring-green-200 min-w-[300px] max-w-sm flex-shrink-0 p-6 transition-transform hover:scale-105"
        >
          <img
            src={t.img}
            alt={t.name}
            className="w-20 h-20 mx-auto rounded-full object-cover border-4 border-green-300 mb-4 shadow-md"
          />
          <h3 className="text-xl font-semibold text-center text-green-900">{t.name}</h3>
          <p className="text-sm text-center text-gray-700 mb-3">{t.desc}</p>
          <div className="flex justify-center gap-0.5 mb-3 text-yellow-400 text-lg">
            {[...Array(t.rating)].map((_, i) => (
              <span key={i}>★</span>
            ))}
            {[...Array(5 - t.rating)].map((_, i) => (
              <span key={i} className="text-gray-300">★</span>
            ))}
          </div>
          <p className="text-sm text-gray-800 italic text-center">
            “{t.quote}”
          </p>
        </div>
      ))}
    </div>
  </div>
</section>


    </div>
  );
};

export default Home;