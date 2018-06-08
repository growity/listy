import DB from '../db/db';

export const issueList = issues => ({
  type: 'GET_ISSUES',
  issues,
});

export function issueListAsync() {
  return (dispatch) => {
    DB.issue.toArray().then((issues) => {
      dispatch(issueList(issues));
    });
  };
}

export function addIssueAsync(issue) {
  return (dispatch) => {
    DB.issue.add(issue).then(() => {
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
