export class RwdHelper {
  static isPhone(): boolean {
    return document.body.scrollWidth < 600;
  }

  static isMobile(): boolean {
    return document.body.scrollWidth < 960;
  }
}
