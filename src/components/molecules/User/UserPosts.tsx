import * as React from 'react';

import { Typography, Box, Tab, Link, List, ListItem, ListItemText, Chip } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';

import { IUser, IUserPost } from '../../../models';
import ApiService from '../../../service/Service';

interface Props {
  user: IUser
};

const UserPosts: React.FC<Props> = ({ user }: Props) => {
  const [posts, setPosts] = React.useState<IUserPost[]>([]);

  const fetchPosts = React.useCallback( async () => {
    try{
      const { items }  = await ApiService.getRequest(
        `${process.env.REACT_APP_API_URL}/users/${user.user_id}/posts?site=stackoverflow`
      );
      setPosts(items)
    } catch(e) {
      console.log(e)
    }
  }, [user]);

  React.useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const postTypes = React.useCallback(() => {
    const types = posts.map((post: IUserPost) => post.post_type);
    return [...new Set(types)];
  }, [posts]);

  const [tabValue, setTabValue] = React.useState<string>('0');

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setTabValue(newValue);
  };
  
  return (
    <Box>
      <Typography variant='h5' color='text.secondary' gutterBottom sx={{ marginTop: '1rem' }}>Posts</Typography>
      <Box sx={{ width: '100%', typography: 'body1' }}>
        <TabContext value={tabValue}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              {
                postTypes().map((type: string, index: number) => (
                  <Tab key={`tab-${type}`} label={type} value={`${index}`} />
                ))
              }
            </TabList>
          </Box>

          {
            postTypes().map((type: string, index: number) => (
              <TabPanel key={`panel-${type}`} value={`${index}`} sx={{ padding: 0 }}>
                <List component="nav" sx={{ bgcolor: 'palette.primary.main'}}>
                  {
                    posts.filter((post: IUserPost) => post.post_type === type)
                    .map((post: IUserPost) => (
                      <Link key={post.post_id} href={post.link} color='inherit' underline='none' rel='noopener' target='_blank'>
                        <ListItem button>
                          <ListItemText primary={`Post id: ${post.post_id}`} />
                          <Chip
                            label={`Score ${post.score}`}
                            size="small"
                            sx={{ margin: '.3rem' }}/>
                        </ListItem>
                      </Link>
                    ))
                  }
                </List>
              </TabPanel>
            ))
          }
        </TabContext>
      </Box>
    </Box>
  );
}

export default UserPosts;