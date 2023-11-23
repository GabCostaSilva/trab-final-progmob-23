import {StyleSheet} from "react-native";

const linkColor = '#279';

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
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
    },
    noPosts: {
        color: '#999',
        fontSize: 20,
        padding: 20,
    },
});
