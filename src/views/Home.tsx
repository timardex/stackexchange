import * as React from 'react';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

import { Header, Content } from '../components/templates';

import { IContent } from '../models';

const Home: React.FC<{}> = () => {
  const [content, setContent] = React.useState<IContent[]>([]);
  const [search, setSearch] = React.useState<string>('');
  const [btnClicked, setBtnClicked] = React.useState<boolean>(false);

  return (
    <div id="home">
      <Box>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item xs={12} md={3}>
            <Header
              search={search}
              setSearch={setSearch}
              setContent={setContent}
              setBtnClicked={setBtnClicked}/>
          </Grid>

          <Grid item xs={12} md={9}>
            <Content content={content} search={search} btnClicked={btnClicked}/>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}

export default Home;