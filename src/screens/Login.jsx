import {ActivityIndicator, Button, KeyboardAvoidingView, StyleSheet, Text, TextInput, View} from "react-native";
import {useState} from "react";
import ButtonContainer from "../components/ButtonContainer";
import {auth} from "../../firebaseConfig";
import {signInWithEmailAndPassword} from "firebase/auth";
import {Link} from "@react-navigation/native";

export default function Login({navigation}) {
    const [isLoading, setIsLoading] = useState(false)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const signIn = async () => {
        setIsLoading(true)

        try {
            await signInWithEmailAndPassword(auth, email, password);

            setTimeout(() => {
                setIsLoading(false)
                navigation.navigate("Home")
            }, 2000)

        } catch (error) {
            console.error(error)
            alert("Verifique seu email e senha")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <View style={styles.container}>
            <KeyboardAvoidingView behavior={"position"}>
                <Text style={styles.title}>Photogram</Text>
                <TextInput onChangeText={setEmail} style={styles.input} autoCapitalize={"none"} placeholder="Email"/>
                <TextInput onChangeText={setPassword}
                           style={styles.input}
                           secureTextEntry={true}
                           autoCapitalize={"none"}
                           placeholder="Senha"/>
                {
                    isLoading
                        ? <ActivityIndicator size={"large"} color={"#0099ff"}/>
                        : <ButtonContainer>
                            <Button title="Entrar"
                                    color={"#0099ff"}
                                    onPress={signIn}/>
                            <Button title="Criar conta"
                                    color={"#00ff55"}
                                    style={{marginBottom: 20}}
                                    onPress={() => {
                                        navigation.navigate("Registro")
                                    }}/>
                            <Link to={"/Recuperar senha"} style={{alignSelf: "flex-end"}}>
                                <View>
                                    <Text style={{
                                        color: "#000fff",
                                        textDecorationLine: "underline",
                                        fontSize: 16
                                    }}>
                                        Esqueci a senha
                                    </Text>
                                </View>
                            </Link>
                        </ButtonContainer>}
            </KeyboardAvoidingView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    title: {
        fontSize: 28,
        fontWeight: "bold",
        marginBottom: 20
    },
    input: {
        height: 40,
        borderColor: "#ccc",
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10
    }
});

