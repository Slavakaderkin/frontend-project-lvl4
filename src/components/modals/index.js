import AddChannel from './AddChannel.jsx';

const modals = {
  adding: AddChannel,
};

export default (type) => modals[type];
