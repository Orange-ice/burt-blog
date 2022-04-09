import type {NextApiRequest, NextApiResponse} from 'next';
import {PrismaClient} from '@prisma/client';
import {verifyHttpMethod} from '../../../../lib/helper';
import {withSessionApi} from '../../../../lib/session';

const prisma = new PrismaClient();

type LoginMethod = 'CODE' | 'PASSWORD';

interface RequestBody {
  email: string;
  password?: string;
  method: LoginMethod;
  code?: string;
}

export default withSessionApi(login);

async function login(req: NextApiRequest, res: NextApiResponse) {
  if (!verifyHttpMethod(req, res, 'POST')) return;
  const {email, loginMethod} = req.body;

  const errorMessage = await verifyFields(loginMethod, req.body);
  if (errorMessage) {
    res.status(400).json({message: errorMessage});
    return;
  }

  const user = await prisma.user.upsert({
    where: {email},
    create: {email},
    update: {}
  });
  req.session.user = user;
  // session 赋值后要存储！！！
  await req.session.save();
  res.json(user);

}

/**
 * 校验登录请求传参
 * */
async function verifyFields(loginMethod: LoginMethod, requestData: RequestBody) {
  const {email, code, password} = requestData;
  let errorMessage = '';
  if (!email) {
    return 'email is required';
  }
  switch (loginMethod) {
    case 'CODE':
      if (!code) {
        return 'Code is required';
      }
      errorMessage = await verifyCode(code, email);
      break;
    case 'PASSWORD':
      if (!password) {
        return 'Password is required';
      }
      errorMessage = await verifyPassword(password, email);
      break;
    default:
      errorMessage = 'Login method is required';
      break;
  }
  return errorMessage;
}

/**
 * 验证 code 的有效性
 * */
async function verifyCode(code: string, email: string) {
  const codeInfo = await prisma.code.findUnique({where: {email: email}});
  if (!codeInfo) {
    return 'Please get the verification code first';
  }
  if (codeInfo?.code !== code) {
    return 'Code is Invalid';
  }
  const now = new Date();
  if (now.getTime() - codeInfo.updatedAt.getTime() > 1000 * 60 * 5) {
    return 'Code is Expired';
  }
  return '';
}

/**
 * 验证密码的有效性
 * */
async function verifyPassword(password: string, email: string) {
  const userInfo = await prisma.user.findUnique({where: {email}});
  if (!userInfo) {
    return 'User does not exist';
  }
  if (userInfo.password !== password) {
    return 'Password is Invalid';
  }
  return '';
}