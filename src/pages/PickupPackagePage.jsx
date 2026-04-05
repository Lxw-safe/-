import React from 'react';
import PickupPackage from '../components/PickupPackage';

const PickupPackagePage = () => {
  return (
    <div className="py-16 px-4 md:px-8 max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
          我要取件
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          输入取件码，快速找到您的包裹
        </p>
      </div>
      <PickupPackage />
    </div>
  );
};

export default PickupPackagePage;