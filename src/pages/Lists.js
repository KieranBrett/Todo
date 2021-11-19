import { Icon } from '@iconify/react';
import { useState, Suspense } from 'react';
import plusFill from '@iconify/icons-eva/plus-fill';
import { Link as RouterLink } from 'react-router-dom';
// FIREBASE
import { doc, setDoc, getFirestore, collection, query, where, onSnapshot } from "firebase/firestore";
import { getAuth } from 'firebase/auth';

// material
import {
  Card,
  Stack,
  Button,
  Container,
  Typography,
  Box,
  Grid,
} from '@mui/material';

import CreateList from '../components/list/CreateList';


import { AppTasks } from '../components/_dashboard/app';
// components
import Page from '../components/Page';


export default function Lists() {
  const [lists, setLists] = useState(null);
  const auth = getAuth();
  const db = getFirestore();

  const q = query(collection(db, 'lists'), where('owner_id', "==", auth.currentUser ? auth.currentUser.uid : null));
  const unsubscribe = onSnapshot(q, (querySnapshot) => {
    const lists = [];
    querySnapshot.forEach((doc) => {
      // console.log(doc.id)
      lists.push([doc.id, doc.data()]);
    })

    setLists(lists);
  })

  return (
    <Page title="Lists | MakeaToDo">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Your Lists
          </Typography>
          <CreateList />
        </Stack>
        <Grid container spacing={3}>
          {lists ? lists.map((list) => <List list={list} />) : null}
        </Grid>
      </Container>
    </Page>
  );
}

function List(props) {
  const [todos, setTodos] = useState(null);
  const auth = getAuth();
  const db = getFirestore();

  const d = "lists/".concat(props.list[0]).concat("/todo")

  const q = query(collection(db, d));
  const unsubscribe = onSnapshot(q, (querySnapshot) => {
    const todos = [];
    querySnapshot.forEach((doc) => {
      // console.log(doc.id)
      todos.push([doc.id, doc.data()]);
    })

    setTodos(todos);
  })

  if (todos) {
    return <Grid item xs={12} sm={6} md={3}>
      <AppTasks list={todos} list_id={props.list[0]} list_name={props.list[1].list_name} />
      </Grid>
  }
  return <h1>Loading...</h1>
}
