import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { colors, fontType } from '../../theme'; // Pastikan sesuai path temamu

const DiscoverScreen = ({ navigation }) => {
  const [search, setSearch] = useState('');

  const destinations = [
    { id: '1', name: 'Labuan Bajo', description: 'Gerbang menuju Pulau Komodo.', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQsZphlcuP1D8TfdeJMyogdkx1xlx2CbMD-8g&s' },
    { id: '2', name: 'Pulau Komodo', description: 'Habitat asli Komodo.', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-cGaMQLCKcKOlqO2xoqKWJ7dkMi2MqPU2VA&s' },
    { id: '3', name: 'Wae Rebo', description: 'Desa tradisional di pegunungan.', image: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0d/a4/d3/41/the-most-of-i-like.jpg?w=1200&h=-1&s=1' },
  ];

  const filteredDestinations = destinations.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <Text style={styles.title}>{item.name}</Text>
      <Text style={styles.description}>{item.description}</Text>
    </View>
  );

  return (
    <>
      {/* Navbar Atas */}
      <View style={styles.navbar}>
        <Text style={styles.navTitle}>Discover</Text>
      </View>

      {/* Konten */}
      <ScrollView style={styles.container} contentContainerStyle={styles.content}>
        <TextInput
          style={styles.input}
          placeholder="Cari destinasi..."
          value={search}
          onChangeText={setSearch}
        />
        <FlatList
          data={filteredDestinations}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          scrollEnabled={false}
          contentContainerStyle={styles.listContainer}
        />
      </ScrollView>

      {/* Navbar Bawah */}
      <View style={styles.bottomNavbar}>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Home')}>
          <Text style={styles.navItemText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.navItem, styles.active]}>
          <Text style={styles.navItemText}>Discover</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Profile')}>
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
    paddingBottom: 80, // supaya tidak ketutup navbar
  },
  input: {
    height: 45,
    borderColor: colors.primary,
    borderWidth: 1.5,
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 20,
    backgroundColor: '#fff',
    fontFamily: fontType.regular,
    fontSize: 14,
  },
  listContainer: {
    gap: 16,
  },
  card: {
    backgroundColor: '#fefae0',
    borderRadius: 10,
    padding: 12,
    elevation: 3,
  },
  image: {
    width: '100%',
    height: 160,
    borderRadius: 10,
  },
  title: {
    fontFamily: fontType.bold,
    fontSize: 18,
    marginTop: 8,
    color: '#264653',
  },
  description: {
    fontFamily: fontType.regular,
    fontSize: 14,
    color: '#6c757d',
    marginTop: 4,
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

export default DiscoverScreen;
