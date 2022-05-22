import {GetServerSideProps, NextPage} from 'next';
import {Button, Input, Form, Message} from '@arco-design/web-react';
import {useRouter} from 'next/router';
import {login} from '../../service/login';
import {withSessionSsr} from '../../lib/session';
import {useEffect} from 'react';

interface SubmitData {
  email: string;
  password: string;
}

interface User {
  id: number;
  email: string;
}

interface PageProps {
  user: User | undefined;
}

const Login: NextPage<PageProps> = (props) => {
  const router = useRouter();
  const [form] = Form.useForm();

  useEffect(() => {
    if (props.user) {
      router.push('/admin/backstage');
    }
  }, []);

  const onSubmit = async (values: SubmitData) => {
    console.log(values);
    await login(values);
    await router.push('/admin/backstage');
    Message.success('登录成功');
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '200px 0',
    }}>
      <h3 style={{marginBottom: 16, fontSize: 24}}>Burt Blog</h3>
      <Form
        form={form}
        onSubmit={onSubmit}
        initialValues={{email: 'cburthuang@gmail.com'}}
        style={{width: 600}}
      >
        <Form.Item field="email" label="用户名" required>
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

export const getServerSideProps: GetServerSideProps = withSessionSsr(
  async (context) => {
    const user = context.req.session?.user;
    return {
      props: {
        user,
      },
    };
  }
);