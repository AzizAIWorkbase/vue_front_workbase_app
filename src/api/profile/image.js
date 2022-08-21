import axios from "@/utils/axios";

export const deleteUserImage = (user_id) => {
  axios
    .delete(`/crazy/workbase/upload/${user_id}`)
    .then((res) => {
      console.log(res);
    })
    .catch((err) => console.log(err));
};
