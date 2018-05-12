import { createStore } from 'redux';

const reducer = (state, action) => {
  switch (action.type) {
    case 'INCREASE_COUNTER': {
      const st = state;
      st.counter += 1;
      return { ...state, ...{ counter: (state.counter + 1) } };
    }
    case 'RESET_COUNTER':
      return { ...state, ...{ counter: 0 } };
    default:
      return state;
  }
};


const sites = createStore(reducer, {
  title: '',
  description: '',
  image: '',
  url: '',
  counter: 0,
});

export default sites;
