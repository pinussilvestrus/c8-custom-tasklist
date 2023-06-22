import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import SettingsAccessibilityIcon from '@mui/icons-material/SettingsAccessibility';

import TasksModeButton from './TasksModeButton';


export default function Titlebar(props) {
  const { title, allTasksEnabled, onModeChange } = props;

  return (
    <Box sx={ { flexGrow: 1 } }>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="home" sx={ { mr: 2 } }>
            <SettingsAccessibilityIcon />
          </IconButton>
          <Typography variant="h6" color="inherit" component="div" sx={ { flexGrow: 1 } }>
            { title }
          </Typography>
          <TasksModeButton allTasksEnabled={ allTasksEnabled } onModeChange={ onModeChange } />
        </Toolbar>
      </AppBar>
    </Box>
  );
}