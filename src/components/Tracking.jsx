import React, { useState } from 'react';
import { Card, Input, Button, Timeline, Steps, message } from 'antd';
import { SearchOutlined, CheckCircleOutlined, ClockCircleOutlined, CarOutlined, InboxOutlined } from '@ant-design/icons';

const Tracking = () => {
  const [orderId, setOrderId] = useState('');
  const [trackingData, setTrackingData] = useState(null);
  const [loading, setLoading] = useState(false);

  const mockTrackingData = {
    id: 'TRK001',
    orderId: 'ORD001',
    timeline: [
      { 
        status: '已揽收', 
        time: '2024-03-22 10:30', 
        description: '快递员已揽收包裹',
        icon: <CheckCircleOutlined className="text-green-500" />
      },
      { 
        status: '运输中', 
        time: '2024-03-22 10:45', 
        description: '包裹正在配送中',
        icon: <CarOutlined className="text-blue-500" />
      },
      { 
        status: '派送中', 
        time: '2024-03-22 11:00', 
        description: '配送员正在派送',
        icon: <ClockCircleOutlined className="text-orange-500" />
      },
      { 
        status: '已签收', 
        time: '2024-03-22 11:30', 
        description: '包裹已签收',
        icon: <InboxOutlined className="text-green-500" />
      }
    ]
  };

  const handleSearch = () => {
    if (!orderId) {
      message.warning('请输入订单号');
      return;
    }
    
    setLoading(true);
    setTimeout(() => {
      setTrackingData(mockTrackingData);
      setLoading(false);
      message.success('查询成功');
    }, 800);
  };

  const getStatusColor = (index, total) => {
    if (index === total - 1) return 'success';
    return 'process';
  };

  return (
    <Card 
      title={
        <div className="flex items-center">
          <SearchOutlined className="text-primary mr-2" />
          <span className="text-xl font-bold">物流追踪</span>
        </div>
      }
      className="shadow-lg hover:shadow-xl transition-shadow"
    >
      <div className="space-y-6">
        <div className="flex gap-4">
          <Input
            size="large"
            placeholder="请输入订单号（如：ORD001）"
            value={orderId}
            onChange={(e) => setOrderId(e.target.value)}
            onPressEnter={handleSearch}
            className="flex-1"
          />
          <Button 
            type="primary" 
            size="large"
            onClick={handleSearch}
            loading={loading}
            className="bg-primary hover:bg-blue-600"
          >
            查询
          </Button>
        </div>

        {trackingData && (
          <div className="bg-blue-50 rounded-lg p-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div>
                <div className="text-sm text-gray-500">订单号</div>
                <div className="font-bold text-primary">{trackingData.orderId}</div>
              </div>
              <div>
                <div className="text-sm text-gray-500">当前状态</div>
                <div className="font-bold text-green-500">已签收</div>
              </div>
              <div>
                <div className="text-sm text-gray-500">总耗时</div>
                <div className="font-bold">1小时</div>
              </div>
              <div>
                <div className="text-sm text-gray-500">配送员</div>
                <div className="font-bold">张师傅</div>
              </div>
            </div>
          </div>
        )}

        {trackingData && (
          <div className="mt-6">
            <h3 className="text-lg font-bold mb-4">物流详情</h3>
            <Timeline
              mode="left"
              items={trackingData.timeline.map((item, index) => ({
                color: index === trackingData.timeline.length - 1 ? 'green' : 'blue',
                dot: item.icon,
                children: (
                  <div key={index}>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-lg">{item.status}</span>
                      <span className="text-sm text-gray-400">{item.time}</span>
                    </div>
                    <div className="text-gray-600 mt-1">{item.description}</div>
                  </div>
                )
              }))}
            />
          </div>
        )}

        {trackingData && (
          <div className="mt-6">
            <h3 className="text-lg font-bold mb-4">配送进度</h3>
            <Steps
              current={3}
              items={[
                { title: '已揽收', description: '10:30' },
                { title: '运输中', description: '10:45' },
                { title: '派送中', description: '11:00' },
                { title: '已签收', description: '11:30' }
              ]}
            />
          </div>
        )}

        {!trackingData && orderId && !loading && (
          <div className="text-center py-12 text-gray-400">
            <SearchOutlined className="text-4xl mb-2" />
            <p>请输入订单号查询物流信息</p>
          </div>
        )}
      </div>
    </Card>
  );
};

export default Tracking;