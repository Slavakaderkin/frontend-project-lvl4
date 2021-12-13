import AddChannel from './AddChannel.jsx';
import RenameChannel from './RenameChannel.jsx';
import RemoveChannel from './RemoveChannel.jsx';

const modals = {
  adding: AddChannel,
  renaming: RenameChannel,
  removing: RemoveChannel,
};

export default (type) => modals[type];
