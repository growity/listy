import DB from '../db/db';

export const projectList = projects => ({
  type: 'GET_PROJECTS',
  projects,
});

export function projectListAsync() {
  return (dispatch) => {
    DB.project.toArray().then((projects) => {
      dispatch(projectList(projects));
    });
  };
}

export function addProjectAsync(project) {
  return (dispatch) => {
    DB.project.add(project).then(() => {
      dispatch(projectListAsync());
    });
  };
}
