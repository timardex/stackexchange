import * as React from 'react';

import { Box, TextField, Slider, Typography } from '@mui/material';

import ApiService from '../../service/Service';
import { DatePicker, CheckboxPicker, SelectPicker } from '../molecules';
import{ convertDateToTimestamp } from '../../helpers';

interface Props {
  search: string,
  page: number,
  setSearch: Function,
  setContent: Function,
  setLoading: Function,
  setError: Function,
};

const Header: React.FC<Props> = ({ search, page, setSearch, setContent, setLoading, setError }: Props) => {
  const [fromDate, setFromDate] = React.useState<Date | null>(null);
  const [toDate, setToDate] = React.useState<Date | null>(null);
  const [order, setOrder] = React.useState<string>('desc');
  const [sort, setSort] = React.useState<string>('activity');
  const [accepted, setAccepted] = React.useState<boolean>(false);
  const [closed, setClosed] = React.useState<boolean>(false);
  const [pagesize, setPagesize] = React.useState<number>(10)

  const handleSliderChange = (event: any) => {
    setPagesize(event.target.value);
  };

  const searchContent = React.useCallback( async () => {
    setLoading(true);
    setContent([]);
    setError('');

    const params = {
      page: `page=${page}`,
      pagesize: `&pagesize=${pagesize}`,
      order: `&order=${order}`,
      sort: `&sort=${sort}`,
      title: search !== '' ? `&title=${search}` : '',
      fromDate: fromDate ? `&fromDate=${convertDateToTimestamp(fromDate)}` : '',
      toDate: toDate ? `&toDate=${convertDateToTimestamp(toDate)}` : '',
      accepted: `&accepted=${accepted}`,
      closed: `&closed=${closed}`,
    };

    const rootApi = `${process.env.REACT_APP_API_URL}/search/advanced`;
    const api = `${rootApi}?${
      params.page +
      params.pagesize +
      params.order +
      params.sort +
      params.title +
      params.fromDate +
      params.toDate +
      params.accepted +
      params.closed}&site=stackoverflow`;

    try{
      const { items } = await ApiService.getRequest(api);
      setContent(items);
      setLoading(false);
      if(items.length === 0) setError('No Content found please refine your search');
    } catch(e) {
      const parsedError = JSON.parse(JSON.stringify(e));
      setError(parsedError.message);
    }
  }, [
    setContent,
    setLoading,
    setError,
    search,
    page,
    pagesize,
    order,
    sort,
    toDate,
    fromDate,
    accepted,
    closed,
  ]);

  React.useEffect(() => {
    searchContent();
  }, [searchContent])

  return (
    <div id="header">
      <TextField
        fullWidth
        label="Search..."
        variant="outlined"
        value={search}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}
        sx={{ width: '100%', marginBottom: '1rem' }}
      />

      <DatePicker label='From date' value={fromDate} setValue={setFromDate}/>

      <DatePicker label='To date' value={toDate} setValue={setToDate}/>

      <SelectPicker
        label='Order'
        value={order}
        items={['desc', 'asc']}
        setValue={setOrder}
      />

      <SelectPicker
        label='Sort'
        value={sort}
        items={['activity', 'votes', 'creation', 'relevance']}
        setValue={setSort}
      />

      <Box sx={{ display: 'flex', width: '100%', marginBottom: '1rem'}}>
        <CheckboxPicker checkbox={{label: 'accepted', checked: accepted}} setCheckbox={setAccepted}/>
        <CheckboxPicker checkbox={{label: 'closed', checked: closed}} setCheckbox={setClosed}/>
      </Box>

      <Box>
        <Typography gutterBottom>
          Page size
        </Typography>
        <Slider
          aria-label="Temperature"
          valueLabelDisplay="auto"
          marks
          step={10}
          defaultValue={10}
          min={10}
          max={100}
          onChange={handleSliderChange}
        />
      </Box>
    </div>
  );
}

export default Header;