import { AppLoading } from 'expo';
import React, { useCallback, useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';

import api from '../../services/api';
import { Avatar, Description, Header, Name, Post, PostImage } from './styles';

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
  const [feed, setFeed] = useState<Feed[]>([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  const [pictures, setPictures] = useState([]);

  const loadPage = useCallback(
    async (pageNumber = page) => {
      console.log('pagina atual: ', pageNumber);
      console.log('total: ', total);
      if (total && pageNumber > total) return;

      setLoading(true);

      const act_id = 1105054;
      const loc_id = 36353641;

      // busca fotos da ultima visita
      api
        .get(`/queries/locals/${loc_id}/client/${act_id}/pics`)
        .then(response => {
          // setLoading(true);
          let loadedPictures = response.data;
          console.log(loadedPictures);

          loadedPictures = loadedPictures.map(picture => {
            return {
              url: picture.htv_externalvalue,
              description: picture.acf_description,
              id: picture.acf_id,
              // width: 250, height: 250
            };
          });

          setPictures(loadedPictures);
          // // setLoading(false);
          const totalItems = loadedPictures.length;
          const paginas = Math.floor(totalItems / 5);
          console.log('paginas: ', paginas);

          setTotal(paginas);
          setFeed([...feed, ...loadedPictures]);
          setPage(pageNumber + 1);
          // setLoading(false);
        });
    },
    [], // eslint-disable-line
  );

  useEffect(() => {
    loadPage();
  }, [loadPage]);

  return (
    <View>
      {/* <Text>Feed</Text> */}

      <FlatList
        data={feed}
        keyExtractor={pic => String(pic.id)}
        // onEndReached={() => loadPage()}
        // onEndReachedThreshold={0.1}
        renderItem={({ item }) => (
          <Post>
            {/* <Header>
              <Avatar source={{ uri: item.author.avatar }} />
              <Name>
                {item.author.name}-{item.id}
              </Name>
            </Header> */}

            <PostImage source={{ uri: item.url }} />

            <Description>
              <Name>{item.description}</Name>
            </Description>
          </Post>
        )}
      />
    </View>
  );
};

export default Feed;
