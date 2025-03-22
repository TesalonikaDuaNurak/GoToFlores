import React, { useState } from "react";
import { View, Text, TextInput, FlatList, Image, StyleSheet, TouchableOpacity, Modal, ScrollView } from "react-native";

// Data Kategori dan Destinasi
const categories = [
  { id: "all", name: "Semua" },
  { id: "pantai", name: "Pantai" },
  { id: "gunung", name: "Gunung" },
  { id: "desa", name: "Desa" },
  { id: "danau", name: "Danau" },
  { id: "air terjun", name: "Air Terjun" },
  { id: "gua", name: "Gua" },
  { id: "pulau", name: "Pulau" },
];

const destinations = [
  { id: "1", name: "Labuan Bajo", category: "pulau", description: "Gerbang menuju Pulau Komodo.", image: "https://mawatu.co.id/wp-content/uploads/2024/03/fifani-cahyadi-R78_-Kxsa7o-unsplash-1-1024x768.jpg" },
  { id: "2", name: "Pulau Komodo", category: "pulau", description: "Habitat asli Komodo.", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-cGaMQLCKcKOlqO2xoqKWJ7dkMi2MqPU2VA&s" },
  { id: "3", name: "Wae Rebo", category: "desa", description: "Desa tradisional di pegunungan.", image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0d/a4/d3/41/the-most-of-i-like.jpg?w=1200&h=-1&s=1" },
  { id: "4", name: "Danau Kelimutu", category: "danau", description: "Danau Tiga Warna.", image: "https://static.promediateknologi.id/crop/0x0:0x0/0x0/webp/photo/p2/222/2024/07/08/5-442667006.jpg" },
  { id: "5", name: "Gua Liang Bua", category: "gua", description: "kata liang memiliki arti gua dan bua berarti sejuk/dingin.", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6NU9ClbmlDWjycJ5jx77eLejZzzIm_39Emw&s" },
  { id: "6", name: "Air Terjun Ogi", category: "air terjun", description: "Air terjun ini memiliki ketinggian sekitar 30 meter dengan pemandangan yang memanjakan mata dan suasana yang asri.", image: "https://cdn.rri.co.id/berita/Kupang/o/1718896386055-WhatsApp_Image_2024-06-20_at_22.52.55/rnosqfq51tirbxr.jpeg" },
  { id: "7", name: "Pantai Pink", category: "pantai", description: "pantai terkenal dengan pasir berwarna merah muda yang unik, hasil dari serpihan karang merah yang bercampur dengan pasir putih.", image: "https://asset.kompas.com/crops/xPa88myIRSxthbiSwmIQFMlINBE=/0x83:1000x750/1200x800/data/photo/2020/02/24/5e538e7bda8fd.jpg" },
  { id: "8", name: "Pantai Koka", category: "pantai", description: "Pantai Koka memiliki pasir putih yang lembut dan air laut yang jernih, menciptakan pemandangan yang menenangkan.", image: "https://www.rujukandesa.com/img/2024/10/koka-beach-flores-indonesie.jpg" },
  { id: "9", name: "Gunung Egon", category: "gunung", description: "Gunung ini memiliki tinggi 1.703 meter dari permukaan laut.", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCGH9hycpV3LKSEWMoL97SbgMwSINtIoj5Lw&s" },
  { id: "10", name: "Gunung Lewotobi", category: "gunung", description: "Gunung Lewotobi adalah gunung berapi kembar di Flores Timur, NTT, dengan dua puncak, Lewotobi Laki-Laki (1.584 mdpl) dan Lewotobi Perempuan (1.703 mdpl), yang memiliki sejarah erupsi yang bervariasi.", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRS6mWtVGg8L4HwxC2dm7mLzteDl2M9wjBNJA&s" },
];

const DestinationCard = ({ destination, onPress }) => (
  <TouchableOpacity style={styles.card} onPress={() => onPress(destination)}>
    <Image source={{ uri: destination.image }} style={styles.image} />
    <Text style={styles.title}>{destination.name}</Text>
    <Text style={styles.description}>{destination.description}</Text>
  </TouchableOpacity>
);

const CategoryList = ({ selectedCategory, setSelectedCategory }) => (
  <View style={styles.categoryWrapper}>
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      {categories.map((item) => (
        <TouchableOpacity
          key={item.id}
          style={[styles.categoryButton, selectedCategory === item.id && styles.categoryButtonActive]}
          onPress={() => setSelectedCategory(item.id)}
        >
          <Text style={[styles.categoryText, selectedCategory === item.id && styles.categoryTextActive]}>
            {item.name}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  </View>
);

const DestinationModal = ({ selectedDestination, setSelectedDestination }) => (
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
      <CategoryList selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
      <FlatList
        data={filteredDestinations}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <DestinationCard destination={item} onPress={setSelectedDestination} />}
      />
      <DestinationModal selectedDestination={selectedDestination} setSelectedDestination={setSelectedDestination} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#FFFAF0" },
  header: { fontSize: 26, fontWeight: "bold", textAlign: "center", marginBottom: 15, color: "#ff5733", textTransform: "uppercase" },
  input: { height: 45, borderColor: "#ff914d", borderWidth: 2, borderRadius: 8, marginBottom: 15, paddingHorizontal: 12, backgroundColor: "#fff" },
  categoryWrapper: { marginBottom: 15 },
  categoryButton: { backgroundColor: "#fff", paddingVertical: 10, paddingHorizontal: 15, borderRadius: 20, borderWidth: 1, borderColor: "#ff914d", marginRight: 10 },
  categoryButtonActive: { backgroundColor: "#ff914d" },
  categoryText: { fontSize: 16, color: "#ff914d", fontWeight: "bold" },
  categoryTextActive: { color: "#fff" },
  card: { backgroundColor: "#ffdfba", padding: 12, borderRadius: 12, marginBottom: 15 },
  image: { width: "100%", height: 160, borderRadius: 12 },
  title: { fontSize: 20, fontWeight: "bold", marginTop: 6, color: "#e63946" },
  description: { fontSize: 15, color: "#555", marginTop: 4 },
  modalBackground: { flex: 1, backgroundColor: "rgba(0, 0, 0, 0.5)", justifyContent: "center", alignItems: "center" },
  modalContainer: { width: "85%", backgroundColor: "#fff", padding: 20, borderRadius: 10, alignItems: "center" },
  modalImage: { width: "100%", height: 200, borderRadius: 10, marginBottom: 15 },
  modalTitle: { fontSize: 22, fontWeight: "bold", marginBottom: 10, color: "#ff5733" },
  modalDescription: { fontSize: 16, textAlign: "center", color: "#555", marginBottom: 20 },
  closeButton: { backgroundColor: "#ff5733", paddingVertical: 10, paddingHorizontal: 20, borderRadius: 8 },
  closeButtonText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
});

export default App;
