import { AppBarContainer } from './AppBar.styled';
import { IconButton, Typography } from '@mui/material';
import { useActions } from '@hooks/useActions';
import { useAppDispatch } from '@hooks/useAppDispatch';
import { useNavigate } from 'react-router-dom';
import { useTypedSelector } from '@hooks/useTypedSelector';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import React from 'react';

type Props = {}

const AppBar:React.FC<Props> = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const actions = useActions();

  const { chosenChatDetails } = useTypedSelector(state => state.chat);

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch(actions.logout());

    navigate('/login');
  };

  return (
    <AppBarContainer>
      <>
        <Typography
          sx={{
            fontSize: '1.5rem',
            fontWeight: 'bold',
            color: 'text.primary',
          }}
        >
          {chosenChatDetails?.friendUsername}
        </Typography>
      </>

      <>
        <IconButton
          id="more-vert-icon"
          aria-controls={open ? 'drop-down-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}
        >
          <MoreVertIcon/>
        </IconButton>

        <Menu
          id="drop-down-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': 'more-vert-icon',
          }}
        >
          <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </Menu>
      </>
    </AppBarContainer>
  );
};

export default AppBar;
