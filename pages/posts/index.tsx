import type {GetStaticProps, NextPage} from 'next';
import Layout from '../../components/layout/Layout';
import styles from '../../styles/Posts.module.css'; // 文件名小写了竟然也能偶尔起作用！！！
import {PrismaClient} from '@prisma/client';
import Link from 'next/link';

interface Posts {
  id: number;
  title: string;
  content: string;
  createdAt: string;
}

interface PostsProps {
  posts: Posts[];
}


const Posts: NextPage<PostsProps> = (props) => {
  const {posts} = props;

  const groupPostsByYear = (posts: Posts[]) => {
    const groupedPosts = posts.reduce((acc: { [K: string]: Posts[] }, post) => {
      const year = new Date(post.createdAt).getFullYear();
      if (!acc[year]) {
        acc[year] = [];
      }
      acc[year].push(post);
      return acc;
    }, {});
    return groupedPosts;
  };

  const groupedPosts = groupPostsByYear([...posts, {
    id: 1,
    title: '222',
    content: '33333',
    createdAt: new Date('2020-01-01').toISOString(),
  }]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${month} 月 ${day} 日`;
  };

  return (
    <Layout>
      <div className={styles.container}>
        <h1 className={styles.title}>Posts</h1>
        <div className={styles.list}>
          {Object.keys(groupedPosts).sort((a, b) => Number(b) - Number(a)).map((year) => (
            <div key={year} className={styles.year}>
              <h2 className={styles.yearTitle}>{year}</h2>
              <ul className={styles.posts}>
                {groupedPosts[year].map((post) => (
                  <li key={post.id} className={styles.post}>
                    <Link href={`/posts/${post.id}`}>
                      <a className={styles.postTitle}>{post.title}</a>
                    </Link>
                    <span className={styles.postCreatedAt}>{formatDate(post.createdAt)}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Posts;


export const getStaticProps: GetStaticProps = async (ctx) => {
  const prisma = new PrismaClient();
  const article = await prisma.article.findMany({
    select: {id: true, title: true, content: false, createdAt: true},
    orderBy: {createdAt: 'desc'},
  });
  return {
    props: {
      posts: article.map(item => ({
        ...item,
        createdAt: item.createdAt.toJSON(),
      })),
    },
  };
};