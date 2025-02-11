import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Star, Target, Rocket, Building2, Users, ArrowUpRight, Timer, BarChart as LucideBarChart } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

// Presentation slide container
const PresentationSlide = ({ children, className = '' }) => (
  <div className={`w-full h-full p-8 bg-white rounded-lg shadow-lg ${className}`}>
    {children}
  </div>
);

// Circular progress indicator
const CircleProgress = ({ value, label, color }) => {
  const clampedValue = Math.min(Math.max(value, 0), 100); // Ensure value stays between 0-100
  return (
    <div className="flex flex-col items-center">
      <div className="relative w-24 h-24">
        <svg className="w-24 h-24" viewBox="0 0 36 36">
          <path
            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            fill="none"
            stroke="#eee"
            strokeWidth="3"
          />
          <path
            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            fill="none"
            stroke={color}
            strokeWidth="3"
            strokeDasharray={`${clampedValue}, 100`}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-lg font-semibold">{clampedValue}%</span>
        </div>
      </div>
      <span className="mt-2 text-sm text-gray-600">{label}</span>
    </div>
  );
};

const Presentation = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Sample data for charts
  const adoptionData = [
    { month: 'Jan', value: 65 },
    { month: 'Feb', value: 72 },
    { month: 'Mar', value: 78 },
    { month: 'Apr', value: 85 },
    { month: 'May', value: 89 },
  ];

  const timeToValueData = [
    { month: 'Jan', days: 45 },
    { month: 'Feb', days: 38 },
    { month: 'Mar', days: 32 },
    { month: 'Apr', days: 28 },
    { month: 'May', days: 25 },
  ];

  // Slide navigation with arrow keys
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight') nextSlide();
      if (e.key === 'ArrowLeft') prevSlide();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const slides = [
    // Title Slide
    <PresentationSlide key="title" className="flex flex-col items-center justify-center text-center">
      <Rocket className="w-20 h-20 text-blue-500 mb-6" />
      <h1 className="text-4xl font-bold mb-4">Partner Experience</h1>
      <p className="text-lg text-gray-600">"Special Ops" Unit Making the Magic Happen</p>
    </PresentationSlide>,

    // Vision Slide
    <PresentationSlide key="vision">
      <h2 className="text-3xl font-bold mb-4">Vision Statement</h2>
      <div className="grid grid-cols-2 gap-6">
        <div className="p-6 bg-blue-50 rounded-lg flex items-center">
          <Users className="w-10 h-10 text-blue-500 mr-4" />
          <div>
            <h3 className="font-semibold">Open Ecosystem</h3>
            <p className="text-gray-600">Uniting developers, teams, and partners.</p>
          </div>
        </div>
        <div className="p-6 bg-green-50 rounded-lg flex items-center">
          <Target className="w-10 h-10 text-green-500 mr-4" />
          <div>
            <h3 className="font-semibold">Innovation Focus</h3>
            <p className="text-gray-600">Continuous improvement and adaptation.</p>
          </div>
        </div>
      </div>
    </PresentationSlide>,

    // Metrics Slide
    <PresentationSlide key="metrics">
      <h2 className="text-3xl font-bold mb-4">North Star Metrics</h2>
      <div className="grid grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-4">
          <h3 className="text-lg font-semibold mb-4">Integration Adoption</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={adoptionData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#3B82F6" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <h3 className="text-lg font-semibold mb-4">Time to Value (Days)</h3>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={timeToValueData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="days" stroke="#10B981" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </PresentationSlide>,

    // Roadmap Slide
    <PresentationSlide key="roadmap">
      <h2 className="text-3xl font-bold mb-4">2025-2026 Roadmap</h2>
      <div className="space-y-4">
        <div className="bg-white rounded-lg shadow p-4">
          <h3 className="font-semibold">Workato Data Sovereignty</h3>
          <span className="text-gray-500">Feb '25 - Feb '26</span>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <h3 className="font-semibold">Paid Work</h3>
          <span className="text-gray-500">Feb '25 - Feb '26</span>
        </div>
      </div>
    </PresentationSlide>
  ];

  return (
    <div className="w-full h-screen bg-gray-100 p-8">
      <div className="relative w-full h-full max-w-4xl mx-auto overflow-hidden">
        {slides[currentSlide]}
        <div className="absolute bottom-4 left-0 right-0 flex justify-center items-center space-x-4">
          <button onClick={prevSlide} className="p-2 rounded-full bg-white shadow hover:bg-gray-200">
            <ChevronLeft className="w-6 h-6" />
          </button>
          <span className="text-gray-600">{currentSlide + 1} / {slides.length}</span>
          <button onClick={nextSlide} className="p-2 rounded-full bg-white shadow hover:bg-gray-200">
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Presentation;
