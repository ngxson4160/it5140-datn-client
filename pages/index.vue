<template>
  <header-guest />
  <div
    class="bg-[#007c32b3] h-[750px] flex flex-col items-center justify-center"
  >
    <div class="w-[1125px]">
      <div
        class="mt-[104px] mb-10 text-white text-[64px] font-bold text-center"
      >
        <p>Tìm kiếm công việc mơ ước</p>
        <p>của bạn với Job Nest</p>
        <p class="text-lg">
          Công việc không chỉ là kiếm sống, mà còn là cơ hội để bạn cống hiến và
          khẳng định bản thân.
        </p>
      </div>
      <search-job />

      <div class="flex justify-between mt-6">
        <div
          class="w-[350px] h-[200px] bg-white rounded-md flex flex-col justify-center items-center"
        >
          <img
            class="h-16 text-primary"
            src="@/assets/images/job-search-home.svg"
          />
          <p class="text-xl font-bold mt-4">23+</p>
          <p class="text-xl text-[#a3a8ad]">Công việc</p>
        </div>
        <div
          class="w-[350px] h-[200px] bg-white rounded-md flex flex-col justify-center items-center"
        >
          <img
            class="h-16 text-primary"
            src="@/assets/images/company-home.svg"
          />
          <p class="text-xl font-bold mt-4">23+</p>
          <p class="text-xl text-[#a3a8ad]">Công ty</p>
        </div>
        <div
          class="w-[350px] h-[200px] bg-white rounded-md flex flex-col justify-center items-center"
        >
          <img
            class="h-16 text-primary"
            src="@/assets/images/candidate-home.svg"
          />
          <p class="text-xl font-bold mt-4">23+</p>
          <p class="text-xl text-[#a3a8ad]">Ứng viên</p>
        </div>
      </div>
    </div>
  </div>

  <div class="bg-[#f2f5f8] h-[700px] flex flex-col items-center justify-center">
    <p class="text-primary font-bold text-xl">Danh mục công việc hàng đầu</p>

    <div class="grid grid-cols-6 content-center gap-5 mt-10">
      <div class="card-job-category">
        <img class="h-10" src="@/assets/images/job-search-home.svg" />
        <p class="text-center mb-2 mt-6 text-sm">
          Công nghệ thông tin viễn thông
        </p>
        <p class="text-[#a3a8ad]">8 công việc</p>
      </div>
      <div class="card-job-category">
        <img class="h-10" src="@/assets/images/job-search-home.svg" />
        <p class="text-center mb-2 mt-6 text-sm">
          Công nghệ thông tin viễn thông
        </p>
        <p class="text-[#a3a8ad]">8 công việc</p>
      </div>
      <div class="card-job-category">
        <img class="h-10" src="@/assets/images/job-search-home.svg" />
        <p class="text-center mb-2 mt-6 text-sm">
          Công nghệ thông tin viễn thông
        </p>
        <p class="text-[#a3a8ad]">8 công việc</p>
      </div>
      <div class="card-job-category">
        <img class="h-10" src="@/assets/images/job-search-home.svg" />
        <p class="text-center mb-2 mt-6 text-sm">
          Công nghệ thông tin viễn thông
        </p>
        <p class="text-[#a3a8ad]">8 công việc</p>
      </div>
      <div class="card-job-category">
        <img class="h-10" src="@/assets/images/job-search-home.svg" />
        <p class="text-center mb-2 mt-6 text-sm">
          Công nghệ thông tin viễn thông
        </p>
        <p class="text-[#a3a8ad]">8 công việc</p>
      </div>
      <div class="card-job-category">
        <img class="h-10" src="@/assets/images/job-search-home.svg" />
        <p class="text-center mb-2 mt-6 text-sm">
          Công nghệ thông tin viễn thông
        </p>
        <p class="text-[#a3a8ad]">8 công việc</p>
      </div>
      <div class="card-job-category">
        <img class="h-10" src="@/assets/images/job-search-home.svg" />
        <p class="text-center mb-2 mt-6 text-sm">
          Công nghệ thông tin viễn thông
        </p>
        <p class="text-[#a3a8ad]">8 công việc</p>
      </div>
      <div class="card-job-category">
        <img class="h-10" src="@/assets/images/job-search-home.svg" />
        <p class="text-center mb-2 mt-6 text-sm">
          Công nghệ thông tin viễn thông
        </p>
        <p class="text-[#a3a8ad]">8 công việc</p>
      </div>
      <div class="card-job-category">
        <img class="h-10" src="@/assets/images/job-search-home.svg" />
        <p class="text-center mb-2 mt-6 text-sm">
          Công nghệ thông tin viễn thông
        </p>
        <p class="text-[#a3a8ad]">8 công việc</p>
      </div>
      <div class="card-job-category">
        <img class="h-10" src="@/assets/images/job-search-home.svg" />
        <p class="text-center mb-2 mt-6 text-sm">
          Công nghệ thông tin viễn thông
        </p>
        <p class="text-[#a3a8ad]">8 công việc</p>
      </div>
      <div class="card-job-category">
        <img class="h-10" src="@/assets/images/job-search-home.svg" />
        <p class="text-center mb-2 mt-6 text-sm">
          Công nghệ thông tin viễn thông
        </p>
        <p class="text-[#a3a8ad]">8 công việc</p>
      </div>
      <div class="card-job-category">
        <img class="h-10" src="@/assets/images/job-search-home.svg" />
        <p class="text-center mb-2 mt-6 text-sm">
          Công nghệ thông tin viễn thông
        </p>
        <p class="text-[#a3a8ad]">8 công việc</p>
      </div>
    </div>
    <el-button
      type="primary"
      class="mt-10 flex justify-center w-[240px] !rounded-lg !h-10 !text-base !font-bold"
    >
      Xem tất cả
    </el-button>
  </div>

  <div class="w-[1700px] bg-white h-[700px] mx-auto">
    <p class="text-primary text-center font-bold text-xl mt-10">
      Công việc phổ biến
    </p>
    <div class="p-2 rounded-lg">
      <div class="mt-10">
        <el-carousel
          height="550px"
          arrow="always"
          trigger="click"
          interval="5000"
        >
          <el-carousel-item v-for="item in 4" :key="item">
            <div class="grid grid-cols-4 gap-4">
              <card-job />
              <card-job />
              <card-job />
              <card-job />
              <card-job />
              <card-job />
              <card-job />
              <card-job />
              <card-job />
              <card-job />
              <card-job />
              <card-job />
            </div>
          </el-carousel-item>
        </el-carousel>
      </div>
    </div>
  </div>

  <div class="bg-[#f2f5f8] h-[550px] mx-auto">
    <p class="text-primary font-bold text-xl text-center pt-14">
      Nhận xét về chúng tôi
    </p>
    <div class="p-2 rounded-lg mt-14">
      <div class="mt-10 w-[1500px] mx-auto">
        <el-carousel
          height="300px"
          arrow="always"
          trigger="click"
          :autoplay="false"
        >
          <el-carousel-item v-for="item in 5" :key="item">
            <div class="flex justify-center gap-6 w-full">
              <card-review />
              <card-review />
              <card-review />
            </div>
          </el-carousel-item>
        </el-carousel>
      </div>
    </div>
  </div>

  <div class="bg-white h-[900px]">
    <p class="text-primary font-bold text-xl text-center pt-14">
      Danh sách blog
    </p>
    <div class="p-2 rounded-lg mt-6">
      <div class="mt-10 w-[1500px] mx-auto">
        <el-carousel
          height="650px"
          arrow="always"
          trigger="click"
          :autoplay="false"
        >
          <el-carousel-item v-for="item in 5" :key="item">
            <div class="flex justify-center gap-6 w-full">
              <card-blog />
              <card-blog />
              <card-blog />
            </div>
          </el-carousel-item>
        </el-carousel>
      </div>
    </div>
  </div>

  <div class="bg-[#13161c] h-[435px] mx-auto py-12 text-white">
    <div class="grid grid-cols-9 gap-x-16 mx-[290px] pb-4 border-b">
      <div class="col-span-3">
        <p class="text-xl font-bold mb-8">Thông tin công ty</p>
        <p class="">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industrys standard dummy text
        </p>
        <div class="flex mt-8">
          <img src="@/assets/images/location-primary.svg" class="w-6" />
          <span class="ml-3">Đông Anh, Hà Nội, Việt Nam</span>
        </div>
        <div class="flex mt-6 w-6">
          <img src="@/assets/images/phone-primary.svg" />
          <span class="ml-3">0987654321</span>
        </div>
        <div class="flex mt-6 w-6">
          <img src="@/assets/images/mail-primary.svg" />
          <span class="ml-3">ng.xson194160@gmail.com</span>
        </div>
      </div>
      <div class="col-span-2">
        <p class="text-xl font-bold mb-8">Ứng viên</p>
        <p class="mb-4">Quản lý tài khoản</p>
        <p class="mb-4">Tìm việc</p>
        <p class="mb-4">Danh mục công việc</p>
        <p class="mb-4">Danh sách doanh nghiệp</p>
        <p class="mb-4">Thông báo hệ thống</p>
      </div>
      <div class="col-span-2">
        <p class="text-xl font-bold mb-8">Doanh nghiệp</p>
        <p class="mb-4">Quản lý tài khoản</p>
        <p class="mb-4">Công việc đang tuyển</p>
        <p class="mb-4">Danh mục công việc</p>
        <p class="mb-4">Thông báo hệ thống</p>
      </div>
      <div class="col-span-2">
        <p class="text-xl font-bold mb-8">Chính sách</p>
        <p class="mb-4">Về chúng tôi</p>
        <p class="mb-4">Chính sách bảo mật</p>
        <p class="mb-4">Điều khoản sử dụng</p>
        <p class="mb-4">FAQ</p>
      </div>
    </div>

    <div class="flex justify-between mx-[290px] mt-4">
      <p>Job Nest 2024</p>
      <div class="flex justify-between w-[130px]">
        <img src="@/assets/images/facebook-white.svg" class="w-6" />
        <img src="@/assets/images/twitter-white.svg" class="w-6" />
        <img src="@/assets/images/youtube-white.svg" class="w-6" />
        <img src="@/assets/images/linkedin-white.svg" class="w-6" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>
<style>
.el-carousel {
  .el-carousel__arrow {
    @apply w-11 h-11;
  }
  .el-icon {
    @apply text-2xl;
  }
  .el-carousel__button {
    @apply h-2 bg-[#a3a8ad];
  }
}
</style>
