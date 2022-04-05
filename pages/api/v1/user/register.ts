import type {NextApiRequest, NextApiResponse} from 'next';
import {PrismaClient} from '@prisma/client';

const prisma = new PrismaClient();

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const {username, password, loginMethod} = req.body;
  const user = await prisma.user.create({
    data: {
      username,
      password,
    },
  });
  res.status(200).json({resource: user});
  // return res.status(400).json({msg: 'User already exists'});
};