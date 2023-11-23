import {ActivityIndicator, Button, KeyboardAvoidingView, StyleSheet, Text, TextInput, View} from "react-native";
import {useState} from "react";
import {auth} from "../../firebaseConfig";
import {createUserWithEmailAndPassword} from "firebase/auth";

export default function Signup() {
    const [isLoading, setIsLoading] = useState(false)
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    async function signup() {
        setIsLoading(true)
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            console.debug(userCredential)
            setTimeout(() => {
                setIsLoading(false)
            }, 2000)
        } catch (error) {
            console.error(error)
            alert("Erro ao criar conta")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <View style={styles.container}>
            <KeyboardAvoidingView behavior={"position"}>
                <Text style={styles.title}>Criar conta</Text>
                <TextInput onChangeText={setName} style={styles.input} placeholder="Nome"/>
                <TextInput onChangeText={setUsername} style={styles.input} placeholder="Usuário"/>
                <TextInput onChangeText={setEmail} style={styles.input} placeholder="Email"/>
                <TextInput onChangeText={setPassword} style={styles.input} placeholder="Senha"/>
                {isLoading
                    ? <ActivityIndicator size={"large"} color={"#000fff"}/>
                    : <Button title="Criar" onPress={signup}/>}
            </KeyboardAvoidingView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20
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