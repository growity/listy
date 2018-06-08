
const initialState = { projects: [] };
export default (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_PROJECT': {
      return state;
    }
    case 'GET_PROJECTS': {
      return { ...state, projects: action.projects };
    }
    default:
      return state;
  }
};
