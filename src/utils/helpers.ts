import { TGetAddressScheme } from '@shared/interfaces/address.types';
import { isInteger } from 'lodash';

const helpers = {
  /**
   * A function that will return a random alphanumeric strings as ID.
   *
   * @param {number} length - The value length as id.
   * @type {Function}
   * @returns {string}
   */
  generateRandomId: (length: number) => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  },

  /**
   * A function that will return a formatted Date/Time.
   *
   * @param {Date} date - The date value.
   * @type {Function}
   * @returns {Date} - formatted date/time
   */
  formatDate: (date: Date) => {
    const options: Intl.DateTimeFormatOptions = {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    };
    return new Intl.DateTimeFormat('en-US', options).format(date); //ex: 02 Jun 2022 at 3:16 PM
  },

  /**
   *
   * A function that will return a formatted price
   *
   * @param amount the amount to be formatted
   * @param withDecimalPlace if true, will include decimal places
   * @returns {string} - formatted price
   */
  currencyFormat: (amount: any, withDecimalPlace: boolean = true) => {
    if (!isInteger(amount)) {
      return (
        '₱' +
        Number(amount)
          ?.toFixed(2)
          .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
      );
    }
    return '₱' + amount?.toFixed(withDecimalPlace ? 2 : 0).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  },

  /**
   * A function that will return a date eighteen years ago from today.
   *
   * @author {Albert}
   * @type {Function}
   * @returns {Date} - 18 years ago
   */
  getEighteenYearsAgo: () => {
    const today = new Date();
    const eighteenYearsAgo = new Date(today);
    eighteenYearsAgo.setFullYear(today.getFullYear() - 18);

    return eighteenYearsAgo;
  },

  /**
   * A function that will tell if the text is a html tag or just a string.
   *
   * @author {Harley}
   * @param {string} text - The text we want to check.
   * @type {Function}
   * @returns {boolean}
   */
  stringHasHTML: (text: string) => {
    const reg = /<([A-Za-z][A-Za-z0-9]*)\b[^>]*>(.*?)<\/\1>/;
    return reg.test(text);
  },

  /**
   * A function that will return if the product has a ongoing sale.
   *
   * @param {string} saleStart - The starting sale date of the product.
   * @param {string} saleEnd - The end sale date of the product.
   * @return {boolean}
   */
  isSaleOngoing: (saleStart: string, saleEnd: string): boolean => {
    const dateToday = new Date().getTime();
    const startingDate = new Date(saleStart).getTime();
    const endDate = new Date(saleEnd).getTime();

    if (dateToday < startingDate || dateToday > endDate) {
      return false;
    } else {
      return true;
    }
  },

  /**
   * A function that will return the price of the product.
   *
   * @param {number} retailPrice - The retail price of the product.
   * @param {number} salesPrice - The sale price of the product.
   * @param {string} saleStart - The starting sale date of the product.
   * @param {string} saleEnd - The end sale date of the product.
   * @return {number}
   */
  priceToShow: (
    retailPrice: number,
    salesPrice: number,
    saleStart: string,
    saleEnd: string
  ): number => {
    const isSaleOngoing = helpers.isSaleOngoing(saleStart, saleEnd);

    if (!isSaleOngoing) {
      return retailPrice;
    } else {
      return salesPrice;
    }
  },

  /**
   *
   * A function that will return a formatted Date/Time in military time.
   *
   * @param date
   * @returns
   */
  formatDateWithMilitaryTime: (date: Date) => {
    const orderDateTime = new Date(date);

    // Adjust hours for timezone offset
    const offsetHours = orderDateTime.getTimezoneOffset() / 60;
    orderDateTime.setHours(orderDateTime.getHours() + offsetHours);

    // Convert the Date object to the desired format in military time
    const formattedString = `${(orderDateTime.getMonth() + 1)
      .toString()
      .padStart(2, '0')}-${orderDateTime
      .getDate()
      .toString()
      .padStart(2, '0')}-${orderDateTime.getFullYear()} ${orderDateTime
      .getHours()
      .toString()
      .padStart(2, '0')}:${orderDateTime.getMinutes().toString().padStart(2, '0')}`;

    return formattedString;
  },

  /* A function that will return a full formatted address.
   *
   * @param {TGetAddressGraphQLData} data - The selected address data.
   * @returns
   */
  addressToShow: (data: Partial<TGetAddressScheme>): string => {
    return `${data.houseFloorNumberStreet}, ${data.barangay}, ${data.city}, ${data.province}, Philippines`;
  },
};

export default helpers;
