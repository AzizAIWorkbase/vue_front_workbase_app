<template     ref="content">
  <div
    class="
      grid
      scroll-smooth
      lg:grid-cols-5 lg:gap-4
      container
      mx-auto
      p-4
      py-5
      2xl:px-20
    "
  >
    <div
      class="
        sticky
        top-[5.25rem]
        bg-white
        p-4
        py-5
        mb-4
        rounded-md
        z-10
        shadow-md shadow-primary/25
        lg:col-span-1 lg:p-0 lg:py-0 lg:mb-0 lg:bg-transparent lg:shadow-none
      "
    >
      <div class="lg:sticky top-[7.25rem]">
        <ul class="flex flex-row lg:flex-col gap-3">
          <!-- @click="onElementClick(item)" -->
          <li
            @click="onToggleHandler(item)"
            class="
              text-md text-primary
              font-medium
              cursor-pointer
              rounded-md
              transition-all
              duration-300
            "
            :class="{
              '!bg-primary': item.isActive,
              'text-white': item.isActive,
              'shadow-md': item.isActive,
              'shadow-primary/25': item.isActive,
              '!text-red-500': item.isError,
              'hover:shadow-md': !item.disabled,
              'hover:shadow-primary/25': !item.disabled,
              'hover:bg-primary/40': !item.disabled,
              'hover:text-white': !item.disabled,
            }"
            v-for="(item, id) in items"
            :key="id"
          >
            <a
              class="w-full px-4 py-2 flex justify-between items-center"
              :href="`#${id}`"
              :disabled="item.disabled"
              :title="item.disabled ? 'Скоро' : ''"
            >
              <span>
                {{ item.label }}
              </span>
              <span>
                <h-information-circle
                  class="h-5 w-5"
                  v-if="item.isError"
                ></h-information-circle>
              </span>
            </a>
          </li>
        </ul>
      </div>
    </div>
    <div class="col-span-4">
      <div id="cv" class="spy scroll-mt-28">
        <account-cv class="mb-5"></account-cv>
      </div>

      <div id="detail" class="spy scroll-mt-28">
        <account-detail class="mb-5"></account-detail>
      </div>
      <div id="about" class="spy scroll-mt-28">
        <account-about class="mb-5"></account-about>
      </div>
      <div id="locations" class="spy scroll-mt-28">
        <account-locations class="mb-5"></account-locations>
      </div>
      <div id="specialties" class="spy scroll-mt-28">
        <account-specialties class="mb-5"></account-specialties>
      </div>
      <div id="documents" class="spy scroll-mt-28">
        <profile-documents class="mb-5"></profile-documents>
      </div>

      <div id="works" class="spy scroll-mt-28">
        <profile-works class="mb-5"></profile-works>
      </div>
      <div id="identifications" class="spy scroll-mt-28">
        <profile-identifications class="mb-5"></profile-identifications>
      </div>
      <div id="settings" class="spy scroll-mt-28">
        <profile-settings class="mb-5"></profile-settings>
      </div>
    </div>
  </div>
</template>


<style>
</style>


<script setup>
import AccountSection from "@/components/account/account-section.vue";
import AccountDetail from "@/components/account/account-detail.vue";
import AccountCv from "@/components/account/account-cv.vue";
import AccountAbout from "@/components/account/account-about.vue";
import AccountLocations from "@/components/account/account-locations.vue";
import AccountSpecialties from "@/components/account/account-specialties.vue";
import ProfileDocuments from "@/components/account/documents/c-section.vue";
import ProfileWorks from "@/components/account/works/c-section.vue";
import ProfileSettings from "@/components/account/settings/c-section.vue";
import ProfileIdentifications from "@/components/account/identifications/c-section.vue";
import { onMounted, reactive, ref, computed, watch } from "vue";
import { useResizeObserver, useScroll } from "@vueuse/core";
import store from "../store/index";

import useProfile from "@/composables/profile/index.js";
import { forEach } from "core-js/internals/enum-bug-keys";

const { profile, onGet } = useProfile();
const { exec, isLoading, isLoaded } = onGet();
const items = reactive({
  cv: {
    label: "Мой профиль",
    isActive: true,
    top: 9999999,
  },
  detail: {
    label: "Личные данные",
    isActive: false,
    top: 9999999,
  },
  about: {
    label: "О себе",
    isActive: false,
    top: 9999999,
  },
  locations: {
    label: "Районы и адреса",
    isActive: false,
    top: 9999999,
  },
  specialties: {
    label: "Специальности",
    isActive: false,
    top: 9999999,
  },
  documents: {
    label: "Сертификаты и дипломы",
    isActive: false,
    top: 9999999,
  },
  works: {
    label: "Работы",
    isActive: false,
    top: 9999999,
  },
  identifications: {
    label: "Удостоверение личности",
    isActive: false,
    top: 9999999,
    isError: true,
    disabled: true,
  },
  settings: {
    label: "Настройки",
    isActive: false,
    top: 9999999,
    disabled: true,
  },
});

function onToggleHandler(clickedItem) {
  for (let item in items) {
    items[item].isActive = false;
  }

  clickedItem.isActive = true;
}

onMounted(() => {
  const sections = document.querySelectorAll(".spy");
  const headerHeight = document.querySelector("header").clientHeight;

  watch(store.state.scrollProps, () => {
    const { y } = store.state.scrollProps;
    // console.log(y);

    sections.forEach((el, index) => {
      if (y + headerHeight + 60 >= el.offsetTop && y < y + el.offsetTop) {
        for (let item in items) {
          items[item].isActive = false;
        }
        const id = el.getAttribute("id");
        items[id].isActive = true;
      }
    });
  });
});
</script>