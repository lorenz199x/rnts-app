import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

const ProfileScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      {/* Temporary image */}
      <Image
        source={{ uri: 'https://via.placeholder.com/150' }} // Replace 'placeholder-image.jpg' with your temporary image source
        style={styles.profileImage}
      />
      {/* Text fields */}
      <View style={styles.detailsContainer}>
        {/* <Text style={styles.label}>Full Name:</Text> */}
        <Text style={styles.value}>John Doe</Text>
      </View>
      <View style={styles.detailsContainer}>
        {/* <Text style={styles.label}>Position:</Text> */}
        <Text style={styles.value}>Software Engineer</Text>
      </View>
      <View style={styles.detailsContainer}>
        {/* <Text style={styles.label}>Username:</Text> */}
        <Text style={styles.value}>johndoe123</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 20,
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 20,
  },
  detailsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  label: {
    fontWeight: 'bold',
    marginRight: 10,
  },
  value: {
    fontSize: 16,
  },
});

export default ProfileScreen;
