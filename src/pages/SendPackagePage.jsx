import React from 'react';
import SendPackage from '../components/SendPackage';

const SendPackagePage = () => {
  return (
    <div className="py-16 px-4 md:px-8 max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
          我要寄件
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          填写寄件信息，轻松安排快递服务
        </p>
      </div>
      <SendPackage />
    </div>
  );
};

export default SendPackagePage;