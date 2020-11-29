import { Rental } from '@models/rental/rental.model';

export const rental: Rental = {
  id: 1,
  status: 4,
  productGroupId: 16,
  borrowStartDate: new Date('2020/12/10'),
  borrowEndDate: new Date('2020/12/13'),
  name: '4人帳四角睡帳客廳帳 桌椅 營燈 廚具',
  coverImage: 'https://i.imgur.com/Px1JXJW.jpg',
  areaName: '中和區',
  price: 3990,
  user: {
    account: 'test',
    nickName: '煞氣a小明',
    email: '10646007@ntub.edu.tw',
    cellPhone: '0912345678',
  },
  rentalDate: new Date('2020/08/28 15:03'),
  detailArray: [
    {
      status: 2,
      type: '客廳帳',
      name: '快搭客廳炊事帳',
      count: 2,
      brand: '無',
      useInformation:
        '四人同時向外拉，並往上推，小心不要夾到手。若遇下雨，必須曬乾再收起來。',
      brokenCompensation:
        '損壞致無法使用，原價七成賠償。\n損壞布面，原價五成賠償\n損壞小部分但堪用，原價三成賠償。',
      relatedLink: 'https://www.ntub.edu.tw',
      imageArray: ['https://i.imgur.com/Px1JXJW.jpg'],
    },
  ],
};

export const rentals: Rental[] = new Array(11).fill({}).map((e, i) => ({
  ...rental,
  status: i,
}));
