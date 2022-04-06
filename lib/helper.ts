import {NextApiRequest, NextApiResponse} from 'next';
import nodemailer from 'nodemailer';

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH' | 'HEAD' | 'OPTIONS';

/**
 * 验证请求方法是否合法
 * @param req 请求对象
 * @param res 响应对象
 * @param methods 请求方法
 * @returns 是否合法
 * */
export const verifyHttpMethod = (req: NextApiRequest, res: NextApiResponse, methods: HttpMethod | HttpMethod[]) => {
  const method = req.method;
  let isAllowed: boolean;
  if (methods instanceof Array) {
    isAllowed = methods.includes(method as HttpMethod);
  } else {
    isAllowed = method === methods;
  }
  if (!isAllowed) {
    res.status(405).json({
      message: 'Method Not Allowed'
    });
  }
  return isAllowed;
};

// SMTP配置
const config = {
  host: process.env.MAIL_HOST,
  port: 465,
  secure: true,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
};
// 创建SMTP客户端对象
const transporter = nodemailer.createTransport(config);
/**
 * 发送验证码
 * @param email 目标邮箱
 * @param code 验证码
 * */
export const sendVerifyCode = (email: string, code: string) => {
  const mailOptions = {
    from: `burt-blog <${config.auth.user}>`,
    to: email,
    subject: '验证码',
    text: `验证码：${code}`,
  };
  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.log(err);
    } else {
      console.log(info);
    }
  });
};