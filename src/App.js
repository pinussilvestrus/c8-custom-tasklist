import { useState } from 'react';

import { useTasks } from './queries';

import { Tasks, Titlebar } from './components';

function App() {

  const { isLoading, error, data } = useTasks({
    state: 'CREATED'
  });

  const [ allTasksEnabled, setAllTasksEnabled ] = useState(false);

  const onModeChange = (allTasksEnabled) => {
    setAllTasksEnabled(allTasksEnabled);
  };

  if (isLoading) return 'Loading...';

  if (error) {
    return 'An error has occurred: ' + (error.variant === 'network-error' ? error.networkError.message : error.response.message);
  }

  console.log('Tasks', data);

  return (
    <div className="App">
      <Titlebar
        title="My tasks"
        allTasksEnabled={ allTasksEnabled }
        onModeChange={ onModeChange } />
      <Tasks
        allTasksEnabled={ allTasksEnabled }
        tasks={ data } />
    </div>
  );
}

export default App;
