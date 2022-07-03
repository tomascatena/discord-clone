import { acceptFriendInvitation } from './acceptFriendInvitation.swagger copy 2';
import { rejectFriendInvitation } from './rejectFriendInvitation.swagger copy';
import { sendInvitation } from './sendInvitation.swagger';

export default {
  ...sendInvitation,
  ...acceptFriendInvitation,
  ...rejectFriendInvitation,
};
