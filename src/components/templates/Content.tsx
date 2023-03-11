import * as React from 'react';

import {
  Box,
  CircularProgress,
  ButtonGroup,
  Button,
  Chip,
  Typography,
} from '@mui/material';

import { QuestionsGrid } from '../molecules';

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
    <div id="content" style={{ position: 'relative' }}>
      {
        search !== '' &&
        <Box>
          <Typography variant="h4" gutterBottom>Search results</Typography>
        </Box>
      }

      {
        content.length > 0 &&
        <Box>
          <Typography variant="h6" gutterBottom>{content.length} results {search !== '' && `for ${search}`}</Typography>
          
          <QuestionsGrid content={content}/>

          <Box sx={{ textAlign: 'center', margin: '2rem 0 1rem' }}>
            <ButtonGroup variant="contained" aria-label="Pagination">
              <Button disabled={page === 1} onClick={() => setPage(page - 1)}>Prev Page</Button>
              <Button onClick={() => setPage(page + 1)}>Next Page</Button>
            </ButtonGroup>
          </Box>
        </Box>
      }

      {
        loading ?
        <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '5rem' }}>
          <CircularProgress />
        </Box>
        : <Chip label={`Page ${page}`} color="primary" sx={{ position: 'absolute', top: '-.5rem', right: 0 }} />
      }
    </div>
  );
}

export default Content;