<template>
  <account-section class="mb-3">
    <template #header>
      <h2 class="text-2xl text-primary font-medium">О себе</h2>
      <p class="text-gray-500">Расскажите немного о себе</p>
    </template>
    <template #default>
      <wb-textarea
        v-model="state.excerpt"
        :disabled="!isEditing"
        label="Коротко о себе"
        :loading="isLoading"
      ></wb-textarea>
      <wb-textarea
        v-model="state.description"
        :disabled="!isEditing"
        label="Подробно о себе"
        :loading="isLoading"
      ></wb-textarea>
      <wb-textarea
        v-model="state.education"
        :disabled="!isEditing"
        label="Образование и опыт работы"
        :loading="isLoading"
      ></wb-textarea>
    </template>
    <template #footer>
      <div class="flex gap-4">
        <wb-button type="primary" @click="isEditing = !isEditing">
          <span v-if="!isEditing">
            <h-pencil class="inline -mt-0.5"></h-pencil>
            Редактировать
          </span>
          <span v-if="isEditing" @click="updateUserAbout">
            <h-cloud-upload class="inline -mt-0.5"></h-cloud-upload>
            Сохранить
          </span>
        </wb-button>
        <wb-button type="secondary" v-if="isEditing" @click="isEditing = false">
          <h-x class="inline -mt-0.5 w-5 h-5"></h-x>
          Отмена
        </wb-button>
      </div>
    </template>
  </account-section>
</template>

<script setup>
import { onMounted, reactive, ref, watch } from "vue";
import AccountSection from "./account-section.vue";
import WbTextarea from "./wb-textarea.vue";
import WbButton from "./wb-button.vue";
import useProfile from "@/composables/profile";
const isEditing = ref(false);
const { profile, onGet } = useProfile();
import { update as updateProfile } from "@/api/profile/index";

const { isLoaded, isLoading } = onGet();
watch(isLoaded, () => {
  if (isLoaded.value) Object.assign(state, profile.value);
});

const state = reactive({
  education: profile.value.education,
  excerpt: profile.value.excerpt,
  description: profile.value.description,
});

function updateUserAbout(event) {
  const oldData = JSON.parse(localStorage.getItem("profile"));

  const data = {
    ...state,
    name: oldData.name,
    surname: oldData.surname,
    patronymic: oldData.patronymic,
    birthday: oldData.birthday,
    gender: oldData.gender,
    address: oldData.address,
    type: oldData.type,
    username: oldData.username,
    is_remotely: oldData.is_remotely,
    email: oldData.email,
  };

  updateProfile(data, profile.value.id)
    .then((response) => {
      const resData = response.data.profile;

      const localData = JSON.parse(localStorage.getItem("profile"));

      localData.education = resData.education;
      localData.excerpt = resData.excerpt;
      localData.description = resData.description;

      localStorage.setItem("profile", JSON.stringify(localData));
      console.log("success!");
    })
    .catch((err) => console.log(err));
}
</script>
