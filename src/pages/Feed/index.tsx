import { AppLoading } from 'expo';
import React, { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';

import LazyImage from '../../components/LazyImage';
import {
  Avatar,
  Description,
  Header,
  Loading,
  Name,
  Post,
  PostImage
} from './styles';

interface Feed {
  id: number;
  image: string;
  small: string;
  aspectRatio: number;
  description: string;
  authorId: number;
}

interface Author {
  id: number;
  name: string;
  avatar: string;
}

const Feed: React.FC = () => {
  // const [feed, setFeed] = useState<Feed[]>([]);
  const [feed, setFeed] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [viewable, setViewable] = useState([]);

  const loadPage = useCallback(
    async (pageNumber: number = page, shouldRefresh = false) => {
      if (total && pageNumber > total) return;

      setLoading(true);

      console.log('pagina atual: ', pageNumber);
      if (!isNaN(pageNumber)) {
        const response = await fetch(
          // `http://localhost:3000/feed?_expand=author&_limit=5&_page=${pageNumber}`,
          `https://my-json-server.typicode.com/diegoaraujo85/json-server/feed?_expand=author&_limit=5&_page=${pageNumber}`,
        );

        const data = await response.json();

        const totalItems = Number(response.headers.get('x-total-count'));
        const paginas = Math.ceil(totalItems / 5);

        setTotal(paginas);
        setFeed(shouldRefresh ? data : [...feed, ...data]);// eslint-disable-line
        setPage(pageNumber + 1);
      }

      setLoading(false);
    },
    [page], // eslint-disable-line
  );

  const refreshList = useCallback(
    async () => {
      console.log('refreshing');

      setRefreshing(true);

      await loadPage(1, true);

      setRefreshing(false);
    },
    [],
    // eslint-disable-line
  );

  const handleViewableChanged = useCallback(({ changed }) => {
    setViewable(changed.map(({ item }) => item.id));
  },
    [],
  );


  useEffect(() => {
    loadPage();
  }, []);

  return (
    <View>
      {/* <Text>Feed</Text> */}
      <FlatList
        data={feed}
        keyExtractor={post => String(post.id)}
        onEndReached={() => loadPage()}
        onEndReachedThreshold={0.1}
        onRefresh={refreshList}
        refreshing={refreshing}
        onViewableItemsChanged={handleViewableChanged}
        viewabilityConfig={{ viewAreaCoveragePercentThreshold: 20 }}
        ListFooterComponent={loading ? <Loading /> : <></>}
        renderItem={({ item }) => (
          <Post>
            <Header>
              <Avatar source={{ uri: item.author.avatar }} />
              <Name>
                {item.author.name}-{item.id}
              </Name>
            </Header>

            <LazyImage
              shouldLoad={viewable.includes(item.id)}
              aspectRatio={item.aspectRatio}
              smallSource={{ uri: item.small }}
              source={{ uri: item.image }}
            />

            <Description>
              <Name>{item.author.name}</Name> {item.description}
            </Description>
          </Post>
        )}
      />
    </View>
  );
};

export default Feed;
