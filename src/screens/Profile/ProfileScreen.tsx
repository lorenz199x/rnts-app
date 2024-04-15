import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

const ProfileScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        {/* Profile image */}
        <Image
          source={{ uri: 'https://via.placeholder.com/150' }} // Replace 'placeholder-image.jpg' with your image source
          style={styles.profileImage}
        />
        {/* Text fields */}
        <View style={styles.textContainer}>
          <View style={styles.detailsContainer}>
            <Text style={styles.label}>Full Name:</Text>
            <Text style={styles.value}>John Doe</Text>
          </View>
          <View style={styles.detailsContainer}>
            <Text style={styles.label}>Position:</Text>
            <Text style={styles.value}>Software Engineer</Text>
          </View>
          <View style={styles.detailsContainer}>
            <Text style={styles.label}>Username:</Text>
            <Text style={styles.value}>johndoe123</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    // justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginRight: 20,
  },
  textContainer: {
    flex: 1,
  },
  detailsContainer: {
    marginBottom: 10,
  },
  label: {
    fontWeight: 'bold',
    color: '#333333',
  },
  value: {
    fontSize: 16,
    color: '#666666',
  },
});
