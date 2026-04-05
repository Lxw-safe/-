export const mockData = {
  orders: [
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
  ],
  packages: [
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
  ],
  tracking: [
    {
      id: 'TRK001',
      orderId: 'ORD001',
      timeline: [
        { status: '已揽收', time: '2024-03-22 10:30', description: '快递员已揽收包裹' },
        { status: '运输中', time: '2024-03-22 10:45', description: '包裹正在配送中' },
        { status: '派送中', time: '2024-03-22 11:00', description: '配送员正在派送' },
        { status: '已签收', time: '2024-03-22 11:30', description: '包裹已签收' }
      ]
    }
  ],
  dashboard: {
    todayOrders: 156,
    activeDeliverers: 23,
    avgDeliveryTime: '18分钟',
    completedOrders: 142,
    pendingOrders: 14,
    satisfactionRate: '98.5%'
  }
};