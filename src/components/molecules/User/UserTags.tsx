import * as React from 'react';

import {
  Typography,
  Box,
  Chip,
} from '@mui/material';

import { IUser, ITag } from '../../../models';
import ApiService from '../../../service/Service';

interface Props {
  user: IUser
};

const UserTags: React.FC<Props> = ({ user }: Props) => {
  const [tags, setTags] = React.useState<ITag[]>([]);

  const fetchTags = React.useCallback( async () => {
    try{
      const { items } = await ApiService.getRequest(
        `${process.env.REACT_APP_API_URL}/users/${user.user_id}/tags?site=stackoverflow`
      );
      setTags(items);
    } catch(e) {
      console.log(e)
    }
  }, [setTags, user]);

  React.useEffect(() => {
    fetchTags();
  }, [fetchTags]);

  
  return (
    <Box>
      <Typography variant='h5' color='text.secondary' gutterBottom sx={{ marginTop: '1rem' }}>Tags</Typography>
      {
        tags.map((tag: ITag) => (
          <Chip
            key={tag.name}
            label={tag.name}
            size="small"
            sx={{ margin: '.3rem' }}/>
        ))
      }
    </Box>
  );
}

export default UserTags;