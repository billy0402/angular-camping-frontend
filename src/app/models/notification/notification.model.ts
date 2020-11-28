export interface Notification {
  id: number;
  rentalRecordId: number;
  type: number;
  userAccount: string;
  content: string;
  sendDate: Date;
  readDate: Date;
}
