import React, { useState } from 'react';
import { Card, Input, Button, List, Tag, message, Modal } from 'antd';
import { InboxOutlined, QrcodeOutlined, CheckCircleOutlined } from '@ant-design/icons';

const PickupPackage = () => {
  const [pickupCode, setPickupCode] = useState('');
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const mockPackages = [
    {
      id: 'PKG001',
      pickupCode: '123456',
      receiver: '张三',
      building: '1号宿舍楼',
      location: '菜鸟驿站A区',
      status: 'waiting',
      arriveTime: '2024-03-22 08:00'
    },
    {
      id: 'PKG002',
      pickupCode: '234567',
      receiver: '李四',
      building: '3号宿舍楼',
      location: '智能柜B区',
      status: 'waiting',
      arriveTime: '2024-03-22 09:30'
    },
    {
      id: 'PKG003',
      pickupCode: '345678',
      receiver: '王五',
      building: '5号宿舍楼',
      location: '菜鸟驿站C区',
      status: 'picked',
      arriveTime: '2024-03-21 15:00'
    }
  ];

  const handleSearch = () => {
    if (!pickupCode) {
      message.warning('请输入取件码');
      return;
    }
    
    setLoading(true);
    setTimeout(() => {
      const foundPackages = mockPackages.filter(pkg => 
        pkg.pickupCode.includes(pickupCode) || pkg.receiver.includes(pickupCode)
      );
      setPackages(foundPackages);
      setLoading(false);
      
      if (foundPackages.length === 0) {
        message.info('未找到相关包裹');
      }
    }, 800);
  };

  const handlePickup = (pkg) => {
    setSelectedPackage(pkg);
    setModalVisible(true);
  };

  const confirmPickup = () => {
    setPackages(prev => 
      prev.map(pkg => 
        pkg.id === selectedPackage.id 
          ? { ...pkg, status: 'picked' }
          : pkg
      )
    );
    setModalVisible(false);
    message.success('取件成功！');
  };

  const getStatusTag = (status) => {
    return status === 'waiting' 
      ? <Tag color="orange">待取件</Tag>
      : <Tag color="green">已取件</Tag>;
  };

  return (
    <Card 
      title={
        <div className="flex items-center">
          <InboxOutlined className="text-primary mr-2" />
          <span className="text-xl font-bold">自助取件</span>
        </div>
      }
      className="shadow-lg hover:shadow-xl transition-shadow"
    >
      <div className="space-y-6">
        <div className="flex gap-4">
          <Input
            size="large"
            placeholder="请输入取件码或收件人姓名"
            value={pickupCode}
            onChange={(e) => setPickupCode(e.target.value)}
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
          <Button 
            size="large"
            icon={<QrcodeOutlined />}
            onClick={() => message.info('扫码功能开发中...')}
          >
            扫码
          </Button>
        </div>

        {packages.length > 0 && (
          <List
            itemLayout="horizontal"
            dataSource={packages}
            renderItem={(item) => (
              <List.Item
                actions={[
                  item.status === 'waiting' && (
                    <Button 
                      type="primary" 
                      size="small"
                      icon={<CheckCircleOutlined />}
                      onClick={() => handlePickup(item)}
                      className="bg-secondary hover:bg-orange-600"
                    >
                      确认取件
                    </Button>
                  )
                ]}
              >
                <List.Item.Meta
                  title={
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{item.receiver}</span>
                      {getStatusTag(item.status)}
                    </div>
                  }
                  description={
                    <div className="space-y-1">
                      <div>取件码: <span className="font-mono font-bold">{item.pickupCode}</span></div>
                      <div>存放位置: {item.location}</div>
                      <div>宿舍楼: {item.building}</div>
                      <div className="text-gray-400 text-sm">到达时间: {item.arriveTime}</div>
                    </div>
                  }
                />
              </List.Item>
            )}
          />
        )}

        {packages.length === 0 && pickupCode && !loading && (
          <div className="text-center py-8 text-gray-400">
            <InboxOutlined className="text-4xl mb-2" />
            <p>暂无相关包裹信息</p>
          </div>
        )}
      </div>

      <Modal
        title="确认取件"
        open={modalVisible}
        onOk={confirmPickup}
        onCancel={() => setModalVisible(false)}
        okText="确认取件"
        cancelText="取消"
      >
        {selectedPackage && (
          <div className="space-y-2">
            <p><strong>取件码:</strong> {selectedPackage.pickupCode}</p>
            <p><strong>收件人:</strong> {selectedPackage.receiver}</p>
            <p><strong>存放位置:</strong> {selectedPackage.location}</p>
            <p><strong>宿舍楼:</strong> {selectedPackage.building}</p>
          </div>
        )}
      </Modal>
    </Card>
  );
};

export default PickupPackage;