import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  Alert,
} from 'react-native';
import { colors, fontType } from '../../theme'; // Pastikan path-nya sesuai

const EventsScreen = ({ navigation }) => {
  const [events, setEvents] = useState([
    {
      id: '1',
      title: 'Festival Komodo',
      date: '12 Juli 2025',
      location: 'Labuan Bajo',
      image: 'https://jadesta.com/imgpost/106156.jpg',
      description: 'Festival budaya dan parade di pintu gerbang Taman Nasional Komodo.',
    },
    {
      id: '2',
      title: 'Semana Santa',
      date: '17 April 2025',
      location: 'Larantuka',
      image: 'https://assets.pikiran-rakyat.com/crop/0x0:0x0/238x142/webp/photo/2025/04/11/2091475535.jpg',
      description: 'Perayaan keagamaan dan prosesi jalan salib yang khidmat.',
    },
    {
      id: '3',
      title: 'Festival Budaya Nagekeo',
      date: '5 Agustus 2025',
      location: 'Mbay, Nagekeo',
      image: 'https://pariwisata.nagekeokab.go.id/wp-content/uploads/2024/06/Etu-2.jpeg',
      description: 'Pameran budaya dan seni khas daerah Nagekeo.',
    },
  ]);

  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [location, setLocation] = useState('');
  const [image, setImage] = useState('');
  const [description, setDescription] = useState('');

  const handleAddEvent = () => {
    if (!title || !date || !location || !image || !description) {
      Alert.alert('Gagal', 'Semua field harus diisi');
      return;
    }

    const newEvent = {
      id: Date.now().toString(),
      title,
      date,
      location,
      image,
      description,
    };

    setEvents([newEvent, ...events]);

    setTitle('');
    setDate('');
    setLocation('');
    setImage('');
    setDescription('');
    Alert.alert('Sukses', 'Festival berhasil ditambahkan');
  };

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
      <View style={styles.navbar}>
        <Text style={styles.navTitle}>Event & Festival</Text>
      </View>

      <SafeAreaView style={styles.container}>
        <FlatList
          ListHeaderComponent={
            <View style={styles.form}>
              <Text style={styles.formTitle}>Tambah Festival Baru</Text>

              <Text style={styles.label}>Nama Festival</Text>
              <TextInput
                placeholder="Nama Festival"
                placeholderTextColor="#999"
                value={title}
                onChangeText={setTitle}
                style={styles.input}
              />

              <Text style={styles.label}>Tanggal</Text>
              <TextInput
                placeholder="Contoh: 10 Mei 2025"
                placeholderTextColor="#999"
                value={date}
                onChangeText={setDate}
                style={styles.input}
              />

              <Text style={styles.label}>Lokasi</Text>
              <TextInput
                placeholder="Lokasi"
                placeholderTextColor="#999"
                value={location}
                onChangeText={setLocation}
                style={styles.input}
              />

              <Text style={styles.label}>URL Gambar</Text>
              <TextInput
                placeholder="URL Gambar"
                placeholderTextColor="#999"
                value={image}
                onChangeText={setImage}
                style={styles.input}
              />

              <Text style={styles.label}>Deskripsi</Text>
              <TextInput
                placeholder="Deskripsi"
                placeholderTextColor="#999"
                value={description}
                onChangeText={setDescription}
                style={[styles.input, { height: 80 }]}
                multiline
              />

              <TouchableOpacity style={styles.button} onPress={handleAddEvent}>
                <Text style={styles.buttonText}>Tambah Festival</Text>
              </TouchableOpacity>
            </View>
          }
          data={events}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
        />
      </SafeAreaView>

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
  form: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    elevation: 3,
  },
  formTitle: {
    fontFamily: fontType.bold,
    fontSize: 18,
    color: colors.primary,
    marginBottom: 12,
  },
  label: {
    fontFamily: fontType.medium,
    fontSize: 14,
    color: 'black',
    marginBottom: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontFamily: fontType.regular,
    fontSize: 14,
    marginBottom: 10,
    color: 'black',
  },
  button: {
    backgroundColor: colors.primary,
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 6,
  },
  buttonText: {
    color: colors.white,
    fontFamily: fontType.bold,
    fontSize: 16,
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
