<template>
  <div>
    <div class="relative">
      <button
        @click.prevent.stop="show = !show"
        class="
          text-center
          xl:border-0
          border-b border-gray-50/25
          w-full
          xl:px-2 xl:block
          flex
          items-center
          xl:py-2
          py-3
        "
        :class="{
          '': headerType == 'secondary',
          'text-black': headerType == 'primary',
        }"
      >
        <div class="mr-3">
          <img
            class="
              block
              xl:h-8 xl:w-8
              w-6
              h-6
              mx-auto
              rounded-full
              ring-2 ring-white
            "
            :src="image_url"
          />
        </div>
        <div class="flex items-center">
          <span
            class="mr-1 text-base text-white"
            :class="{ 'xl:text-black': headerType != 'secondary' }"
            >{{ type_user }}</span
          >
          <svg
            class="w-4 h-4 text-white"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clip-rule="evenodd"
            />
          </svg>
        </div>
      </button>
      <div
        v-show="show"
        class="
          xl:absolute
          block
          right-0
          left-0
          xl:mt-5
          xl:bg-white
          xl:rounded-md
          xl:shadow-xl
          xl:text-center
          xl:border
          overflow-hidden
          xl:border-primary
        "
      >
        <a
          to="/"
          @click="swapUserType"
          class="
            xl:flex
            block
            xl:justify-center xl:px-4 xl:py-2
            py-3
            xl:ml-0
            ml-9
            text-base
            hover:bg-primary hover:text-white
            transition-all
            duration-300
            ease-out
            hover:ease-in
            text-white
            xl:text-primary
            cursor-pointer
          "
        >
          {{ anti_type_user }}
        </a>
        <a
          @click.prevent.stop="!isLoading ? onLogout() : null"
          href="javascript:;"
          class="
            xl:flex
            block
            xl:justify-center xl:px-4 xl:py-2
            py-3
            xl:ml-0
            ml-9
            text-base
            hover:bg-primary hover:text-white
            transition-all
            duration-300
            ease-out
            hover:ease-in
            text-white
            xl:text-primary
          "
          :class="{ '!bg-primary !bg-opacity-50': isLoading }"
        >
          ??????????
        </a>
      </div>
    </div>
  </div>
</template>
<script setup>
import { useLogout } from "@/composables/auth";
import useProfile from "@/composables/profile";
import {
  computed,
  onMounted,
  onUnmounted,
  ref,
  watch,
} from "@vue/runtime-core";
import { useRoute, useRouter } from "vue-router";
import store from "../../store/index.js";
import { useStore } from "vuex";

const show = ref(false);
const route = useRoute();
const router = useRouter();

const { profile } = useProfile();
// const store = useStore();

const { isLoading, data, error, onLogout } = useLogout();

const headerType = computed(() => route.meta?.header || "secondary");

const escapePressedListener = (e) => {
  if (e.keyCode == 27) show.value = false;
};

const outsideClickListener = (e) => {
  show.value = false;
};

onMounted(() => {
  document.addEventListener("keyup", escapePressedListener);
  document.addEventListener("click", outsideClickListener);
});
onUnmounted(() => {
  document.removeEventListener("keyup", escapePressedListener);
  document.removeEventListener("click", outsideClickListener);
});

const type_user = computed(() => {
  if (store.state.profileStore.type == "customer") {
    return "?? ????????????????";
  } else {
    return "?? ??????????????????????";
  }
});
const anti_type_user = computed(() => {
  if (store.state.profileStore.type == "customer") {
    return "?? ??????????????????????";
  } else {
    return "?? ????????????????";
  }
});

watch(isLoading, () => {
  console.log(isLoading.value);
  if (isLoading.value === false) {
    router.push({
      name: "home",
    });
  }
});
console.log("App header in outside");

const image_url = computed(() => {
  if (store.state.avatar_url == null || store.state.avatar_url == "") {
    return require("../../assets/images/user.png");
  } else {
    return store.state.avatar_url;
  }
});

const swapUserType = () => {
  let user_type = store.state.profileStore.type;
  //let StorageItem = JSON.parse(localStorage.getItem("profile"));
  user_type = user_type == "executor" ? "customer" : "executor";
  //localStorage.setItem("profile", JSON.stringify(StorageItem));
  store.state.profileStore.type = user_type;

  if (store.state.profileStore.type == "executor") {
    router.push("/account");
  } else {
    router.push("/");
  }
};
</script>
