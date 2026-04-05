import React from 'react';
import { Layout } from 'antd';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// 页面组件
import Home from './pages/Home';
import SendPackagePage from './pages/SendPackagePage';
import PickupPackagePage from './pages/PickupPackagePage';
import DeliveryPage from './pages/DeliveryPage';
import TrackingPage from './pages/TrackingPage';
import UserCenterPage from './pages/UserCenterPage';

const { Content } = Layout;

function App() {
  return (
    <Router>
      <Layout className="min-h-screen bg-gray-50">
        <Navbar />
        
        <Content>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/send" element={<SendPackagePage />} />
            <Route path="/pickup" element={<PickupPackagePage />} />
            <Route path="/deliver" element={<DeliveryPage />} />
            <Route path="/track" element={<TrackingPage />} />
            <Route path="/user" element={<UserCenterPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Content>

        <Footer />
      </Layout>
    </Router>
  );
}

export default App;