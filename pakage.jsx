```jsx
import React, { useState, useEffect } from 'react';

const App = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [currentView, setCurrentView] = useState('home');
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [cart, setCart] = useState([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [filterCategory, setFilterCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Mock course data
  const courses = [
    {
      id: 1,
      title: "Digital Marketing Masterclass",
      category: "Marketing",
      description: "Learn the fundamentals of digital marketing including SEO, social media, email marketing, and analytics.",
      price: 99.99,
      duration: "8 weeks",
      level: "Beginner",
      image: "https://placehold.co/400x250/FF7F00/FFFFFF?text=Digital+Marketing",
      rating: 4.8,
      students: 2345,
      lessons: 45
    },
    {
      id: 2,
      title: "Full Stack Web Development",
      category: "Development",
      description: "Become a full stack developer with this comprehensive course covering HTML, CSS, JavaScript, React, and Node.js.",
      price: 149.99,
      duration: "12 weeks",
      level: "Intermediate",
      image: "https://placehold.co/400x250/1E3A8A/FFFFFF?text=Web+Development",
      rating: 4.9,
      students: 1892,
      lessons: 78
    },
    {
      id: 3,
      title: "Computer Basics for Beginners",
      category: "Technology",
      description: "Master the fundamentals of computer operation, file management, and essential software applications.",
      price: 49.99,
      duration: "4 weeks",
      level: "Beginner",
      image: "https://placehold.co/400x250/3B82F6/FFFFFF?text=Computer+Basics",
      rating: 4.7,
      students: 3120,
      lessons: 32
    },
    {
      id: 4,
      title: "Advanced Data Science",
      category: "Development",
      description: "Dive deep into machine learning, statistical analysis, and data visualization with Python and R.",
      price: 199.99,
      duration: "16 weeks",
      level: "Advanced",
      image: "https://placehold.co/400x250/1E3A8A/FFFFFF?text=Data+Science",
      rating: 4.9,
      students: 876,
      lessons: 92
    },
    {
      id: 5,
      title: "Social Media Marketing",
      category: "Marketing",
      description: "Master social media platforms and learn strategies to grow your brand and engage your audience.",
      price: 79.99,
      duration: "6 weeks",
      level: "Beginner",
      image: "https://placehold.co/400x250/FF7F00/FFFFFF?text=Social+Media",
      rating: 4.6,
      students: 1567,
      lessons: 38
    },
    {
      id: 6,
      title: "UI/UX Design Fundamentals",
      category: "Design",
      description: "Learn the principles of user interface and user experience design to create beautiful, functional products.",
      price: 129.99,
      duration: "10 weeks",
      level: "Intermediate",
      image: "https://placehold.co/400x250/3B82F6/FFFFFF?text=UI/UX+Design",
      rating: 4.8,
      students: 1234,
      lessons: 56
    }
  ];

  const categories = ['all', ...new Set(courses.map(course => course.category))];

  const filteredCourses = courses.filter(course => {
    const matchesCategory = filterCategory === 'all' || course.category === filterCategory;
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         course.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const addToCart = (course) => {
    setCart([...cart, course]);
  };

  const removeFromCart = (courseId) => {
    setCart(cart.filter(item => item.id !== courseId));
  };

  const getTotalPrice = () => {
    return cart.reduce((total, course) => total + course.price, 0).toFixed(2);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setUser({ name: "John Doe", email: "john@example.com" });
    setShowLogin(false);
  };

  const handleRegister = (e) => {
    e.preventDefault();
    setUser({ name: "New User", email: e.target.email.value });
    setShowRegister(false);
  };

  const logout = () => {
    setUser(null);
  };

  // Navbar Component
  const Navbar = () => (
    <nav className={`sticky top-0 z-50 ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-800'} shadow-md transition-all duration-300`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <span className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-blue-600 bg-clip-text text-transparent">
                EduMarket
              </span>
            </div>
            <div className="hidden md:ml-6 md:flex md:space-x-8">
              <button 
                onClick={() => setCurrentView('home')}
                className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors duration-200 ${
                  currentView === 'home' 
                    ? 'border-orange-500 text-orange-600 dark:text-orange-400' 
                    : 'border-transparent hover:border-gray-300 dark:hover:border-gray-700'
                }`}
              >
                Home
              </button>
              <button 
                onClick={() => setCurrentView('courses')}
                className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors duration-200 ${
                  currentView === 'courses' 
                    ? 'border-orange-500 text-orange-600 dark:text-orange-400' 
                    : 'border-transparent hover:border-gray-300 dark:hover:border-gray-700'
                }`}
              >
                Courses
              </button>
              <button 
                onClick={() => setCurrentView('about')}
                className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors duration-200 ${
                  currentView === 'about' 
                    ? 'border-orange-500 text-orange-600 dark:text-orange-400' 
                    : 'border-transparent hover:border-gray-300 dark:hover:border-gray-700'
                }`}
              >
                About Us
              </button>
              <button 
                onClick={() => setCurrentView('contact')}
                className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors duration-200 ${
                  currentView === 'contact' 
                    ? 'border-orange-500 text-orange-600 dark:text-orange-400' 
                    : 'border-transparent hover:border-gray-300 dark:hover:border-gray-700'
                }`}
              >
                Contact
              </button>
            </div>
          </div>
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <button
                onClick={() => setCurrentView('cart')}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200 relative mr-2"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 11-4 0v-6m4 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01" />
                </svg>
                {cart.length > 0 && (
                  <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-orange-600 rounded-full">
                    {cart.length}
                  </span>
                )}
              </button>
              <button
                onClick={() => setDarkMode(!darkMode)}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200 mr-2"
              >
                {darkMode ? (
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                ) : (
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                  </svg>
                )}
              </button>
              {user ? (
                <div className="relative">
                  <button
                    onClick={logout}
                    className="ml-2 px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 transition-colors duration-200"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div className="flex space-x-2">
                  <button
                    onClick={() => setShowLogin(true)}
                    className="px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 transition-colors duration-200"
                  >
                    Login
                  </button>
                  <button
                    onClick={() => setShowRegister(true)}
                    className="px-4 py-2 border border-orange-600 text-orange-600 rounded-md hover:bg-orange-50 dark:hover:bg-gray-800 transition-colors duration-200"
                  >
                    Register
                  </button>
                </div>
              )}
            </div>
            <div className="flex md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  {isMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className={`px-2 pt-2 pb-3 space-y-1 sm:px-3 ${darkMode ? 'bg-gray-900' : 'bg-white'}`}>
            <button 
              onClick={() => {setCurrentView('home'); setIsMenuOpen(false);}}
              className={`block px-3 py-2 rounded-md text-base font-medium w-full text-left ${
                currentView === 'home' 
                  ? 'bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400' 
                  : 'hover:bg-gray-100 dark:hover:bg-gray-800'
              }`}
            >
              Home
            </button>
            <button 
              onClick={() => {setCurrentView('courses'); setIsMenuOpen(false);}}
              className={`block px-3 py-2 rounded-md text-base font-medium w-full text-left ${
                currentView === 'courses' 
                  ? 'bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400' 
                  : 'hover:bg-gray-100 dark:hover:bg-gray-800'
              }`}
            >
              Courses
            </button>
            <button 
              onClick={() => {setCurrentView('about'); setIsMenuOpen(false);}}
              className={`block px-3 py-2 rounded-md text-base font-medium w-full text-left ${
                currentView === 'about' 
                  ? 'bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400' 
                  : 'hover:bg-gray-100 dark:hover:bg-gray-800'
              }`}
            >
              About Us
            </button>
            <button 
              onClick={() => {setCurrentView('contact'); setIsMenuOpen(false);}}
              className={`block px-3 py-2 rounded-md text-base font-medium w-full text-left ${
                currentView === 'contact' 
                  ? 'bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400' 
                  : 'hover:bg-gray-100 dark:hover:bg-gray-800'
              }`}
            >
              Contact
            </button>
          </div>
        </div>
      )}
    </nav>
  );

  // Hero Section
  const HeroSection = () => (
    <div className={`relative ${darkMode ? 'bg-gray-900' : 'bg-white'} overflow-hidden`}>
      <div className="max-w-7xl mx-auto">
        <div className="relative z-10 pb-8 sm:pb-16 md:pb-20 lg:w-full lg:pb-28 xl:pb-32">
          <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
            <div className="sm:text-center lg:text-left">
              <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white sm:text-5xl md:text-6xl">
                <span className="block xl:inline">Transform Your Career</span>{' '}
                <span className="block text-orange-600 dark:text-orange-400 xl:inline">With Our Online Courses</span>
              </h1>
              <p className="mt-3 text-base text-gray-500 dark:text-gray-300 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                Learn in-demand skills from industry experts. Flexible learning, lifetime access, and certificates upon completion.
              </p>
              <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                <div className="rounded-md shadow">
                  <button
                    onClick={() => setCurrentView('courses')}
                    className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-orange-600 hover:bg-orange-700 md:py-4 md:text-lg md:px-10 transition-transform duration-200 transform hover:scale-105"
                  >
                    Browse Courses
                  </button>
                </div>
                <div className="mt-3 sm:mt-0 sm:ml-3">
                  <button
                    onClick={() => setCurrentView('about')}
                    className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-orange-600 bg-orange-100 hover:bg-orange-200 dark:bg-orange-900/30 dark:text-orange-400 dark:hover:bg-orange-900/50 md:py-4 md:text-lg md:px-10 transition-transform duration-200 transform hover:scale-105"
                  >
                    Learn More
                  </button>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
      <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
        <img
          className="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full"
          src="https://placehold.co/800x600/1E3A8A/FFFFFF?text=Online+Learning"
          alt="Online Learning"
        />
      </div>
    </div>
  );

  // Course Card Component
  const CourseCard = ({ course }) => (
    <div className={`rounded-lg overflow-hidden shadow-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
      <div className="relative">
        <img className="w-full h-48 object-cover" src={course.image} alt={course.title} />
        <div className="absolute top-2 right-2 bg-orange-600 text-white px-2 py-1 rounded-md text-sm font-medium">
          {course.level}
        </div>
      </div>
      <div className="p-5">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">{course.title}</h3>
          <span className="text-lg font-bold text-orange-600 dark:text-orange-400">${course.price}</span>
        </div>
        <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2">{course.description}</p>
        <div className="flex items-center mb-3">
          <div className="flex text-yellow-400">
            {[...Array(5)].map((_, i) => (
              <svg key={i} className="w-4 h-4" fill={i < Math.floor(course.rating) ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
              </svg>
            ))}
          </div>
          <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">{course.rating} ({course.students} students)</span>
        </div>
        <div className="flex justify-between items-center text-sm text-gray-500 dark:text-gray-400 mb-4">
          <span>{course.duration}</span>
          <span>{course.lessons} lessons</span>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => setSelectedCourse(course)}
            className="flex-1 py-2 px-4 border border-orange-600 text-orange-600 dark:text-orange-400 rounded-md hover:bg-orange-50 dark:hover:bg-orange-900/20 transition-colors duration-200"
          >
            View Details
          </button>
          <button
            onClick={() => addToCart(course)}
            className="py-2 px-4 bg-orange-600 text-white rounded-md hover:bg-orange-700 transition-colors duration-200"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );

  // Course Detail Modal
  const CourseDetailModal = ({ course, onClose }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className={`max-w-4xl w-full rounded-lg shadow-xl overflow-hidden ${darkMode ? 'bg-gray-800' : 'bg-white'} max-h-screen overflow-y-auto`}>
        <div className="relative">
          <img className="w-full h-64 object-cover" src={course.image} alt={course.title} />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-white dark:bg-gray-800 rounded-full p-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            <svg className="h-6 w-6 text-gray-600 dark:text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">{course.title}</h2>
            <div className="text-right">
              <span className="text-3xl font-bold text-orange-600 dark:text-orange-400">${course.price}</span>
              <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">{course.category}</div>
            </div>
          </div>
          <div className="flex items-center mb-6">
            <div className="flex text-yellow-400">
              {[...Array(5)].map((_, i) => (
                <svg key={i} className="w-5 h-5" fill={i < Math.floor(course.rating) ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                </svg>
              ))}
            </div>
            <span className="ml-2 text-gray-600 dark:text-gray-300">({course.rating}) • {course.students} students enrolled</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
              <div className="text-sm text-gray-500 dark:text-gray-400">Duration</div>
              <div className="font-semibold text-gray-900 dark:text-white">{course.duration}</div>
            </div>
            <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
              <div className="text-sm text-gray-500 dark:text-gray-400">Lessons</div>
              <div className="font-semibold text-gray-900 dark:text-white">{course.lessons}</div>
            </div>
            <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
              <div className="text-sm text-gray-500 dark:text-gray-400">Level</div>
              <div className="font-semibold text-gray-900 dark:text-white">{course.level}</div>
            </div>
          </div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Course Description</h3>
          <p className="text-gray-600 dark:text-gray-300 mb-6">{course.description}</p>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">What You'll Learn</h3>
          <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 mb-6 space-y-2">
            <li>Master the fundamentals of {course.category}</li>
            <li>Apply practical skills through hands-on projects</li>
            <li>Build a portfolio to showcase your new abilities</li>
            <li>Get certified upon course completion</li>
          </ul>
          <div className="flex space-x-4 pt-6 border-t border-gray-200 dark:border-gray-700">
            <button
              onClick={() => addToCart(course)}
              className="flex-1 py-3 px-6 bg-orange-600 text-white rounded-md hover:bg-orange-700 transition-colors duration-200 font-medium"
            >
              Add to Cart
            </button>
            <button
              onClick={() => {addToCart(course); setCurrentView('cart');}}
              className="flex-1 py-3 px-6 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200 font-medium"
            >
              Enroll Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  // Cart Component
  const CartComponent = () => (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Your Cart</h1>
      {cart.length === 0 ? (
        <div className={`text-center py-12 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 11-4 0v-6m4 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01" />
          </svg>
          <h3 className="mt-2 text-xl font-medium text-gray-900 dark:text-white">Your cart is empty</h3>
          <p className="mt-1 text-gray-500 dark:text-gray-400">Looks like you haven't added any courses to your cart yet.</p>
          <button
            onClick={() => setCurrentView('courses')}
            className="mt-6 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
          >
            Browse Courses
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {cart.map((item) => (
            <div key={item.id} className={`p-6 rounded-lg shadow-md ${darkMode ? 'bg-gray-800' : 'bg-white'} flex flex-col md:flex-row`}>
              <img className="w-full md:w-48 h-32 object-cover rounded-md mb-4 md:mb-0 md:mr-6" src={item.image} alt={item.title} />
              <div className="flex-1">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">{item.title}</h3>
                  <span className="text-lg font-bold text-orange-600 dark:text-orange-400">${item.price}</span>
                </div>
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">{item.description}</p>
                <div className="flex items-center mb-3">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-4 h-4" fill={i < Math.floor(item.rating) ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                      </svg>
                    ))}
                  </div>
                  <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">{item.rating}</span>
                </div>
              </div>
              <div className="md:ml-6 mt-4 md:mt-0 flex items-start">
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 transition-colors"
                >
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
          <div className={`p-6 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-gray-100'} mt-8`}>
            <div className="flex justify-between text-xl font-bold mb-4">
              <span>Total:</span>
              <span className="text-orange-600 dark:text-orange-400">${getTotalPrice()}</span>
            </div>
            <button
              onClick={() => alert('Checkout functionality would be implemented here!')}
              className="w-full py-3 px-6 bg-orange-600 text-white rounded-md hover:bg-orange-700 transition-colors duration-200 font-medium"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );

  // About Us Component
  const AboutUsComponent = () => (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">About EduMarket</h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          We're on a mission to make high-quality education accessible to everyone, everywhere.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Our Story</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Founded in 2020, EduMarket began with a simple idea: to bridge the gap between traditional education and the rapidly evolving digital world. 
            Our founders, industry experts with decades of experience, recognized that many people lacked access to practical, up-to-date skills training.
          </p>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Today, we've grown into a global platform with thousands of students from over 100 countries. 
            Our courses are designed by industry professionals and updated regularly to reflect the latest trends and technologies.
          </p>
          <p className="text-gray-600 dark:text-gray-300">
            We believe that education should be flexible, affordable, and focused on real-world applications that help our students succeed in their careers.
          </p>
        </div>
        <div>
          <img 
            src="https://placehold.co/600x400/1E3A8A/FFFFFF?text=Our+Team" 
            alt="Our Team" 
            className="rounded-lg shadow-lg w-full h-auto"
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        <div className={`p-6 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-md text-center`}>
          <div className="text-4xl font-bold text-orange-600 dark:text-orange-400 mb-4">10K+</div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Students</h3>
          <p className="text-gray-600 dark:text-gray-300">From over 100 countries around the world</p>
        </div>
        <div className={`p-6 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-md text-center`}>
          <div className="text-4xl font-bold text-orange-600 dark:text-orange-400 mb-4">50+</div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Courses</h3>
          <p className="text-gray-600 dark:text-gray-300">Continuously updated with industry trends</p>
        </div>
        <div className={`p-6 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-md text-center`}>
          <div className="text-4xl font-bold text-orange-600 dark:text-orange-400 mb-4">98%</div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Satisfaction</h3>
          <p className="text-gray-600 dark:text-gray-300">Of students would recommend us to others</p>
        </div>
      </div>
      
      <div className={`rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-gray-100'} p-8`}>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">Our Instructors</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { name: "Sarah Johnson", role: "Digital Marketing Expert", image: "https://placehold.co/200x200/FF7F00/FFFFFF?text=SJ" },
            { name: "Michael Chen", role: "Senior Web Developer", image: "https://placehold.co/200x200/1E3A8A/FFFFFF?text=MC" },
            { name: "Emily Rodriguez", role: "UX Design Lead", image: "https://placehold.co/200x200/3B82F6/FFFFFF?text=ER" }
          ].map((instructor, index) => (
            <div key={index} className="text-center">
              <img 
                src={instructor.image} 
                alt={instructor.name} 
                className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
              />
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">{instructor.name}</h3>
              <p className="text-gray-600 dark:text-gray-300">{instructor.role}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // Contact Component
  const ContactComponent = () => (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Get In Touch</h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          Have questions? We're here to help you on your learning journey.
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Contact Information</h2>
          <div className="space-y-6">
            <div className="flex items-start">
              <div className="flex-shrink-0 bg-orange-100 dark:bg-orange-900/30 p-3 rounded-md">
                <svg className="h-6 w-6 text-orange-600 dark:text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">Address</h3>
                <p className="mt-1 text-gray-600 dark:text-gray-300">123 Education Street, Learning City, LC 12345</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="flex-shrink-0 bg-orange-100 dark:bg-orange-900/30 p-3 rounded-md">
                <svg className="h-6 w-6 text-orange-600 dark:text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">Phone</h3>
                <p className="mt-1 text-gray-600 dark:text-gray-300">+1 (555) 123-4567</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="flex-shrink-0 bg-orange-100 dark:bg-orange-900/30 p-3 rounded-md">
                <svg className="h-6 w-6 text-orange-600 dark:text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">Email</h3>
                <p className="mt-1 text-gray-600 dark:text-gray-300">support@edumarket.com</p>
              </div>
            </div>
          </div>
          
          <div className="mt-12">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              {['Facebook', 'Twitter', 'Instagram', 'LinkedIn'].map((social) => (
                <a 
                  key={social} 
                  href="#" 
                  className="w-10 h-10 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center text-orange-600 dark:text-orange-400 hover:bg-orange-200 dark:hover:bg-orange-900/50 transition-colors"
                >
                  <span className="sr-only">{social}</span>
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.477 2 2 6.477 2 12c0 5.523 4.477 10 10 10s10-4.477 10-10c0-5.523-4.477-10-10-10zm0 18c-4.418 0-8-3.582-8-8s3.582-8 8-8 8 3.582 8 8-3.582 8-8 8z" />
                  </svg>
                </a>
              ))}
            </div>
          </div>
        </div>
        
        <div className={`p-6 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Send Us a Message</h2>
          <form onSubmit={(e) => {e.preventDefault(); alert('Message sent successfully!');}} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Name</label>
              <input
                type="text"
                id="name"
                className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm ${
                  darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
                }`}
                placeholder="Your name"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
              <input
                type="email"
                id="email"
                className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm ${
                  darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
                }`}
                placeholder="your@email.com"
              />
            </div>
            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Subject</label>
              <input
                type="text"
                id="subject"
                className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm ${
                  darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
                }`}
                placeholder="Subject"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Message</label>
              <textarea
                id="message"
                rows={4}
                className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm ${
                  darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
                }`}
                placeholder="Your message"
              ></textarea>
            </div>
            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-colors"
              >
                Send Message
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );

  // Login Modal
  const LoginModal = ({ onClose }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className={`max-w-md w-full rounded-lg shadow-xl overflow-hidden ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Login</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label htmlFor="email-login" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
              <input
                type="email"
                id="email-login"
                required
                className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm ${
                  darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
                }`}
                placeholder="your@email.com"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Password</label>
              <input
                type="password"
                id="password"
                required
                className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm ${
                  darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
                }`}
                placeholder="••••••••"
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                  Remember me
                </label>
              </div>
              <div className="text-sm">
                <a href="#" className="font-medium text-orange-600 hover:text-orange-500 dark:text-orange-400">
                  Forgot your password?
                </a>
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
              >
                Sign in
              </button>
            </div>
            <div className="text-sm text-center">
              <span className="text-gray-600 dark:text-gray-400">Don't have an account? </span>
              <button
                type="button"
                onClick={() => {setShowLogin(false); setShowRegister(true);}}
                className="font-medium text-orange-600 hover:text-orange-500 dark:text-orange-400"
              >
                Register here
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );

  // Register Modal
  const RegisterModal = ({ onClose }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className={`max-w-md w-full rounded-lg shadow-xl overflow-hidden ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Create Account</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <form onSubmit={handleRegister} className="space-y-6">
            <div>
              <label htmlFor="name-register" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Full Name</label>
              <input
                type="text"
                id="name-register"
                required
                className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm ${
                  darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
                }`}
                placeholder="John Doe"
              />
            </div>
            <div>
              <label htmlFor="email-register" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
              <input
                type="email"
                id="email-register"
                required
                className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm ${
                  darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
                }`}
                placeholder="your@email.com"
              />
            </div>
            <div>
              <label htmlFor="password-register" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Password</label>
              <input
                type="password"
                id="password-register"
                required
                className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm ${
                  darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
                }`}
                placeholder="••••••••"
              />
            </div>
            <div>
              <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Confirm Password</label>
              <input
                type="password"
                id="confirm-password"
                required
                className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm ${
                  darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
                }`}
                placeholder="••••••••"
              />
            </div>
            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
              >
                Create Account
              </button>
            </div>
            <div className="text-sm text-center">
              <span className="text-gray-600 dark:text-gray-400">Already have an account? </span>
              <button
                type="button"
                onClick={() => {setShowRegister(false); setShowLogin(true);}}
                className="font-medium text-orange-600 hover:text-orange-500 dark:text-orange-400"
              >
                Sign in here
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );

  // Footer Component
  const Footer = () => (
    <footer className={`mt-16 py-12 ${darkMode ? 'bg-gray-900 text-gray-300' : 'bg-gray-100 text-gray-600'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">EduMarket</h3>
            <p className="mb-4">Transform your career with our high-quality online courses taught by industry experts.</p>
            <div className="flex space-x-4">
              {['Facebook', 'Twitter', 'Instagram', 'LinkedIn'].map((social) => (
                <a 
                  key={social} 
                  href="#" 
                  className="text-gray-400 hover:text-orange-500 dark:hover:text-orange-400 transition-colors"
                >
                  <span className="sr-only">{social}</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.477 2 2 6.477 2 12c0 5.523 4.477 10 10 10s10-4.477 10-10c0-5.523-4.477-10-10-10zm0 18c-4.418 0-8-3.582-8-8s3.582-8 8-8 8 3.582 8 8-3.582 8-8 8z" />
                  </svg>
                </a>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Courses</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-orange-500 dark:hover:text-orange-400 transition-colors">Digital Marketing</a></li>
              <li><a href="#" className="hover:text-orange-500 dark:hover:text-orange-400 transition-colors">Web Development</a></li>
              <li><a href="#" className="hover:text-orange-500 dark:hover:text-orange-400 transition-colors">Computer Basics</a></li>
              <li><a href="#" className="hover:text-orange-500 dark:hover:text-orange-400 transition-colors">Data Science</a></li>
              <li><a href="#" className="hover:text-orange-500 dark:hover:text-orange-400 transition-colors">UI/UX Design</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Company</h3>
            <ul className="space-y-2">
              <li><a href="#" onClick={() => setCurrentView('about')} className="hover:text-orange-500 dark:hover:text-orange-400 transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-orange-500 dark:hover:text-orange-400 transition-colors">Careers</a></li>
              <li><a href="#" onClick={() => setCurrentView('contact')} className="hover:text-orange-500 dark:hover:text-orange-400 transition-colors">Contact</a></li>
              <li><a href="#" className="hover:text-orange-500 dark:hover:text-orange-400 transition-colors">Blog</a></li>
              <li><a href="#" className="hover:text-orange-500 dark:hover:text-orange-400 transition-colors">Press</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Support</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-orange-500 dark:hover:text-orange-400 transition-colors">Help Center</a></li>
              <li><a href="#" className="hover:text-orange-500 dark:hover:text-orange-400 transition-colors">FAQs</a></li>
              <li><a href="#" className="hover:text-orange-500 dark:hover:text-orange-400 transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-orange-500 dark:hover:text-orange-400 transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-orange-500 dark:hover:text-orange-400 transition-colors">Cookie Policy</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800 text-center">
          <p>&copy; {new Date().getFullYear()} EduMarket. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );

  // Main Render
  return (
    <div className={`min-h-screen ${darkMode ? 'dark bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
      <Navbar />
      
      {showLogin && <LoginModal onClose={() => setShowLogin(false)} />}
      {showRegister && <RegisterModal onClose={() => setShowRegister(false)} />}
      {selectedCourse && <CourseDetailModal course={selectedCourse} onClose={() => setSelectedCourse(null)} />}
      
      <main className="pt-16">
        {currentView === 'home' && (
          <>
            <HeroSection />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
              <h2 className="text-3xl font-bold text-center mb-12">Featured Courses</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {courses.slice(0, 3).map((course) => (
                  <CourseCard key={course.id} course={course} />
                ))}
              </div>
              <div className="text-center mt-12">
                <button
                  onClick={() => setCurrentView('courses')}
                  className="px-6 py-3 bg-orange-600 text-white rounded-md hover:bg-orange-700 transition-colors duration-200 font-medium"
                >
                  View All Courses
                </button>
              </div>
            </div>
          </>
        )}
        
        {currentView === 'courses' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="mb-8">
              <h1 className="text-3xl font-bold mb-6">All Courses</h1>
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <input
                    type="text"
                    placeholder="Search courses..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className={`w-full px-4 py-2 rounded-md border ${
                      darkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300 text-gray-900'
                    } focus:ring-2 focus:ring-orange-500 focus:border-orange-500`}
                  />
                </div>
                <div className="flex space-x-2 overflow-x-auto pb-2">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => setFilterCategory(category)}
                      className={`px-4 py-2 rounded-md whitespace-nowrap transition-colors ${
                        filterCategory === category
                          ? 'bg-orange-600 text-white'
                          : darkMode
                          ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {category === 'all' ? 'All Courses' : category}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredCourses.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
            {filteredCourses.length === 0 && (
              <div className="text-center py-12">
                <p className="text-xl text-gray-500 dark:text-gray-400">No courses found matching your criteria.</p>
              </div>
            )}
          </div>
        )}
        
        {currentView === 'cart' && <CartComponent />}
        {currentView === 'about' && <AboutUsComponent />}
        {currentView === 'contact' && <ContactComponent />}
      </main>
      
      <Footer />
    </div>
  );
};

export default App;
```
