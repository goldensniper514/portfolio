import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

interface Project {
  title: string;
  description: string;
  technologies: string[];
  image: string;
  github?: string;
  demo?: string;
}

interface ProjectsData {
  projects: Project[];
}

export async function GET() {
  try {
    const projectsPath = path.join(process.cwd(), 'public/data/projects.json');
    const projectsData = await fs.readFile(projectsPath, 'utf8');
    const data = JSON.parse(projectsData) as ProjectsData;

    return NextResponse.json(data);
  } catch {
    return NextResponse.json(
      { message: 'Failed to fetch projects' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const projectsPath = path.join(process.cwd(), 'public/data/projects.json');
    const projectsData = await fs.readFile(projectsPath, 'utf8');
    const data = JSON.parse(projectsData) as ProjectsData;
    const newProject = await request.json() as Project;

    data.projects.push(newProject);
    await fs.writeFile(projectsPath, JSON.stringify(data, null, 2));

    return NextResponse.json({ message: 'Project added successfully' });
  } catch {
    return NextResponse.json({ error: 'Failed to add project' }, { status: 500 });
  }
}
