import React from "react";

// Helper Components defined outside the main component
const StatCard = ({ value, label }) => (
  <div className="group cursor-pointer">
    <div className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300">
      {value}
    </div>
    <div className="text-sm text-gray-500 mt-1">{label}</div>
  </div>
);

const StepCard = ({ number, title, description, color }) => {
  const colorClasses = {
    purple: "bg-purple-100 text-purple-600 group-hover:bg-purple-500 group-hover:text-white",
    blue: "bg-blue-100 text-blue-600 group-hover:bg-blue-500 group-hover:text-white",
    indigo: "bg-indigo-100 text-indigo-600 group-hover:bg-indigo-500 group-hover:text-white"
  };
  
  return (
    <div className="group relative bg-white rounded-xl shadow-md p-6 text-center border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 cursor-pointer">
      <div className={`w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4 transition-all duration-300 ${colorClasses[color]}`}>
        {number}
      </div>
      <h3 className="font-semibold text-gray-800 text-lg group-hover:text-purple-600 transition-colors duration-300">{title}</h3>
      <p className="text-sm text-gray-500 mt-2 leading-relaxed">{description}</p>
    </div>
  );
};

const FeatureCard = ({ iconColor, title, description }) => {
  const getIcon = () => {
    switch(iconColor) {
      case 'purple':
        return (
          <svg className="w-6 h-6 text-purple-600 group-hover:text-white transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        );
      case 'blue':
        return (
          <svg className="w-6 h-6 text-blue-600 group-hover:text-white transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        );
      case 'indigo':
        return (
          <svg className="w-6 h-6 text-indigo-600 group-hover:text-white transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
        );
      default:
        return null;
    }
  };

  const bgColorClass = {
    purple: "bg-purple-100 group-hover:bg-gradient-to-br group-hover:from-purple-500 group-hover:to-purple-600",
    blue: "bg-blue-100 group-hover:bg-gradient-to-br group-hover:from-blue-500 group-hover:to-blue-600",
    indigo: "bg-indigo-100 group-hover:bg-gradient-to-br group-hover:from-indigo-500 group-hover:to-indigo-600"
  };

  return (
    <div className="group bg-white rounded-xl p-6 border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2 cursor-pointer">
      <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 transition-all duration-300 ${bgColorClass[iconColor]}`}>
        {getIcon()}
      </div>
      <h3 className="font-semibold text-gray-800 text-lg group-hover:text-purple-600 transition-colors duration-300">{title}</h3>
      <p className="text-sm text-gray-500 mt-2 leading-relaxed">{description}</p>
    </div>
  );
};

const Home = () => {
  // Handle upload navigation
  const handleUpload = () => {
    console.log("Navigate to upload page");
    // Add your navigation logic here
  };

  return (
    <div className="min-h-screen bg-white">
      {/* HERO SECTION - Updated to match login page gradient */}
      <section className="relative bg-gradient-to-br from-purple-700 via-purple-700 to-blue-800 px-6 pt-20 pb-24">
        {/* Subtle background pattern for texture */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-grid-white/10" style={{ 
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            backgroundRepeat: 'repeat'
          }}></div>
        </div>

        <div className="relative z-10 max-w-5xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-5 py-2 mb-8">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400"></span>
            </span>
            <span className="text-sm font-medium text-white tracking-wide">AI-POWERED SECURITY</span>
          </div>

          {/* Main Title */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 leading-tight">
            Face Anti-Spoofing
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-200 to-blue-200">
              System
            </span>
          </h1>

          {/* Description */}
          <p className="mt-6 text-lg md:text-xl text-purple-50 max-w-2xl mx-auto leading-relaxed">
            Advanced liveness detection powered by machine learning. Protects against 
            <span className="font-semibold text-white"> printed photo attacks</span> and 
            <span className="font-semibold text-white"> screen replay attempts</span> with 98.7% accuracy.
          </p>

          {/* Upload Button */}
          <div className="mt-10">
            <button
              onClick={handleUpload}
              className="group inline-flex"
            >
              <div className="flex items-center gap-3 bg-white rounded-full px-8 py-3.5 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
                <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                </svg>
                <span className="text-base font-semibold text-gray-800">Upload Image → Test Now</span>
              </div>
            </button>
            <div className="flex items-center justify-center gap-2 text-sm text-purple-100 mt-4">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              <span>Real-time detection • Supports JPG, PNG, WEBP</span>
            </div>
          </div>

          {/* Trust indicators */}
          <div className="mt-12 flex justify-center gap-8 text-white/80 text-sm">
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <span>Enterprise Grade</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <span>GDPR Compliant</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <span>24/7 Support</span>
            </div>
          </div>
        </div>
      </section>

      {/* STATS SECTION - Updated gradient colors */}
      <div className="bg-white border-b border-gray-100 py-8">
        <div className="max-w-5xl mx-auto flex flex-wrap justify-center gap-8 md:gap-12 px-6 text-center">
          <StatCard value="98.7%" label="Detection Accuracy" />
          <StatCard value="&lt;0.5s" label="Inference Time" />
          <StatCard value="2" label="Attack Types Covered" />
          <StatCard value="24/7" label="Ready for Integration" />
        </div>
      </div>

      {/* ABOUT SECTION - Updated gradient */}
      <section className="px-6 py-16 max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-slate-800">About the Project</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-purple-600 to-blue-600 mx-auto mt-3 rounded-full"></div>
        </div>
        <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-2xl shadow-sm border border-purple-100 p-8 md:p-10">
          <p className="text-gray-700 leading-relaxed">
            Face spoofing remains one of the most critical vulnerabilities in facial recognition systems. 
            Attackers commonly exploit this weakness using <span className="font-semibold text-purple-700">printed photos</span> or 
            <span className="font-semibold text-purple-700"> screen replays</span> to bypass authentication.
          </p>
          <p className="text-gray-700 leading-relaxed mt-4">
            This project implements a robust anti-spoofing solution using <span className="font-mono text-sm bg-white px-1.5 py-0.5 rounded text-purple-700 font-semibold">Local Binary Patterns (LBP)</span> 
            for texture feature extraction combined with a machine learning classifier. The system effectively distinguishes between genuine live faces and spoof presentations, 
            providing a critical security layer for identity verification systems.
          </p>
        </div>
      </section>

      {/* HOW IT WORKS - Updated gradient */}
      <section className="bg-gradient-to-r from-purple-50 to-blue-50 py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-800">How It Works</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-purple-600 to-blue-600 mx-auto mt-3 rounded-full"></div>
            <p className="text-gray-500 mt-4">Three simple steps to detect spoofing attempts</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 relative">
            {/* Connector line */}
            <div className="hidden md:block absolute top-1/3 left-[15%] right-[15%] h-0.5 bg-gradient-to-r from-purple-300 via-blue-300 to-purple-300 -translate-y-1/2"></div>

            <StepCard number="1" title="Input Image" description="User uploads a facial image through the secure upload interface." color="purple" />
            <StepCard number="2" title="Feature Extraction" description="LBP algorithm extracts micro-texture patterns from facial regions." color="blue" />
            <StepCard number="3" title="Classification" description="Model predicts Real vs Spoof with confidence score output." color="indigo" />
          </div>
        </div>
      </section>

      {/* FEATURES SECTION - Updated icon colors */}
      <section className="px-6 py-16 max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-800">Key Features</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-purple-600 to-blue-600 mx-auto mt-3 rounded-full"></div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <FeatureCard 
            iconColor="purple"
            title="Printed Photo Detection"
            description="Identifies spoof attempts using printed photographs by analyzing texture irregularities and reflections."
          />
          <FeatureCard 
            iconColor="blue"
            title="Replay Attack Detection"
            description="Detects screen replay attacks by identifying pixel patterns, moiré effects, and resolution anomalies."
          />
          <FeatureCard 
            iconColor="indigo"
            title="Confidence Score"
            description="Provides clear prediction percentage for each image, enabling threshold-based decision making."
          />
        </div>
      </section>

      {/* SCOPE & LIMITATIONS - Updated colors */}
      <section className="bg-amber-50/50 border-y border-amber-100 px-6 py-12">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-amber-100 rounded-full px-3 py-1 mb-4">
            <svg className="w-4 h-4 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-xs font-medium text-amber-700">Project Scope</span>
          </div>
          <h2 className="text-2xl font-semibold text-slate-800 mb-3">Current System Limitations</h2>
          <p className="text-gray-600 leading-relaxed">
            This system is specifically trained and optimized to detect spoof attacks involving 
            <span className="font-medium text-slate-700"> printed photographs</span> and 
            <span className="font-medium text-slate-700"> screen replay attacks</span>. 
            It does <span className="font-semibold text-amber-700">not currently detect</span> mask-based attacks, 
            3D silicone masks, or advanced deepfake presentations. Future iterations may include these capabilities.
          </p>
        </div>
      </section>

      {/* FOOTER - Updated gradient */}
      <footer className="bg-white border-t border-gray-200 py-8 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center text-white text-xs font-bold shadow">
              FS
            </div>
            <span className="text-sm font-medium text-gray-600">Face Anti-Spoofing System</span>
          </div>
          <div className="flex gap-6 text-xs text-gray-400">
            <span className="hover:text-gray-600 cursor-pointer transition">Privacy</span>
            <span className="hover:text-gray-600 cursor-pointer transition">Terms</span>
            <span className="hover:text-gray-600 cursor-pointer transition">Documentation</span>
          </div>
          <div className="text-xs text-gray-400">
            © 2026 Face Anti-Spoofing Project — All rights reserved
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;