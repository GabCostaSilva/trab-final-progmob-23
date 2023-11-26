import {ActivityIndicator, ImageBackground, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {Camera, CameraType} from 'expo-camera';
import {useEffect, useRef, useState} from "react";
import {FontAwesome, Ionicons} from '@expo/vector-icons';
import {getStorage, ref, uploadBytes, getDownloadURL} from "firebase/storage";
import {auth, database} from "../../firebaseConfig";
import * as Location from 'expo-location';
import GeoLocationController from "../adapters/controllers/geoLocationController";
import {ref as dbRef, set} from "firebase/database";

async function saveImageToUser(userId: string,
                               imageUrl: string,
                               caption: string | null,
                               location: string) {
    console.log('saving image to user')
    console.log('userId', userId)
    console.log('imageUrl', imageUrl)
    console.log('caption', caption)
    console.log('location', location)
    set(dbRef(database, 'photos/user/' + userId), {
        user: userId,
        imageUrl,
        caption,
        location
    }).then((solved) => {
        console.log('saved image to user')
    }).catch((error) => {
        console.error('error saving image to user', error)
    });
}

export default function Post({navigation}) {
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const [type, setType] = useState(CameraType.back);
    const [isCameraGranted, setIsCameraGranted] = useState(null);
    const [takenPhoto, setTakenPhoto] = useState(null);
    const [isLoading, setIsLoading] = useState(false)
    const cameraRef = useRef(null)

    const firebaseStorage = getStorage();

    const geolocationController = new GeoLocationController();

    useEffect(() => {
        (async () => {
            const cameraStatus = await Camera.requestCameraPermissionsAsync()
            setIsCameraGranted(cameraStatus.granted)

            let {status} = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return;
            }

            let currentPosition = await Location.getCurrentPositionAsync({});
            const geoLocation = await geolocationController.getGeolocation(currentPosition.coords.latitude, currentPosition.coords.longitude);
            setLocation(geoLocation);
        })()

    }, [])

    if (null === isCameraGranted)
        return <Text>Carregando...</Text>

    if (!isCameraGranted)
        return <Text>Permissão de câmera negada. Adicione permissão para continuar.</Text>

    function toggleCameraType() {
        setType(current => current === CameraType.back ? CameraType.front : CameraType.back);
    }

    async function takePicture() {
        setTakenPhoto(null)
        const cameraCapturedPicture = await cameraRef.current.takePictureAsync({
            quality: 1,
            skipProcessing: true,
        });

        if (cameraCapturedPicture?.cancelled) {
            return;
        }

        setTakenPhoto(cameraCapturedPicture)
    }

    function cancelPhoto() {
        setTakenPhoto(null)
    }

    async function savePhoto() {
        const {uri} = takenPhoto;
        const filename = uri.split('/').pop();

        const fetchImage = async (uri: URL) => {
            try {
                const response = await fetch(uri);
                const blob: Blob = await response.blob();
                const upload = ref(firebaseStorage, auth.currentUser.uid + '/photos/' + filename);
                setIsLoading(true)
                const uploadResult = await uploadBytes(upload, blob, {contentType: 'image/jpeg'});
                const downloadURL = await getDownloadURL(uploadResult.ref);
                await saveImageToUser(auth.currentUser.uid, downloadURL, null, location);
                setIsLoading(false)
                alert('Foto salva com sucesso!')
            } catch (e) {
                console.error(e);
                setIsLoading(false)
                alert('Upload failed, sorry :(')
            }
        }

        await fetchImage(takenPhoto.uri);
        setTakenPhoto(null)
        navigation.navigate('Home')
    }

    return (<View style={styles.container}>
            {
                !isCameraGranted ?
                    <Text>Permissão de câmera negada. Adicione permissão para </Text> :
                    takenPhoto ?
                        <View style={styles.camera}>
                            <ImageBackground source={{uri: takenPhoto.uri}} style={styles.photoTaken}>
                                {isLoading
                                    ? <ActivityIndicator size="large" color="#0000ff"/>
                                    : <View style={styles.photoTakenControls}>
                                        <TouchableOpacity onPress={cancelPhoto}>
                                            <FontAwesome name="trash-o" size={32} color="white"/>
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={savePhoto}>
                                            <FontAwesome name="check-square-o" size={32} color="white"/>
                                        </TouchableOpacity>
                                    </View>}
                            </ImageBackground>
                        </View> :
                        <Camera style={styles.camera} type={type} ref={cameraRef}>
                            <View style={styles.buttonsContainer}>
                                <TouchableOpacity style={styles.button} onPress={takePicture}>
                                    <Ionicons name={"camera"} size={32} color={"white"}/>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.button} onPress={toggleCameraType}>
                                    <Ionicons name={"camera-reverse"} size={32} color={"white"}/>
                                </TouchableOpacity>
                            </View>
                        </Camera>
            }
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    camera: {
        width: '100%',
        height: '100%',
    },
    button: {
        flex: 1,
        alignSelf: 'flex-end',
        alignItems: 'center',
    },
    text: {
        fontSize: 18,
        color: 'white',
    },
    photoTaken: {
        flex: 1,
        justifyContent: "flex-end",
        alignItems: "flex-end",
        width: "100%",
        height: "100%",
        backgroundColor: "transparent",
    },
    photoTakenControls: {
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "flex-end",
        marginBottom: 20,
        backgroundColor: "rgba(0,0,0,0.5)",
        width: "100%",
    },
    buttonsContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: 20,
    }
})
