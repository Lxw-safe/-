import React from 'react';
import DeliveryOrders from '../components/DeliveryOrders';

const DeliveryPage = () => {
  return (
    <div className="py-16 px-4 md:px-8 bg-gradient-to-br from-blue-50 to-orange-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            成为配送员
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            为在校大学生提供勤工助学机会，灵活接单，轻松赚钱
          </p>
        </div>
        <DeliveryOrders />
      </div>
    </div>
  );
};

export default DeliveryPage;