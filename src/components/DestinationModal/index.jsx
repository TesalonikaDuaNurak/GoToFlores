import React, { useState } from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { colors, fontType } from '../../theme';

const DestinationModal = ({
  visible,
  onClose,
  destination,
  onBookmark,
  isBookmarked,
}) => {
  const [loading, setLoading] = useState(true); // State untuk loading gambar

  if (!destination) return null;

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <View style={styles.imageWrapper}>
            <Image
              source={{ uri: destination.image }}
              style={styles.image}
              onLoadEnd={() => setLoading(false)}
            />
            {loading && (
              <ActivityIndicator
                size="large"
                color={colors.primary}
                style={styles.loadingIndicator}
              />
            )}
          </View>

          <ScrollView style={styles.content}>
            <Text style={styles.title}>{destination.name}</Text>
            <Text style={styles.category}>{destination.category.toUpperCase()}</Text>
            <Text style={styles.description}>{destination.description}</Text>
          </ScrollView>

          <View style={styles.bottomActions}>
            <TouchableOpacity
              style={styles.bookmarkButton}
              onPress={() => onBookmark(destination)}
            >
              <Text style={styles.bookmarkText}>
                {isBookmarked ? '★ Tersimpan' : '☆ Simpan'}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <Text style={styles.closeText}>Tutup</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default DestinationModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    padding: 16,
  },
  modalContainer: {
    backgroundColor: colors.white,
    borderRadius: 16,
    overflow: 'hidden',
    maxHeight: '90%',
  },
  imageWrapper: {
    position: 'relative',
    height: 200,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  loadingIndicator: {
    position: 'absolute',
    top: '45%',
    left: '45%',
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontFamily: fontType['bold'],
    color: colors.black,
    marginBottom: 4,
  },
  category: {
    fontSize: 12,
    fontFamily: fontType['medium'],
    color: colors.primary,
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    fontFamily: fontType['regular'],
    color: colors.darkGrey,
  },
  bottomActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderColor: colors.lightGrey,
  },
  bookmarkButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    backgroundColor: colors.secondary,
  },
  bookmarkText: {
    color: colors.white,
    fontFamily: fontType['medium'],
    fontSize: 16,
  },
  closeButton: {
    flex: 1,
    backgroundColor: colors.primary,
    paddingVertical: 12,
    alignItems: 'center',
  },
  closeText: {
    color: colors.white,
    fontFamily: fontType['medium'],
    fontSize: 16,
  },
});
