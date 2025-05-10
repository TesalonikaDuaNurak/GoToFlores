import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { categories } from '../../constants/data';
import { colors, fontType } from '../../theme';

const CategoryList = ({ selectedCategory, onSelectCategory }) => {
  const [activeCategory, setActiveCategory] = useState(selectedCategory || 'all');

  const handlePress = (key) => {
    setActiveCategory(key);
    onSelectCategory && onSelectCategory(key); // untuk mengirim ke parent
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={categories}
        keyExtractor={(item) => item.key}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => {
          const isActive = item.key === activeCategory;
          return (
            <TouchableOpacity
              style={[styles.categoryButton, isActive && styles.activeCategoryButton]}
              onPress={() => handlePress(item.key)}
            >
              <Text style={[styles.categoryText, isActive && styles.activeCategoryText]}>
                {item.label}
              </Text>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

export default CategoryList;

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
    paddingLeft: 12,
  },
  categoryButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: colors.lightGrey,
    borderRadius: 20,
    marginRight: 10,
  },
  activeCategoryButton: {
    backgroundColor: colors.primary,
  },
  categoryText: {
    fontFamily: fontType['medium'],
    fontSize: 14,
    color: colors.black,
  },
  activeCategoryText: {
    color: colors.white,
  },
});
