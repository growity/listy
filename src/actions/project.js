import { setProject, getProjectsDb } from '../indexedDB/project';

export const projectList = data => ({
  type: 'GET_PROJECTS',
  projects: data,
});

export const projectListAsync = () => getProjectsDb();

export const addProjectAsync = projectArgument => setProject(projectArgument);
