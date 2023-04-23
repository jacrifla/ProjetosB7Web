import { useState } from "react";
import {
    ScrollView,
    View,
    Text,
    Image,
    TouchableOpacity,
    TextInput,
} from "react-native";

import { styles } from "./constants/styles";

export default function App() {
    const [emailField, setEmailField] = useState<string>("");
    const [passwordField, setPasswordField] = useState<string>("");

    const handleLoginButon = () => {
      alert(emailField)
      alert(passwordField)
    }

    const handleForgetButton = () => {
      alert('esqueci a senha')
    }

    const handleSignUpButton = () => {
      alert('Inscrito')
    }

    return (
        <ScrollView style={styles.scrollView}>
            <View style={styles.container}>
                <Image
                    style={styles.logo}
                    source={require("./assets/images/rn_login_logo.png")}
                />
                <Text style={styles.h1}>Sistema de Login</Text>
                <Text style={styles.h2}>
                    Bem vindo(a)! Digite seus dados abaixo.
                </Text>

                <View style={styles.inputArea}>
                    <Text style={styles.inputLabel}>Email</Text>
                    <TextInput
                        style={styles.inputField}
                        placeholder="Digite seu email"
                        placeholderTextColor={'#999'}
                        value={emailField}
                        onChangeText={t => setEmailField(t)}
                        autoCapitalize="none"
                        keyboardType="email-address"
                        />
                </View>

                <View style={styles.inputArea}>
                    <Text style={styles.inputLabel}>Senha</Text>
                    <TextInput
                        style={styles.inputField}
                        placeholder="******"
                        placeholderTextColor={'#999'}
                        secureTextEntry
                        value={passwordField}
                        onChangeText={t => setPasswordField(t)}
                    />
                </View>

                <View style={styles.aditional}>
                    <TouchableOpacity onPress={handleForgetButton} style={styles.forgotBtnArea}>
                        <Text style={styles.forgotBtnText}>
                            Esqueci minha senha
                        </Text>
                    </TouchableOpacity>
                </View>

                <TouchableOpacity style={styles.button} onPress={handleLoginButon}>
                    <Text style={styles.buttonText}>Entrar</Text>
                </TouchableOpacity>

                <View style={styles.signUpArea}>
                    <Text style={styles.signUpText}>Não tem uma conta?</Text>
                    <TouchableOpacity onPress={handleSignUpButton}>
                        <Text style={styles.signUpBtnText}>Cadastre-se</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.footerArea}>
                    <Text style={styles.footerText}>Criado por Jaque</Text>
                </View>
            </View>
        </ScrollView>
    );
}
