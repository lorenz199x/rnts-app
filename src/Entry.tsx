import React, { useEffect, useState } from 'react';
import { Pressable, StyleSheet, TouchableOpacity } from 'react-native';
import { Gesture, GestureDetector, GestureHandlerRootView } from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import Animated, {
  Easing,
  interpolate,
  SharedValue,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  WithSpringConfig,
  withTiming,
} from 'react-native-reanimated';
import Share from 'react-native-share';
import Svg, { Path } from 'react-native-svg';
import axios from 'axios';
import tailwind from 'twrnc';

interface BibleVerse {
  bookname: string;
  chapter: string;
  text: string;
  verse: string;
}

const AnimatedLinearGradient = Animated.createAnimatedComponent(LinearGradient);

const SHARE_SPRING_CONFIG: WithSpringConfig = {
  mass: 1,
  damping: 20,
  stiffness: 300,
  overshootClamping: false,
  restSpeedThreshold: 0.01,
  restDisplacementThreshold: 0.01,
};

const CLOSE_SPRING_CONFIG: WithSpringConfig = {
  mass: 1,
  damping: 20,
  stiffness: 150,
  overshootClamping: false,
  restSpeedThreshold: 0.01,
  restDisplacementThreshold: 0.01,
};

type IconStackProps = { av: SharedValue<number>; state: BibleVerse[] };

const ShareIconStack: React.FC<IconStackProps> = ({ av, state }) => {
  const appearStyle1 = useAnimatedStyle(() => {
    return {
      opacity: interpolate(av.value, [0, 0.95, 1], [1, 0, 0]),
      transform: [{ translateX: interpolate(av.value, [0, 1], [0, 100]) }],
    };
  });
  const appearStyle2 = useAnimatedStyle(() => {
    return {
      opacity: interpolate(av.value, [0, 0.95, 1], [1, 0, 0]),
      transform: [{ translateX: interpolate(av.value, [0, 1], [0, 70]) }],
    };
  });
  const appearStyle3 = useAnimatedStyle(() => {
    return {
      opacity: interpolate(av.value, [0, 0.95, 1], [1, 0, 0]),
      transform: [{ translateX: interpolate(av.value, [0, 1], [0, 36]) }],
    };
  });

  const onShareFB = () => {
    // Handle onPress for the first icon
    console.log('Pressed icon 1');
    const shareOptions = {
      backgroundVideo: 'file:///path/to/awesome_video.mp4', // Actual URI to your local video file
      backgroundImage: 'https://example.com/awesome_image.png', // Actual URL to your image file
      // stickerImage: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAZ1JREFUOBGdU79Lw1AUPo/HTSyYGBiMoaQuCwtbMQTDGJjIy8kMLCw0tBLadW1cSrtKhUJWVtb+LarVyoVU+Pv3+eKpX/7t79/fnp8LnwTsf3zIyMjE9FjI6X8Ch4EgVB45HuC8v8xzN0+fPnWz5dvBwFQKcCZ4C0tLSkgMVNXVVg6H8/Ksry8vK9sNPTy0tFbS2tq1fX09sVr6ysrLly4MCQk5PV1dUmAw0N7enpq4uzs7KwwfPp1K7zIzs5Gk8lTUlJDQxMTHx+fLlixYpoZGaGioqKpKSkYCVzQlKCglAdKQkAIH8gwJDSdVqlWLDAaDR6XC5XK5XlHRUVF6jMAwEAxQqk0Wj0hkoh8YY7wDAlAs3GnTp3E5HA4HD8fHxQYeGht6zpl0zmnkFQqE+xOQV1dXWgoLC/X1tdKpVKwkJCfHQrFmzBlMTEz8fHxTJ8AzzzzDPfzxx/Pnn38ZHR0dYuXKlVVVVcXZ2dnk9Pw/Va7CwcFBOTk5KC0tRUZGionJwc+fPnS1tYWLlypWVlZsbGwkJycnH09PSkpKSOwMBAJ06cWEaGBn/9/f3d6vAe2srIiCgoKnTt3TkJCAnDhwgUFBQkKysrJSUlh5cqVef/zxN7jNzc2NJvN69e2r58uU6H8/MzAwYKpU6f89NNP0xNTQU9PD0CAgJUuWJCdnZ05OTkhPTw8PDw8PDwYGBgampqYmJiQmJiYkBCIhISOjo7Q0NCmpqajIyEh/fz8BAUFh9fT01NTUVFRUZGRlBQUHh4eHx8fLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL4gJfyEicD8Go/gvgv4CWsQrHzQAAAAASUVORK5CYII=', // Actual base64-encoded image data
      backgroundBottomColor: '#fefefe', // Light gray
      backgroundTopColor: '#906df4', // Purple
      attributionURL: 'http://example.com/my-app', // Actual deep link URL to your app
      appId: '123456789', // Actual Facebook App ID
      social: Share.Social.FACEBOOK_STORIES as any, // Specify Facebook Stories as the social medium
    };

    Share.shareSingle(shareOptions);
  };
  const onShareIG = () => {
    // Handle onPress for the second icon
    console.log('Pressed icon 2');
    const shareOptions = {
      backgroundImage: 'https://example.com/background.png', // URL to the background image
      stickerImage: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAA...', // Base64-encoded image data
      backgroundBottomColor: '#fefefe', // Background color at the bottom
      backgroundTopColor: '#906df4', // Background color at the top
      attributionURL: 'http://yourapp.com/deeplink', // Deep link to your app
      social: Share.Social.INSTAGRAM_STORIES as any, // Specify Instagram Stories as the social platform
      appId: 'your_fb_app_id', // Facebook App ID required since Jan 2023 for Instagram Stories sharing
    };

    Share.shareSingle(shareOptions);
  };

  const onCopyLink = async () => {
    // Handle onPress for the third icon
    const data = {
      bookname: state[0].bookname,
      chapter: state[0].chapter,
      verse: state[0].verse,
      text: state[0].text,
    };
    // console.log("Pressed icon 3", state);

    const shareOptions = {
      message: `Get Verse today!\n${data}`,
    };

    try {
      const ShareResponse = await Share.open(shareOptions);
      console.log(JSON.stringify(ShareResponse));
    } catch (error) {
      console.log('Error => ', error);
    }
  };

  return (
    <>
      <TouchableOpacity onPress={onShareFB}>
        <Animated.View style={[tailwind.style('pr-2'), appearStyle1]}>
          <Svg width="24" height="24" fill="none" viewBox="0 0 24 24">
            <Path
              fillRule="evenodd"
              //facebook
              d="M20 2H4C2.9 2 2.01 2.9 2.01 4L2 20c0 1.1.89 2 1.99 2H12v-7H9v-3h3V9c0-2.19 1.66-4.07 3.84-4.07 1.08 0 2.03.41 2.72 1.07l-1.48 1.47c-.44-.43-1.05-.69-1.72-.69-1.4 0-2.53 1.2-2.53 2.53V9h4l-.67 4H16v7h4c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"
              // linkedin
              // d="M1 2.838A1.838 1.838 0 0 1 2.838 1H21.16A1.837 1.837 0 0 1 23 2.838V21.16A1.838 1.838 0 0 1 21.161 23H2.838A1.838 1.838 0 0 1 1 21.161V2.838zm8.708 6.55h2.979v1.496c.43-.86 1.53-1.634 3.183-1.634 3.169 0 3.92 1.713 3.92 4.856v5.822h-3.207v-5.106c0-1.79-.43-2.8-1.522-2.8-1.515 0-2.145 1.089-2.145 2.8v5.106H9.708V9.388zm-5.5 10.403h3.208V9.25H4.208v10.54zM7.875 5.812a2.063 2.063 0 1 1-4.125 0 2.063 2.063 0 0 1 4.125 0z"
              clipRule="evenodd"
              fill={tailwind.color('text-white')}
            />
          </Svg>
        </Animated.View>
      </TouchableOpacity>

      <TouchableOpacity onPress={onShareIG}>
        <Animated.View style={[tailwind.style('pr-2'), appearStyle2]}>
          <Svg width="24" height="24" fill="none" viewBox="0 0 24 24">
            <Path
              fill={tailwind.color('text-white')}
              //instagram
              d="M21.8 0H2.2C1 0 0 1 0 2.2v19.6C0 23 1 24 2.2 24h19.6c1.2 0 2.2-1 2.2-2.2V2.2C24 1 23 0 21.8 0zm-3.9 7.5c0-.8.7-1.5 1.5-1.5h2.8c.8 0 1.5.7 1.5 1.5v2.8c0 .8-.7 1.5-1.5 1.5h-2.8c-.8 0-1.5-.7-1.5-1.5V7.5zm-7.9 3.9c0 3.6-3 6.6-6.6 6.6s-6.6-3-6.6-6.6c0-1.4.4-2.7 1.1-3.8H.8c-.4 0-.8.4-.8.8v13.2c0 .4.4.8.8.8h13.2c.4 0 .8-.4.8-.8v-4.4c0-.8.7-1.5 1.5-1.5h4.4c.4 0 .8-.4.8-.8v-.1z"
              //twitter
              // d="M23.643 4.937c-.835.37-1.732.62-2.675.733a4.67 4.67 0 0 0 2.048-2.578 9.3 9.3 0 0 1-2.958 1.13 4.66 4.66 0 0 0-7.938 4.25 13.229 13.229 0 0 1-9.602-4.868c-.4.69-.63 1.49-.63 2.342A4.66 4.66 0 0 0 3.96 9.824a4.647 4.647 0 0 1-2.11-.583v.06a4.66 4.66 0 0 0 3.737 4.568 4.692 4.692 0 0 1-2.104.08 4.661 4.661 0 0 0 4.352 3.234 9.348 9.348 0 0 1-5.786 1.995 9.5 9.5 0 0 1-1.112-.065 13.175 13.175 0 0 0 7.14 2.093c8.57 0 13.255-7.098 13.255-13.254 0-.2-.005-.402-.014-.602a9.47 9.47 0 0 0 2.323-2.41l.002-.003z"
            />
          </Svg>
        </Animated.View>
      </TouchableOpacity>

      <TouchableOpacity onPress={onCopyLink}>
        <Animated.View style={[tailwind.style('pr-1'), appearStyle3]}>
          <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <Path
              //copy to clipboard
              d="M20 3H6C4.89543 3 4 3.89543 4 5V19C4 20.1046 4.89543 21 6 21H20C21.1046 21 22 20.1046 22 19V5C22 3.89543 21.1046 3 20 3ZM18.5 6H19C19.5523 6 20 6.44772 20 7C20 7.55228 19.5523 8 19 8H18.5V6ZM18.5 9H19C19.5523 9 20 9.44772 20 10C20 10.5523 19.5523 11 19 11H18.5V9ZM16.5 6H17C17.5523 6 18 6.44772 18 7C18 7.55228 17.5523 8 17 8H16.5V6ZM16.5 9H17C17.5523 9 18 9.44772 18 10C18 10.5523 17.5523 11 17 11H16.5V9ZM14.5 6H15C15.5523 6 16 6.44772 16 7C16 7.55228 15.5523 8 15 8H14.5V6ZM14.5 9H15C15.5523 9 16 9.44772 16 10C16 10.5523 15.5523 11 15 11H14.5V9ZM12.5 6H13C13.5523 6 14 6.44772 14 7C14 7.55228 13.5523 8 13 8H12.5V6ZM12.5 9H13C13.5523 9 14 9.44772 14 10C14 10.5523 13.5523 11 13 11H12.5V9ZM6 18.5V18H6.5C7.05228 18 7.5 17.5523 7.5 17C7.5 16.4477 7.05228 16 6.5 16H6V15.5C6 14.9477 5.55228 14.5 5 14.5C4.44772 14.5 4 14.9477 4 15.5V17C4 18.1046 4.89543 19 6 19H7V18.5C7 17.3954 6.10457 16.5 5 16.5C3.89543 16.5 3 17.3954 3 18.5V19C3 20.1046 3.89543 21 5 21H6C7.10457 21 8 20.1046 8 19V18.5H6ZM10 15C10.5523 15 11 15.4477 11 16C11 16.5523 10.5523 17 10 17C9.44772 17 9 16.5523 9 16C9 15.4477 9.44772 15 10 15Z"
              //whatsapp
              // d="M21.9803 11.4104C21.6403 5.61044 16.3703 1.14045 10.3003 2.14045C6.12029 2.83045 2.77029 6.22043 2.12029 10.4004C1.74029 12.8204 2.24031 15.1104 3.33031 17.0004L2.4403 20.3104C2.2403 21.0604 2.93028 21.7404 3.67028 21.5304L6.93029 20.6304C8.41029 21.5004 10.1403 22.0004 11.9903 22.0004C17.6303 22.0004 22.3103 17.0304 21.9803 11.4104ZM16.8803 15.7204C16.7903 15.9004 16.6803 16.0704 16.5403 16.2304C16.2903 16.5004 16.0203 16.7004 15.7203 16.8204C15.4203 16.9504 15.0903 17.0104 14.7403 17.0104C14.2303 17.0104 13.6803 16.8905 13.1103 16.6405C12.5303 16.3905 11.9603 16.0604 11.3903 15.6504C10.8103 15.2304 10.2703 14.7604 9.7503 14.2504C9.2303 13.7304 8.77027 13.1804 8.35027 12.6104C7.94027 12.0404 7.61029 11.4704 7.37029 10.9004C7.13029 10.3304 7.01031 9.78045 7.01031 9.26045C7.01031 8.92044 7.0703 8.59044 7.1903 8.29044C7.3103 7.98044 7.50032 7.70045 7.77032 7.45045C8.09032 7.13045 8.4403 6.98045 8.8103 6.98045C8.95029 6.98045 9.09027 7.01044 9.22027 7.07044C9.35027 7.13044 9.47029 7.22044 9.5603 7.35044L10.7203 8.99043C10.8103 9.12043 10.8803 9.23043 10.9203 9.34043C10.9703 9.45043 10.9903 9.55043 10.9903 9.65043C10.9903 9.77043 10.9503 9.89045 10.8803 10.0104C10.8103 10.1304 10.7203 10.2504 10.6003 10.3704L10.2203 10.7704C10.1603 10.8304 10.1403 10.8904 10.1403 10.9704C10.1403 11.0104 10.1503 11.0504 10.1603 11.0904C10.1803 11.1304 10.1903 11.1604 10.2003 11.1904C10.2903 11.3604 10.4503 11.5704 10.6703 11.8304C10.9003 12.0904 11.1403 12.3604 11.4003 12.6204C11.6703 12.8904 11.9303 13.1304 12.2003 13.3604C12.4603 13.5804 12.6803 13.7304 12.8503 13.8204C12.8803 13.8304 12.9103 13.8504 12.9403 13.8604C12.9803 13.8804 13.0203 13.8804 13.0703 13.8804C13.1603 13.8804 13.2203 13.8504 13.2803 13.7904L13.6603 13.4104C13.7903 13.2804 13.9103 13.1904 14.0203 13.1304C14.1403 13.0604 14.2503 13.0204 14.3803 13.0204C14.4803 13.0204 14.5803 13.0404 14.6903 13.0904C14.8003 13.1404 14.9203 13.2004 15.0403 13.2904L16.7003 14.4704C16.8303 14.5604 16.9203 14.6704 16.9803 14.7904C17.0303 14.9204 17.0603 15.0404 17.0603 15.1804C17.0003 15.3504 16.9603 15.5404 16.8803 15.7204Z"
              fill={tailwind.color('text-white')}
            />
          </Svg>
        </Animated.View>
      </TouchableOpacity>
    </>
  );
};
const CloseIcon = () => {
  return (
    <Svg width="28" height="28" fill="none" viewBox="0 0 24 24">
      <Path
        stroke="white"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M17.25 6.75L6.75 17.25"
      />
      <Path
        stroke="white"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M6.75 6.75L17.25 17.25"
      />
    </Svg>
  );
};
const ShareIcon = () => {
  return (
    <Svg width="24" height="24" fill="none" viewBox="0 0 24 24">
      <Path
        stroke="white"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M9.25 4.75H6.75C5.64543 4.75 4.75 5.64543 4.75 6.75V17.25C4.75 18.3546 5.64543 19.25 6.75 19.25H17.25C18.3546 19.25 19.25 18.3546 19.25 17.25V14.75"
      />
      <Path
        stroke="white"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M19.25 9.25V4.75H14.75"
      />
      <Path
        stroke="white"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M19 5L11.75 12.25"
      />
    </Svg>
  );
};

const Entry = () => {
  const iconState = useSharedValue(1);
  const rippleStateScale = useSharedValue(0);
  const rippleStateOpacity = useSharedValue(1);

  const [state, setState] = useState<BibleVerse[]>([]);
  const title = 'Verse:';
  const content = state[0]?.text;
  const subText = `${state[0]?.chapter}: ${state[0]?.verse}`;
  const subContent = state[0]?.bookname;

  useEffect(() => {
    const baseURL = 'https://labs.bible.org/api/?passage=random&type=json';
    const api = axios.create({
      baseURL,
    });
    const fetchData = async () => {
      try {
        const response = await api.get(baseURL);
        setState(response.data);
      } catch (error) {
        console.error('Error fetching verse:', error);
      }
    };
    fetchData();
  }, []);

  const shareIconStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(iconState.value, [0, 1], [0, 1]),
      zIndex: interpolate(iconState.value, [0, 1], [0, 9999]),

      transform: [{ scale: interpolate(iconState.value, [0, 1], [0.7, 1]) }],
    };
  });
  const closeIconStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(iconState.value, [1, 0], [0, 1]),
      zIndex: interpolate(iconState.value, [1, 0], [0, 9999]),
      transform: [{ scale: interpolate(iconState.value, [1, 0], [0.7, 1]) }],
    };
  });
  const containerStyle = useAnimatedStyle(() => {
    return {
      width: interpolate(iconState.value, [1, 0], [40, 144]),
    };
  });

  const rippleEffect = useAnimatedStyle(() => {
    return {
      opacity: interpolate(rippleStateOpacity.value, [1, 0], [1, 0]),
      transform: [{ scale: interpolate(rippleStateScale.value, [0, 1], [1, 2]) }],
    };
  });

  const shareTapHandler = Gesture.Tap()
    .maxDistance(1)
    .onStart(() => {
      'worklet';
      iconState.value = withSpring(0, SHARE_SPRING_CONFIG);
    })
    .onTouchesUp(() => {
      rippleStateScale.value = withTiming(1, {
        duration: 300,
        easing: Easing.out(Easing.ease),
      });
    })
    .onFinalize(() => {
      rippleStateOpacity.value = withTiming(
        0,
        { duration: 500, easing: Easing.out(Easing.ease) },
        () => {
          rippleStateOpacity.value = 1;
          rippleStateScale.value = 0;
        }
      );
    });

  const closeTapHandler = Gesture.Tap()
    .maxDistance(1)
    .onStart(() => {
      'worklet';
      iconState.value = withSpring(1, CLOSE_SPRING_CONFIG);
    })
    .onTouchesUp(() => {
      rippleStateScale.value = withTiming(1, {
        duration: 300,
        easing: Easing.out(Easing.ease),
      });
    })
    .onFinalize(() => {
      rippleStateOpacity.value = withTiming(
        0,
        { duration: 500, easing: Easing.out(Easing.ease) },
        () => {
          rippleStateOpacity.value = 1;
          rippleStateScale.value = 0;
        }
      );
    });

  return (
    <GestureHandlerRootView style={styles.container}>
      <Pressable style={tailwind.style('w-full px-5')}>
        <Animated.View style={tailwind.style('relative z-10')}>
          <Animated.View
            style={[
              tailwind.style(
                'absolute -top-5 -right-5 bg-violet-600 rounded-full h-10 w-10 z-1 shadow-lg'
              ),
              rippleEffect,
            ]}
          />
          <Animated.View
            style={[
              tailwind.style(
                'absolute -top-5 -right-5 bg-violet-900 flex-row items-center justify-end rounded-full h-10 z-10 shadow-lg'
              ),
              containerStyle,
            ]}
          >
            <GestureDetector gesture={shareTapHandler}>
              <Animated.View
                style={[tailwind.style('absolute right-2'), shareIconStyle]}
                //  onPress={handleShare}
              >
                <ShareIcon />
              </Animated.View>
            </GestureDetector>
            <ShareIconStack av={iconState} state={state} />
            <GestureDetector gesture={closeTapHandler}>
              <Animated.View style={[tailwind.style('pr-2'), closeIconStyle]}>
                <CloseIcon />
              </Animated.View>
            </GestureDetector>
          </Animated.View>
        </Animated.View>
        <AnimatedLinearGradient
          style={tailwind.style('p-5 rounded-lg')}
          start={{ x: 0.0, y: 0.25 }}
          end={{ x: 0.5, y: 1.0 }}
          angle={65}
          useAngle={true}
          colors={[
            tailwind.color('text-violet-700') as string,
            tailwind.color('text-violet-500') as string,
            tailwind.color('text-violet-600') as string,
            tailwind.color('text-violet-500') as string,
            tailwind.color('text-violet-700') as string,
          ]}
        >
          <Animated.Text style={tailwind.style('text-white')}>{title}</Animated.Text>
          <Animated.Text style={tailwind.style('text-white text-sm pt-6')}>{content}</Animated.Text>
          <Animated.View style={tailwind.style('flex flex-row items-center pt-2')}>
            <Animated.View style={tailwind.style('px-1 py-0.5 bg-violet-800 rounded-md')}>
              <Animated.Text style={tailwind.style('text-white text-sm tracking-wider')}>
                {subText}
              </Animated.Text>
            </Animated.View>
            <Animated.Text style={tailwind.style('text-white text-sm tracking-wide pl-1')}>
              {subContent}
            </Animated.Text>
          </Animated.View>
        </AnimatedLinearGradient>
      </Pressable>
    </GestureHandlerRootView>
  );
};

export default Entry;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#a15fde',
  },
});
