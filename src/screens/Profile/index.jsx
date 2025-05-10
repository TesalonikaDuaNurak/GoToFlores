import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { colors, fontType } from '../../theme'; // Pastikan path sesuai

const ProfileScreen = ({ navigation }) => {
  const profile = {
    name: 'John Doe',
    email: 'johndoe@example.com',
    phone: '+62 812-3456-7890',
    location: 'Flores, NTT',
    bio: 'Pecinta traveling dan petualangan alam di Indonesia.',
    avatar: 'https://i.pravatar.cc/300',
  };

  const userPosts = [
    {
      id: '1',
      name: 'Pantai Koka',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3jS9hvS5z3TzYtsoGvTibBUca-ZQJmqq24g&s',
      description: 'Pantai indah dengan pasir putih dan air biru jernih.',
    },
    {
      id: '2',
      name: 'Wae Rebo',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDH-C_5ym9s8cAkyU9SLUgSH1w00OEVgO8Dw&s',
      description: 'Desa tradisional di pegunungan Flores yang ikonik.',
    },
  ];

  const renderPost = ({ item }) => (
    <View style={styles.postCard}>
      <Image source={{ uri: item.image }} style={styles.postImage} />
      <View style={styles.postContent}>
        <Text style={styles.postTitle}>{item.name}</Text>
        <Text style={styles.postDescription}>{item.description}</Text>
      </View>
    </View>
  );

  return (
    <>
      {/* Navbar Atas */}
      <View style={styles.navbar}>
        <Text style={styles.navTitle}>Profil Saya</Text>
      </View>

      <ScrollView style={styles.container} contentContainerStyle={styles.content}>
        <View style={styles.card}>
          <Image source={{ uri: profile.avatar }} style={styles.avatar} />
          <Text style={styles.name}>{profile.name}</Text>
          <Text style={styles.email}>{profile.email}</Text>

          <View style={styles.infoSection}>
            <Text style={styles.label}>No. Telepon</Text>
            <Text style={styles.value}>{profile.phone}</Text>

            <Text style={styles.label}>Lokasi</Text>
            <Text style={styles.value}>{profile.location}</Text>

            <Text style={styles.label}>Tentang Saya</Text>
            <Text style={styles.value}>{profile.bio}</Text>
          </View>

          <TouchableOpacity style={styles.editButton}>
            <Text style={styles.editButtonText}>Edit Profil</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.sectionTitle}>Postingan Saya</Text>
        <FlatList
          data={userPosts}
          renderItem={renderPost}
          keyExtractor={(item) => item.id}
          scrollEnabled={false}
          contentContainerStyle={styles.postsContainer}
        />
      </ScrollView>

      {/* Navbar Bawah */}
      <View style={styles.bottomNavbar}>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Home')}>
          <Text style={styles.navItemText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Discover')}>
          <Text style={styles.navItemText}>Discover</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.navItem, styles.active]}>
          <Text style={styles.navItemText}>Profile</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  navbar: {
    backgroundColor: colors.white,
    paddingVertical: 15,
    paddingHorizontal: 20,
    elevation: 3,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  navTitle: {
    fontFamily: fontType.bold,
    fontSize: 20,
    color: colors.primary,
  },
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: 20,
    paddingBottom: 80, // Supaya konten tidak tertutup navbar bawah
  },
  card: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    elevation: 5,
    marginBottom: 20,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 16,
  },
  name: {
    fontFamily: fontType.bold,
    fontSize: 22,
    color: colors.primary,
    marginBottom: 4,
  },
  email: {
    fontFamily: fontType.regular,
    fontSize: 16,
    color: colors.secondary,
    marginBottom: 16,
  },
  infoSection: {
    width: '100%',
    marginBottom: 16,
  },
  label: {
    fontFamily: fontType.bold,
    fontSize: 14,
    color: colors.primary,
    marginTop: 10,
  },
  value: {
    fontFamily: fontType.regular,
    fontSize: 14,
    color: colors.secondary,
    marginTop: 2,
  },
  editButton: {
    marginTop: 10,
    backgroundColor: colors.primary,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  editButtonText: {
    fontFamily: fontType.bold,
    fontSize: 16,
    color: colors.white,
  },
  sectionTitle: {
    fontFamily: fontType.bold,
    fontSize: 20,
    color: colors.primary,
    marginBottom: 10,
  },
  postsContainer: {
    gap: 16,
  },
  postCard: {
    flexDirection: 'row',
    backgroundColor: colors.white,
    borderRadius: 10,
    overflow: 'hidden',
    elevation: 3,
  },
  postImage: {
    width: 100,
    height: 100,
  },
  postContent: {
    flex: 1,
    padding: 10,
    justifyContent: 'center',
  },
  postTitle: {
    fontFamily: fontType.bold,
    fontSize: 16,
    color: colors.primary,
    marginBottom: 4,
  },
  postDescription: {
    fontFamily: fontType.regular,
    fontSize: 14,
    color: colors.secondary,
  },
  bottomNavbar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 10,
    backgroundColor: colors.white,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  navItem: {
    padding: 10,
  },
  navItemText: {
    fontFamily: fontType.bold,
    fontSize: 14,
    color: colors.primary,
  },
  active: {
    borderBottomWidth: 2,
    borderBottomColor: colors.primary,
  },
});

export default ProfileScreen;
