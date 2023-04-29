import { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  SafeAreaView,
  Button,
  FlatList,
  Image,
  View,
} from "react-native";

interface Movie {
  titulo: string
  avatar: string
}

export default function App() {
  // Tipo GET nao precisa passar
  const [movies, setMovies] = useState<Movie[]>([]); // criando variavel

  const handleLoadButton = async () => {
    const requisicao = await fetch("https:api.b7web.com.br/cinema/"); // pegando as informações
    const json = await requisicao.json(); // transformando em json

    if (json) {
      setMovies(json); // colocando o json dentro da variavel
    }
  };

  return (
    <SafeAreaView>
      <Button title="Carregar Filmes" onPress={handleLoadButton} />
      <Text>Total de filmes: {movies.length}</Text>
      <FlatList<Movie>
        data={movies}
        renderItem={({ item }) => (
          <View>
            <Image
              source={{ uri: item.avatar }}
              style={{ width: 200, height: 200 }}
            />
            <Text>{item.titulo}</Text>
          </View>
        )}
        keyExtractor={(item) => item.titulo}
      />
    </SafeAreaView>
  );
}
