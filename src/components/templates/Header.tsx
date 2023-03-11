import * as React from 'react';

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import ApiService from '../../service/Service';
import { DatePicker, CheckboxPicker, SelectPicker } from '../molecules';
import { ICheckbox } from '../../models';

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
  const [checkbox, setCheckbox] = React.useState<ICheckbox[]>([
    {
      label: 'accepted',
      checked: false,
    },
    {
      label: 'closed',
      checked: false,
    }
  ]);

  /* const convertDateToUnixTimestamp = React.useCallback((value: Date | null) => {
    const stringify = JSON.stringify(value);
    const date = stringify.slice(0, 11);
    return value && Math.floor(new Date(date).getTime() / 1000);
  }, []); */

  const searchContent = React.useCallback( async () => {
    try{
      const data = await ApiService.getRequest(
        `${process.env.REACT_APP_API_URL}/search/advanced?order=desc&sort=activity&site=stackoverflow&title=${search}`
      );
      setContent(data.items);
      setBtnClicked(true);
    } catch(e) {
      console.log(e);
    }
  }, [setContent, search, setBtnClicked]);

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

      <CheckboxPicker checkbox={checkbox} setCheckbox={setCheckbox}/>

      <Button
        variant="contained"
        sx={{ width: '100%', marginBottom: '1rem' }}
        onClick={() => searchContent()}>Search</Button>
    </div>
  );
}

export default Header;