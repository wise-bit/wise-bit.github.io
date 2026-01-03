import fs from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';

export const runtime = 'nodejs';

export async function GET() {
  const configDirectory = path.resolve(process.cwd(), 'res');

  try {
    const fileContents = fs.readFileSync(
      path.join(configDirectory, 'name.txt'),
      'utf8'
    );

    return NextResponse.json({ fileContents });
  } catch (error) {
    console.error('Error reading file:', error);

    return NextResponse.json(
      { error: 'Failed to read file' },
      { status: 500 }
    );
  }
}
