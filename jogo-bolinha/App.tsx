import { View, Text, TouchableOpacity } from "react-native";
import { styles } from "./constants/style";
import Ball from "./components/Ball";

export default function App() {
  const handleForceButton = () => {

  }
  return (
    <View style={styles.container}>
      <View style={styles.area}>
        <Ball/>
      </View>
      <View style={styles.control}>
        <View>
          <Text style={styles.controlText}>UpForce: </Text>
          <Text style={styles.controlText}>Velocity: </Text>
          <Text style={styles.controlText}>PosY: </Text>
        </View>
        <TouchableOpacity style={styles.controlButton} onPress={handleForceButton}>
          <Text style={styles.buttonText}>Fazer força</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}