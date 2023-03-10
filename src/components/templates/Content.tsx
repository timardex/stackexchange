import * as React from 'react';

import { IContent } from '../../models';

interface Props {
  content: IContent,
}

const Content: React.FC<Props> = ({ content }: Props) => {
  return (
    <div id="content">
      Content
    </div>
  );
}

export default Content;