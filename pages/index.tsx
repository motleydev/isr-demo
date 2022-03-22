import { request, gql } from 'graphql-request';
import { NextPage } from 'next';

interface Props {
  posts: {
    id: string;
    title: string;
    content: string;
  }[];
}

const query = gql`
  {
    posts: post {
      content
      id
      title
    }
  }
`;

const Home: NextPage<Props> = ({ posts }) => {
  return (
    <main>
      {posts.map((post) => (
        <article key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.content}</p>
        </article>
      ))}
    </main>
  );
};

export default Home;

export async function getStaticProps() {
  const { posts } = await request(
    'https://perfect-piranha-55.hasura.app/v1/graphql',
    query,
    {},
    {
      'x-hasura-admin-secret': process.env.HASURA_ADMIN_SECRET,
    }
  );
  return {
    props: {
      posts,
    },
  };
}
