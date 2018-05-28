import DB from '../db/db';

export const issueList = data => ({
  type: 'GET_ISSUES',
  issues: data,
});

export function issueListAsync() {
  return (dispatch) => {
    DB.issue.toArray().then((issues) => {
      dispatch(issueList(issues));
    });
  };
}

export function addIssueAsync(issueArgument) {
  return (dispatch) => {
    DB.issue.add(issueArgument).then(() => {
      dispatch(issueListAsync());
    });
  };
}

export function updateIssueStatusAsync(id, value) {
  return (dispatch) => {
    DB.issue.update(id, { isDone: !value }).then(() => {
      dispatch(issueListAsync());
    });
  };
}
