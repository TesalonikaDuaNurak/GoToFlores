import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { colors, fontType } from "../../theme";

const DestinationCard = ({ destination, onPress }) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Image source={{ uri: destination.image }} style={styles.image} />
      <View style={styles.content}>
        <Text style={styles.name}>{destination.name}</Text>
        <Text style={styles.description} numberOfLines={2}>{destination.description}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default DestinationCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    borderRadius: 12,
    marginBottom: 16,
    overflow: "hidden",
    elevation: 2,
  },
  image: {
    width: "100%",
    height: 180,
  },
  content: {
    padding: 12,
  },
  name: {
    fontSize: 18,
    fontFamily: fontType["bold"],
    color: colors.primary,
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    fontFamily: fontType["regular"],
    color: colors.darkGrey,
  },
});
