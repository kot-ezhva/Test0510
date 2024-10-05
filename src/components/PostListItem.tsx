import React, { useRef } from 'react';
import { Text, StyleSheet, Pressable, Animated } from 'react-native';
import { Post } from '../types.ts';
import { CONTAINERS_PADDING } from '../constants.ts';

interface Props {
  post: Post
  onPress: () => void
}

const PostListItem = ({ post, onPress }: Props) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const { id, title, body } = post;

  const handlePress = (isPress: boolean) => {
    Animated.timing(scaleAnim, {
      toValue: isPress ? 1.05 : 1,
      duration: 150,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Pressable
      onPress={onPress}
      onPressIn={() => handlePress(true)}
      onTouchEnd={() => handlePress(false)}
    >
      <Animated.View style={[styles.container, { transform: [{ scale: scaleAnim }] }]}>
        <Text style={styles.title} numberOfLines={1}>{ title }</Text>
        <Text style={styles.body} numberOfLines={2}>{ body }</Text>
      </Animated.View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.08,
    shadowRadius: 8,

    padding: CONTAINERS_PADDING,
    borderRadius: CONTAINERS_PADDING,
  },
  title: {
    fontSize: 20,
    marginBottom: 8,
  },
  body: {
    opacity: 0.5,
  },
});

export default PostListItem;
