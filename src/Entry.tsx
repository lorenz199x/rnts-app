import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native-paper';
import Cards from '@components/Cards/Card';

const Entry = () => {
  const content =
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.";
  const imgUrl = 'https://picsum.photos/700';

  return (
    <View style={styles.container}>
      <Text>Entry</Text>
      {/* <Icon type={'MaterialCommunity'} icon={'arrow-left'} size={34} color={'red'} /> */}

      {/* Example 1: Card with Title Only */}
      {/* <Cards
        title="Card Title"
        subtitle="Card Subtitle"
        left={(props) => <Avatar.Icon {...props} icon="folder" />}
        right={(props) => <IconButton {...props} icon="dots-vertical" onPress={() => { }} />}
        content={<Text>This is some content.</Text>} // Content is optional, you can remove it if not needed
      /> */}

      {/* Example 2: Card with Content Only */}
      {/* <Cards
        content={
          <>
            <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Card title</Text>
            <Text style={{ fontSize: 16 }}>{content}</Text>
          </>
        }
      /> */}

      {/* Example 3: Card with Cover Only */}
      {/* <Cards cover={imgUrl} /> */}

      {/* Example 4: Card with Actions Only */}
      {/* <Cards
        actions={
          <>
            <Button>Cancel</Button>
            <Button>Ok</Button>
          </>
        }
      /> */}

      {/* Example 5: Complete Card with Title, Content, and Actions */}
      <Cards
        title="Complete Card"
        content={content}
        cover={imgUrl}
        actions={
          <>
            <Button>Cancel</Button>
            <Button>Ok</Button>
          </>
        }
      />
    </View>
  );
};

export default Entry;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    // alignItems: 'center',
    padding: 20,
  },
});
