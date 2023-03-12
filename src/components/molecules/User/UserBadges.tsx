import * as React from 'react';

import {
  Typography,
  Grid,
  Card,
  CardContent,
  Box,
  Chip,
} from '@mui/material';

import { IUser, IBadge } from '../../../models';
import ApiService from '../../../service/Service';
import Badge from '../../../assets/badge';

interface Props {
  user: IUser
};

const UserBadge: React.FC<Props> = ({ user }: Props) => {
  const [badges, setBadges] = React.useState<IBadge[]>([]);
  const fetchBadges = React.useCallback( async () => {
    try{
      const { items } = await ApiService.getRequest(
        `${process.env.REACT_APP_API_URL}/users/${user.user_id}/badges?site=stackoverflow`
      );
      setBadges(items);
    } catch(e) {
      console.log(e)
    }
  }, [setBadges, user]);

  React.useEffect(() => {
    fetchBadges();
  }, [fetchBadges]);

  const filteredBadgesByColor = (color: string) => badges.filter((badge: IBadge) => badge.rank === color);

  return (
    <Grid container spacing={2}>
      {
        ['gold', 'silver', 'bronze'].map((color: string) => (
          <Grid item xs={4} key={color}>
            <Card>
              <CardContent>
                <Box sx={{ textAlign: 'center' }}>
                  <Badge color={color === 'bronze' ? '#cba98b' : color}/>
                </Box>
                {
                  filteredBadgesByColor(color).length > 0
                  ?
                  <Box>
                    <Typography variant='h6' color='text.secondary' textAlign='center'>
                      {filteredBadgesByColor(color).length}
                      <small style={{ marginLeft: '.5rem' }}>{color} badges</small>
                    </Typography>
                    {
                      filteredBadgesByColor(color).map((badge: IBadge) => (
                        <Chip
                          key={badge.name}
                          label={badge.name}
                          size="small"
                          sx={{ margin: '.3rem' }}/>
                      ))
                    }
                  </Box>
                  :
                  <Typography variant='body2' color='text.secondary'>
                    This user doesn’t have any {color} badges yet.
                  </Typography>
                }
              </CardContent>
            </Card>
          </Grid>
        ))
      }
    </Grid>
  );
}

export default UserBadge;