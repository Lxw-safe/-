import React, { useState, useEffect } from 'react';
import { Layout, message, Modal, Button } from 'antd';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AuthModal from './components/AuthModal';

// 导入加密工具
import { saveUserToLocalStorage, getUserFromLocalStorage, removeUserFromLocalStorage } from './utils/encryption';

// 页面组件
import Home from './pages/Home';
import SendPackagePage from './pages/SendPackagePage';
import PickupPackagePage from './pages/PickupPackagePage';
import DeliveryPage from './pages/DeliveryPage';
import TrackingPage from './pages/TrackingPage';
import UserCenterPage from './pages/UserCenterPage';

const { Content } = Layout;

function App() {
  const [isAuthModalVisible, setIsAuthModalVisible] = useState(false);
  const [isDelivererModalVisible, setIsDelivererModalVisible] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const [redirectToHome, setRedirectToHome] = useState(false);

  // 初始化时检查本地存储中的登录状态
  useEffect(() => {
    const user = getUserFromLocalStorage();
    if (user) {
      setIsLoggedIn(true);
      setUserInfo(user);
    }
  }, []);

  // 打开登录弹窗
  const openAuthModal = () => {
    setIsAuthModalVisible(true);
  };

  // 关闭登录弹窗
  const closeAuthModal = () => {
    setIsAuthModalVisible(false);
  };

  // 登录成功处理
  const handleLogin = (user) => {
    setIsLoggedIn(true);
    setUserInfo(user);
  };

  // 登出处理
  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserInfo(null);
    removeUserFromLocalStorage();
    message.success('登出成功');
  };

  // 处理成为配送员
  const handleBecomeDeliverer = () => {
    if (userInfo) {
      const updatedUser = {
        ...userInfo,
        isDeliverer: true
      };
      setUserInfo(updatedUser);
      saveUserToLocalStorage(updatedUser);
      setIsDelivererModalVisible(false);
      message.success('已成功成为配送员');
    }
  };

  // 取消成为配送员
  const handleCancelBecomeDeliverer = () => {
    setIsDelivererModalVisible(false);
    setRedirectToHome(true);
  };

  // 配送页面权限控制组件
  const DeliveryPageWithAuth = () => {
    // 直接从localStorage中获取用户信息，确保权限检查的准确性
    const user = getUserFromLocalStorage();
    const isLoggedIn = !!user;
    const isDeliverer = user && user.isDeliverer;

    if (!isLoggedIn) {
      message.warning('请先登录');
      return <Navigate to="/" replace />;
    }
    if (!isDeliverer) {
      // 显示成为配送员的弹窗
      setIsDelivererModalVisible(true);
      // 当用户取消时，重定向到首页
      if (redirectToHome) {
        setRedirectToHome(false);
        return <Navigate to="/" replace />;
      }
      // 暂时返回null，等待用户选择
      return null;
    }
    return <DeliveryPage />;
  };

  return (
    <Router>
      <Layout className="min-h-screen bg-gray-50">
        <Navbar 
          isLoggedIn={isLoggedIn}
          userInfo={userInfo}
          onLoginClick={openAuthModal}
          onLogout={handleLogout}
        />
        
        <Content>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/send" element={<SendPackagePage />} />
            <Route path="/pickup" element={<PickupPackagePage />} />
            <Route path="/deliver" element={<DeliveryPageWithAuth />} />
            <Route path="/track" element={<TrackingPage />} />
            <Route 
              path="/user" 
              element={
                <UserCenterPage 
                  isLoggedIn={isLoggedIn}
                  userInfo={userInfo}
                  setUserInfo={setUserInfo}
                />
              } 
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Content>

        <Footer />

        {/* 登录/注册弹窗 */}
        <AuthModal
          visible={isAuthModalVisible}
          onClose={closeAuthModal}
          onLogin={handleLogin}
          userInfo={userInfo}
          setUserInfo={setUserInfo}
        />

        {/* 成为配送员弹窗 */}
        <Modal
          title="成为配送员"
          open={isDelivererModalVisible}
          onCancel={handleCancelBecomeDeliverer}
          footer={[
            <Button key="cancel" onClick={handleCancelBecomeDeliverer}>
              取消
            </Button>,
            <Button key="ok" type="primary" onClick={handleBecomeDeliverer}>
              确定
            </Button>
          ]}
          width={500}
        >
          <div className="space-y-4">
            <p className="text-gray-700">
              访问抢单大厅需要成为配送员。成为配送员后，您可以：
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-600">
              <li>在抢单大厅接收配送订单</li>
              <li>灵活安排工作时间，赚取收入</li>
              <li>为校园物流服务贡献力量</li>
              <li>获得勤工助学的实践机会</li>
            </ul>
            <p className="text-gray-700 mt-4">
              确认成为配送员后，您将可以正常访问抢单大厅。
            </p>
          </div>
        </Modal>
      </Layout>
    </Router>
  );
}

export default App;