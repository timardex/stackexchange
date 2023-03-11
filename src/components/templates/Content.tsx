import * as React from 'react';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

import { IContent } from '../../models';
import { Typography } from '@mui/material';

interface Props {
  content: IContent[],
  search: string,
  btnClicked: boolean,
}

const Content: React.FC<Props> = ({ content, search, btnClicked }: Props) => {
  return (
    <div id="content">
      <Typography variant="h4" gutterBottom>Search results</Typography>
      {
        btnClicked && search !== '' &&
        <Typography variant="h6" gutterBottom>Results for {search}</Typography>
      }
      {
        content.length > 0 ?
        <Box>
          <Typography variant="subtitle1" gutterBottom>{content.length} results</Typography>
          <Grid container rowSpacing={1}>
            {content.map((item: IContent) => (
              <Grid item key={item.title}>
                {item.title}
              </Grid>
            ))}
          </Grid>
        </Box>
        :
        <Typography variant="h6" gutterBottom>No Content</Typography>
      }
    </div>
  );
}

export default Content;