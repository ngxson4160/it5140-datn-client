<template>
  <div>
    <section
      v-if="editor"
      class="buttons text-[#374151] flex items-center flex-wrap gap-x-4 border-t border-x border-gray-400 p-4 !rounded-s-sm"
    >
      <button
        type="button"
        :class="{ 'bg-gray-200 rounded': editor.isActive('bold') }"
        class="p-1"
        @click="editor.chain().focus().toggleBold().run()"
      >
        <BoldIcon title="Bold" />
      </button>
      <button
        type="button"
        :class="{ 'bg-gray-200 rounded': editor.isActive('italic') }"
        class="p-1"
        @click="editor.chain().focus().toggleItalic().run()"
      >
        <ItalicIcon title="Italic" />
      </button>
      <button
        type="button"
        :class="{ 'bg-gray-200 rounded': editor.isActive('underline') }"
        class="p-1"
        @click="editor.chain().focus().toggleUnderline().run()"
      >
        <UnderlineIcon title="Underline" />
      </button>
      <button
        v-if="showFull"
        type="button"
        :class="{
          'bg-gray-200 rounded': editor.isActive('heading', { level: 1 }),
        }"
        class="p-1"
        @click="editor.chain().focus().toggleHeading({ level: 1 }).run()"
      >
        <H1Icon title="H1" />
      </button>
      <button
        v-if="showFull"
        type="button"
        :class="{
          'bg-gray-200 rounded': editor.isActive('heading', { level: 2 }),
        }"
        class="p-1"
        @click="editor.chain().focus().toggleHeading({ level: 2 }).run()"
      >
        <H2Icon title="H2" />
      </button>
      <button
        type="button"
        :class="{ 'bg-gray-200 rounded': editor.isActive('bulletList') }"
        class="p-1"
        @click="editor.chain().focus().toggleBulletList().run()"
      >
        <ListIcon title="Bullet List" />
      </button>
      <button
        type="button"
        :class="{ 'bg-gray-200 rounded': editor.isActive('orderedList') }"
        class="p-1"
        @click="editor.chain().focus().toggleOrderedList().run()"
      >
        <OrderedListIcon title="Ordered List" />
      </button>
      <button
        v-if="showFull"
        type="button"
        :class="{ 'bg-gray-200 rounded': editor.isActive('blockquote') }"
        class="p-1"
        @click="editor.chain().focus().toggleBlockquote().run()"
      >
        <BlockquoteIcon title="Blockquote" />
      </button>
      <button
        v-if="showFull"
        type="button"
        :class="{ 'bg-gray-200 rounded': editor.isActive('code') }"
        class="p-1"
        @click="editor.chain().focus().toggleCode().run()"
      >
        <CodeIcon title="Code" />
      </button>
      <button
        v-if="showFull"
        type="button"
        class="p-1"
        @click="editor.chain().focus().setHorizontalRule().run()"
      >
        <HorizontalRuleIcon title="Horizontal Rule" />
      </button>
      <el-upload
        v-if="showFull"
        v-model:file-list="fileList"
        :on-success="uploadImage"
        class="upload-image flex items-center justify-center"
        :limit="1"
        :before-upload="beforeAvatarUpload"
      >
        <img src="@/assets/images/image-black.svg" class="w-[25px]" />
      </el-upload>
      <button
        type="button"
        class="p-1 disabled:text-gray-400"
        :disabled="!editor.can().chain().focus().undo().run()"
        @click="editor.chain().focus().undo().run()"
      >
        <UndoIcon title="Undo" />
      </button>
      <button
        type="button"
        :disabled="!editor.can().chain().focus().redo().run()"
        class="p-1 disabled:text-gray-400"
        @click="editor.chain().focus().redo().run()"
      >
        <RedoIcon title="Redo" />
      </button>
    </section>
    <EditorContent :editor="editor" />
  </div>
</template>

<script setup lang="ts">
// import { Head, Link, useForm } from '@inertiajs/vue3'
import { useEditor, EditorContent } from '@tiptap/vue-3';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import HardBreak from '@tiptap/extension-hard-break';
import Placeholder from '@tiptap/extension-placeholder';
import Image from '@tiptap/extension-image';

import BoldIcon from 'vue-material-design-icons/FormatBold.vue';
import ItalicIcon from 'vue-material-design-icons/FormatItalic.vue';
import UnderlineIcon from 'vue-material-design-icons/FormatUnderline.vue';
import H1Icon from 'vue-material-design-icons/FormatHeader1.vue';
import H2Icon from 'vue-material-design-icons/FormatHeader2.vue';
import ListIcon from 'vue-material-design-icons/FormatListBulleted.vue';
import OrderedListIcon from 'vue-material-design-icons/FormatListNumbered.vue';
import BlockquoteIcon from 'vue-material-design-icons/FormatQuoteClose.vue';
import CodeIcon from 'vue-material-design-icons/CodeTags.vue';
import HorizontalRuleIcon from 'vue-material-design-icons/Minus.vue';
import UndoIcon from 'vue-material-design-icons/Undo.vue';
import RedoIcon from 'vue-material-design-icons/Redo.vue';
import type { UploadProps, UploadUserFile } from 'element-plus';

const props = defineProps({
  modelValue: {
    type: String,
    default: '',
  },
  placeholder: {
    type: String,
    default: '',
  },
  showFull: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(['update:modelValue']);

const editor = useEditor({
  content: props.modelValue,
  onUpdate: ({ editor }) => {
    // console.log(editor.getHTML())
    emit('update:modelValue', editor.getHTML());
  },
  extensions: [
    StarterKit,
    Underline,
    // HardBreak.extend({
    //   addKeyboardShortcuts() {
    //     return {
    //       Enter: () => this.editor.commands.setHardBreak(),
    //     };
    //   },
    // }),
    Placeholder.configure({
      placeholder: props.placeholder,
    }),
    Image,
  ],
  editorProps: {
    attributes: {
      class:
        'border border-gray-400 p-4 min-h-[200px] max-h-[500px] overflow-y-auto outline-none max-w-none',
    },
  },
});

const uploadStore = useUploadStore();

const fileList = ref<UploadUserFile[]>([]);
const uploadImage = async () => {
  const formData = new FormData();
  const file: any = fileList.value[fileList.value.length - 1].raw;
  formData.append('file', file);

  const { data } = await uploadStore.uploadImage(formData);

  if (data.absolutePath)
    editor.value?.chain().focus().setImage({ src: data.absolutePath }).run();
};

const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile: any) => {
  const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
  const fileType = rawFile.type;
  if (!allowedTypes.includes(fileType)) {
    useNotificationError({
      title: 'Ảnh tải lên phải ở định dạng jpg/png/webp!',
    });
    return false;
  } else if (rawFile.size / 1024 / 1024 > 2) {
    useNotificationError({ title: 'Kích thước ảnh không được vượt quá 2MB!' });
    return false;
  }
  return true;
};
</script>
