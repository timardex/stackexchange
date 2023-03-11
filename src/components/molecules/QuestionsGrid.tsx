import * as React from 'react';

import {
  Grid,
  Card,
  CardContent,
} from '@mui/material';

import { IContent } from '../../models';

interface Props {
  content: IContent[],
}

const QuestionsGrid: React.FC<Props> = ({ content }: Props) => {
  return (
    <Grid container rowSpacing={1}>
      {content.map((item: IContent) => (
        <Grid item key={item.question_id} xs={12}>
          <Card>
            <CardContent>
              {item.title}
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}

export default QuestionsGrid;