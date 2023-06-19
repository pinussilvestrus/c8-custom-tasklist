import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function Task(props) {
  const { task } = props;

  return (
    <Card sx={ { minWidth: 275 } }>
      <CardContent>
        <Typography sx={ { fontSize: 14 } } color="text.secondary" gutterBottom>
          { task.creationDate }
        </Typography>
        <Typography variant="h5" component="div">
          { task.name }
        </Typography>
        <Typography sx={ { mb: 1.5 } } color="text.secondary">
          { task.processName }
        </Typography>
        <Typography variant="body2">
          { task.assignee ? task.assignee : 'Unassigned' }
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Open form</Button>
        <Button size="small" variant="contained">Assign me</Button>
      </CardActions>
    </Card>
  );
}