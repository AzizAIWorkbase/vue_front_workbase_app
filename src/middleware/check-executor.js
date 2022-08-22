import router from "@/router";
import store from "@/store";

export default function (to, from, next) {
  if (store.state.profileStore.type == "executor") {
    return router.push({ name: "account" });
  }

  return next();
}
