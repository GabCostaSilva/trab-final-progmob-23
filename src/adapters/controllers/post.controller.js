import * as MediaLibrary from 'expo-media-library';
import {auth, database} from "../../../firebaseConfig";
import {getStorage, ref, uploadBytes} from "firebase/storage";

class PostController {

    constructor() {
        this.postService = null;
        this.database = database
        this.storage = getStorage();
        this.auth = auth
    }

    async getPosts(req, res) {
        const posts = await this.postService.getPosts();

    }

    async getPostById(id) {
        return await this.postService.getPostById(id)
    }

    async createPost(postData) {
        console.debug(postData)
        this.ref = ref(this.storage, this.auth.currentUser.uid + '/photos/' + media.assets[0].id + '.jpg');
        console.log(postData)
        await uploadBytes(this.ref, postData.photo, {contentType: 'image/jpeg'})
    }

    async deletePost(req, res) {
        const {id} = req.params;
        const post = await this.postService.deletePost(id);
        return res.send(post);
    }
}

export default PostController;