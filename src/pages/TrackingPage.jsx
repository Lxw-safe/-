import React from 'react';
import Tracking from '../components/Tracking';

const TrackingPage = () => {
  return (
    <div className="py-16 px-4 md:px-8 max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
          物流追踪
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          实时追踪包裹位置，掌握配送进度
        </p>
      </div>
      <Tracking />
    </div>
  );
};

export default TrackingPage;