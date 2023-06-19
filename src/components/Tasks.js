import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';

import Task from './Task';

export default function Tasks(props) {
  const { tasks } = props;

  return (
    <Box sx={ { flexGrow: 1 } }>
      <Grid container spacing={ 2 }>
        {
          tasks.map(task => {
            return (
              <Grid xs={ 3 } key={ task.id }>
                <Task task={ task } />
              </Grid>
            );
          })
        }
      </Grid>
    </Box>
  );
}