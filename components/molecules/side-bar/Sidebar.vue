<template>
  <div class="flex w-[275px] md:[70px] h-screen overflow-auto justify-between">
    <div class="flex flex-col">
      <div
        class="header flex items-center sticky z-10 top-0 bg-stone-cs dark:bg-slate-950 pb-2 pt-4 pl-6"
      >
        <UAvatar :src="logo" alt="Avatar" size="3xl" />
        <div class="font-bold ml-2">Wanosoft CMS</div>
      </div>

      <div class="content p-8 flex-1">
        <SidebarItem
          v-for="(item, index) in links"
          :key="`${index}-item-sidebar`"
          :preset="item"
          :route-current="routeCurrent"
        />
      </div>

      <div
        class="footer p-4 pl-6 flex items-center sticky z-10 bottom-0 bg-stone-cs dark:bg-slate-950 h-20"
      >
        <UAvatar
          src="https://avatars.githubusercontent.com/u/739984?v=4"
          alt="Avatar"
          chip-color="green"
          chip-text=""
          chip-position="top-right"
          size="md"
        />
        <div class="ml-2">
          <div class="font-bold text-sm">
            {{ authStore.firstName + authStore.lastName }}
          </div>
          <div class="text-xs">@erikmu</div>
        </div>

        <div class="flex-1 justify-end flex">
          <el-dropdown ref="dropdownLogout" trigger="contextmenu">
            <UIcon
              name="i-heroicons-ellipsis-horizontal"
              class="text-2xl mr-2 cursor-pointer"
              @click="showClick"
            />
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item disabled>Contact</el-dropdown-item>
                <el-dropdown-item @click="handleLogout">
                  Logout
                </el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </div>
    </div>

    <div class="h-screen flex items-center">
      <div class="border-r border-gray-cs dark:border-zinc-800 h-[97%]"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { DropdownInstance } from 'element-plus';
import logo from '~/assets/images/logo.jpg';

// data
const commonStore = useCommonStore();
const authStore = useAuthStore();

const links = commonStore.links;
const route = useRoute();

const dropdownLogout = ref<DropdownInstance>();

// computed
const routeCurrent = computed(() => route.path);

// method
const showClick = () => {
  if (!dropdownLogout.value) return;
  dropdownLogout.value.handleOpen();
};
</script>

<style lang="scss"></style>
