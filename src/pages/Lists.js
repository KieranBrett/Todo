import { Icon } from '@iconify/react';
import { useState, useEffect, Suspense } from 'react';
import plusFill from '@iconify/icons-eva/plus-fill';
import { Link as RouterLink } from 'react-router-dom';
// FIREBASE
import { doc, setDoc, getFirestore, collection, query, where, onSnapshot } from "firebase/firestore";
import { getAuth } from 'firebase/auth';

import { useCollection } from 'react-firebase-hooks/firestore';


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
  const [lists, setLists] = useState([]);
  const [loading, setLoading] = useState(true);
  const auth = getAuth();
  const db = getFirestore();

  useEffect(() => {
    const q = query(collection(db, 'lists'), where('owner_id', "==", auth.currentUser ? auth.currentUser.uid : null));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const newLists = [];
      querySnapshot.forEach((doc) => {
        // console.log(doc.id)
        newLists.push([doc.id, doc.data()]);
      })

      setLists(newLists);
      if (loading) {
        setLoading(false);
      }
      console.log("...")
    })

    return () => unsubscribe();
  })

  // if (loading) {
  //   return <h1>Loading...</h1>
  // }
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
  return <Grid item xs={12} sm={6} md={3}>
    <AppTasks list={props.list[1].todo} list_id={props.list[0]} list_name={props.list[1].list_name} />
  </Grid>

}
