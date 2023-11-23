
import {ActivityIndicator, Button, KeyboardAvoidingView, StyleSheet, Text, TextInput, View} from "react-native";
import {useState} from "react";
import ButtonContainer from "../components/ButtonContainer";
import {auth} from "../../firebaseConfig";
import {sendPasswordResetEmail} from "firebase/auth";

export default function PasswordRecovery({navigation}) {
    const [isLoading, setIsLoading] = useState(false)
    const [email, setEmail] = useState("")

    const sendEmail = async () => {
        setIsLoading(true)

        try {
            await sendPasswordResetEmail(auth, email)
            alert(`Email enviado para ${email}`)
        } catch (error) {
            console.error(error)
            alert("Erro ao enviar email")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <View style={styles.container}>
            <KeyboardAvoidingView behavior={"position"}>
                <Text style={styles.title}>Recuperar senha</Text>
                <TextInput onChangeText={setEmail} style={styles.input} autoCapitalize={"none"} placeholder="Email"/>
                {
                    isLoading
                        ? <ActivityIndicator size={"large"} color={"#000fff"}/>
                        : <ButtonContainer>
                            <Button title="Enviar email"
                                    color={"#000fff"}
                                    onPress={sendEmail}/>
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
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
        textAlign: "center"
    },
    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        padding: 10,
        marginBottom: 10,
        borderRadius: 5
    }
});
