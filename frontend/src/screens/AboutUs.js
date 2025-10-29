import React from 'react';

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-[#0F0F0F] text-white">
      {/* Hero Section with Typewriter */}
      <div className="relative overflow-hidden bg-[#1C1C1E] py-20 border-b border-gray-800">
        <div className="relative max-w-6xl mx-auto px-4 text-center">
          <div className="mb-8">
            <span className="text-2xl md:text-3xl font-medium text-[#20A4F3] animate-typewriter">Hello World! Welcome to About Us Page</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-white">About LibraryApp</h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto text-gray-300">
            Revolutionizing library management through innovative technology
          </p>
          <div className="w-24 h-1 bg-[#20A4F3] mx-auto rounded"></div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-16">
        {/* Mission & Vision */}
        <div className="grid md:grid-cols-2 gap-12 mb-20">
          <div className="bg-[#1C1C1E] rounded-2xl shadow-xl p-8 transform hover:scale-105 transition-transform border border-gray-800">
            <div className="w-16 h-16 bg-[#20A4F3]/20 rounded-full flex items-center justify-center mb-6">
              <svg className="w-8 h-8 text-[#20A4F3]" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-white mb-4">Our Mission</h2>
            <p className="text-gray-300 leading-relaxed">
              To democratize access to knowledge by creating an intuitive, efficient digital library platform 
              that seamlessly connects students, librarians, and educational resources.
            </p>
          </div>
          
          <div className="bg-[#1C1C1E] rounded-2xl shadow-xl p-8 transform hover:scale-105 transition-transform border border-gray-800">
            <div className="w-16 h-16 bg-[#20A4F3]/20 rounded-full flex items-center justify-center mb-6">
              <svg className="w-8 h-8 text-[#20A4F3]" fill="currentColor" viewBox="0 0 20 20">
                <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z"/>
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-white mb-4">Our Vision</h2>
            <p className="text-gray-300 leading-relaxed">
              To become the leading digital library solution that transforms how educational institutions 
              manage their resources and enhance the learning experience globally.
            </p>
          </div>
        </div>

        {/* Features Section */}
        <div className="mb-20">
          <h2 className="text-4xl font-bold text-center text-white mb-12">Why Choose LibraryApp?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center group">
              <div className="w-20 h-20 bg-[#20A4F3] rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z"/>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Smart Book Management</h3>
              <p className="text-gray-300">Advanced catalog system with real-time inventory tracking and automated notifications</p>
            </div>
            <div className="text-center group">
              <div className="w-20 h-20 bg-[#20A4F3] rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Seamless Experience</h3>
              <p className="text-gray-300">Intuitive interface designed for both students and librarians with minimal learning curve</p>
            </div>
            <div className="text-center group">
              <div className="w-20 h-20 bg-[#20A4F3] rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"/>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Real-time Analytics</h3>
              <p className="text-gray-300">Comprehensive reporting and insights to optimize library operations and user engagement</p>
            </div>
          </div>
        </div>

        {/* Developer Section */}
        <div className="bg-[#1C1C1E] rounded-2xl shadow-2xl p-12 text-white mb-20 border border-gray-800">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 text-white">Meet the Developer</h2>
            <p className="text-gray-300 text-lg">Crafted with passion and expertise</p>
          </div>
          <div className="flex flex-col md:flex-row items-center justify-center gap-12">
            <div className="text-center md:text-left">
              <h3 className="text-2xl font-bold mb-4 text-white">Shivansu Bisht</h3>
              <p className="text-gray-300 mb-6 max-w-md">
                Full-stack developer passionate about creating innovative solutions that make a difference. 
                Specialized in modern web technologies and user-centric design.
              </p>
              <div className="flex justify-center md:justify-start space-x-4">
                <a 
                  href="https://github.com/Shivansu77" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-[#20A4F3] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#1B8FD9] transition-colors flex items-center space-x-2"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clipRule="evenodd"/>
                  </svg>
                  <span>View GitHub</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Section */}
        <div className="bg-[#1C1C1E] rounded-2xl shadow-xl p-12 text-center border border-gray-800">
          <h2 className="text-4xl font-bold text-white mb-8">Get In Touch</h2>
          <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
            Have questions or suggestions? We'd love to hear from you and help improve your library experience.
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-[#20A4F3]/20 rounded-full flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-[#20A4F3]" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
                </svg>
              </div>
              <h3 className="font-semibold text-white mb-2">Email</h3>
              <p className="text-gray-300">support@libraryapp.com</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-[#20A4F3]/20 rounded-full flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-[#20A4F3]" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/>
                </svg>
              </div>
              <h3 className="font-semibold text-white mb-2">Phone</h3>
              <p className="text-gray-300">+1 (555) 123-4567</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-[#20A4F3]/20 rounded-full flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-[#20A4F3]" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"/>
                </svg>
              </div>
              <h3 className="font-semibold text-white mb-2">Address</h3>
              <p className="text-gray-300">123 Innovation Drive<br/>Tech City, TC 12345</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;