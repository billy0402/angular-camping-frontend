import { BorrowStatus } from '@enums/borrow-status.enum';

export interface Rental {
  id: number;
  status: BorrowStatus;
  productGroupId: number;
  borrowStartDate: Date;
  borrowEndDate: Date;
  name: string;
  coverImage: string | null;
  areaName: string;
  price: number;
  rentalDate: Date;
  detailArray: RentalDetail[];
  user: User;
  isComment: boolean;
}

export interface RentalDetail {
  status: number;
  type: string;
  name: string;
  count: number;
  brand: string;
  useInformation: string;
  brokenCompensation: string;
  relatedLink: string | null;
  imageArray: string[] | null;
}

export interface User {
  account: string;
  nickName: string;
  email: string;
  cellPhone: string;
}
