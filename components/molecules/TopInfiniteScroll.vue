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
});

const emits = defineEmits(['loadData', 'scrollBarBottom']);

const scrollBar = ref<any>(null);

let preScrollHeight = 0;

let autoScroll = true;

const loadMore = () => {
  if (!props.disabled) {
    emits('loadData');
    preScrollHeight = scrollBar.value.scrollHeight;
  }
};

const onScroll = (event: any) => {
  if (event.target.scrollTop <= props.distance) {
    loadMore();
    autoScroll = true;
  } else {
    autoScroll = false;
  }

  const isScrollBarBottom =
    event.target.scrollTop + event.target.clientHeight ===
    event.target.scrollHeight;
  if (isScrollBarBottom) {
    emits('scrollBarBottom');
  }
};

onBeforeUpdate(async () => {
  await nextTick();
  if (autoScroll) {
    scrollBar.value.scrollTop = scrollBar.value.scrollHeight - preScrollHeight;
  }
});

onMounted(() => {
  scrollBar.value.scrollTop = scrollBar.value.scrollHeight;
  preScrollHeight = scrollBar.value.scrollHeight;
});
</script>

<style scoped></style>
