import { filter } from 'lodash';
import { Icon } from '@iconify/react';
import { sentenceCase } from 'change-case';
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
} from '@mui/material';

import {AppTasks} from '../components/_dashboard/app';
// components
import Page from '../components/Page';
import Label from '../components/Label';
import Scrollbar from '../components/Scrollbar';
import SearchNotFound from '../components/SearchNotFound';
import { UserListHead, UserListToolbar, UserMoreMenu } from '../components/_dashboard/user';
//
import USERLIST from '../_mocks_/user';


export default function Lists() {
  const [lists, setLists] = useState(null);
  const auth = getAuth();
  const db = getFirestore();

  const q = query(collection(db, 'lists'), where('owner_id', "==", auth.currentUser ? auth.currentUser.uid : null));
  const unsubscribe = onSnapshot(q, (querySnapshot) => {
    const lists = [];
    querySnapshot.forEach((doc) => {
      lists.push(doc.data());
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
          <Button
            variant="contained"
            component={RouterLink}
            to="#"
            startIcon={<Icon icon={plusFill} />}
            onClick={() => {
              setDoc(doc(db, "testers", "Sup"), {
                name: "Sup"
              })
            }}
          >
            Create a new List
          </Button>
        </Stack>
        
        {lists ? lists.map((list) => <h1>{list.list_name}</h1>) : null}
      </Container>
    </Page>
  );
}

function showListName() {

}
