import { Notification } from '@models/notification/notification.model';

export const notifications: Notification[] = [
  {
    id: 1,
    rentalRecordId: 16,
    type: 3,
    userAccount: '10646016',
    content: '您的商品有人提出租借，請至租借紀錄查看',
    sendDate: new Date('2020/11/24 18:06:40'),
    readDate: new Date('2020/11/24 18:07:13'),
  },
];
