import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@mui/material';
import { SubmitHandler, useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import { sendInvitation } from '@store/features/friends/friends.thunk';
import { useActions } from '@hooks/useActions';
import { useAppDispatch } from '@hooks/useAppDispatch';
import { useTypedSelector } from '@hooks/useTypedSelector';
import CustomButton from '@components/CustomButton/CustomButton';
import CustomInput from '@components/CustomInput/CustomInput';
import CustomSnackbar from '@components/CustomSnackbar/CustomSnackbar';
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
  const { setAlert } = useActions();

  const { loading } = useTypedSelector(state => state.friends);
  const { isOpen, message, severity } = useTypedSelector((state) => state.alert);

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
      dispatch(sendInvitation(data)).then((data) => {
        if (data.type.includes('rejected')) {
          setAlert({
            isOpen: true,
            message: data.payload?.message!,
            severity: 'error'
          });
        } else {
          setAlert({
            isOpen: true,
            message: data.payload?.message!,
            severity: 'success'
          });

          closeDialog();
        }
      });
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

            <CustomButton
              variant='contained'
              type='submit'
              text='Send Invitation'
              loadingText='Sending Invitation...'
              isLoading={loading}
              isDisabled={!formState.isValid}
            />
          </DialogActions>
        </form>
      </Dialog>

      <CustomSnackbar
        severity={severity}
        isOpen={isOpen}
        message={message!}
      />
    </div>
  );
};

export default CustomDialog;
