import {ImageBackground, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {Camera, CameraType} from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import {useEffect, useRef, useState} from "react";
import {FontAwesome, Ionicons} from '@expo/vector-icons';
import PostController from "../adapters/controllers/post.controller";
import ButtonContainer from "../components/ButtonContainer";

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
    }
})

export default function Post() {
    const [type, setType] = useState(CameraType.back);
    const [isCameraGranted, setIsCameraGranted] = useState(null);
    const [isMediaLibGranted, setIsMediaLibGranted] = useState(null)
    const [takenPhoto, setTakenPhoto] = useState(null);
    const ref = useRef(null)

    const postController = new PostController({postService: null});

    useEffect(() => {
        (async () => {
            const cameraStatus = await Camera.requestCameraPermissionsAsync()
            console.debug(new Date().toISOString(), "Camera status", cameraStatus)
            setIsCameraGranted(cameraStatus.granted)

            const mediaPermission = await MediaLibrary.requestPermissionsAsync();
            console.debug(new Date().toISOString(), "Media permission", mediaPermission)
            setIsMediaLibGranted(mediaPermission.granted)
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
        const cameraCapturedPicture = await ref.current.takePictureAsync();
        await MediaLibrary.saveToLibraryAsync(cameraCapturedPicture.uri);
        setTakenPhoto(cameraCapturedPicture)
    }

    function cancelPhoto() {
        setTakenPhoto(null)
    }

    async function savePhoto() {
        await postController.createPost(takenPhoto);
        setTakenPhoto(null)
    }

    return (<View style={styles.container}>
            {
                !isCameraGranted ?
                    <Text>Permissão de câmera negada. Adicione permissão para </Text> :
                    takenPhoto ?
                        <View style={styles.camera}>
                            <ImageBackground source={{uri: takenPhoto.uri}} style={styles.photoTaken}>
                                <View style={styles.photoTakenControls}>
                                    <TouchableOpacity onPress={cancelPhoto}>
                                        <FontAwesome name="trash-o" size={32} color="white"/>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={savePhoto}>
                                        <FontAwesome name="check-square-o" size={32} color="white"/>
                                    </TouchableOpacity>
                                </View>
                            </ImageBackground>
                        </View> :
                        <Camera style={styles.camera} type={type} ref={ref}>
                            <ButtonContainer>
                                <TouchableOpacity style={styles.button} onPress={takePicture}>
                                    <Ionicons name={"camera"} size={32} color={"white"}/>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.button} onPress={toggleCameraType}>
                                    <Ionicons name={"camera-reverse"} size={32} color={"white"}/>
                                </TouchableOpacity>
                            </ButtonContainer>
                        </Camera>
            }
        </View>
    );
}
