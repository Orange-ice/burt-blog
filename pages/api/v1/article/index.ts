import type {NextApiRequest, NextApiResponse} from 'next';
import {withSessionApi} from '../../../../lib/session';
import {PrismaClient} from '@prisma/client';
import {verifyHttpMethod} from '../../../../lib/helper';

const prisma = new PrismaClient();

export default withSessionApi(articleHandle);

async function articleHandle(req: NextApiRequest, res: NextApiResponse) {
  if (!verifyHttpMethod(req, res, ['POST', 'GET', 'PATCH', 'DELETE'])) return;

  if (!req.session.user) {
    res.status(401).json({
      message: '请先登录',
    });
    return;
  }

  switch (req.method) {
    case 'GET':
      return getArticles(req, res);
    case 'POST':
      return createArticle(req, res);
    case 'PATCH':
    // return updateArticle(req, res);
    case 'DELETE':
    // return deleteArticle(req, res);
  }
}

/**
 * 获取文章列表
 * */
async function getArticles(req: NextApiRequest, res: NextApiResponse) {
  const {id} = req.query;
  const article = await prisma.article.findMany({
    where: {
      // id,
    },
  });
  res.status(200).json(article);
}

async function createArticle(req: NextApiRequest, res: NextApiResponse) {
  const {title, content} = req.body;
  const {user} = req.session;

  if (!title || !content) {
    res.status(400).json({
      message: '请填写完整的文章信息',
    });
    return;
  }

  const article = await prisma.article.create({
    data: {
      title,
      content,
      authorId: user!.id
    },
  });
  res.status(200).json(article);
}
