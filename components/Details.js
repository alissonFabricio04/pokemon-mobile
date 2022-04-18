import React, { useState, useEffect } from 'react';
import { View, Image, ActivityIndicator, Text, StyleSheet } from 'react-native';

const Details = ({ route, navigation }) => {
  const [details, setDetails] = useState([]);
  const { pokemon } = route.params;

  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
      .then(res => res.json())
      .then(details => setDetails(details));
  }, []);

  return details.name ? (
    <View style={{ flex: 1, alignItems: 'center' }}>
      <Image
        style={styles.image}
        source={{uri: `https://img.pokemondb.net/sprites/omega-ruby-alpha-sapphire/dex/normal/${details.name}.png`}}
      />
      <Text style={styles.text}>Name: {details.name}</Text>
      <Text style={styles.text}>Height: {details.height}</Text>
      <Text style={styles.text}>Weight: {details.weight}</Text>
      <Text style={styles.text}>Types: {"\n"}
        {details.types.map(types => <Text style={styles.text}>{types.type.name}{"\n"}</Text>)}
      </Text>
    </View>
  ) : (
    <View style={styles.indicator}>
      <ActivityIndicator size="large" color="#E63F34" />
    </View>
  )
};

export default Details;

const styles = StyleSheet.create({
  image: {
    width: 200,
    height: 200,
  },
  text: {
    fontSize: 22,
    marginBottom: 15,
  },
  indicator: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});