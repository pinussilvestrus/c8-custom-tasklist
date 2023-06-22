import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';

import Task from './Task';

import './Tasks.css';

export default function Tasks(props) {
  const { tasks, allTasksEnabled } = props;

  return (
    <Box className="tasks-container" sx={ { flexGrow: 1 } }>
      { allTasksEnabled && (
        <Grid container spacing={ 2 }>
          {
            tasks.map(task => {
              return (
                <Grid xs={ 12 } sm={ 8 } md={ 4 } key={ task.id }>
                  <Task task={ task } />
                </Grid>
              );
            })
          }
        </Grid>
      ) }
      { !allTasksEnabled && (
        <Box sx={ { margin: 'auto' } }>
          <h2>Next task</h2>
          <Task task={ tasks[0] } />
        </Box>
      ) }
    </Box>
  );
}