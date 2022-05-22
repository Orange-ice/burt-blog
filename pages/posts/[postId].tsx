import {GetStaticPaths, GetStaticProps, NextPage} from 'next';
import {PrismaClient} from '@prisma/client';

interface Props {
  post: Post;
}

const PostItem: NextPage<Props> = ({post}) => {
  return (
    <div>
      <h1>PostItem</h1>
      <h2>{post.title}</h2>
      <p>{post.content}</p>
      <p>{post.createdAt}</p>
    </div>
  );
};

export default PostItem;

export const getStaticPaths: GetStaticPaths = async (ctx) => {
  const prisma = new PrismaClient();
  const articles = await prisma.article.findMany({select: {id: true}});
  const paths = articles.map((article) => ({params: {postId: article.id.toString()}}));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const prisma = new PrismaClient();
  const article = await prisma.article.findUnique({
    where: {id: Number(context.params?.postId)},
  });
  return {
    props: {
      post: {
        ...article,
        createdAt: article?.createdAt.toJSON(),
        updatedAt: article?.updatedAt.toJSON(),
      }
    },
  };
};