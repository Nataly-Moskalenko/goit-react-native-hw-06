import { StyleSheet, Text, View, Image, Pressable } from 'react-native';
import { CommentWhiteIcon, LocationIcon } from '../../assets/SvgIcons';
import { useNavigation } from '@react-navigation/native';

export default function PostsScreen({ route }) {
  const navigation = useNavigation();
  const imageUri = route.params ? route.params.imageUri : null;
  const location = route.params ? route.params.location : null;
  const name = route.params ? route.params.name : null;
  const locationName = route.params ? route.params.locationName : null;

  return (
    <View style={styles.container}>
      <View style={styles.user}>
        <Image style={styles.userPhoto} />
        <View style={styles.userDescription}>
          <Text style={styles.userName}>Natali Romanova</Text>
          <Text style={styles.userEmail}>email@example.com</Text>
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
