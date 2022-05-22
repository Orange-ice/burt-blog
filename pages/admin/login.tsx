import {NextPage} from 'next';
import {Button, Input, Form} from '@arco-design/web-react';

interface SubmitData {
  username: string;
  password: string;
}

const Login: NextPage = () => {
  const [form] = Form.useForm();

  const onSubmit = (values: SubmitData) => {
    console.log(values);
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '200px 0',
    }}>
      <h3 style={{marginBottom: 16, fontSize: 24}}>Burt Blog</h3>
      <Form form={form} onSubmit={onSubmit} style={{width: 600}}>
        <Form.Item field="username" label="用户名" required>
          <Input placeholder="请输入用户名" allowClear/>
        </Form.Item>
        <Form.Item field="password" label="密码" required>
          <Input.Password placeholder="请输入密码"/>
        </Form.Item>
        <Form.Item wrapperCol={{offset: 5}}>
          <Button htmlType="submit" type="primary">登录</Button>
          <Button style={{marginLeft: 24}} onClick={() => form.resetFields()}>重置</Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;