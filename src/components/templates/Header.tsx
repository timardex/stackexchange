import * as React from 'react';

import TextField from '@mui/material/TextField';

import ApiService from '../../service/Service';

interface Props {
  setContent: Function,
};

const Header: React.FC<Props> = ({ setContent }: Props) => {
  const [search, setSearch] = React.useState<string>('');

  const searchContent = React.useCallback( async () => {
    try{
      const data = await ApiService.getRequest(
        `${process.env.REACT_APP_API_URL}/search/advanced?order=desc&sort=activity&site=stackoverflow&title=${search}`
      );
      setContent(data.items);
    } catch(e) {
      console.log(e);
    }
  }, [setContent, search])

  React.useEffect(() => {
    searchContent();
  }, [searchContent]);

  return (
    <div id="header">
      <TextField
        fullWidth
        label="Search..."
        variant="outlined"
        value={search}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}/>
    </div>
  );
}

export default Header;