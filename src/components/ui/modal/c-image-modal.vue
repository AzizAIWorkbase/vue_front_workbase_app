<script setup>
import { onBeforeUnmount, onMounted, ref, toRefs, useSlots, watch } from "vue";
import WbButton from "../../../components/account/wb-button.vue";

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
  img_url: {
    type: String,
    default: "",
  },
});

const { modelValue, img_url } = toRefs(props);
</script>
<template>
  <teleport to="body">
    <div v-show="modelValue" class="fixed inset-0" style="z-index: 60">
      <div class="fixed inset-0 flex overflow-auto bg-black bg-opacity-20">
        <div v-show="modelValue" class="relative w-full">
          <img class="h-full mx-auto" :src="img_url" alt="User Image" />
        </div>
      </div>
    </div>
  </teleport>
</template>
