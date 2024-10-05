import React from 'react';
import { View, StyleSheet } from 'react-native';
import {CONTAINERS_PADDING} from '../constants.ts';

const PostSeparator = () => <View style={styles.separator} />;

const styles = StyleSheet.create({
  separator: {
    height: CONTAINERS_PADDING,
  },
});

export default PostSeparator;
