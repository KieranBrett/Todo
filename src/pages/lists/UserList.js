import React from 'react';
import { doc, updateDoc, arrayRemove, getFirestore } from "firebase/firestore";

// material
import {
  Box,
  Card,
  CardHeader
} from '@mui/material';

import ReactCanvasConfetti from 'react-canvas-confetti';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import DeleteList from './DeleteList';
import AddTodo from './AddTodo';


const canvasStyles = {
  position: 'fixed',
  pointerEvents: 'none',
  width: '100%',
  height: '100%',
  top: 0,
  left: 0
}

class UserList extends React.Component {
  getInstance = (instance) => {
    // saving the instance to an internal property
    this.confetti = instance;
  }

  startConfetti = () => {
    // starting the animation
    this.confetti();
  }

  render() {
    const db = getFirestore();

    return (
      <Card sx={{ height: '100%' }}>

        <ReactCanvasConfetti
          particleCount={200}
          // set the styles as for a usual react component
          style={canvasStyles}
          // set the callback for getting instance. The callback will be called after initialization ReactCanvasConfetti component
          refConfetti={this.getInstance}
        />

        <CardHeader title={<div>
          {this.props.list_name}

          <DeleteList list_id={this.props.list_id} />
          <AddTodo list_id={this.props.list_id} />
        </div>
        } />
        <Box sx={{ px: 3, py: 1 }}>
          <List>
            {this.props.list.map((task) => (
              <ListItem key={task} secondaryAction={
                <IconButton edge="end" aria-label="delete" onClick={() => {
                  this.startConfetti();

                  updateDoc(doc(db, 'lists', this.props.list_id), {
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
      </Card >
    );
  }
}

export default UserList;