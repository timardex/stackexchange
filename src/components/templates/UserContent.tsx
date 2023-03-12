import * as React from 'react';

import { Box, Grid } from '@mui/material';

import { IUser } from '../../models';
import { UserInfo } from '../molecules';

interface Props {
  user: IUser
};

const UserContent: React.FC<Props> = ({ user }: Props) => {
  return (
    <Box>
      <Grid container spacing={2}>
        <Grid item xs={12} md={3}>
          <UserInfo user={user}/>
        </Grid>

        <Grid item xs={12} md={9}>
          test
        </Grid>
      </Grid>
    </Box>
  );
}

export default UserContent;