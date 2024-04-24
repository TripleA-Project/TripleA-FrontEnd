import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { SiteUser } from '@/interfaces/Dto/Admin/GetSiteUsersDto';
import { useCallback } from 'react';

export type DefaultModalType = 'modal:default';
export type SelectedUserModalType = 'selected:user';
export type AdminModalType = 'admin:deleteUser' | 'admin:asAdmin' | 'admin:asUser';
export type AdminNoticeType = 'admin:deleteNotice';
export type ModalType = DefaultModalType | SelectedUserModalType | AdminModalType | AdminNoticeType;

type ModalPayload<T> = T extends DefaultModalType
  ? any
  : T extends AdminModalType
  ? { selectedUsers: SiteUser[] }
  : T extends AdminNoticeType
  ? { noticeId: number }
  : T extends SelectedUserModalType
  ? { selectedUsers: SiteUser[] }
  : never;

export interface ModalState<T extends ModalType = any> {
  open: boolean;
  modalType: T;
  data?: ModalPayload<T>;
}

const initialState: ModalState = {
  open: false,
  modalType: 'modal:default',
  data: undefined,
};

const modalSlice = createSlice({
  name: 'modalSlice',
  initialState,
  reducers: {
    setModal: (state: ModalState, action: PayloadAction<ModalState>) => {
      const { open, modalType, data } = action.payload;

      return {
        ...state,
        open,
        modalType,
        data,
      };
    },
  },
});

export default modalSlice.reducer;

export function useModal<T extends ModalType = DefaultModalType>(type?: T) {
  const { open, modalType, data } = useSelector((state: RootState) => state.modal);

  const dispatch = useDispatch();

  const openModal = useCallback(
    (type: T extends DefaultModalType ? ModalType : T, data: ModalPayload<T>) => {
      dispatch(
        modalSlice.actions.setModal({
          open: true,
          modalType: type,
          data,
        }),
      );
    },
    [dispatch],
  );

  const closeModal = useCallback(() => {
    dispatch(
      modalSlice.actions.setModal({
        open: false,
        modalType: 'modal:default',
        data: undefined,
      }),
    );
  }, [dispatch]);

  return {
    modal: {
      open,
      modalType,
      data,
    } as ModalState<T>,
    dispatch,
    openModal,
    closeModal,
  };
}
