import { ProductGroupDetail } from '@models/product/product-group.model';

export const productGroup: ProductGroupDetail = {
  name: '[限時特價] 便宜帳篷、桌椅三件套',
  coverImage: 'https://imgur.com/tMDwTUZ.jpg',
  city: {
    id: 1,
    name: '台北市',
    areaName: '中正區',
  },
  price: 2000,
  borrowStartDate: new Date('2020/12/01'),
  borrowEndDate: new Date('2020/12/31'),
  productOwnerAccount: 'three',
  productOwnerName: '張三',
  contact: '10646000@ntub.edu.tw',
  comment: 5,
  productArray: [
    {
      id: 1,
      type: '睡帳',
      name: '台灣製造 ㊣ 超優品質 # 豪華大型自動帳篷',
      count: 1,
      brand: 'SAMCAMP 噴火龍',
      appearance: `內帳尺寸: 長 280 x 寬 280 x 高 190 CM
         外帳尺寸: 長 460 x 寬 360 x 高 195 CM`,
      useInformation: '內附搭帳棚說明書',
      brokenCompensation: '缺少零件：1/$200、布劃破：$1000',
      relatedLink:
        'https://tw.bid.yahoo.com/item/【SAMCAMP-噴火龍】台灣製造-㊣-超優品質-豪華大型自-100109873030',
      memo: '若在搭設過程有疑問，都可以聯絡我',
      imageArray: [
        {
          id: 1,
          url:
            'https://s.yimg.com/ob/image/929ccafb-4072-412a-8407-d8bf73d0b668.jpg',
        },
      ],
    },
    {
      id: 2,
      type: '桌子',
      name: '黑金鋼大蛋捲桌附網袋',
      count: 1,
      brand: '索樂生活',
      appearance: '完好無損，118*55*68.5CM 5公斤左右',
      useInformation: '先將下方支架架好，在將蛋捲桌鋪上，聯結有教學影片',
      brokenCompensation: '損壞原價八折賠償',
      relatedLink:
        'https://tw.bid.yahoo.com/item/黑金鋼大蛋捲桌附網袋-戶外休閒鋁合金大理石防刮高強度-100270272650',
      memo: '打開及收合時注意不要被夾到',
      imageArray: [
        {
          id: 2,
          url:
            'https://s.yimg.com/ob/image/d2442fd6-1ea9-4489-9cc1-4366ff084f99.jpg',
        },
      ],
    },
    {
      id: 3,
      type: '椅子',
      name: '超輕便攜式戶外折疊椅',
      count: 4,
      brand: '陸德狼',
      appearance: '無椅套，27*27*26CM',
      useInformation: '打開即可',
      brokenCompensation: '布料破損原價七折賠償',
      relatedLink:
        'https://tw.bid.yahoo.com/item/陸德狼超輕便攜式折疊凳子戶外折疊椅坐火車小馬扎釣魚-100851637920',
      memo: '無',
      imageArray: [
        {
          id: 3,
          url:
            'https://s.yimg.com/ob/image/ec7655c2-68d4-4450-b5d1-d710b8ac8e22.jpg',
        },
      ],
    },
    {
      id: 4,
      type: '營燈',
      name: '三排LED燈條 調光式 露營燈 客廳帳天幕帳可用',
      count: 2,
      brand: '無',
      appearance: `．材質：LED(2835)、銅線、PVC阻燃
         ．尺寸：
            ．燈條／約長500cm*寬1.5cm
            ．燈珠／約長3.5*寬2mm
         ．燈珠數量：264顆/1m
         ．重量：約1.2kg(含收納袋)
         ．電壓：110V
         ．功率：12W
         ．防水等級：IP65
         ．款式：暖光`,
      useInformation: '可用繩子固定於帳篷或掛在東西上',
      brokenCompensation: '無法發光原價7折賠償',
      relatedLink:
        'https://tw.bid.yahoo.com/item/【大山野營】贈收納袋收納盤-新店桃園-2835-5-5米-三排-100971765163',
      memo: '若在搭設過程有疑問，都可以聯絡我',
      imageArray: [
        {
          id: 4,
          url:
            'https://s.yimg.com/ob/image/7e546b83-78ab-43a2-bdee-4ca88a0c51b9.jpg',
        },
      ],
    },
  ],
};
