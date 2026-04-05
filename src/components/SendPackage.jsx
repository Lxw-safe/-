import React, { useState } from 'react';
import { Card, Form, Input, Select, Button, message } from 'antd';
import { SendOutlined, UserOutlined, PhoneOutlined, EnvironmentOutlined } from '@ant-design/icons';

const { Option } = Select;
const { TextArea } = Input;

const SendPackage = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const onFinish = (values) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      message.success('寄件订单提交成功！');
      form.resetFields();
    }, 1500);
  };

  return (
    <Card 
      title={
        <div className="flex items-center">
          <SendOutlined className="text-primary mr-2" />
          <span className="text-xl font-bold">智能寄件</span>
        </div>
      }
      className="shadow-lg hover:shadow-xl transition-shadow"
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        size="large"
      >
        <div className="grid md:grid-cols-2 gap-4">
          <Form.Item
            label="寄件人姓名"
            name="senderName"
            rules={[{ required: true, message: '请输入寄件人姓名' }]}
          >
            <Input prefix={<UserOutlined />} placeholder="请输入姓名" />
          </Form.Item>

          <Form.Item
            label="寄件人电话"
            name="senderPhone"
            rules={[{ required: true, message: '请输入寄件人电话' }]}
          >
            <Input prefix={<PhoneOutlined />} placeholder="请输入手机号" />
          </Form.Item>

          <Form.Item
            label="寄件人宿舍楼"
            name="senderBuilding"
            rules={[{ required: true, message: '请选择宿舍楼' }]}
          >
            <Select placeholder="请选择宿舍楼">
              <Option value="1">1号宿舍楼</Option>
              <Option value="2">2号宿舍楼</Option>
              <Option value="3">3号宿舍楼</Option>
              <Option value="4">4号宿舍楼</Option>
              <Option value="5">5号宿舍楼</Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="物品类型"
            name="itemType"
            rules={[{ required: true, message: '请选择物品类型' }]}
          >
            <Select placeholder="请选择物品类型">
              <Option value="document">文件</Option>
              <Option value="package">包裹</Option>
              <Option value="book">书籍</Option>
              <Option value="food">食品</Option>
              <Option value="other">其他</Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="收件人姓名"
            name="receiverName"
            rules={[{ required: true, message: '请输入收件人姓名' }]}
          >
            <Input prefix={<UserOutlined />} placeholder="请输入姓名" />
          </Form.Item>

          <Form.Item
            label="收件人电话"
            name="receiverPhone"
            rules={[{ required: true, message: '请输入收件人电话' }]}
          >
            <Input prefix={<PhoneOutlined />} placeholder="请输入手机号" />
          </Form.Item>

          <Form.Item
            label="收件人宿舍楼"
            name="receiverBuilding"
            rules={[{ required: true, message: '请选择宿舍楼' }]}
          >
            <Select placeholder="请选择宿舍楼">
              <Option value="1">1号宿舍楼</Option>
              <Option value="2">2号宿舍楼</Option>
              <Option value="3">3号宿舍楼</Option>
              <Option value="4">4号宿舍楼</Option>
              <Option value="5">5号宿舍楼</Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="物品重量"
            name="weight"
            rules={[{ required: true, message: '请选择物品重量' }]}
          >
            <Select placeholder="请选择重量">
              <Option value="0.5">0.5kg以内</Option>
              <Option value="1">1kg以内</Option>
              <Option value="2">2kg以内</Option>
              <Option value="5">5kg以内</Option>
              <Option value="10">10kg以内</Option>
            </Select>
          </Form.Item>
        </div>

        <Form.Item label="备注" name="remark">
          <TextArea rows={3} placeholder="请填写备注信息（选填）" />
        </Form.Item>

        <Form.Item>
          <Button 
            type="primary" 
            htmlType="submit" 
            loading={loading}
            block
            size="large"
            className="bg-primary hover:bg-blue-600"
          >
            提交寄件订单
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default SendPackage;