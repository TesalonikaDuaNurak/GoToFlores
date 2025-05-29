import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  SafeAreaView,
  Image,
  ActivityIndicator,
} from 'react-native';
import { colors, fontType } from '../../theme';
import firestore from '@react-native-firebase/firestore';
import ImagePicker from 'react-native-image-crop-picker';

const EventsScreen = () => {
  const [events, setEvents] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const snapshot = await firestore()
        .collection('events')
        .orderBy('createdAt', 'desc')
        .get();

      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setEvents(data);
    } catch (error) {
      Alert.alert('Error', 'Gagal mengambil data dari Firestore');
    }
  };

  const handleImagePick = async () => {
    ImagePicker.openPicker({
      width: 1920,
      height: 1080,
      cropping: true,
    })
      .then(image => {
        setImage(image.path);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const handleAddOrUpdateEvent = async () => {
    if (!title || !description) {
      Alert.alert('Gagal', 'Judul dan Deskripsi harus diisi');
      return;
    }

    setLoading(true);
    let imageUrl = null;

    try {
      if (image) {
        const filename = image.substring(image.lastIndexOf('/') + 1);
        const extension = filename.split('.').pop();
        const name = filename.split('.').slice(0, -1).join('.');
        const newFilename = name + Date.now() + '.' + extension;

        const formData = new FormData();
        formData.append('file', {
          uri: image,
          type: `image/${extension}`,
          name: newFilename,
        });

        const response = await fetch('https://backend-file-praktikum.vercel.app/upload/', {
          method: 'POST',
          body: formData,
        });

        if (response.status !== 200) {
          throw new Error('Upload gagal');
        }

        const result = await response.json();
        imageUrl = result.url;
      }

      if (editingId) {
        await firestore().collection('events').doc(editingId).update({
          title,
          description,
          ...(imageUrl && { image: imageUrl }),
        });
        Alert.alert('Sukses', 'Event berhasil diupdate');
      } else {
        await firestore().collection('events').add({
          title,
          description,
          image: imageUrl,
          createdAt: firestore.FieldValue.serverTimestamp(),
        });
        Alert.alert('Sukses', 'Event berhasil ditambahkan');
      }

      setTitle('');
      setDescription('');
      setImage(null);
      setEditingId(null);
      fetchEvents();
    } catch (error) {
      console.log(error);
      Alert.alert('Error', 'Gagal menyimpan data');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (event) => {
    setTitle(event.title);
    setDescription(event.description);
    setImage(event.image || null);
    setEditingId(event.id);
  };

  const handleDelete = (id) => {
    Alert.alert('Konfirmasi', 'Yakin ingin menghapus event ini?', [
      { text: 'Batal', style: 'cancel' },
      {
        text: 'Hapus',
        style: 'destructive',
        onPress: async () => {
          try {
            await firestore().collection('blog').doc(id).delete();
            fetchEvents();
            Alert.alert('Sukses', 'Event berhasil dihapus');
          } catch (error) {
            Alert.alert('Error', 'Gagal menghapus event');
          }
        },
      },
    ]);
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      {item.image && (
        <Image source={{ uri: item.image }} style={styles.image} />
      )}
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.description}>{item.description}</Text>
      <View style={styles.actions}>
        <TouchableOpacity style={[styles.actionButton, styles.editButton]} onPress={() => handleEdit(item)}>
          <Text style={styles.actionText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.actionButton, styles.deleteButton]} onPress={() => handleDelete(item.id)}>
          <Text style={styles.actionText}>Hapus</Text>
        </TouchableOpacity>
      </View>
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
              <Text style={styles.formTitle}>
                {editingId ? 'Edit Event' : 'Tambah Event'}
              </Text>

              <Text style={styles.label}>Judul</Text>
              <TextInput
                placeholder="Masukkan judul"
                placeholderTextColor="#999"
                value={title}
                onChangeText={setTitle}
                style={styles.input}
              />

              <Text style={styles.label}>Deskripsi</Text>
              <TextInput
                placeholder="Masukkan deskripsi"
                placeholderTextColor="#999"
                value={description}
                onChangeText={setDescription}
                style={[styles.input, { height: 80 }]}
                multiline
              />

              <TouchableOpacity
                style={[styles.button, { marginBottom: 8 }]}
                onPress={handleImagePick}
              >
                <Text style={styles.buttonText}>
                  {image ? 'Ganti Gambar' : 'Pilih Gambar'}
                </Text>
              </TouchableOpacity>

              {loading ? (
                <ActivityIndicator color={colors.primary} />
              ) : (
                <TouchableOpacity
                  style={styles.button}
                  onPress={handleAddOrUpdateEvent}
                >
                  <Text style={styles.buttonText}>
                    {editingId ? 'Simpan Perubahan' : 'Tambah'}
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          }
          data={events}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
        />
      </SafeAreaView>
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
    padding: 16,
    elevation: 4,
  },
  title: {
    fontFamily: fontType.bold,
    fontSize: 18,
    color: colors.primary,
    marginBottom: 6,
  },
  description: {
    fontFamily: fontType.regular,
    fontSize: 14,
    color: colors.secondary,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 12,
  },
  actionButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginLeft: 10,
  },
  editButton: {
    backgroundColor: colors.primary,
  },
  deleteButton: {
    backgroundColor: '#ff4d4d',
  },
  actionText: {
    color: 'white',
    fontFamily: fontType.medium,
    fontSize: 14,
  },
  image: {
    width: '100%',
    height: 180,
    borderRadius: 10,
    marginBottom: 12,
  },
});

export default EventsScreen;
