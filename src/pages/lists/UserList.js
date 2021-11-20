import { React } from 'react';
import { doc, updateDoc, arrayRemove, getFirestore } from "firebase/firestore";

// material
import {
  Box,
  Card,
  CardHeader
} from '@mui/material';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import DeleteList from './DeleteList';
import AddTodo from './AddTodo';

export default function UserList(props) {
  // const [lists, setLists] = React.useState('');
  // const [loading, setLoading] = React.useState(true);
  const db = getFirestore();

  return (
    <Card sx={{height: '100%'}}>
      <CardHeader title={<div>
        {props.list_name}

        <DeleteList list_id={props.list_id} />
        <AddTodo list_id={props.list_id} />
      </div>
      } />
      <Box sx={{ px: 3, py: 1 }}>
        <List>
          {props.list.map((task) => (
            <ListItem key={task} secondaryAction={
              <IconButton edge="end" aria-label="delete" onClick={() => {
                updateDoc(doc(db, 'lists', props.list_id), {
                  todo: arrayRemove(task)
                })
              }}>
                <DeleteIcon />
              </IconButton>
            }>
              <ListItemText>
                  {task.toLowerCase().includes("http") ? <a href={task.split(',')[0]}>{task.split(',')[1].trim()}</a> : task}
              </ListItemText>
            </ListItem>
          ))}
        </List>
      </Box>
    </Card>
  );
}
