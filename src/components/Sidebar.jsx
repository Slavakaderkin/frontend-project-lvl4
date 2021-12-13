import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Button, Dropdown, ButtonGroup } from 'react-bootstrap';
import cn from 'classnames';

import { setCurrentChannelId } from '../store/slices/channelsSlice.js';
import { showModal } from '../store/slices/modalSlice.js';

const Sidebar = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const channels = useSelector((state) => {
    const { allIds, byId } = state.channels;
    return allIds.map((id) => byId[id]);
  });

  const currentChannelId = useSelector((state) => state.channels.currentChannelId);

  const handleCheckChannel = (id) => (e) => {
    e.preventDefault();
    dispatch(setCurrentChannelId(id));
  };

  const handleAddChannel = () => (e) => {
    e.preventDefault();
    dispatch(showModal({ type: 'adding', extra: {} }));
  };

  const handleRemoveChannel = (channel) => (e) => {
    e.preventDefault();
    dispatch(showModal({ type: 'removing', extra: channel }));
  };

  const handleRenameChannel = (channel) => (e) => {
    e.preventDefault();
    dispatch(showModal({ type: 'renaming', extra: channel }));
  };

  const renderChannelButton = (channel) => {
    const { name, id, removable } = channel;
    const isActive = id === currentChannelId;

    const btnClasses = cn('btn', 'mb-2', 'btn-light', 'text-left', 'flex-shrink-1', {
      'btn-outline-dark': isActive,
      'font-weight-bold': isActive,
    });

    const toggleClasses = cn(btnClasses, 'flex-grow-0');

    if (!removable) {
      return <Button className={btnClasses} key={id} onClick={handleCheckChannel(id)}>{`# ${name}`}</Button>;
    }

    return (
      <Dropdown align="end" as={ButtonGroup} key={id}>
        <Button className={btnClasses} onClick={handleCheckChannel(id)}>
          <span className="d-inline-block text-truncate" style={{ width: 120 }}>{`# ${name}`}</span>
        </Button>

        <Dropdown.Toggle split className={toggleClasses} id="dropdown-split-basic" />

        <Dropdown.Menu>
          <Dropdown.Item href="#/action-1" onClick={handleRemoveChannel(channel)}>{t('sidebar.removeButton')}</Dropdown.Item>
          <Dropdown.Item href="#/action-2" onClick={handleRenameChannel(channel)}>{t('sidebar.renameButton')}</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    );
  };

  return (
    <section className="p-4 col-2 overflow-auto border-right bg-white">
      <div className="d-flex justify-content-between pb-3 border-bottom mb-4 align-items-end">
        <h5 className="ml-1  align-items-end">{t('sidebar.title')}</h5>
        <Button variant="outline-dark" size="sm" onClick={handleAddChannel()}>+</Button>
      </div>
      <ul className="list-group">
        {channels.map(renderChannelButton)}
      </ul>
    </section>
  );
};

export default Sidebar;
