import {NextApiRequest, NextApiResponse} from 'next';
import {PrismaClient} from '@prisma/client';
import {sendVerifyCode, verifyHttpMethod} from '../../../lib/helper';

const prisma = new PrismaClient();

export default async function sendCode(req: NextApiRequest, res: NextApiResponse) {
  if (!verifyHttpMethod(req, res, 'POST')) {return;}
  const {email} = req.body;

  if (!email) {
    res.status(400).json({
      message: 'Email is required',
    });
    return;
  }

  // upsert code
  const code = String(Math.floor(Math.random() * 9000) + 1000);
  await prisma.code.upsert({
    where: {email},
    update: {code},
    create: {email, code},
  });

  sendVerifyCode(email, code);

  res.status(200).json({
    message: 'Code sent',
  });
}