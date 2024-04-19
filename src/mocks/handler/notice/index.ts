import { createNotice } from './createNotice';
import { deleteNotice } from './deleteNotice';
import { getNoticeDetail } from './getNoticeDetail';
import { getNoticeList } from './getNoticeList';
import { updateNotice } from './updateNotice';

export const noticeHandler = [getNoticeList, getNoticeDetail, createNotice, updateNotice, deleteNotice];
