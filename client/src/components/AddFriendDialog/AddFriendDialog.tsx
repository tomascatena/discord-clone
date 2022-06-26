import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@mui/material';
import { SubmitHandler, useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import { sendInvitation } from '@store/features/friends/friends.thunk';
import { useAppDispatch } from '@hooks/useAppDispatch';
import CustomInput from '@components/CustomInput/CustomInput';
import Joi from 'joi';
import React from 'react';

type Props = {
  isDialogOpen: boolean;
  setIsDialogOpen: (isDialogOpen: boolean) => void;
}

interface IAddFriendForm {
  email: string;
}

const schema = Joi.object<IAddFriendForm>({
  email: Joi.string().email({ tlds: { allow: false } }).required().label('Email'),
});

const CustomDialog:React.FC<Props> = ({ isDialogOpen, setIsDialogOpen }) => {
  const dispatch = useAppDispatch();

  const { handleSubmit, control, formState, getValues, reset, setValue } = useForm<IAddFriendForm>({
    mode: 'all',
    reValidateMode: 'onChange',
    resolver: joiResolver(schema),
    defaultValues: {
      email: '',
    },
  });

  const closeDialog = () => {
    setIsDialogOpen(false);
    reset();
  };

  const onSubmit: SubmitHandler<IAddFriendForm> = data => {
    if (formState.isValid) {
      dispatch(sendInvitation(data));
    }
  };

  return (
    <div>
      <Dialog
        open={isDialogOpen}
        onClose={closeDialog}
      >
        <DialogTitle textTransform='uppercase'>
          Add a friend
        </DialogTitle>

        <form
          noValidate
          onSubmit={handleSubmit(onSubmit)}
        >
          <DialogContent
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: '0.5rem',
            }}
          >
            <Typography variant='body1'>
              Enter the email address of the person you want to add.
            </Typography>

            <CustomInput
              name='email'
              control={control}
              placeholder='E-Mail address of your friend'
              type='email'
              variant='standard'
              inputValue={getValues().email}
              isTouched={formState.touchedFields.email}
              validationError={formState.errors.email}
              setValue={setValue}
            />
          </DialogContent>

          <DialogActions
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              padding: '1rem',
            }}
          >
            <Button onClick={closeDialog}>Cancel</Button>

            <Button
              variant='contained'
              type='submit'
            >
              Send Invitation
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
};

export default CustomDialog;
