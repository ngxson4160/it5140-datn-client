<template>
  <div
    ref="scrollBar"
    class="overflow-auto"
    :style="{ height: `${height}px` }"
    @scroll="onScroll"
  >
    <div v-for="(item, index) in data" :key="index">
      <slot :data="item"></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { PropType } from 'vue';

const props = defineProps({
  data: {
    type: Array as PropType<any[]>,
    default: () => [],
  },
  distance: {
    type: Number,
    default: 0,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  height: {
    type: Number,
    required: true,
  },
  isScrollTop: {
    type: Boolean,
    required: true,
  },
});
const emits = defineEmits(['loadData', 'scrollTabBar']);

// const listData = ref(props.data);
const isDisable = ref(props.disabled);

const scrollBar = ref<any>(null);

let preScrollHeight = 0;

const loadMore = () => {
  if (!isDisable.value) {
    emits('loadData');

    preScrollHeight = scrollBar.value.scrollHeight;
  }
};

const onScroll = (event: any) => {
  if (event.target.scrollTop <= props.distance) {
    loadMore();
  }
};

onBeforeUpdate(async () => {
  await nextTick();
  if (props.isScrollTop) {
    scrollBar.value.scrollTop = scrollBar.value.scrollHeight - preScrollHeight;
  }
});

onMounted(() => {
  scrollBar.value.scrollTop = scrollBar.value.scrollHeight;
  preScrollHeight = scrollBar.value.scrollHeight;
});

// watch(
//   () => props.data,
//   (newVal) => {
//     listData.value = newVal;
//   },
// );

watch(
  () => props.disabled,
  (newVal) => {
    isDisable.value = newVal;
  },
);
</script>

<style scoped></style>
