import firebase from "@firebase/app";
import Button from "@material-ui/core/Button";
import { FirebaseAuthConsumer } from "@react-firebase/auth";
import GoogleSignIn from "./googleSignIn";

export default function SignInButton() {
  return <FirebaseAuthConsumer>
    {({ isSignedIn }) => {
      if (!isSignedIn) {
        // If the user is authenticated/signed in
        return <GoogleSignIn />;
      } else {
        return (
          <Button
            color="secondary"
            size="small"
            variant="contained"
            onClick={signOut}
          >
            Sign Out
          </Button>
        );
      }
    }}
  </FirebaseAuthConsumer>;
}

function signOut() {
    firebase.auth().signOut();
  }