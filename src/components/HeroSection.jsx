import React from 'react';
import { Button } from 'antd';
import { ArrowRightOutlined, SearchOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
  const navigate = useNavigate();

  // 立即下单按钮点击处理
  const handleOrderClick = () => {
    // 跳转到寄件页面
    navigate('/send');
  };

  // 查询物流按钮点击处理
  const handleTrackClick = () => {
    // 跳转到物流追踪页面
    navigate('/track');
  };

  return (
    <section className="relative bg-gradient-to-br from-blue-50 to-orange-50 py-20 md:py-32">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="space-y-2">
              <h1 className="text-4xl md:text-6xl font-bold text-gray-800">
                校园智慧物流
              </h1>
              <h2 className="text-2xl md:text-4xl font-bold text-primary">
                智享便捷
              </h2>
            </div>
            <p className="text-xl text-gray-600 leading-relaxed">
              一键预约，宿舍直达，勤工助学新平台
            </p>
            <p className="text-gray-500">
              解决高校快递最后一公里配送难题，让校园物流更智能、更高效
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button 
                type="primary" 
                size="large"
                icon={<ArrowRightOutlined />}
                className="bg-primary hover:bg-blue-600 h-12 px-8 text-lg"
                onClick={handleOrderClick}
              >
                立即下单
              </Button>
              <Button 
                size="large"
                icon={<SearchOutlined />}
                className="h-12 px-8 text-lg border-primary text-primary hover:text-blue-600"
                onClick={handleTrackClick}
              >
                查询物流
              </Button>
            </div>
          </div>

          <div className="relative">
            <div className="bg-white rounded-2xl shadow-2xl p-8 transform hover:scale-105 transition-transform duration-300">
              {/* 校园地图区域 */}
              <div className="relative rounded-xl overflow-hidden h-64">
                {/* 校园地图图片 */}
                <img 
                  src="/campus-map.jpg" 
                  alt="青海职业技术大学校园地图"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
                {/* 备用显示：当图片加载失败时显示 */}
                <div className="hidden absolute inset-0 bg-gradient-to-br from-blue-100 to-orange-100 flex-col items-center justify-center">
                  <div className="text-6xl mb-4">🏫</div>
                  <p className="text-gray-600 font-medium">校园地图示意图</p>
                  <p className="text-sm text-gray-400 mt-2">实时追踪 · 智能调度</p>
                </div>
                {/* 地图信息覆盖层 */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                  <p className="text-white text-sm font-medium">青海职业技术大学</p>
                  <p className="text-white/80 text-xs">经二路66号 · 实时追踪</p>
                </div>
              </div>
              
              <div className="mt-4 grid grid-cols-3 gap-4 text-center">
                <div className="bg-blue-50 rounded-lg p-3">
                  <div className="text-2xl font-bold text-primary">156</div>
                  <div className="text-xs text-gray-500">今日订单</div>
                </div>
                <div className="bg-orange-50 rounded-lg p-3">
                  <div className="text-2xl font-bold text-secondary">23</div>
                  <div className="text-xs text-gray-500">配送员</div>
                </div>
                <div className="bg-green-50 rounded-lg p-3">
                  <div className="text-2xl font-bold text-green-500">98%</div>
                  <div className="text-xs text-gray-500">满意度</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;