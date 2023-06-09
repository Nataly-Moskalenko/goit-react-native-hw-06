import { StyleSheet, Text, View, Image, Pressable } from 'react-native';
import { CommentWhiteIcon, LocationIcon } from '../../assets/SvgIcons';
import { useNavigation } from '@react-navigation/native';

import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

import { selectUser } from '../redux/selectors';

import { auth, db } from '../firebase/config';
import { collection, addDoc, getDocs, updateDoc, doc } from 'firebase/firestore';

export default function PostsScreen({ route }) {
  const navigation = useNavigation();
  const imageUri = route.params ? route.params.imageUri : null;
  const location = route.params ? route.params.location : null;
  const name = route.params ? route.params.name : null;
  const locationName = route.params ? route.params.locationName : null;

  const [posts, setPosts] = useState([]);

  const user = useSelector(selectUser);
  console.log(user.uid);

  const getDataFromFirestore = async () => {
    try {
      const snapshot = await getDocs(collection(db, 'users', user.uid, 'posts'));

      // Перевіряємо у консолі отримані дані
      snapshot.forEach((doc) => console.log(`${doc.id} =>`, doc.data()));
      // Повертаємо масив обʼєктів у довільній формі
      return snapshot.map((doc) => ({ id: doc.id, data: doc.data() }));
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  // getDataFromFirestore();
  useEffect(() => {
    setPosts(getDataFromFirestore());
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.user}>
        <Image style={styles.userPhoto} />
        <View style={styles.userDescription}>
          {/* {user && <Text style={styles.userName}>{user.displayName}</Text>} */}
          {user && <Text style={styles.userEmail}>{user.email}</Text>}
        </View>
      </View>
      {route.params && (
        <View style={styles.post}>
          <Image source={{ uri: imageUri }} style={styles.postPhoto} />
          <Text style={styles.postName}>{name}</Text>
          <View style={styles.postWrapper}>
            <View style={styles.comment}>
              <Pressable onPress={() => navigation.navigate('CommentsScreen')}>
                <View>{CommentWhiteIcon}</View>
              </Pressable>
              <Text>Comment</Text>
            </View>

            <View style={styles.location}>
              <Pressable onPress={() => navigation.navigate('MapScreen', { location })}>
                <View>{LocationIcon}</View>
              </Pressable>
              <Text>{locationName}</Text>
            </View>
          </View>
        </View>
      )}
      {/* {posts.map((post) => ( */}
      {/* <View style={styles.post}>
        <Image source={{ uri: post.imageUri }} style={styles.postPhoto} />
        <Text style={styles.postName}>{post.imageName}</Text>
        <View style={styles.postWrapper}>
          <View style={styles.comment}>
            <Pressable onPress={() => navigation.navigate('CommentsScreen')}>
              <View>{CommentWhiteIcon}</View>
            </Pressable>
            <Text>Comment</Text>
          </View>

          <View style={styles.location}>
            <Pressable
              onPress={() => navigation.navigate('MapScreen', { location: post.location })}
            >
              <View>{LocationIcon}</View>
            </Pressable>
            <Text>{post.locationName}</Text>
          </View>
        </View>
      </View> */}
      {/* ))} */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    borderTopColor: 'rgba(0, 0, 0, 0.3)',
    borderBottomColor: 'rgba(0, 0, 0, 0.3)',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    paddingLeft: 16,
    paddingRight: 16,
  },
  user: {
    marginTop: 32,
    marginBottom: 32,
    flexDirection: 'row',
  },
  userPhoto: {
    width: 60,
    height: 60,
    borderRadius: 16,
    backgroundColor: '#F6F6F6',
  },
  userDescription: {
    marginLeft: 8,
    justifyContent: 'center',
  },
  userName: {
    // fontFamily: 'Roboto',
    fontWeight: 'bold',
    fontSize: 13,
    lineHeight: 15,
    color: '#212121',
  },
  userEmail: {
    // fontFamily: 'Roboto',
    fontWeight: 'bold',
    fontSize: 11,
    lineHeight: 13,
    color: 'rgba(33, 33, 33, 0.8)',
  },
  post: {
    marginBottom: 32,
  },
  postName: {
    marginBottom: 8,
    marginTop: 8,
  },
  postWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  postPhoto: {
    width: '100%',
    height: 240,
    borderRadius: 8,
    backgroundColor: '#F6F6F6',
    borderColor: '#E8E8E8',
    borderWidth: 1,
  },
  comment: {
    flexDirection: 'row',
  },
  location: {
    flexDirection: 'row',
  },
});
