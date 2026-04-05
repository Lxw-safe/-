import React, { useState, useEffect } from 'react';
import { Button, Modal, List, Avatar, Badge, Divider, Form, Input, Select, DatePicker, Radio, Switch, Space, Table, Tag, message, Popconfirm } from 'antd';
import { EditOutlined, DeleteOutlined, CheckOutlined, ClockCircleOutlined, EnvironmentOutlined, PhoneOutlined, MailOutlined, PlusOutlined } from '@ant-design/icons';

// 导入加密工具
import { saveUserToLocalStorage } from '../utils/encryption';

const UserCenterPage = ({ isLoggedIn, userInfo: propUserInfo, setUserInfo: propSetUserInfo }) => {
  // 本地状态管理
  const [userInfo, setUserInfo] = useState(propUserInfo || {
    name: '张三',
    studentId: '2021001',
    phone: '138****1234',
    email: 'zhangsan@example.com',
    dormitory: '3号楼123室'
  });

  // 当props中的userInfo变化时，更新本地状态
  useEffect(() => {
    if (propUserInfo) {
      setUserInfo(propUserInfo);
    }
  }, [propUserInfo]);

  // 弹窗状态
  const [modalVisible, setModalVisible] = useState(false);
  const [modalType, setModalType] = useState('');
  const [selectedOrder, setSelectedOrder] = useState(null);

  // 模拟订单数据
  const orders = [
    {
      id: '1001',
      type: '寄件',
      status: '待处理',
      time: '2024-04-01 10:30',
      from: '3号楼123室',
      to: '北京市朝阳区',
      fee: '12.00'
    },
    {
      id: '1002',
      type: '取件',
      status: '配送中',
      time: '2024-04-01 09:15',
      from: '菜鸟驿站',
      to: '3号楼123室',
      fee: '2.00'
    },
    {
      id: '1003',
      type: '寄件',
      status: '已完成',
      time: '2024-03-31 15:45',
      from: '3号楼123室',
      to: '上海市浦东新区',
      fee: '15.00'
    }
  ];

  // 地址数据（使用状态管理，支持自定义）
  const [addresses, setAddresses] = useState([
    {
      id: '1',
      name: '张三',
      phone: '13812345678',
      address: '3号楼123室',
      isDefault: true
    },
    {
      id: '2',
      name: '张三',
      phone: '13812345678',
      address: '5号楼456室',
      isDefault: false
    }
  ]);

  // 地址编辑弹窗状态
  const [addressModalVisible, setAddressModalVisible] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);

  // 打开弹窗
  const openModal = (type, order = null) => {
    setModalType(type);
    setSelectedOrder(order);
    setModalVisible(true);
  };

  // 关闭弹窗
  const closeModal = () => {
    setModalVisible(false);
  };

  // 保存个人信息
  const handleSavePersonalInfo = (values) => {
    const updatedUserInfo = {
      ...userInfo,
      ...values
    };
    setUserInfo(updatedUserInfo);
    if (propSetUserInfo) {
      propSetUserInfo(updatedUserInfo);
      // 更新本地存储（加密）
      saveUserToLocalStorage(updatedUserInfo);
    }
    message.success('个人信息保存成功');
    closeModal();
  };

  // 保存联系方式
  const handleSaveContactInfo = (values) => {
    const updatedUserInfo = {
      ...userInfo,
      phone: values.phone,
      email: values.email,
      dormitory: values.dormitory
    };
    setUserInfo(updatedUserInfo);
    if (propSetUserInfo) {
      propSetUserInfo(updatedUserInfo);
      // 更新本地存储（加密）
      saveUserToLocalStorage(updatedUserInfo);
    }
    message.success('联系方式保存成功');
    closeModal();
  };

  // 打开地址编辑弹窗
  const openAddressEditModal = (address = null) => {
    setEditingAddress(address);
    setAddressModalVisible(true);
  };

  // 关闭地址编辑弹窗
  const closeAddressEditModal = () => {
    setAddressModalVisible(false);
    setEditingAddress(null);
  };

  // 保存地址
  const handleSaveAddress = (values) => {
    if (editingAddress) {
      // 编辑现有地址
      setAddresses(addresses.map(addr => 
        addr.id === editingAddress.id 
          ? { ...addr, ...values }
          : addr
      ));
      message.success('地址修改成功');
    } else {
      // 添加新地址
      const newAddress = {
        id: Date.now().toString(),
        ...values,
        isDefault: addresses.length === 0 // 如果是第一个地址，设为默认
      };
      setAddresses([...addresses, newAddress]);
      message.success('地址添加成功');
    }
    closeAddressEditModal();
  };

  // 删除地址
  const handleDeleteAddress = (addressId) => {
    setAddresses(addresses.filter(addr => addr.id !== addressId));
    message.success('地址删除成功');
  };

  // 设置默认地址
  const handleSetDefaultAddress = (addressId) => {
    setAddresses(addresses.map(addr => ({
      ...addr,
      isDefault: addr.id === addressId
    })));
    message.success('默认地址设置成功');
  };

  // 渲染弹窗内容
  const renderModalContent = () => {
    switch (modalType) {
      case 'pendingOrders':
        return (
          <div>
            <h3 className="text-lg font-bold mb-4">待处理订单</h3>
            <List
              dataSource={orders.filter(order => order.status === '待处理')}
              renderItem={order => (
                <List.Item
                  actions={[
                    <Button type="primary" size="small" onClick={() => openModal('orderDetail', order)}>
                      查看详情
                    </Button>
                  ]}
                >
                  <List.Item.Meta
                    title={`订单号: ${order.id}`}
                    description={`${order.type} | ${order.time} | 费用: ¥${order.fee}`}
                  />
                </List.Item>
              )}
            />
          </div>
        );
      case 'deliveringOrders':
        return (
          <div>
            <h3 className="text-lg font-bold mb-4">配送中订单</h3>
            <List
              dataSource={orders.filter(order => order.status === '配送中')}
              renderItem={order => (
                <List.Item
                  actions={[
                    <Button type="primary" size="small" onClick={() => openModal('orderDetail', order)}>
                      查看详情
                    </Button>
                  ]}
                >
                  <List.Item.Meta
                    title={`订单号: ${order.id}`}
                    description={`${order.type} | ${order.time} | 费用: ¥${order.fee}`}
                  />
                </List.Item>
              )}
            />
          </div>
        );
      case 'completedOrders':
        return (
          <div>
            <h3 className="text-lg font-bold mb-4">已完成订单</h3>
            <List
              dataSource={orders.filter(order => order.status === '已完成')}
              renderItem={order => (
                <List.Item
                  actions={[
                    <Button type="primary" size="small" onClick={() => openModal('orderDetail', order)}>
                      查看详情
                    </Button>
                  ]}
                >
                  <List.Item.Meta
                    title={`订单号: ${order.id}`}
                    description={`${order.type} | ${order.time} | 费用: ¥${order.fee}`}
                  />
                </List.Item>
              )}
            />
          </div>
        );
      case 'historyOrders':
        return (
          <div>
            <h3 className="text-lg font-bold mb-4">历史订单</h3>
            <Table
              dataSource={orders}
              columns={[
                {
                  title: '订单号',
                  dataIndex: 'id',
                  key: 'id'
                },
                {
                  title: '类型',
                  dataIndex: 'type',
                  key: 'type'
                },
                {
                  title: '状态',
                  dataIndex: 'status',
                  key: 'status',
                  render: status => (
                    <Tag color={status === '待处理' ? 'orange' : status === '配送中' ? 'blue' : 'green'}>
                      {status}
                    </Tag>
                  )
                },
                {
                  title: '时间',
                  dataIndex: 'time',
                  key: 'time'
                },
                {
                  title: '费用',
                  dataIndex: 'fee',
                  key: 'fee',
                  render: fee => `¥${fee}`
                },
                {
                  title: '操作',
                  key: 'action',
                  render: (_, order) => (
                    <Button size="small" onClick={() => openModal('orderDetail', order)}>
                      查看详情
                    </Button>
                  )
                }
              ]}
            />
          </div>
        );
      case 'orderDetail':
        if (!selectedOrder) return null;
        return (
          <div>
            <h3 className="text-lg font-bold mb-4">订单详情</h3>
            <div className="space-y-4">
              <div><strong>订单号:</strong> {selectedOrder.id}</div>
              <div><strong>类型:</strong> {selectedOrder.type}</div>
              <div><strong>状态:</strong> {selectedOrder.status}</div>
              <div><strong>时间:</strong> {selectedOrder.time}</div>
              <div><strong>从:</strong> {selectedOrder.from}</div>
              <div><strong>到:</strong> {selectedOrder.to}</div>
              <div><strong>费用:</strong> ¥{selectedOrder.fee}</div>
            </div>
          </div>
        );
      case 'personalInfo':
        return (
          <div>
            <h3 className="text-lg font-bold mb-4">个人信息</h3>
            <Form 
              layout="vertical" 
              initialValues={userInfo}
              onFinish={handleSavePersonalInfo}
            >
              <Form.Item 
                label="姓名" 
                name="name" 
                rules={[{ required: true, message: '请输入姓名' }]}
              >
                <Input />
              </Form.Item>
              <Form.Item 
                label="学号" 
                name="studentId"
                rules={[{ required: true, message: '请输入学号' }]}
              >
                <Input />
              </Form.Item>
              <Form.Item 
                label="手机号" 
                name="phone" 
                rules={[{ required: true, message: '请输入手机号' }]}
              >
                <Input />
              </Form.Item>
              <Form.Item 
                label="邮箱" 
                name="email" 
                rules={[
                  { required: true, message: '请输入邮箱' },
                  { type: 'email', message: '请输入有效的邮箱地址' }
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item 
                label="宿舍地址" 
                name="dormitory" 
                rules={[{ required: true, message: '请输入宿舍地址' }]}
              >
                <Input />
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit">保存修改</Button>
              </Form.Item>
            </Form>
          </div>
        );
      case 'accountSecurity':
        return (
          <div>
            <h3 className="text-lg font-bold mb-4">账号安全</h3>
            <List
              dataSource={[
                { title: '修改密码', description: '定期修改密码以保障账户安全' },
                { title: '绑定手机', description: `已绑定: ${userInfo.phone}` },
                { title: '绑定邮箱', description: `已绑定: ${userInfo.email}` },
                { title: '登录设备管理', description: '查看并管理登录设备' }
              ]}
              renderItem={item => (
                <List.Item
                  actions={[
                    <Button type="primary" size="small">
                      操作
                    </Button>
                  ]}
                >
                  <List.Item.Meta
                    title={item.title}
                    description={item.description}
                  />
                </List.Item>
              )}
            />
          </div>
        );
      case 'contactInfo':
        return (
          <div>
            <h3 className="text-lg font-bold mb-4">联系方式</h3>
            <Form 
              layout="vertical" 
              initialValues={{
                phone: userInfo.phone,
                email: userInfo.email,
                dormitory: userInfo.dormitory
              }}
              onFinish={handleSaveContactInfo}
            >
              <Form.Item 
                label="手机号" 
                name="phone" 
                rules={[{ required: true, message: '请输入手机号' }]}
              >
                <Input prefix={<PhoneOutlined />} />
              </Form.Item>
              <Form.Item 
                label="邮箱" 
                name="email" 
                rules={[
                  { required: true, message: '请输入邮箱' },
                  { type: 'email', message: '请输入有效的邮箱地址' }
                ]}
              >
                <Input prefix={<MailOutlined />} />
              </Form.Item>
              <Form.Item 
                label="宿舍地址" 
                name="dormitory" 
                rules={[{ required: true, message: '请输入宿舍地址' }]}
              >
                <Input prefix={<EnvironmentOutlined />} />
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit">保存修改</Button>
              </Form.Item>
            </Form>
          </div>
        );
      case 'addresses':
        return (
          <div>
            <h3 className="text-lg font-bold mb-4">收货地址</h3>
            <List
              dataSource={addresses}
              renderItem={address => (
                <List.Item
                  actions={[
                    <Button size="small" onClick={() => openAddressEditModal(address)}>
                      <EditOutlined />
                    </Button>,
                    <Popconfirm
                      title="确定要删除这个地址吗？"
                      onConfirm={() => handleDeleteAddress(address.id)}
                      okText="确定"
                      cancelText="取消"
                    >
                      <Button size="small" danger>
                        <DeleteOutlined />
                      </Button>
                    </Popconfirm>,
                    !address.isDefault && (
                      <Button 
                        size="small" 
                        type="dashed"
                        onClick={() => handleSetDefaultAddress(address.id)}
                      >
                        设为默认
                      </Button>
                    )
                  ]}
                >
                  <List.Item.Meta
                    title={
                      <div>
                        {address.name} {address.phone}
                        {address.isDefault && <Tag color="blue" className="ml-2">默认</Tag>}
                      </div>
                    }
                    description={address.address}
                  />
                </List.Item>
              )}
            />
            <Button 
              type="primary" 
              className="mt-4"
              icon={<PlusOutlined />}
              onClick={() => openAddressEditModal()}
            >
              添加新地址
            </Button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="py-16 px-4 md:px-8 max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
          个人中心
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          管理您的个人信息和订单记录
        </p>
      </div>
      <div className="bg-white rounded-2xl shadow-lg p-8">
        <div className="text-center mb-8">
          <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <div className="text-4xl">👤</div>
          </div>
          {isLoggedIn ? (
            <div>
              <h3 className="text-xl font-bold text-gray-800">{userInfo.name}</h3>
              <p className="text-gray-500 mt-2">学号: {userInfo.studentId}</p>
            </div>
          ) : (
            <div>
              <h3 className="text-xl font-bold text-gray-800">用户登录</h3>
              <p className="text-gray-500 mt-2">登录后查看个人信息和订单</p>
              <Button type="primary" className="mt-4">
                登录/注册
              </Button>
            </div>
          )}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-gray-50 rounded-xl p-6">
            <h4 className="font-bold text-gray-800 mb-4">订单管理</h4>
            <ul className="space-y-3 text-gray-600">
              <li className="cursor-pointer hover:text-primary" onClick={() => openModal('pendingOrders')}>
                📦 待处理订单
              </li>
              <li className="cursor-pointer hover:text-primary" onClick={() => openModal('deliveringOrders')}>
                🚚 配送中订单
              </li>
              <li className="cursor-pointer hover:text-primary" onClick={() => openModal('completedOrders')}>
                ✅ 已完成订单
              </li>
              <li className="cursor-pointer hover:text-primary" onClick={() => openModal('historyOrders')}>
                📊 历史订单
              </li>
            </ul>
          </div>
          <div className="bg-gray-50 rounded-xl p-6">
            <h4 className="font-bold text-gray-800 mb-4">账户设置</h4>
            <ul className="space-y-3 text-gray-600">
              <li className="cursor-pointer hover:text-primary" onClick={() => openModal('personalInfo')}>
                👤 个人信息
              </li>
              <li className="cursor-pointer hover:text-primary" onClick={() => openModal('accountSecurity')}>
                🔒 账号安全
              </li>
              <li className="cursor-pointer hover:text-primary" onClick={() => openModal('contactInfo')}>
                📱 联系方式
              </li>
              <li className="cursor-pointer hover:text-primary" onClick={() => openModal('addresses')}>
                📍 收货地址
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* 主弹窗 */}
      <Modal
        title={
          modalType === 'pendingOrders' ? '待处理订单' :
          modalType === 'deliveringOrders' ? '配送中订单' :
          modalType === 'completedOrders' ? '已完成订单' :
          modalType === 'historyOrders' ? '历史订单' :
          modalType === 'orderDetail' ? '订单详情' :
          modalType === 'personalInfo' ? '个人信息' :
          modalType === 'accountSecurity' ? '账号安全' :
          modalType === 'contactInfo' ? '联系方式' :
          modalType === 'addresses' ? '收货地址' : '详情'
        }
        open={modalVisible}
        onCancel={closeModal}
        footer={[
          <Button key="close" onClick={closeModal}>
            关闭
          </Button>
        ]}
        width={600}
      >
        {renderModalContent()}
      </Modal>

      {/* 地址编辑弹窗 */}
      <Modal
        title={editingAddress ? '编辑地址' : '添加新地址'}
        open={addressModalVisible}
        onCancel={closeAddressEditModal}
        footer={null}
        width={500}
      >
        <Form
          layout="vertical"
          initialValues={editingAddress || { name: userInfo.name, phone: userInfo.phone }}
          onFinish={handleSaveAddress}
        >
          <Form.Item
            label="联系人姓名"
            name="name"
            rules={[{ required: true, message: '请输入联系人姓名' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="联系电话"
            name="phone"
            rules={[{ required: true, message: '请输入联系电话' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="详细地址"
            name="address"
            rules={[{ required: true, message: '请输入详细地址' }]}
          >
            <Input.TextArea rows={3} />
          </Form.Item>
          <Form.Item>
            <Space>
              <Button type="primary" htmlType="submit">
                {editingAddress ? '保存修改' : '添加地址'}
              </Button>
              <Button onClick={closeAddressEditModal}>
                取消
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default UserCenterPage;