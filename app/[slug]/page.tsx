import fs from 'fs';
import path from 'path';
import Markdown from 'markdown-to-jsx';
import { notFound } from 'next/navigation';

interface PageProps {
  params: { slug: string };
}

// Mark the component async
export default async function MarkdownFilePage({ params }: PageProps) {
  const { slug } = await params;
  const filePath = path.join(process.cwd(), 'public', 'text', `${slug}.md`);
  let fileContents: string;

  try {
    fileContents = fs.readFileSync(filePath, 'utf-8');
  } catch (err) {
    notFound();
  }

  return (
    <div style={{ margin: '50px' }}>
      <Markdown>{fileContents}</Markdown>
    </div>
  );
}
