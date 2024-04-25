import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export const screenHeight = height;
export const screenWidth = width;

/** for testing similar on react-native-responsive-screen */
export const dimensions = {
  deviceWidth: Dimensions.get('window').width,
  deviceHeight: Dimensions.get('window').height,
};

/** this is baseline from ip14 */
export const guidelineBaseWidth = 390;
export const guidelineBaseHeight = 844;

export const horizontalScale = (size: number) =>
  (dimensions.deviceWidth / guidelineBaseWidth) * size;
export const verticalScale = (size: number) =>
  (dimensions.deviceHeight / guidelineBaseHeight) * size;
export const moderateScale = (size: number, factor = 0.5) =>
  size + (horizontalScale(size) - size) * factor;
