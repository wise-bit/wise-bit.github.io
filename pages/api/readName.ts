import fs from 'fs';
import path from 'path';

export default function handler(_req: any, res: any) {
  const configDirectory = path.resolve(process.cwd() + '\\res');
  try {
    const fileContents = fs.readFileSync(
      path.join(configDirectory, 'name.txt'),
      'utf8'
    );
    res.status(200).json({ fileContents });
  } catch (error) {
    console.error('Error reading file:', error);
    res.status(500).json({
      error: 'Failed to read file',
    });
  }
}
