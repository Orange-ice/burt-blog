import type {NextApiRequest, NextApiResponse} from 'next';
import {withSessionApi} from '../../../../lib/session';
import {verifyHttpMethod} from '../../../../lib/helper';
import {PrismaClient} from '@prisma/client';

const prisma = new PrismaClient();

export default withSessionApi(getArticleList);

async function getArticleList(req: NextApiRequest, res: NextApiResponse) {
  if (!verifyHttpMethod(req, res, 'GET')) return;
  // TODO 接受查询参数还未完成（目前只支持查询所有）
  const article = await prisma.article.findMany();
  res.status(200).json(article);
}