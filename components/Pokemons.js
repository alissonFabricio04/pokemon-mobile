import React, { useState, useEffect } from 'react';
import { View, ScrollView, Text, TextInput, Image, StyleSheet, TouchableOpacity } from 'react-native';

const Pokemons = ({ navigation }) => {
  const [pokemons, setPokemons] = useState([]);
  const [searchfeild, setSearchfeild] = useState('');

  useEffect(() => {
    fetch('https://pokeapi.co/api/v2/pokemon?limit=10')
      .then(response => response.json())
      .then(pokemons => setPokemons(pokemons.results));
  }, []);

  return (
    <View>
      <View style={styles.searchCont}>
        <TextInput
          style={styles.searchfeild}
          placeholder="Search for name pokemon"
          onChangeText={value => setSearchfeild(value)}
          value={searchfeild}
        />
      </View>
      <ScrollView>
        <View style={styles.container}>
          {pokemons
            .filter(pokemons => {
              if (searchfeild === '') {
                return pokemons;
              } if (String(pokemons.name).toLowerCase().includes(searchfeild.toLowerCase())) {
                return pokemons;
              }
            })
            .map((pokemon, index) => {
              return (
                <TouchableOpacity
                  activeOpacity={0.5}
                  key={index}
                  style={styles.card}
                  onPress={() => navigation.navigate('Details', {
                    pokemon: pokemon.name
                  })}
                >
                  <Image
                    style={{ width: 150, height: 150 }}
                    source={{
                      uri: `https://img.pokemondb.net/sprites/omega-ruby-alpha-sapphire/dex/normal/${pokemon.name}.png`,
                    }}
                  />
                  <Text>{pokemon.name}</Text>
                </TouchableOpacity>
              )
            })
          }
        </View>
      </ScrollView>
    </View>
  );
};

export default Pokemons;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: 30,
  },
  card: {
    display: 'flex',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'black',
    marginHorizontal: 20,
    marginVertical: 10,
  },
  searchCont: {
    position: 'absolute',
    marginBottom: 70,
    left: '20%',
    zIndex: 1,
    marginTop: 10,
  },
  searchfeild: {
    height: 40,
    borderWidth: 1,
    borderColor: '#000',
    textAlign: 'center',
    width: 250,
    borderRadius: 50,
  },
});