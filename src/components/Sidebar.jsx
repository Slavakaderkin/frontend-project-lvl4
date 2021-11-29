import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import cn from 'classnames';

import { setCurrentChannelId } from '../store/slices/channelsSlice.js';

const Sidebar = () => {
  const dispatch = useDispatch();

  const channels = useSelector((state) => {
    const { allIds, byId } = state.channels;
    return allIds.map((id) => byId[id]);
  });

  const currentChannelId = useSelector((state) => state.channels.currentChannelId);

  const handleClick = (id) => (e) => {
    e.preventDefault();
    dispatch(setCurrentChannelId(id));
  };

  return (
    <section className="p-4 col-2 overflow-auto border-right bg-white">
      <ul className="list-group list-group-flush">
        {channels.map(({ id, name }) => {
          const isActive = id === currentChannelId;
          const classes = cn({
            'list-group-item': true,
            border: isActive,
            'border-primary': isActive,
            rounded: true,
          });
          return (
            <li className={classes} key={id} onClick={handleClick(id)} aria-hidden="true">
              {`# ${name}`}
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default Sidebar;
