<template>
  <div
    class="flex font-bold items-center h-8 cursor-pointer hover:bg-stone-bold-cs rounded-md px-4 mb-2 transition ease-in-out delay-75 hover:-translate-y-1 hover:scale-110 hover:bg-stone-bold-cs duration-300"
    :class="classObject"
    @click="handleClick"
  >
    <UIcon
      v-if="props.preset.icon"
      :name="props.preset.icon"
      class="text-xl mr-2"
    />
    <div class="text-sm">
      {{ props.preset.label }}
    </div>
    <div v-if="props.preset.badge" class="flex-1 flex justify-end">
      <UBadge
        color="lime"
        size="sm"
        :ui="{ rounded: 'rounded-full' }"
        :label="props.preset.badge"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
interface IProps {
  preset: {
    label: string
    to?: string
    icon?: string
    badge?: string
    click?: () => void
    children?: IProps[]
  }
  routeCurrent: string
}

// props
const props = defineProps<IProps>()

// computed
const classObject = computed(() => ({
  active: props.preset.to && props.routeCurrent === props.preset.to,
}))

// data
const router = useRouter()

// methods
const handleClick = () => {
  if (props.preset.click) {
    props.preset.click()
  } else if (props.preset.to) {
    router.push(props.preset.to)
  }
}
</script>

<style scoped lang="scss">
.active {
  background-color: #f5f5eb;
  @apply dark:text-black;
}
</style>
