import React from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { colors, fontType } from '../../theme'; // Pastikan path-nya sesuai

const events = [
  {
    id: '1',
    title: 'Festival Komodo',
    date: '12 Juli 2025',
    location: 'Labuan Bajo',
    image: 'https://pesona.travel/media/17789/festival-komodo.jpg',
    description: 'Festival budaya dan parade di pintu gerbang Taman Nasional Komodo.',
  },
  {
    id: '2',
    title: 'Semana Santa',
    date: '17 April 2025',
    location: 'Larantuka',
    image: 'https://awsimages.detik.net.id/community/media/visual/2022/04/15/semana-santa-2022.jpeg',
    description: 'Perayaan keagamaan dan prosesi jalan salib yang khidmat.',
  },
  {
    id: '3',
    title: 'Festival Budaya Nagekeo',
    date: '5 Agustus 2025',
    location: 'Mbay, Nagekeo',
    image: 'https://cdn.antaranews.com/cache/800x533/2021/11/17/nagekeo.jpg',
    description: 'Pameran budaya dan seni khas daerah Nagekeo.',
  },
];

const EventsScreen = ({ navigation }) => {
  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.meta}>{item.date} - {item.location}</Text>
      <Text style={styles.description}>{item.description}</Text>
    </View>
  );

  return (
    <>
      {/* Header */}
      <View style={styles.navbar}>
        <Text style={styles.navTitle}>Event & Festival</Text>
      </View>

      <SafeAreaView style={styles.container}>
        <FlatList
          data={events}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
        />
      </SafeAreaView>

      {/* Bottom Navbar */}
      <View style={styles.bottomNavbar}>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Home')}>
          <Text style={styles.navItemText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Discover')}>
          <Text style={styles.navItemText}>Discover</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Profile')}>
          <Text style={styles.navItemText}>Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.navItem, styles.active]}>
          <Text style={styles.navItemText}>Event</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
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
  list: {
    padding: 16,
    paddingBottom: 80,
  },
  card: {
    backgroundColor: colors.white,
    borderRadius: 12,
    marginBottom: 20,
    overflow: 'hidden',
    elevation: 4,
  },
  image: {
    width: '100%',
    height: 180,
  },
  title: {
    fontFamily: fontType.bold,
    fontSize: 18,
    color: colors.primary,
    padding: 10,
  },
  meta: {
    fontFamily: fontType.medium,
    fontSize: 14,
    color: colors.secondary,
    paddingHorizontal: 10,
  },
  description: {
    fontFamily: fontType.regular,
    fontSize: 14,
    color: colors.secondary,
    padding: 10,
    paddingTop: 4,
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

export default EventsScreen;
