import * as React from 'react';

import { Box, Button, TextField } from '@mui/material';

import ApiService from '../../service/Service';
import { DatePicker, CheckboxPicker, SelectPicker } from '../molecules';

interface Props {
  search: string,
  setSearch: Function,
  setContent: Function,
  setBtnClicked: Function,
};

const Header: React.FC<Props> = ({ search, setSearch, setContent, setBtnClicked }: Props) => {
  const [fromDate, setFromDate] = React.useState<Date | null>(null);
  const [toDate, setToDate] = React.useState<Date | null>(null);
  const [order, setOrder] = React.useState<string>('desc');
  const [sort, setSort] = React.useState<string>('activity');
  const [accepted, setAccepted] = React.useState<boolean>(false);
  const [closed, setClosed] = React.useState<boolean>(false);

  const convertDateToUnixTimestamp = React.useCallback((value: Date | null) => {
    const stringify = JSON.stringify(value);
    const date = stringify.slice(0, 11);
    return value && Math.floor(new Date(date).getTime() / 1000);
  }, []);

  const searchContent = React.useCallback( async () => {
    const params = {
      title: search !== '' ? `&title=${search}` : '',
      fromDate: fromDate ? `&fromDate=${convertDateToUnixTimestamp(fromDate)}` : '',
      toDate: toDate ? `&toDate=${convertDateToUnixTimestamp(toDate)}` : '',
      accepted: `&accepted=${accepted}`,
      closed: `&closed=${closed}`,
    };

    const rootApi = `${process.env.REACT_APP_API_URL}/search/advanced`;
    const api = `${rootApi}?order=${order}&sort=${sort}${params.title + params.fromDate + params.toDate + params.accepted + params.closed}&site=stackoverflow`;

    try{
      const data = await ApiService.getRequest(api);
      setContent(data.items);
      setBtnClicked(true);
    } catch(e) {
      console.log(e);
    }
  }, [setContent, search, setBtnClicked, order, sort, toDate, fromDate, accepted, closed, convertDateToUnixTimestamp]);

  React.useEffect(() => {
    search !== '' && setBtnClicked(false);
  }, [search, setBtnClicked]);

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

      <Button
        variant="contained"
        sx={{ width: '100%', marginBottom: '1rem' }}
        onClick={() => searchContent()}>Search</Button>
    </div>
  );
}

export default Header;