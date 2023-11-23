import {ActivityIndicator, FlatList, Image, Text, View} from "react-native";
import {useEffect, useState} from "react";
import {getDownloadURL, getStorage, listAll, ref} from "firebase/storage"
import {auth} from "../../firebaseConfig";
import styles from "../Styles";
import stylesZ from "../Styles";

export default function Profile() {
    const [photos, setPhotos] = useState([]);
    const storage = getStorage();
    const listRef = ref(storage, auth.currentUser.uid + "/photos");
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        (async () => {
            setIsLoading(true)
            const {items, prefixes} = await listAll(listRef);

            const storageReferences = items
                .map(async (item) => getDownloadURL(ref(storage, item.fullPath)))

            setPhotos(await Promise.all(storageReferences))
            setIsLoading(false)
            return storageReferences;
        })()
    }, []);

    return isLoading
        ? <ActivityIndicator size="large" color="#0000ff"/>
        : photos.length === 0 ? <Text style={styles.noPosts}>Não há fotos ainda</Text>
            : <FlatList data={photos}
                        renderItem={({item}) => {
                            return <View style={styles.postContainer}>
                                <View style={styles.heading}>
                                    <Image
                                        source={{uri: "https://preview.redd.it/just-some-random-pictures-of-our-boy-in-sunglasses-v0-heklk89etrcb1.jpg?width=640&crop=smart&auto=webp&s=3af070a10f388ac17e6435a9307a6c5e2559e2f6"}}
                                        style={styles.circle}/>
                                    <Text>{auth.currentUser.name}</Text>
                                    <Text style={stylesZ.location}>{item.location}</Text>
                                </View>
                                <Image
                                    source={{uri: item}}
                                    style={{width: 350, height: 200}}
                                />
                                <Text style={styles.caption}>
                                    {item.caption}
                                </Text>
                            </View>
                        }}
            />
}
