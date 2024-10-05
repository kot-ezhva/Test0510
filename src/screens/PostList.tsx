import React, {useEffect, useRef, useState} from 'react';
import { StyleSheet, FlatList } from 'react-native';
import {BASE_URI, CONTAINERS_PADDING} from '../constants.ts';
import {Post} from '../types.ts';
import {PostListItem, PostModal, PostSeparator} from '../components';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';

let timeoutId: ReturnType<typeof setTimeout> | null;

const PostList = () => {
  const [activePost, setActivePost] = useState<Post | undefined>();
  const [postList, setPostList] = useState<Post[]>([]);
  const page = useRef(1);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const { bottom: safeBottomOffset } = useSafeAreaInsets();

  const flatList = useRef<FlatList>(null);

  useEffect(() => {
    startTimer();
    return stopTimer;
  }, []);


  const startTimer = () => {
    stopTimer();
    timeoutId = setTimeout(async () => {
      await onRefresh();
      startTimer();
      flatList.current?.scrollToOffset({ offset: 0, animated: true });
    }, 30 * 1000);
  };

  const stopTimer = () => {
    timeoutId && clearTimeout(timeoutId);
  };

  const fetchPosts = async (): Promise<Post[]> => {
    setLoading(true);
    const response = await fetch(`${BASE_URI}/posts?_page=${page.current}&_embed=comments`);
    page.current = page.current + 1;
    setLoading(false);
    return await response.json() as Post[];
  }

  const onPostPress = (post: Post) => {
    stopTimer();
    setActivePost(post)
  };

  const onCloseModal = () => {
    startTimer();
    setActivePost(undefined);
  }

  const onRefresh = async () => {
    setRefreshing(true);
    page.current = 1;
    const posts = await fetchPosts();
    setPostList(posts);
    setRefreshing(false);
  };

  const onEndReached = async () => {
    if (loading || refreshing) {
      return;
    }
    const posts = await fetchPosts();
    setPostList(prevPosts => [...prevPosts, ...posts]);
  }


  const _renderPost = (post: Post) => <PostListItem post={post} onPress={() => onPostPress(post)} />;

  return (
    <SafeAreaView edges={['top']}>
      <FlatList
        data={postList}
        renderItem={({item}) => _renderPost(item)}
        keyExtractor={item => `key_${item.id}`}
        ItemSeparatorComponent={PostSeparator}
        showsVerticalScrollIndicator={false}
        onRefresh={onRefresh}
        refreshing={refreshing}
        onEndReached={onEndReached}
        ref={flatList}
        contentContainerStyle={{
          ...styles.container,
          paddingBottom: styles.container.padding + safeBottomOffset
        }}
      />

      <PostModal post={activePost} onClose={onCloseModal} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: CONTAINERS_PADDING,
  },
});

export default PostList;
