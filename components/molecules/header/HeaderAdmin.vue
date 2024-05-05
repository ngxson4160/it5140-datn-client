<template>
  <div class="h-32 border-b border-gray-cs dark:border-zinc-800 p-4 pl-8 pt-9">
    <div class="flex items-center justify-between">
      <div class="flex items-center">
        <UIcon name="i-heroicons-swatch" class="text-3xl mr-2 text-teal-500" />

        <div class="font-bold text-2xl">
          {{ routeCurrentLabel }}
        </div>
      </div>

      <div class="flex items-center">
        <el-dropdown ref="dropdownLanguage" trigger="contextmenu">
          <UIcon
            name="i-heroicons-language"
            class="text-2xl mr-2 cursor-pointer transition ease-in-out delay-75 hover:-translate-y-1 hover:scale-110 duration-300"
            @click="showClick"
          />
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item
                :class="{ active: $i18n.locale === 'ja' }"
                @click="
                  () => {
                    $i18n.locale = 'ja';
                  }
                "
              >
                Japanese
              </el-dropdown-item>
              <el-dropdown-item
                :class="{ active: $i18n.locale === 'en' }"
                @click="
                  () => {
                    $i18n.locale = 'en';
                  }
                "
              >
                English
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>

        <ColorModeButton />
      </div>
    </div>

    <div class="flex items-center font-bold text-xs mt-2">
      <div class="flex items-center mr-4">
        <UIcon name="i-heroicons-bell" class="text-2xl mr-2 cursor-pointer" />
        <div class="italic">Notification</div>
      </div>

      <div class="flex items-center mr-4">
        <UIcon
          name="i-heroicons-information-circle"
          class="text-2xl mr-2 cursor-pointer"
        />
        <div class="italic">Information</div>
      </div>

      <div class="flex items-center">
        <UIcon
          name="i-heroicons-rocket-launch"
          class="text-2xl mr-2 cursor-pointer"
        />
        <div class="italic">Rocket launch</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { DropdownInstance } from 'element-plus';

// data
const route = useRoute();

const commonStore = useCommonStore();
const links = commonStore.links;

const dropdownLanguage = ref<DropdownInstance>();

// computed
const routeCurrentLabel = computed(
  () => links.find((link) => link.to === route.path)?.label || '',
);

// method
const showClick = () => {
  if (!dropdownLanguage.value) return;
  dropdownLanguage.value.handleOpen();
};
</script>
