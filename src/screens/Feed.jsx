import {ActivityIndicator, FlatList, Image, Text, View} from "react-native";
import stylesZ from "../Styles";
import {getDownloadURL, getStorage, listAll, ref} from "firebase/storage";
import {useEffect, useState} from "react";
import {auth} from "../../firebaseConfig";


const data = [
    {
        imgUri: 'http://tuningsuv.com/albums/userpics/10001/Toyota_Supra_mk4_146.jpg',
        userName: "johndoe",
        profileImg: "https://media.gettyimages.com/id/1214697901/pt/foto/worried-young-man-in-hawaiian-shirt-against-blue-background.jpg?s=612x612&w=gi&k=20&c=TyzqL_W-2Sfe8s2V-RGDEI4ZHsKMhbSIt89446O2Hv0=",
        location: "San Diego, California",
        caption: "My new car! #supra #toyota"
    },
    {
        imgUri: 'https://cdn-7.nikon-cdn.com/Images/Learn-Explore/Photography-Techniques/2022/Sunflower-photography-ideas/Media/Diane-Berkenfeld-sunflower-field-vertical.jpg',
        userName: "maryjane",
        profileImg: "https://media.gettyimages.com/id/1443543154/pt/foto/smiling-mature-woman-standing-in-a-park-outdoors-in-the-summertime.jpg?s=612x612&w=gi&k=20&c=oPR-o-P-uwcNXM2UGwQ6tO5XfFvlVPIeYQDEfL-_Tpg=",
        location: "Campo Grande, Mato Grosso do Sul",
        caption: "Sunflowers are my favorite! #sunflower #nature #flowers"

    },
    {
        imgUri: 'https://s2-g1.glbimg.com/EP-tgHsVgE7QcC9EzooBKhVJtsY=/1080x608/top/smart/https://i.s3.glbimg.com/v1/AUTH_59edd422c0c84a879bd37670ae4f538a/internal_photos/bs/2023/t/S/daQ4vfTfGLL3LjgPkuSQ/banksy-dia-dos-namorados-2-.jpg',
        userName: "punkakes69",
        profileImg: "https://media.gettyimages.com/id/AA012954/pt/foto/portrait-of-a-punk-woman.jpg?s=1024x1024&w=gi&k=20&c=5LjLBEYC7Lq8qNLIFxNLLYVfZhRmYIu5-0cBSQI2230=",
        location: "London, England",
        caption: "Banksy is the best! #banksy #streetart #art"
    }
];

export default function Feed({route}) {
    const [photoURLs, setPhotoURLs] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);
    const firebaseStorage = getStorage();
    const STORAGE_URI = 'gs://photogram-35378.appspot.com';
    const storageRef = ref(firebaseStorage, STORAGE_URI);

    useEffect(() => {
        const user = auth.currentUser;
        setCurrentUser(user);
        function getDownloadURLs() {
            return async (prefix) => {
                const folderPath = STORAGE_URI + "/" + prefix.fullPath + "/photos";
                const prefixAll = await listAll(ref(firebaseStorage, folderPath));
                const items = prefixAll.items;

                const downloadURLs = items.map((item) => getDownloadURL(ref(firebaseStorage, item.fullPath)));
                Promise.all(downloadURLs)
                    .then((urls) => {
                        setPhotoURLs(urls)
                    })
                return await listAll(ref(firebaseStorage, folderPath))
            };
        }

        (async () => {
            setIsLoading(true)

            const {prefixes} = await listAll(storageRef)

            prefixes.forEach(getDownloadURLs())
        })()

        setIsLoading(false)
    }, [route]);

    return isLoading
        ? <ActivityIndicator size={"large"} color={"#0022ff"}/>
        : <FlatList
            data={photoURLs}
            renderItem={({item}) => {
                return (<View style={stylesZ.postContainer}>
                        <View style={stylesZ.heading}>
                            <Image source={{uri: currentUser.photoURL}} style={stylesZ.circle}/>
                            <Text>{currentUser.email}</Text>
                            <Text style={stylesZ.location}>{item.location}</Text>
                        </View>
                        <Image
                            source={{uri: item}}
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
