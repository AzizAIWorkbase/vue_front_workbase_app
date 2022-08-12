import axios from "@/utils/axios";
/** 
 * @param {{with: string[]}} [params]
 * 
 */
export const get = (params = { with: [], }) => axios.get('/crazy/workbase/v1.0.1/profile', { params });

export default {
    data() {
        return {
            posts: [],
        }
    },
    methods: {
        postCounter() {
            axios.get("api/post/").then(({data}) => (this.posts = data))
            return posts.lenght;
        }
    }
}

export const update = ({ name, surname, patronymic, username, email, gender, birthday, address }) => {
    return axios.put('/crazy/workbase/v1.0.1/update', {
        name, surname, patronymic, username, email, gender, birthday, address,
    });
};
