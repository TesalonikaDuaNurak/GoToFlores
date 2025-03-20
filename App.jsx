import React, { useState } from "react";
import { View, Text, TextInput, FlatList, Image, StyleSheet, TouchableOpacity, Modal, ScrollView } from "react-native";

const categories = [
  { id: "all", name: "Semua" },
  { id: "pantai", name: "Pantai" },
  { id: "gunung", name: "Gunung" },
  { id: "desa", name: "Desa" },
  { id: "1", name: "Desa" },
  { id: "2", name: "Desa" },
];

const destinations = [
  { id: "1", name: "Labuan Bajo", category: "pantai", description: "Gerbang menuju Pulau Komodo.", image: "https://mawatu.co.id/wp-content/uploads/2024/03/fifani-cahyadi-R78_-Kxsa7o-unsplash-1-1024x768.jpg" },
  { id: "2", name: "Pulau Komodo", category: "pantai", description: "Habitat asli Komodo.", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-cGaMQLCKcKOlqO2xoqKWJ7dkMi2MqPU2VA&s" },
  { id: "3", name: "Wae Rebo", category: "desa", description: "Desa tradisional di pegunungan.", image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0d/a4/d3/41/the-most-of-i-like.jpg?w=1200&h=-1&s=1" },
];

const DestinationCard = ({ destination, onPress }) => (
  <TouchableOpacity style={styles.card} onPress={() => onPress(destination)}>
    <Image source={{ uri: destination.image }} style={styles.image} />
    <Text style={styles.title}>{destination.name}</Text>
    <Text style={styles.description}>{destination.description}</Text>
  </TouchableOpacity>
);

const App = () => {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedDestination, setSelectedDestination] = useState(null);

  const filteredDestinations = destinations.filter(
    (destination) =>
      destination.name.toLowerCase().includes(search.toLowerCase()) &&
      (selectedCategory === "all" || destination.category === selectedCategory)
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>GoToFlores</Text>
      <TextInput
        style={styles.input}
        placeholder="Cari destinasi..."
        value={search}
        onChangeText={setSearch}
      />

      {/* List Kategori dengan Scroll Horizontal */}
      <View style={styles.categoryWrapper}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {categories.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={[
                styles.categoryButton,
                selectedCategory === item.id && styles.categoryButtonActive,
              ]}
              onPress={() => setSelectedCategory(item.id)}
            >
              <Text
                style={[
                  styles.categoryText,
                  selectedCategory === item.id && styles.categoryTextActive,
                ]}
              >
                {item.name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* List Destinasi */}
      <FlatList
        data={filteredDestinations}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <DestinationCard destination={item} onPress={setSelectedDestination} />
        )}
      />

      {/* Modal untuk menampilkan informasi destinasi */}
      <Modal visible={!!selectedDestination} transparent animationType="slide">
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            {selectedDestination && (
              <>
                <Image source={{ uri: selectedDestination.image }} style={styles.modalImage} />
                <Text style={styles.modalTitle}>{selectedDestination.name}</Text>
                <Text style={styles.modalDescription}>{selectedDestination.description}</Text>
                <TouchableOpacity style={styles.closeButton} onPress={() => setSelectedDestination(null)}>
                  <Text style={styles.closeButtonText}>Tutup</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#FFFAF0",
  },
  header: {
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 15,
    color: "#ff5733",
    textTransform: "uppercase",
  },
  input: {
    height: 45,
    borderColor: "#ff914d",
    borderWidth: 2,
    borderRadius: 8,
    marginBottom: 15,
    paddingHorizontal: 12,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  categoryWrapper: {
    marginBottom: 15,
  },
  categoryButton: {
    backgroundColor: "#fff",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#ff914d",
    marginRight: 10,
  },
  categoryButtonActive: {
    backgroundColor: "#ff914d",
  },
  categoryText: {
    fontSize: 16,
    color: "#ff914d",
    fontWeight: "bold",
  },
  categoryTextActive: {
    color: "#fff",
  },
  card: {
    backgroundColor: "#ffdfba",
    padding: 12,
    borderRadius: 12,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 4,
  },
  image: {
    width: "100%",
    height: 160,
    borderRadius: 12,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 6,
    color: "#e63946",
  },
  description: {
    fontSize: 15,
    color: "#555",
    marginTop: 4,
  },
  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "85%",
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  modalImage: {
    width: "100%",
    height: 200,
    borderRadius: 10,
    marginBottom: 15,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#ff5733",
  },
  modalDescription: {
    fontSize: 16,
    textAlign: "center",
    color: "#555",
    marginBottom: 20,
  },
  closeButton: {
    backgroundColor: "#ff5733",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  closeButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default App;
