import fs from 'fs';

export default function handler(_req: any, res: any) {
  try {
    const fileContents = fs.readFileSync('res/self.txt', 'utf-8');
    res.status(200).json({ fileContents });
  } catch (error) {
    console.error('Error reading file:', error);
    res.status(500).json({ error: 'Failed to read file' });
  }
}
