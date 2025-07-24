import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-700 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
             <div className="w-8 h-8 rounded-full flex items-center justify-center overflow-hidden">
  <img 
    src="https://static.vecteezy.com/system/resources/thumbnails/010/761/472/small_2x/fh-logo-f-h-design-white-fh-letter-fh-letter-logo-design-initial-letter-fh-linked-circle-uppercase-monogram-logo-vector.jpg"  // Path to your image
    alt="Fitness Hub Logo"
    className="w-full h-full object-cover"
    onError={(e) => {
      e.target.src = 'https://via.placeholder.com/32';
      console.error("Failed to load logo");
    }}
  />
</div>
              <span className="text-xl font-bold">Fitness Hub</span>
            </div>
            <p className="text-gray-400 mb-6 leading-relaxed">
              Transform your mind and body with our comprehensive wellness platform. 
              Join thousands on their journey to better health and mindfulness.
            </p>
           
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-gray-400 hover:text-white transition-colors duration-200">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="text-gray-400 hover:text-white transition-colors duration-200">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link to="/meditation" className="text-gray-400 hover:text-white transition-colors duration-200">
                  Meditation
                </Link>
              </li>
              <li>
                <Link to="/yoga" className="text-gray-400 hover:text-white transition-colors duration-200">
                  Yoga Studio
                </Link>
              </li>
              <li>
                <Link to="/diet" className="text-gray-400 hover:text-white transition-colors duration-200">
                  Diet Library
                </Link>
              </li>
              <li>
                <Link to="/profile" className="text-gray-400 hover:text-white transition-colors duration-200">
                  Profile
                </Link>
              </li>
            </ul>
          </div>

          {/* Wellness Categories */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Wellness</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                  Mindfulness
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                  Stress Relief
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                  Healthy Recipes
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                  Workout Plans
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                  Sleep Better
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                  Mental Health
                </a>
              </li>
            </ul>
          </div>

          {/* Support & Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Support</h3>
            <ul className="space-y-3">
              <li>
               
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                  Terms of Service
                </a>
              </li>
              <li>
               
              </li>
              <li>
               
              </li>
            </ul>
          </div>
        </div>

       

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="text-gray-400 text-sm mb-4 md:mb-0">
            © {currentYear} Fitness Hub. All rights reserved. Made with ❤️ for your wellness journey.
          </div>
          <div className="flex items-center space-x-6 text-sm">
            <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
              Accessibility
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
              Sitemap
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;