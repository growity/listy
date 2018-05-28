import DB from '../db/db';

export const projectList = data => ({
  type: 'GET_PROJECTS',
  projects: data,
});

export function projectListAsync() {
  return (dispatch) => {
    DB.project.toArray().then((projects) => {
      dispatch(projectList(projects));
    });
  };
}

export function addProjectAsync(projectArgument) {
  return (dispatch) => {
    DB.project.add(projectArgument).then(() => {
      dispatch(projectListAsync());
    });
  };
}
