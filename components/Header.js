import React from 'react';
import { Menu } from 'semantic-ui-react';
import { Link } from '../routes';

export default () => {
  return(
    <div>
      <Menu>
        <Link route='/'>
          <a className='item'> KickSmarter</a>
        </Link>

        <Menu.Menu position='right'>
          <Link route='/'>
            <a className='item'> Campaigns</a>
          </Link>

          <Link route='/campaigns/new'>
            <a className='item'> + </a>
          </Link>
        </Menu.Menu>
      </Menu>
    </div>
  );
}
