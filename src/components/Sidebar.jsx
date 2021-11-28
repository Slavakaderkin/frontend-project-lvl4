import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

const Sidebar = () => {
  const channels = useSelector(({ channels }) => {
    const { allIds, byId } = channels;
    return allIds.map((id) => byId[id]);
  });

  const currentChannelId = useSelector(({ channels }) => channels.currentChannelId);

  return (
    <section className="p-4 col-2 overflow-auto border-right bg-white">
      <ul className="list-group list-group-flush">
        {channels.map(({ id, name }) => <li className="list-group-item" key={id}>{`# ${name}`}</li>)}
      </ul>
    </section>
  );
};

export default Sidebar;