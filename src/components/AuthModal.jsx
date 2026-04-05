import React, { useState } from 'react';
import { Modal, Form, Input, Button, message, Tabs, Checkbox } from 'antd';
import { LoginOutlined, UserAddOutlined } from '@ant-design/icons';

// 导入加密工具
import { saveUserToLocalStorage } from '../utils/encryption';

const { TabPane } = Tabs;

const AuthModal = ({ visible, onClose, onLogin, userInfo, setUserInfo }) => {
  const [activeTab, setActiveTab] = useState('login');
  const [loginForm] = Form.useForm();
  const [registerForm] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [termsModalVisible, setTermsModalVisible] = useState(false);
  const [privacyModalVisible, setPrivacyModalVisible] = useState(false);
  const [activeModalType, setActiveModalType] = useState('');

  // 服务条款内容
  const termsContent = `服务条款
第一条 服务范围与定义
1.1 本平台（以下简称"平台"）为青海职业技术大学在校学生、教职工及校园内商家提供快递代收代寄、智能仓储、增值物流等校园智慧物流服务。
1.2 本条款适用于所有使用平台服务的用户（包括个人用户、商家用户及配送员），用户在注册、使用平台服务前应仔细阅读并充分理解本条款全部内容。
第二条 用户注册与账户管理
2.1 用户须提供真实、准确、完整的个人信息进行注册，包括但不限于姓名、学号/工号、手机号、宿舍地址等。
2.2 用户应妥善保管账户密码，不得将账户转让、出借或授权他人使用，因用户保管不当导致的损失由用户自行承担。
2.3 用户有权随时修改个人信息，但不得提供虚假信息或冒用他人身份，一经发现平台有权暂停或终止服务。
第三条 服务内容与收费标准
3.1 基础服务收费标准
快递代收费：0.3-0.8元/件
快递代寄费：3-8元/件（根据重量、体积计费）
基础配送费：1-2元/单（符合53%学生价格接受上限）
3.2 增值服务收费标准
会员订阅：9.9元/月，享受免基础配送费、加急配送8折、夜间配送7折等优惠
加急配送：在基础配送费基础上加收50%
夜间配送（22:00-次日6:00）：在基础配送费基础上加收30%
大件物品配送：根据物品重量、体积另行计费
3.3 动态定价机制
平台基于AI需求预测，在快递高峰期（如双十一、开学季）、恶劣天气等供需紧张时段，配送费可溢价10%-30%；在闲时推出配送费折扣，实现供需平衡。
3.4 B端商家服务收费标准
配送服务：抽取订单金额的5%-15%作为配送佣金
平台入驻：免费入驻，按订单量阶梯收费
第四条 服务承诺与保障
4.1 配送时效承诺
普通配送：2小时内送达
加急配送：30分钟内送达
夜间配送：1小时内送达
4.2 服务质量保障
包裹丢失：按实际价值赔偿（需提供购买凭证）
配送延误：超过承诺时效30分钟以上，退还当次配送费
服务投诉：7×24小时客服支持，投诉24小时内响应处理
4.3 配送员管理
配送员须经过平台培训与认证
配送员服务态度、时效纳入绩效考核，与收入挂钩
用户可对配送服务进行评价，评价结果影响配送员接单优先级
第五条 用户权利与义务
5.1 用户权利
享受平台提供的各项物流服务
查询订单状态、配送进度
对服务质量进行评价与投诉
申请退款、赔偿等售后服务
5.2 用户义务
遵守国家法律法规，不得利用平台从事违法活动
不得寄递违禁品（包括但不限于易燃易爆品、管制刀具、毒品等）
如实填写寄件信息，包括收件人、地址、物品类型等
按时支付服务费用，不得恶意拖欠
第六条 免责条款
6.1 因不可抗力（如自然灾害、战争、政府行为、政策变化等）导致服务中断或延迟，平台不承担责任。
6.2 因用户提供的地址、联系方式错误或不完整导致配送失败，平台不承担责任。
6.3 因用户违反本条款规定（如寄递违禁品、提供虚假信息等）导致的损失，由用户自行承担。
6.4 因第三方（如快递公司、网络服务商）原因导致的服务问题，平台不承担责任，但应协助用户解决。
6.5 平台对用户在使用服务过程中遭受的间接损失（如时间损失、机会损失等）不承担责任。
第七条 服务变更与终止
7.1 平台有权根据业务发展需要调整服务内容、收费标准，调整前将提前7天在平台公告。
7.2 用户可随时申请注销账户，注销后账户内未使用的服务权益不予退还。
7.3 平台发现用户存在违规行为（如恶意刷单、虚假投诉等），有权暂停或终止服务，且不退还已支付费用。
7.4 平台因业务调整、技术升级等原因需暂停服务的，应提前3天公告，并在恢复服务后为受影响用户提供补偿。
第八条 知识产权
8.1 平台的软件、界面设计、商标、域名等知识产权归平台所有，未经许可不得复制、传播、修改。
8.2 用户在使用平台过程中产生的数据（如订单信息、评价内容）归平台所有，平台有权用于数据分析、产品优化。
8.3 用户不得将平台的任何内容用于商业目的，不得反向工程、反编译平台软件。
第九条 争议解决
9.1 本条款适用中华人民共和国法律。
9.2 因本条款引起的或与本条款有关的任何争议，双方应友好协商解决。
9.3 协商不成的，任何一方均可向平台所在地（青海省西宁市）有管辖权的人民法院提起诉讼。
第十条 其他
10.1 本条款的任何修改、补充均以平台公告为准，用户继续使用服务即视为接受修改后的条款。
10.2 本条款自用户注册成功之日起生效。
10.3 平台保留对本条款的最终解释权。`;

  // 隐私政策内容
  const privacyContent = `隐私政策
引言
青海职业技术大学青驿团队（以下简称"我们"或"平台"）高度重视用户个人信息保护，严格遵守《中华人民共和国网络安全法》《中华人民共和国个人信息保护法》等相关法律法规。本隐私政策旨在向您说明我们如何收集、使用、存储、共享和保护您的个人信息，以及您享有的权利。
第一条 信息收集
1.1 个人基本信息
注册信息：姓名、学号/工号、手机号、电子邮箱、宿舍地址等
身份认证信息：身份证号（仅用于实名认证，加密存储）
账户信息：用户名、密码（加密存储）、头像等
1.2 服务使用信息
订单信息：寄件/收件记录、物品类型、重量、配送地址、配送时间等
支付信息：支付方式、支付金额、支付时间（由第三方支付平台处理，平台不存储银行卡信息）
位置信息：配送地址、GPS定位（仅在配送过程中收集，用于路径规划）
设备信息：设备型号、操作系统、IP地址、浏览器类型等
日志信息：操作记录、访问时间、错误日志等
1.3 其他信息
用户评价、投诉、建议等反馈信息
通过客服渠道提供的其他信息
第二条 信息使用
2.1 提供服务
处理订单、安排配送、提供售后服务
进行身份验证、账户安全管理
发送服务通知、订单状态更新
2.2 优化服务
分析用户行为，改进产品功能与用户体验
进行数据分析，优化运营策略与配送路线
开发新功能、新服务，满足用户需求
2.3 安全保障
检测、预防欺诈、滥用、非法活动
保障平台安全，防止数据泄露、攻击
2.4 法律合规
履行法律法规要求的义务
配合政府机关、司法机关的合法调查
第三条 信息存储与保护
3.1 存储期限
个人基本信息：用户注销账户后30天内删除
订单信息：自订单完成之日起保存3年（法律法规要求的保存期限）
日志信息：保存6个月
3.2 存储地点
用户信息存储于中华人民共和国境内服务器
不会将用户信息传输至境外（法律法规另有规定的除外）
3.3 安全措施
加密技术：采用SSL/TLS加密传输，AES-256加密存储
访问控制：设置严格的访问权限，仅授权人员可访问必要信息
安全审计：定期进行安全审计与漏洞扫描
员工培训：对接触用户信息的员工进行保密培训，签署保密协议
应急预案：制定数据安全事件应急预案，及时响应处理
第四条 信息共享与披露
4.1 必要共享
与合作快递站共享配送信息，完成包裹配送
与配送员共享订单信息，安排配送任务
与第三方支付平台共享支付信息，完成支付
4.2 法律要求
根据法律法规、政府机关、司法机关的合法要求提供信息
为维护国家安全、公共安全、重大公共利益提供信息
4.3 用户同意
经用户明确同意后，向第三方提供信息
用户主动公开的信息（如公开评价）
4.4 匿名化处理
用于数据分析、学术研究时，对信息进行匿名化处理，无法识别特定个人
4.5 禁止行为
不会出售、出租、交换用户个人信息
不会向无关第三方提供用户个人信息
第五条 用户权利
5.1 查询权
用户可随时登录账户查询个人信息，包括基本信息、订单记录等。
5.2 更正权
用户发现个人信息不准确或不完整的，可申请更正。
5.3 删除权
用户可申请删除个人信息（法律法规要求保留的除外），平台将在15个工作日内处理。
5.4 撤回同意权
用户可撤回对信息处理的同意，撤回后平台将停止相关处理活动。
5.5 注销账户权
用户可申请注销账户，注销后平台将删除或匿名化处理个人信息。
5.6 投诉权
用户对个人信息处理有异议的，可向平台投诉，平台将在15个工作日内回复。
第六条 Cookie与类似技术
6.1 平台使用Cookie、Web Beacon等技术收集用户访问信息，用于优化用户体验、分析访问数据。
6.2 用户可通过浏览器设置拒绝Cookie，但可能影响部分功能正常使用。
第七条 未成年人保护
7.1 本平台主要面向18周岁以上高校学生，不主动收集14周岁以下未成年人个人信息。
7.2 如发现未成年人在未获监护人同意的情况下提供个人信息，我们将尽快删除相关信息。
7.3 建议未成年人在监护人指导下使用平台服务。
第八条 隐私政策更新
8.1 我们可能适时更新本隐私政策，更新原因包括但不限于：
法律法规变化
业务模式调整
技术升级
8.2 更新后的隐私政策将在平台显著位置公告，并标注生效日期。
8.3 用户继续使用服务即视为接受更新后的隐私政策。
8.4 重大变更（如信息使用目的、共享范围变化）将通过站内信、短信等方式通知用户。
第九条 联系我们
如对本隐私政策有任何疑问、意见或建议，或需要行使用户权利，请通过以下方式联系我们：
客服电话：13269544029
客服邮箱：3341989599@qq.com
联系地址：青海省西宁市青海职业技术大学
工作时间：周一至周五 9:00-18:00
我们将在15个工作日内回复您的请求。
第十条 生效日期
本隐私政策自发布之日起生效。`;

  // 登录处理
  const handleLogin = async (values) => {
    setIsLoading(true);
    try {
      // 模拟API调用
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // 模拟登录成功
      const user = {
        id: '1',
        username: values.username,
        phone: values.phone,
        isDeliverer: false, // 默认不是配送员
        email: '',
        dormitory: ''
      };
      
      // 存储登录状态（加密）
      saveUserToLocalStorage(user);
      
      // 更新用户信息
      setUserInfo(user);
      onLogin(user);
      message.success('登录成功');
      onClose();
    } catch (error) {
      message.error('登录失败，请检查账号密码');
    } finally {
      setIsLoading(false);
    }
  };

  // 注册处理
  const handleRegister = async (values) => {
    setIsLoading(true);
    try {
      // 模拟API调用
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // 模拟注册成功
      const user = {
        id: Date.now().toString(),
        username: values.username,
        phone: values.phone,
        isDeliverer: false, // 默认不是配送员
        email: '',
        dormitory: ''
      };
      
      // 存储登录状态（加密）
      saveUserToLocalStorage(user);
      
      // 更新用户信息
      setUserInfo(user);
      onLogin(user);
      message.success('注册成功');
      onClose();
    } catch (error) {
      message.error('注册失败，请稍后重试');
    } finally {
      setIsLoading(false);
    }
  };

  // 打开条款弹窗
  const openTermsModal = (type) => {
    setActiveModalType(type);
    if (type === 'terms') {
      setTermsModalVisible(true);
    } else {
      setPrivacyModalVisible(true);
    }
  };

  // 关闭条款弹窗
  const closeTermsModal = () => {
    setTermsModalVisible(false);
    setPrivacyModalVisible(false);
  };

  // 关闭弹窗
  const handleClose = () => {
    loginForm.resetFields();
    registerForm.resetFields();
    onClose();
  };

  return (
    <>
      <Modal
        title=""
        open={visible}
        onCancel={handleClose}
        footer={null}
        width={400}
        className="auth-modal"
      >
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            {activeTab === 'login' ? '用户登录' : '用户注册'}
          </h2>
          <p className="text-gray-500">
            {activeTab === 'login' ? '登录后使用更多功能' : '注册新账户'}
          </p>
        </div>

        <Tabs
          activeKey={activeTab}
          onChange={setActiveTab}
          className="mb-6"
        >
          <TabPane tab={<><LoginOutlined /> 登录</>} key="login">
            <Form
              form={loginForm}
              layout="vertical"
              onFinish={handleLogin}
            >
              <Form.Item
                label="用户名"
                name="username"
                rules={[{ required: true, message: '请输入用户名' }]}
              >
                <Input placeholder="请输入用户名" />
              </Form.Item>
              <Form.Item
                label="联系方式"
                name="phone"
                rules={[
                  { required: true, message: '请输入手机号或邮箱' }
                ]}
              >
                <Input placeholder="请输入手机号或邮箱" />
              </Form.Item>
              <Form.Item className="mt-6">
                <Button
                  type="primary"
                  htmlType="submit"
                  className="w-full h-12 bg-primary hover:bg-blue-600"
                  loading={isLoading}
                >
                  登录
                </Button>
              </Form.Item>
            </Form>
          </TabPane>

          <TabPane tab={<><UserAddOutlined /> 注册</>} key="register">
            <Form
              form={registerForm}
              layout="vertical"
              onFinish={handleRegister}
            >
              <Form.Item
                label="用户名"
                name="username"
                rules={[{ required: true, message: '请输入用户名' }]}
              >
                <Input placeholder="请输入用户名" />
              </Form.Item>
              <Form.Item
                label="联系方式"
                name="phone"
                rules={[
                  { required: true, message: '请输入手机号或邮箱' }
                ]}
              >
                <Input placeholder="请输入手机号或邮箱" />
              </Form.Item>
              <Form.Item
                name="agreeTerms"
                valuePropName="checked"
                rules={[
                  { required: true, message: '请阅读并同意服务条款' }
                ]}
              >
                <Checkbox>
                  我已阅读并同意
                  <Button 
                    type="link" 
                    size="small" 
                    className="p-0 mx-1" 
                    onClick={() => openTermsModal('terms')}
                  >
                    服务条款
                  </Button>
                </Checkbox>
              </Form.Item>
              <Form.Item
                name="agreePrivacy"
                valuePropName="checked"
                rules={[
                  { required: true, message: '请阅读并同意隐私政策' }
                ]}
              >
                <Checkbox>
                  我已阅读并同意
                  <Button 
                    type="link" 
                    size="small" 
                    className="p-0 mx-1" 
                    onClick={() => openTermsModal('privacy')}
                  >
                    隐私政策
                  </Button>
                </Checkbox>
              </Form.Item>
              <Form.Item className="mt-6">
                <Button
                  type="primary"
                  htmlType="submit"
                  className="w-full h-12 bg-primary hover:bg-blue-600"
                  loading={isLoading}
                >
                  注册
                </Button>
              </Form.Item>
            </Form>
          </TabPane>
        </Tabs>

        <div className="text-center text-sm text-gray-500">
          {activeTab === 'login' ? (
            <p>
              还没有账号？
              <Button 
                type="link" 
                onClick={() => setActiveTab('register')}
                className="px-1"
              >
                立即注册
              </Button>
            </p>
          ) : (
            <p>
              已有账号？
              <Button 
                type="link" 
                onClick={() => setActiveTab('login')}
                className="px-1"
              >
                立即登录
              </Button>
            </p>
          )}
        </div>

        <style jsx>{`
          .auth-modal .ant-tabs-nav {
            margin-bottom: 24px;
          }
          .auth-modal .ant-tabs-tab {
            font-size: 16px;
            padding: 12px 24px;
          }
        `}</style>
      </Modal>

      {/* 服务条款弹窗 */}
      <Modal
        title="服务条款"
        open={termsModalVisible}
        onCancel={closeTermsModal}
        footer={[
          <Button key="close" onClick={closeTermsModal}>
            关闭
          </Button>
        ]}
        width={700}
      >
        <div className="max-h-96 overflow-y-auto p-4 bg-gray-50 rounded-lg">
          <pre className="whitespace-pre-wrap text-sm text-gray-800 font-sans">
            {termsContent}
          </pre>
        </div>
      </Modal>

      {/* 隐私政策弹窗 */}
      <Modal
        title="隐私政策"
        open={privacyModalVisible}
        onCancel={closeTermsModal}
        footer={[
          <Button key="close" onClick={closeTermsModal}>
            关闭
          </Button>
        ]}
        width={700}
      >
        <div className="max-h-96 overflow-y-auto p-4 bg-gray-50 rounded-lg">
          <pre className="whitespace-pre-wrap text-sm text-gray-800 font-sans">
            {privacyContent}
          </pre>
        </div>
      </Modal>
    </>
  );
};

export default AuthModal;