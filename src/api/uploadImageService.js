import axios from "@/utils/https";

export const storaImage = (file,user_id) =>{
    
    let formData = new FormData();
    formData.append("img", file);
    
    return axios.post(`/crazy/workbase/upload/${user_id}`, formData, {
        headers: {
            "Content-Type": "multipart/form-data"
        }});
}; 
