<template>
  <div>Test page</div>

  <!-- <div v-if="!joined" class="w-[500px]">
    <div>
      <el-input v-model:model-value="name" />
      <el-button @click="join">Submit</el-button>
    </div>
  </div>
  <div v-else>
    <div v-for="(message, index) in messages" :key="index">
      [{{ message.name }}]: {{ message.text }}
    </div>

    <div class="mt-10">
      <div v-if="typingDisplay">{{ typingDisplay }}</div>
      <div>
        <el-input v-model:model-value="messageText" @input="emitTyping" />
        <el-button @click="sendMessage">Submit</el-button>
      </div>
    </div>
  </div> -->
</template>

<script setup lang="ts">
// import { io } from 'socket.io-client';

// const systemData = ref();
// const cookieSystemData = useCookie('auth.user-data').value;

// if (cookieSystemData) {
//   systemData.value = await handleJWTDecrypt(cookieSystemData);
// }

// const socket = io('http://localhost:3010', {
//   extraHeaders: {
//     userId: systemData.value?.id ?? 0,
//   },
// });

// onBeforeMount(() => {
//     socket.on('createNotification', (content: any) => {
//     ElNotification({
//       title: 'Có một tin nhắn mới',
//       message: content,
//       position: 'bottom-left',
//     });
//   });
// })

// const messages = ref<any[]>([]);
// const messageText = ref('');
// const joined = ref(false);
// const name = ref('');
// const typingDisplay = ref('');

// onBeforeMount(() => {
//   socket.emit('findAllNotification', {}, (response: any) => {
//     messages.value = response;
//   });

//   socket.on('message', (message: any) => {
//     ElNotification({
//       title: 'Có một tin nhắn mới',
//       message: message.text,
//       position: 'bottom-left',
//     });
//     messages.value.push(message);
//   });

//   socket.on('typing', ({ name, isTyping }) => {
//     if (isTyping) {
//       typingDisplay.value = `${name} is typing...`;
//     } else {
//       typingDisplay.value = '';
//     }
//   });
// });

// const join = () => {
//   socket.emit('join', { name: name.value }, () => {
//     joined.value = true;
//   });
// };

// const sendMessage = () => {
//   socket.emit('createNotification', { text: messageText.value }, () => {
//     messageText.value = '';
//   });
// };

// let timeout;
// const emitTyping = () => {
//   socket.emit('typing', { isTyping: true });
//   timeout = setTimeout(() => {
//     socket.emit('typing', { isTyping: false });
//   }, 1000);
// };
</script>
