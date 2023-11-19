import {FlatList, Image, StyleSheet, Text, View} from "react-native";

const linkColor = '#279';

const styles = StyleSheet.create({
    postContainer: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: 300,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    circle: {
        width: 44,
        height: 44,
        borderRadius: 44 / 2,
        marginRight: 10,
        backgroundColor: '#ddd',
    },
    heading: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        width: '100%',
        height: 44,
        paddingLeft: 10,
        marginBottom: 10,
    },
    location: {
        fontSize: 12,
        color: linkColor,
        marginLeft: "auto",
        marginRight: 10,
    },
    caption: {
        fontSize: 14,
        color: '#333',
        paddingLeft: 10,
        paddingRight: 10,
        marginRight: "auto",
        marginLeft: 10,
    }
});

export default function Feed() {
    return (
        <FlatList
            data={[
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
            ]}
            renderItem={({item}) => (
                <View style={styles.postContainer}>
                    <View style={styles.heading}>
                        <Image source={{uri: item.profileImg}} style={styles.circle}/>
                        <Text>{item.userName}</Text>
                        <Text style={styles.location}>{item.location}</Text>
                    </View>
                    <Image
                        source={{uri: item.imgUri}}
                        style={{width: 350, height: 200}}
                    />
                    <Text style={styles.caption}>
                        {item.caption}
                    </Text>
                </View>
            )}
        />
    );
}
