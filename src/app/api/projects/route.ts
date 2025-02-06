import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

export async function GET() {
  try {
    const projectsPath = path.join(process.cwd(), 'public/data/projects.json');
    const projectsData = await fs.readFile(projectsPath, 'utf8');
    const projects = JSON.parse(projectsData);

    return NextResponse.json(projects);
  } catch {
    return NextResponse.json(
      { message: 'Failed to fetch projects' },
      { status: 500 }
    );
  }
}

export async function POST() {
  try {
    const projectsPath = path.join(process.cwd(), 'public/data/projects.json');
    const projectsData = await fs.readFile(projectsPath, 'utf8');
    const projects = JSON.parse(projectsData);

    return NextResponse.json(projects);
  } catch {
    return NextResponse.json(
      { message: 'Failed to update projects' },
      { status: 500 }
    );
  }
}
