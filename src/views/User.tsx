import * as React from 'react';
import { useParams, useNavigate } from "react-router-dom";

import { Box, CircularProgress, Snackbar, Grid, AppBar, Toolbar, Button } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

import ApiService from '../service/Service';
import { IUser } from '../models';
import { UserBadges, UserInfo, UserTags, UserPosts } from '../components/molecules';

const User: React.FC<{}> = () => {
  const navigate = useNavigate();
  const { userId } = useParams();

  const [error, setError] = React.useState('');
  const [loading, setLoading] = React.useState<boolean>(false);
  const [user, setUser] = React.useState<IUser | null>(null);

  const fetchUser = React.useCallback( async () => {
    setLoading(true);
    setUser(null);
    setError('');
    try{
      const { items } = await ApiService.getRequest(
        `${process.env.REACT_APP_API_URL}/users/${userId}?site=stackoverflow`
      );
      setUser(items[0]);
      setLoading(false);
      if(items.length === 0) setError('No Content found for this user');
    } catch(e) {
      const parsedError = JSON.parse(JSON.stringify(e));
      setError(parsedError.message);
    }
  }, [setUser, setError, setLoading, userId]);

  React.useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  return (
    <div id="user">
      <AppBar position="static" sx={{ marginBottom: '1rem'}}>
        <Toolbar>
          <Button
            variant="contained"
            startIcon={<ArrowBackIosNewIcon />}
            onClick={() => navigate('/')}
          >
            Back
          </Button>
        </Toolbar>
      </AppBar>
      {
        loading
        ?
        <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '5rem' }}>
          <CircularProgress />
        </Box>
        :
        user && 
        <Box>
          <Grid container spacing={2}>
            <Grid item xs={12} md={3}>
              <UserInfo user={user}/>
            </Grid>
    
            <Grid item xs={12} md={9}>
              <UserBadges user={user}/>
              <UserTags user={user}/>
              <UserPosts user={user}/>
            </Grid>
          </Grid>
        </Box>
      }

      <Snackbar
        open={error !== ''}
        autoHideDuration={6000}
        message={error}
      />
    </div>
  );
}

export default User;