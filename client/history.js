import createHistory from 'history/createBrowserHistory';

const history = process.env.NODE_ENV === 'test' ? createMemoryHistory() : createHistory()

export default history;