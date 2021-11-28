
// FIREBASE
import { getFirestore, collection, query, where } from "firebase/firestore";
import { getAuth } from 'firebase/auth';

import { useCollection } from 'react-firebase-hooks/firestore';


// material
import {
  Stack,
  Container,
  Typography,
  Grid,
} from '@mui/material';

import CreateList from './CreateList';


import UserList from './UserList'
// import { AppTasks } from '../../components/_dashboard/app';
// components
import Page from '../../components/Page';


export default function Lists() {
  const db = getFirestore();

  const listRef = collection(db, "lists")
  const q = getAuth().currentUser ? query(listRef, where("owner_id", "==", getAuth().currentUser.uid)) : null;
  
  const [value, loading, error] = useCollection(
    q,
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  )

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
          {error && <Grid item xs={12} sm={12} md={12}><h1>Error Loading Data</h1></Grid>}
          {loading && <Grid item xs={12} sm={6} md={4}><h1>Loading...</h1></Grid>}
          {value && value.docs.map(list => <List key={list.id} list={[list.id, list.data()]} />)}
        </Grid>
      </Container>
    </Page>
  );
}

function List(props) {
  // console.log(props)
  return <Grid item xs={12} sm={6} md={4}>
    <UserList list={props.list[1].todo} list_id={props.list[0]} list_name={props.list[1].list_name} />
  </Grid>

}
