import React, {useMemo} from 'react';
import {View, Text, StyleSheet, Modal, Pressable, useWindowDimensions, ScrollView} from 'react-native';
import {Post} from '../types.ts';
import { useSafeAreaInsets} from 'react-native-safe-area-context';
import {CONTAINERS_PADDING} from '../constants.ts';
import {CommentListItem} from './';

interface Props {
  post?: Post
  onClose: () => void
}

const PostModal = ({ post, onClose }: Props) => {
  const { height: deviceHeight } = useWindowDimensions();
  const { top: safeTopOffset, bottom: safeBottomOffset } = useSafeAreaInsets();

  const modalHeight = useMemo(() => deviceHeight - safeTopOffset - (CONTAINERS_PADDING * 5), [deviceHeight, safeTopOffset]);

  return (
    <Modal
      visible={!!post}
      transparent
      animationType="fade"
    >
      <Pressable onPress={onClose} style={styles.backdrop} />

      <View
        style={{
          ...styles.container,
          height: modalHeight,
        }}
      >
        <ScrollView contentContainerStyle={{ paddingBottom: safeBottomOffset }} showsVerticalScrollIndicator={false}>
          <Text style={[styles.title]}>{post?.title}</Text>
          <Text style={styles.body}>{post?.body}</Text>

          {
            !!post?.comments.length
            &&
            <>
              <Text style={[styles.title, styles.subtitle]}>{`Comments (${post?.comments.length})`}</Text>

              {
                post?.comments.map(comment => (
                  <CommentListItem key={`key_${post.id}_${comment.id}`} comment={comment} />
                ))
              }
            </>
          }

        </ScrollView>
      </View>

    </Modal>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  container: {
    marginTop: 'auto',
    backgroundColor: '#fff',
    borderTopLeftRadius: CONTAINERS_PADDING,
    borderTopRightRadius: CONTAINERS_PADDING,
  },
  title: {
    marginHorizontal: CONTAINERS_PADDING,
    marginTop: CONTAINERS_PADDING,
    fontSize: 30,
    marginBottom: 10,
    fontWeight: 800,
  },
  body: {
    marginHorizontal: CONTAINERS_PADDING,
    opacity: 0.9
  },
  subtitle: {
    fontWeight: 600,
    marginTop: 20,
    fontSize: 26,
  },
});

export default PostModal;
