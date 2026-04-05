import React from 'react';
import { Card, Row, Col, Statistic } from 'antd';
import { 
  ShoppingOutlined, 
  UserOutlined, 
  ClockCircleOutlined, 
  CheckCircleOutlined,
  DollarOutlined,
  StarOutlined
} from '@ant-design/icons';

const Dashboard = () => {
  const stats = [
    {
      title: '今日订单',
      value: 156,
      prefix: <ShoppingOutlined className="text-primary" />,
      suffix: '单',
      color: 'bg-blue-50',
      valueColor: 'text-primary'
    },
    {
      title: '活跃配送员',
      value: 23,
      prefix: <UserOutlined className="text-secondary" />,
      suffix: '人',
      color: 'bg-orange-50',
      valueColor: 'text-secondary'
    },
    {
      title: '平均配送时长',
      value: 18,
      prefix: <ClockCircleOutlined className="text-green-500" />,
      suffix: '分钟',
      color: 'bg-green-50',
      valueColor: 'text-green-500'
    },
    {
      title: '已完成订单',
      value: 142,
      prefix: <CheckCircleOutlined className="text-purple-500" />,
      suffix: '单',
      color: 'bg-purple-50',
      valueColor: 'text-purple-500'
    },
    {
      title: '待处理订单',
      value: 14,
      prefix: <DollarOutlined className="text-yellow-500" />,
      suffix: '单',
      color: 'bg-yellow-50',
      valueColor: 'text-yellow-500'
    },
    {
      title: '客户满意度',
      value: 98.5,
      prefix: <StarOutlined className="text-red-500" />,
      suffix: '%',
      color: 'bg-red-50',
      valueColor: 'text-red-500',
      precision: 1
    }
  ];

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">数据看板</h2>
        <p className="text-gray-500 mt-2">实时监控校园物流运营数据</p>
      </div>

      <Row gutter={[16, 16]}>
        {stats.map((stat, index) => (
          <Col xs={24} sm={12} md={8} lg={8} xl={8} key={index}>
            <Card 
              className={`${stat.color} hover:shadow-lg transition-shadow`}
              bordered={false}
            >
              <Statistic
                title={stat.title}
                value={stat.value}
                prefix={stat.prefix}
                suffix={stat.suffix}
                valueStyle={{ 
                  color: stat.valueColor === 'text-primary' ? '#1890FF' :
                         stat.valueColor === 'text-secondary' ? '#FA8C16' :
                         stat.valueColor === 'text-green-500' ? '#52c41a' :
                         stat.valueColor === 'text-purple-500' ? '#722ed1' :
                         stat.valueColor === 'text-yellow-500' ? '#faad14' :
                         '#f5222d',
                  fontSize: '28px',
                  fontWeight: 'bold'
                }}
                precision={stat.precision || 0}
              />
            </Card>
          </Col>
        ))}
      </Row>

      <Row gutter={[16, 16]} className="mt-6">
        <Col xs={24} md={12}>
          <Card 
            title="今日配送效率" 
            className="shadow-md"
            extra={<span className="text-sm text-gray-400">实时更新</span>}
          >
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>准时送达率</span>
                  <span className="text-green-500 font-bold">96.8%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: '96.8%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>客户好评率</span>
                  <span className="text-primary font-bold">98.5%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-primary h-2 rounded-full" style={{ width: '98.5%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>订单完成率</span>
                  <span className="text-secondary font-bold">91.0%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-secondary h-2 rounded-full" style={{ width: '91.0%' }}></div>
                </div>
              </div>
            </div>
          </Card>
        </Col>

        <Col xs={24} md={12}>
          <Card 
            title="实时订单分布" 
            className="shadow-md"
            extra={<span className="text-sm text-gray-400">按宿舍楼</span>}
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-primary rounded-full"></div>
                  <span>1号宿舍楼</span>
                </div>
                <span className="font-bold">32单</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-secondary rounded-full"></div>
                  <span>2号宿舍楼</span>
                </div>
                <span className="font-bold">28单</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span>3号宿舍楼</span>
                </div>
                <span className="font-bold">35单</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                  <span>4号宿舍楼</span>
                </div>
                <span className="font-bold">31单</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <span>5号宿舍楼</span>
                </div>
                <span className="font-bold">30单</span>
              </div>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;