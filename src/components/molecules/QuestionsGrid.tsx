import * as React from 'react';
import { Link as RouterLink } from 'react-router-dom';

import {
  Grid,
  Card,
  CardContent,
  Typography,
  Link,
  Box,
  Avatar,
  Chip,
} from '@mui/material';

import { IContent } from '../../models';
import { convertTimestamp } from '../../helpers';

interface Props {
  content: IContent[],
}

const QuestionsGrid: React.FC<Props> = ({ content }: Props) => {
  return (
    <Grid container rowSpacing={2}>
      {content.map((item: IContent) => (
        <Grid item key={item.question_id} xs={12}>
          <Card>
            <CardContent>
              <Grid container>
                <Grid item xs={2}>
                  <Box><Chip label={`Score ${item.score}`} color='warning' size="small" sx={{ marginBottom: 1}}/></Box>
                  <Box><Chip label={`Views ${item.view_count}`} color='error' size="small"sx={{ marginBottom: 1}}/></Box>
                  <Box><Chip label={`Answers ${item.answer_count}`} color='info' size="small"/></Box>
                </Grid>

                <Grid item xs={10}>
                  <Typography mb={1} variant='subtitle1'>
                    <Link href={item.link} color='inherit' underline='hover' rel='noopener' target='_blank'>
                      {item.title}
                    </Link>
                  </Typography>

                  <Grid container rowSpacing={1}>
                    <Grid item xs={12} md={4}>
                      {
                        item.tags.map((tag: string) => (
                          <Chip key={tag} label={tag} size="small" sx={{ marginRight: '.5rem', marginBottom: '.5rem'}}/>
                        ))
                      }
                    </Grid>

                    <Grid item xs={12} md={8} sx={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                      <RouterLink style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', color: 'inherit' }} to={`user/${item.owner.account_id}`}>
                        <Avatar alt={item.owner.display_name} src={item.owner.profile_image} />
                        <Typography variant='body2' color='text.primary' ml={1} sx={{ textDecoration: 'underline' }}>
                          {item.owner.display_name}
                        </Typography>
                      </RouterLink>
                      <Typography variant='body2' color='text.secondary' ml={1}>
                        asked {convertTimestamp(parseInt(`${item.creation_date}`))}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}

export default QuestionsGrid;