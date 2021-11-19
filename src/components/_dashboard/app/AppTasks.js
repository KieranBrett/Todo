import { React } from 'react';
import { doc, deleteDoc, setDoc, getFirestore, collection, query, where, onSnapshot } from "firebase/firestore";
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
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

// ----------------------------------------------------------------------

const TASKS = [
  'Create FireStone Logo',
  'Add SCSS and JS files if required',
  'Stakeholder Meeting',
  'Scoping & Estimations',
  'Sprint Showcase'
];

// ----------------------------------------------------------------------


export default function AppTasks(props) {
  // const [lists, setLists] = React.useState('');
  // const [loading, setLoading] = React.useState(true);
  const db = getFirestore();

  return (
    <Card>
      <CardHeader title={<div>
        {props.list_name}

        <IconButton edge="end" aria-label="delete" onClick={() => {
          console.log("del list")
        }}>
          <DeleteIcon />
        </IconButton>
      </div>
      } />
      <Box sx={{ px: 3, py: 1 }}>
        <List>
          {props.list.map((task) => (
            <ListItem secondaryAction={
              <IconButton edge="end" aria-label="delete" onClick={() => {
                console.log(props.list_id)
                const path = "lists/".concat(props.list_id).concat("/todo/").concat(task[0]);
                deleteDoc(db, path);
              }}>
                <DeleteIcon />
              </IconButton>
            }>
              <ListItemText primary={task[1].text} />

            </ListItem>
          ))}
        </List>
      </Box>
    </Card>
  );
}
