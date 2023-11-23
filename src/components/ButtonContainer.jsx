import {View, StyleSheet} from "react-native";

export default function ButtonContainer({children}) {
    return (
        <View style={styles.buttonContainer}>
            {children}
        </View>
    );
}

const styles = StyleSheet.create({
    buttonContainer: {
        flexDirection: "column",
        justifyContent: "space-around",
        alignContent: "space-between",
        gap: 10,
        marginBottom: 20
    }
});
