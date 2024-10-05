import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {Comment} from '../types.ts';
import {CONTAINERS_PADDING} from '../constants.ts';

interface Props {
  comment: Comment
}

const CommentListItem = ({ comment }: Props) => {
  const { name, email, body } = comment;

  return (
    <View style={styles.container}>
      <Text style={styles.username}>{`${email} commented:`}</Text>
      <Text style={styles.name}>{name}</Text>
      <Text>{body}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: CONTAINERS_PADDING,
    marginBottom: 10,
    backgroundColor: '#fff',
    padding: CONTAINERS_PADDING,
    borderRadius: CONTAINERS_PADDING / 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.08,
    shadowRadius: 8,
  },
  username: {
    fontSize: 14,
    opacity: 0.4,
    fontWeight: '600',
    marginBottom: CONTAINERS_PADDING / 2,
  },
  name: {
    fontSize: 16,
    fontWeight: '600'
  }
});

export default CommentListItem;
