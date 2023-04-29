import { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  SafeAreaView,
  Button,
  FlatList,
  Image,
  View,
  ActivityIndicator,
} from "react-native";

interface Movie {
  titulo: string;
  avatar: string;
}

export default function App() {
  const [loading, setLoading] = useState(false);
  // Tipo GET nao precisa passar
  const [movies, setMovies] = useState<Movie[]>([]); // criando variavel

  useEffect(() => {
    const requestMovies = async () => {
      setLoading(true) // faz a requisição
      const requisicao = await fetch("https:api.b7web.com.br/cinema/"); // pegando as informações
      const json = await requisicao.json(); // transformando em json

      if (json) {
        setMovies(json); // colocando o json dentro da variavel
      }

      setLoading(false)
    };

    requestMovies()
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.totalMoviesText}>
        Total de filmes: {movies.length}
      </Text>
      {loading && (
        <View style={styles.loadingArea}>
          <ActivityIndicator size={"large"} color={"#fff"} />
          <Text style={styles.loadingText}>Carregando...</Text>
        </View>
      )}
      {!loading && (
        <>
          <FlatList<Movie>
            style={styles.list}
            data={movies}
            renderItem={({ item }) => (
              <View style={styles.movieItem}>
                <Image
                  source={{ uri: item.avatar }}
                  style={styles.movieImage}
                  resizeMode="contain"
                />
                <Text style={styles.movieTitle}>{item.titulo}</Text>
              </View>
            )}
            keyExtractor={(item) => item.titulo}
          />
        </>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#333",
  },
  totalMoviesText: {
    color: "#fff",
    fontSize: 18,
    textAlign: "center",
    marginVertical: 10,
  },
  list: {
    flex: 1,
  },
  loadingArea: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    color: "#fff",
  },
  movieItem: {
    marginBottom: 30,
  },
  movieImage: {
    height: 400,
  },
  movieTitle: {
    color: "#fff",
    fontSize: 24,
    textAlign: "center",
    marginTop: 5,
  },
});
