import React, { useState } from 'react';
import { Card, List, Tag, Button, message, Modal } from 'antd';
import { UserSwitchOutlined, DollarOutlined, EnvironmentOutlined, ClockCircleOutlined } from '@ant-design/icons';

const DeliveryOrders = () => {
  const [orders, setOrders] = useState([
    {
      id: 'ORD001',
      sender: { name: '张三', building: '1号宿舍楼', phone: '138****1234' },
      receiver: { name: '李四', building: '3号宿舍楼', phone: '139****5678' },
      item: { type: '文件', weight: '0.5kg' },
      status: 'pending',
      price: 2.00,
      createTime: '2024-03-22 10:30'
    },
    {
      id: 'ORD002',
      sender: { name: '王五', building: '菜鸟驿站', phone: '137****9012' },
      receiver: { name: '赵六', building: '5号宿舍楼', phone: '136****3456' },
      item: { type: '包裹', weight: '2.3kg' },
      status: 'pending',
      price: 3.00,
      createTime: '2024-03-22 11:15'
    },
    {
      id: 'ORD003',
      sender: { name: '钱七', building: '2号宿舍楼', phone: '135****7890' },
      receiver: { name: '孙八', building: '4号宿舍楼', phone: '134****2345' },
      item: { type: '书籍', weight: '1.8kg' },
      status: 'in_progress',
      price: 2.50,
      createTime: '2024-03-22 09:45'
    }
  ]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const handleGrabOrder = (order) => {
    setSelectedOrder(order);
    setModalVisible(true);
  };

  const confirmGrab = () => {
    setOrders(prev => 
      prev.map(order => 
        order.id === selectedOrder.id 
          ? { ...order, status: 'in_progress' }
          : order
      )
    );
    setModalVisible(false);
    message.success('抢单成功！请尽快配送');
  };

  const getStatusTag = (status) => {
    switch (status) {
      case 'pending':
        return <Tag color="orange">待接单</Tag>;
      case 'in_progress':
        return <Tag color="blue">配送中</Tag>;
      case 'completed':
        return <Tag color="green">已完成</Tag>;
      default:
        return <Tag color="gray">未知</Tag>;
    }
  };

  const availableOrders = orders.filter(order => order.status === 'pending');

  return (
    <Card 
      title={
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <UserSwitchOutlined className="text-primary mr-2" />
            <span className="text-xl font-bold">抢单大厅</span>
          </div>
          <div className="text-sm text-gray-500">
            可接订单: <span className="text-primary font-bold">{availableOrders.length}</span> 单
          </div>
        </div>
      }
      className="shadow-lg hover:shadow-xl transition-shadow"
    >
      <List
        itemLayout="vertical"
        size="large"
        dataSource={orders}
        renderItem={(order) => (
          <List.Item
            key={order.id}
            actions={[
              order.status === 'pending' && (
                <Button 
                  type="primary" 
                  size="large"
                  icon={<DollarOutlined />}
                  onClick={() => handleGrabOrder(order)}
                  className="bg-secondary hover:bg-orange-600"
                >
                  立即抢单
                </Button>
              ),
              order.status === 'in_progress' && (
                <Button 
                  size="large"
                  disabled
                >
                  配送中
                </Button>
              )
            ]}
            extra={
              <div className="text-center">
                <div className="text-3xl font-bold text-secondary">¥{order.price.toFixed(2)}</div>
                <div className="text-sm text-gray-400">配送费</div>
              </div>
            }
          >
            <List.Item.Meta
              title={
                <div className="flex items-center justify-between">
                  <span className="font-bold text-lg">订单 {order.id}</span>
                  {getStatusTag(order.status)}
                </div>
              }
              description={
                <div className="space-y-3 mt-3">
                  <div className="flex items-start gap-2">
                    <EnvironmentOutlined className="text-green-500 mt-1" />
                    <div>
                      <div className="font-medium">寄件人: {order.sender.name}</div>
                      <div className="text-sm text-gray-500">
                        {order.sender.building} · {order.sender.phone}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-2">
                    <EnvironmentOutlined className="text-orange-500 mt-1" />
                    <div>
                      <div className="font-medium">收件人: {order.receiver.name}</div>
                      <div className="text-sm text-gray-500">
                        {order.receiver.building} · {order.receiver.phone}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <span className="flex items-center gap-1">
                      <ClockCircleOutlined />
                      {order.createTime}
                    </span>
                    <span>物品: {order.item.type}</span>
                    <span>重量: {order.item.weight}</span>
                  </div>
                </div>
              }
            />
          </List.Item>
        )}
      />

      <Modal
        title="确认抢单"
        open={modalVisible}
        onOk={confirmGrab}
        onCancel={() => setModalVisible(false)}
        okText="确认接单"
        cancelText="取消"
      >
        {selectedOrder && (
          <div className="space-y-3">
            <div className="flex justify-between">
              <span>订单号:</span>
              <span className="font-bold">{selectedOrder.id}</span>
            </div>
            <div className="flex justify-between">
              <span>寄件人:</span>
              <span>{selectedOrder.sender.name} ({selectedOrder.sender.building})</span>
            </div>
            <div className="flex justify-between">
              <span>收件人:</span>
              <span>{selectedOrder.receiver.name} ({selectedOrder.receiver.building})</span>
            </div>
            <div className="flex justify-between">
              <span>物品:</span>
              <span>{selectedOrder.item.type} ({selectedOrder.item.weight})</span>
            </div>
            <div className="flex justify-between text-lg font-bold">
              <span>配送费:</span>
              <span className="text-secondary">¥{selectedOrder.price.toFixed(2)}</span>
            </div>
          </div>
        )}
      </Modal>
    </Card>
  );
};

export default DeliveryOrders;