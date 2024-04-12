import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

const SettingsScreen: React.FC = () => {
  const [value, setValue] = useState('');
  const [error, setError] = useState('');

  // Function to handle input change
  const handleInputChange = (text: string) => {
    // Validate input
    if (text.trim() === '') {
      setError('Value cannot be blank');
    } else if (!/^\d+$/.test(text)) {
      setError('Value must be a valid positive number');
    } else if (parseInt(text) > 100) {
      setError('Value cannot exceed 100');
    } else {
      setError('');
    }
    // Update input value
    setValue(text);
  };

  // Function to handle save button press
  const handleSave = () => {
    // Perform action on save, e.g., save to settings
    console.log('Saved value:', value);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings</Text>
      <TextInput
        style={[styles.input, error ? styles.inputError : null]}
        placeholder="Enter value"
        keyboardType="numeric"
        value={value}
        onChangeText={handleInputChange}
      />
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <TouchableOpacity style={styles.saveButton} onPress={handleSave} disabled={!!error}>
        <Text style={styles.saveButtonText}>Save</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  inputError: {
    borderColor: 'red',
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
  saveButton: {
    backgroundColor: 'blue',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default SettingsScreen;
