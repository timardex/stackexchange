import * as React from 'react';

import { Typography, Grid } from '@mui/material';
import CakeIcon from '@mui/icons-material/Cake';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import LocalActivityIcon from '@mui/icons-material/LocalActivity';

import { IUser } from '../../../models';

import { convertTimestamp } from '../../../helpers';

interface Props {
  user: IUser
};

interface IUserData {
  icon: JSX.Element,
  text: string,
};

const UserInfo: React.FC<Props> = ({ user }: Props) => {
  const userdata: IUserData[] = React.useMemo(() => (
    [
      {
        icon: <CalendarMonthIcon sx={{ marginRight: '.5rem' }}/>,
        text: `User since ${convertTimestamp(parseInt(`${user.creation_date}`))}`,
      },
      {
        icon: <CalendarMonthIcon sx={{ marginRight: '.5rem' }}/>,
        text: `Last seen ${convertTimestamp(parseInt(`${user.last_access_date}`))}`,
      },
      {
        icon: <LocationOnIcon sx={{ marginRight: '.5rem' }}/>,
        text: `Location ${user.location ? user.location : 'unknown'}`,
      },
      {
        icon: <LocalActivityIcon sx={{ marginRight: '.5rem' }}/>,
        text: `Reputation ${user.reputation}`,
      },
    ]
  ), [user]);

  return (
    <Grid container spacing={2}>
      <Grid item xs={4} md={12}>
        <img alt={user.display_name} src={user.profile_image} style={{ width: '100%', borderRadius: '8px' }}/>
      </Grid>
      <Grid item xs={8} md={12}>
        <Typography variant='h5' gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
          <CakeIcon sx={{ marginRight: '.5rem' }}/> {user.display_name}
        </Typography>
        {
          userdata.map((item: IUserData, index: number) => (
            <Typography key={index} variant='body2' gutterBottom color='text.secondary' sx={{ display: 'flex', alignItems: 'center' }}>
              {item.icon} {item.text}
            </Typography>
          ))
        }
      </Grid>
    </Grid>
  );
}

export default UserInfo;