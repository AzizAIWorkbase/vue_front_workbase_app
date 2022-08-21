import axios from "@/utils/axios";

export const getCommentAndReviews = async (user_id) => {
  axios
    .get(`/crazy/workbase/rating/${user_id}`)
    .then((data) => {
      return data;
    })
    .catch((err) => console.log(err));
};
