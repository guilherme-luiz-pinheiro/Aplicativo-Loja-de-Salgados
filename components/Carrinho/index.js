import {
    Text,
    TouchableOpacity,
} from "react-native";
import styles from "./styles";

export default function Carrinho({textoBotao, funcaobotao})
{
    return (
        <TouchableOpacity
          style={[styles.botao, styles.sombra]}
          onPress={() => funcaobotao()}
        >
          <Text style={styles.textoBotao}>{textoBotao}</Text>
        </TouchableOpacity>
    );
}