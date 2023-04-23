import { View } from "react-native";
import { styles } from "./styles";

type Props = {
    posY: number
}
export default function Ball({posY}: Props) {
    return (
        <View style={[styles.container, {bottom: posY}]}>
            
        </View>
    );
}
