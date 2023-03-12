import * as React from 'react';

import { Box, Grid, Snackbar } from '@mui/material';

import { Header, Content } from '../components/templates';

import { IContent } from '../models';

const Home: React.FC<{}> = () => {
  const [content, setContent] = React.useState<IContent[]>([]);
  const [search, setSearch] = React.useState<string>('');
  const [error, setError] = React.useState<string>('');
  const [loading, setLoading] = React.useState<boolean>(false);
  const [page, setPage] = React.useState<number>(1);

  return (
    <div id="home">
      <Box sx={{ padding: '2rem 0'}}>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item xs={12} md={3}>
            <Header
              search={search}
              page={page}
              setSearch={setSearch}
              setContent={setContent}
              setLoading={setLoading}
              setError={setError}/>
          </Grid>

          <Grid item xs={12} md={9}>
            <Content
              content={content}
              search={search}
              loading={loading}
              page={page}
              setPage={setPage}/>
          </Grid>
        </Grid>

        <Snackbar
          open={error !== ''}
          autoHideDuration={6000}
          message={error}
        />
      </Box>
    </div>
  );
}

export default Home;