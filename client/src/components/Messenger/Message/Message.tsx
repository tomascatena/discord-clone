import {
  AvatarContainer,
  MainContainer,
  MessageContainer,
  MessageContent,
  UsernameAndDateContainer
} from './Message.styled';
import { Divider, Typography } from '@mui/material';
import { IDirectMessage } from '@/typings/typings';
import CustomAvatar from '@/components/ui-elements/CustomAvatar/CustomAvatar';
import React from 'react';
import format from 'date-fns/format';
import parseISO from 'date-fns/parseISO';

type Props = {
  message: IDirectMessage;
  isSameAuthor: boolean;
  isSameDay: boolean;
}

const Message: React.FC<Props> = ({ message, isSameAuthor, isSameDay }) => {
  const isMessageFromDifferentUser = !isSameAuthor || !isSameDay;

  const messageTime = format(parseISO(message.date), 'HH:mm:ss');
  const formattedDate = format(parseISO(message.date), 'EEEE, d-MMM-yyyy');

  const avatar = (
    <CustomAvatar
      imgAltText={message.author.username}
      hasOnlineIndicator={false}
      isOnline={false}
    />
  );

  const usernameAndDate = (
    <UsernameAndDateContainer>
      <Typography
        variant='body1'
        color='textPrimary'
        fontWeight='fontWeightBold'
      >
        {message.author.username}
      </Typography>

      <Typography
        variant='body2'
        color='textSecondary'
        className='hidden-date'
      >
        {formattedDate}
      </Typography>
    </UsernameAndDateContainer>
  );

  return (
    <>
      {isMessageFromDifferentUser && (
        <Divider
          sx={{
            margin: '0.5rem 0'
          }}
        />
      )}

      <MainContainer>
        <AvatarContainer>
          {isMessageFromDifferentUser && avatar}
        </AvatarContainer>

        <MessageContainer>
          {isMessageFromDifferentUser && usernameAndDate}

          <MessageContent>
            <Typography
              variant='body2'
              color='textSecondary'
              className='hidden-message-time'
            >
              {messageTime}:
            </Typography>

            <Typography
              color='textPrimary'
              variant='body1'
            >
              {message.content}
            </Typography>
          </MessageContent>
        </MessageContainer>
      </MainContainer>
    </>
  );
};

export default Message;
