import { useTasks } from './queries/useTasks';

import './App.css';

import Tasks from './components/Tasks';

function App() {

  const { isLoading, error, data } = useTasks({
    state: 'CREATED'
  });

  if (isLoading) return 'Loading...';

  if (error) {
    return 'An error has occurred: ' + (error.variant === 'network-error' ? error.networkError.message : error.response.message);
  }

  console.log(data);

  return (
    <div className="App">
      <h1>Custom Camunda Platform Tasklist</h1>

      <Tasks tasks={ data } />
    </div>
  );
}

export default App;
