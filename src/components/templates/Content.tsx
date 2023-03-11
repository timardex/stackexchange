import * as React from 'react';

import { Box, Grid, CircularProgress, ButtonGroup, Button, Chip, Typography } from '@mui/material';

import { IContent } from '../../models';

interface Props {
  content: IContent[],
  search: string,
  loading: boolean,
  page: number,
  setPage: Function,
}

const Content: React.FC<Props> = ({ content, search, loading, page, setPage }: Props) => {
  return (
    <div id="content">
      {!loading && <Chip label={`Page: ${page}`} color="primary" sx={{ position: 'absolute', right: '1rem' }} />}
      {
        search !== '' &&
        <Box>
          <Typography variant="h4" gutterBottom>Search results</Typography>
          <Typography variant="h6" gutterBottom>Results for {search}</Typography>
        </Box>
      }

      {
        content.length > 0 &&
        <Box>
          <Typography variant="subtitle1" gutterBottom>{content.length} results</Typography>
          <Grid container rowSpacing={1}>
            {content.map((item: IContent) => (
              <Grid item key={item.title}>
                {item.title}
              </Grid>
            ))}
          </Grid>

          <Box sx={{ textAlign: 'center', margin: '2rem 0 1rem' }}>
            <ButtonGroup variant="contained" aria-label="Pagination">
              <Button disabled={page === 1} onClick={() => setPage(page - 1)}>Prev Page</Button>
              <Button onClick={() => setPage(page + 1)}>Next Page</Button>
            </ButtonGroup>
          </Box>
        </Box>
      }

      {loading && <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '5rem' }}>
        <CircularProgress />
      </Box>}
    </div>
  );
}

export default Content;