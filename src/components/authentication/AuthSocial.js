import { Icon } from '@iconify/react';
import googleFill from '@iconify/icons-eva/google-fill';
import twitterFill from '@iconify/icons-eva/twitter-fill';
import facebookFill from '@iconify/icons-eva/facebook-fill';
// material
import { Stack, Button, Divider, Typography } from '@mui/material';

import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { useNavigate } from 'react-router-dom';

// ----------------------------------------------------------------------

export default function AuthSocial() {
  const navigate = useNavigate();
  const auth = getAuth();

  return (
    <>
      <Stack direction="row" spacing={2}>
        <Button fullWidth size="large" color="inherit" variant="outlined" onClick={() => {
          const provider = new GoogleAuthProvider();

          signInWithPopup(auth, provider).then((result) => {
            navigate('/');
          })
        }}>
          <Icon icon={googleFill} color="#DF3E30" height={24} />
        </Button>

        {/* <Button fullWidth size="large" color="inherit" variant="outlined" disabled>
          <Icon icon={facebookFill} color="#1877F2" height={24} />
        </Button>

        <Button fullWidth size="large" color="inherit" variant="outlined" disabled>
          <Icon icon={twitterFill} color="#1C9CEA" height={24} />
        </Button> */}
      </Stack>

      <Divider sx={{ my: 3 }}>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          OR
        </Typography>
      </Divider>
    </>
  );
}