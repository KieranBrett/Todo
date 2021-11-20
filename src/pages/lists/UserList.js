import { React } from 'react';
import { doc, deleteDoc, setDoc, updateDoc, arrayRemove, getFirestore, collection, query, where, onSnapshot } from "firebase/firestore";
import PropTypes from 'prop-types';
import { Form, FormikProvider, useFormik } from 'formik';
// material
import {
  Box,
  Card,
  Checkbox,
  CardHeader,
  Typography,
  FormControlLabel,
  Stack,
  Button
} from '@mui/material';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import DeleteList from './DeleteList';
import AddTodo from './AddTodo';

export default function UserList(props) {
  // const [lists, setLists] = React.useState('');
  // const [loading, setLoading] = React.useState(true);
  const db = getFirestore();

  return (
    <Card>
      <CardHeader title={<div>
        {props.list_name}

        <DeleteList list_id={props.list_id} />
        <AddTodo list_id={props.list_id} />
      </div>
      } />
      <Box sx={{ px: 3, py: 1 }}>
        <List>
          {props.list.map((task) => (
            <ListItem secondaryAction={
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
