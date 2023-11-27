import {ActivityIndicator, FlatList, Image, Text, View} from "react-native";
import stylesZ from "../Styles";
import {useEffect, useState} from "react";
import {auth, database} from "../../firebaseConfig";
import {collection, getDocs} from "firebase/firestore";

export default function Feed({navigation}) {
    const [posts, setPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        setIsLoading(true)
        const user = auth.currentUser;
        setCurrentUser(user);
        navigation.onUnsubscribe = navigation.addListener('focus', () => {
            console.log("Feed focused")

            async function getPosts() {
                const querySnapshot = await getDocs(collection(database, "photos"));
                const documentData = querySnapshot.docs.map(
                    (doc) => doc.data()
                );
                setPosts(documentData)
            }

            (async () => {
                console.log("getting posts")
                setIsLoading(true)
                await getPosts();
            })()
        })
        console.log("Feed mounted")

        setIsLoading(false)
    }, []);

    return isLoading
        ? <ActivityIndicator size={"large"} color={"#0022ff"}/>
        : posts.length === 0
            ? <Text style={stylesZ.noPosts}>Ninguém fez uma postagem ainda</Text>
            : <FlatList
                data={posts}
                renderItem={({item}) => {
                    return (<View style={stylesZ.postContainer} key={item.id}>
                            <View style={stylesZ.heading}>
                                <Image source={{uri: currentUser.photoURL}} style={stylesZ.circle}/>
                                <Text>{item.userEmail ? item.userEmail.split("@")[0] : ""}</Text>
                                <Text
                                    style={stylesZ.location}>{item.location.city + ", " + item.location.state + " - " + item.location.country}</Text>
                            </View>
                            <Image
                                source={{uri: item.imageUrl}}
                                style={{width: 350, height: 200}}
                            />
                            <Text style={stylesZ.caption}>
                                {item.caption}
                            </Text>
                        </View>
                    )
                }}
            />
}
