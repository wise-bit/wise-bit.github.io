import fs from 'fs';
import path from 'path';
import Markdown from 'markdown-to-jsx';
import { GetServerSidePropsContext } from 'next';

interface MarkdownFilePageProps {
  fileContents: string;
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { slug } = context.query;
  const filePath = path.join(process.cwd(), 'public', 'text', `${slug}.md`);

  try {
    const fileContents = fs.readFileSync(filePath, 'utf-8');
    return {
      props: {
        fileContents,
      },
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
}

const MarkdownFilePage = ({ fileContents }: MarkdownFilePageProps) => {
  return (
    <div style={{ margin: '50px' }}>
      <Markdown>{fileContents}</Markdown>
    </div>
  );
};

export default MarkdownFilePage;
