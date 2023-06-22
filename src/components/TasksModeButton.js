import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';

export default function TasksModeButton(props) {

  const { allTasksEnabled, onModeChange } = props;

  return (
    <FormControlLabel label="Show all tasks" control={
      <Switch
        color="default"
        aria-label={ allTasksEnabled ? 'Show all tasks' : 'Show single next task' }
        checked={ allTasksEnabled }
        onChange={ () => {
          onModeChange(!allTasksEnabled);
        } }
      />
    } />
  );
}FormControlLabel;