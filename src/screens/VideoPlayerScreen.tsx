import React, { useRef, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Video, { OnLoadData } from 'react-native-video';
import Slider from '@react-native-community/slider';

const videoUrl =
  'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4';

const VideoPlayerScreen = () => {
  const [isPaused, setIsPaused] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const videoRef = useRef<any>(null);
  const sliderRef = useRef<any>(null);

  const handlePlayPause = () => setIsPaused(!isPaused);

  const handleProgressChange = (value: number) => {
    if (videoRef.current) {
      videoRef.current.seek(value);
      setCurrentTime(value);
    }
  };

  const handleProgress = (data: any) => setCurrentTime(data.currentTime);

  const handleLoad = (data: OnLoadData) => setDuration(data.duration || 0);

  return (
    <View style={styles.container}>
      <Video
        source={{ uri: videoUrl }}
        ref={videoRef}
        controls={false}
        resizeMode="contain"
        onProgress={handleProgress}
        onLoad={handleLoad}
        paused={isPaused}
        style={styles.video}
      />
      <View style={styles.controlsContainer}>
        <TouchableOpacity onPress={handlePlayPause}>
          <Text style={styles.btnText}>{isPaused ? 'Play' : 'Pause'}</Text>
        </TouchableOpacity>
        <Slider
          style={styles.slider}
          minimumValue={0}
          maximumValue={duration}
          value={currentTime}
          onSlidingComplete={handleProgressChange}
          minimumTrackTintColor="#0004dc"
          maximumTrackTintColor="#0a73dc"
          thumbTintColor="#2d86d8"
          ref={sliderRef}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F0EFEC',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  controlsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  slider: {
    flex: 1,
    marginHorizontal: 10,
  },
  video: {
    width: '100%',
    height: 400,
    backgroundColor: '#000000',
  },
  btnText: {
    fontWeight: 'bold',
  },
});

export default VideoPlayerScreen;
