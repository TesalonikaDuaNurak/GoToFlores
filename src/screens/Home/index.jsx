import React from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { colors, fontType } from '../../theme';
import { destinations } from '../../constants/data';

const HomeScreen = ({ navigation }) => {
  const renderDestinationItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate('DetailScreen', { placeId: item.id })}
      style={styles.card}
    >
      <Image source={{ uri: item.image }} style={styles.image} resizeMode="cover" />
      <Text style={styles.title}>{item.name}</Text>
      <Text style={styles.description}>{item.description}</Text>
    </TouchableOpacity>
  );

  return (
    <>
      {/* Navbar Atas */}
      <View style={styles.navbar}>
        <Text style={styles.navTitle}>Beranda</Text>
      </View>

      <ScrollView style={styles.container} contentContainerStyle={styles.content}>
        <FlatList
          data={destinations}
          renderItem={renderDestinationItem}
          keyExtractor={(item) => item.id}
          scrollEnabled={false}
          contentContainerStyle={styles.listContainer}
        />
      </ScrollView>

      {/* Navbar Bawah */}
      <View style={styles.bottomNavbar}>
        <TouchableOpacity style={[styles.navItem, styles.active]}>
          <Text style={styles.navItemText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Discover')}>
          <Text style={styles.navItemText}>Discover</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Profile')}>
          <Text style={styles.navItemText}>Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('festival')}>
          <Text style={styles.navItemText}>Event</Text>
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
    paddingBottom: 80, // Supaya konten tidak ketutup navbar
  },
  listContainer: {
    gap: 16,
  },
  card: {
    backgroundColor: colors.white,
    borderRadius: 10,
    overflow: 'hidden',
    elevation: 5,
  },
  image: {
    width: '100%',
    height: 200,
  },
  title: {
    fontFamily: fontType.bold,
    fontSize: 18,
    color: colors.primary,
    padding: 10,
  },
  description: {
    fontFamily: fontType.regular,
    fontSize: 14,
    color: colors.secondary,
    paddingHorizontal: 10,
    paddingBottom: 10,
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

export default HomeScreen;
