import * as React from 'react';

import Box from '@mui/material/Box';

import { Header, Content } from '../components/templates';

import { IContent } from '../models';

const Home: React.FC<{}> = () => {
  const [content, setContent] = React.useState<IContent | null>(null);
  return (
    <div id="home">
      <Box>
        <Header setContent={setContent}/>
        {content && <Content content={content}/>}
      </Box>
    </div>
  );
}

export default Home;