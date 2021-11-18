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


// components
import Page from '../components/Page';
import Label from '../components/Label';
import Scrollbar from '../components/Scrollbar';
import SearchNotFound from '../components/SearchNotFound';
import { UserListHead, UserListToolbar, UserMoreMenu } from '../components/_dashboard/user';
//
import USERLIST from '../_mocks_/user';


export default function User() {
  const auth = getAuth();
  const db = getFirestore();


  return (
    <Page title="Lists | MakeaToDo">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            User
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
            Add to database
          </Button>
        </Stack>

        <Card>
          <h1>Hello</h1>
        </Card>
      </Container>
    </Page>
  );
}
