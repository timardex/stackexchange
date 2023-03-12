import * as React from 'react';
import { useParams } from "react-router-dom";

import { Box, CircularProgress, Snackbar } from '@mui/material';

import ApiService from '../service/Service';
import { IUser } from '../models';
import { UserContent } from '../components/templates';

const User: React.FC<{}> = () => {
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
        `${process.env.REACT_APP_API_URL}/users/${userId}?order=desc&sort=reputation&site=stackoverflow`
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
      {
        loading
        ?
        <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '5rem' }}>
          <CircularProgress />
        </Box>
        :
        user && <UserContent user={user}/>
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