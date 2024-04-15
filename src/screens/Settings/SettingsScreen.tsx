import React, { useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Icon from '@components/Icon/Icon';
import { Label } from '@shared/enums/labels';

const SettingsScreen: React.FC = () => {
  const [value, setValue] = useState('');
  const [error, setError] = useState('');
  const [showError, setShowError] = useState(false);

  // Function to handle input change
  const handleInputChange = (text: string) => {
    // Update input value
    setValue(text);
  };

  // Function to handle save button press
  const handleSave = () => {
    // Validate input
    if (value.trim() === '') {
      setError('Value cannot be blank');
    } else if (!/^\d+$/.test(value)) {
      setError('Value must be a valid positive number');
    } else if (parseInt(value) > 100) {
      setError('Value cannot exceed 100');
    } else {
      setError('');
      Alert.alert('Success', 'Value is correct', [{ text: 'OK' }]);
    }
    setShowError(true);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{Label.SETTINGS}</Text>
      <TextInput
        style={[styles.input, error && showError ? styles.inputError : null]}
        placeholder="Enter value"
        keyboardType="numeric"
        value={value}
        onChangeText={handleInputChange}
      />
      {error && showError ? <Text style={styles.error}>{error}</Text> : null}
      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Icon type={'Feather'} icon={'save'} size={24} color={'#fff'} />
        <Text style={styles.saveButtonText}>Save</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  input: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
    backgroundColor: '#fff',
  },
  inputError: {
    borderColor: 'red',
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
  saveButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'blue',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    marginLeft: 5,
  },
});
