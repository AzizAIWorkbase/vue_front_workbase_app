import axios from "@/utils/https";

export const storaImage = (file,user_id) =>{
    
    let formData = new FormData();
    formData.append("img", file);
    
    return axios.post(`/crazy/workbase/upload/${user_id}`, formData, {
        headers: {
            "Content-Type": "multipart/form-data"
        }});
}; 

export const uploadMultiFiles = (files,user_id,doc_type) => {
    let formData = new FormData();
    formData.append("files", files);
    formData.append("doc_type", doc_type);
    
    return axios.post(`/crazy/workbase/upload/files/${user_id}`, formData, {
        headers: {
            "Content-Type": "multipart/form-data"
        }});
}

export const getUploadMultiFiles = (user_id,doc_type) => {
    
    return axios.get(`/crazy/workbase/upload/files/${doc_type}/${user_id}`);
}