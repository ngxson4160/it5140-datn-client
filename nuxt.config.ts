// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  ssr: false,
  runtimeConfig: {
    public: {
      baseURL: process.env['BASE_URL'] || 'http://localhost:3009',
      awsURL: process.env['AWS_DOWNLOAD_URL'] || 'http://localhost:3009',
      nuxtAuthSecret:
        process.env['NUXT_AUTH_SECRET'] || '875F92F5BE94E32B6AE6CA7793736',
      timezone: process.env['TIMEZONE'] || 'Asia/Tokyo',
      stripePublishableKey: process.env['STRIPE_PUBLISHABLE_KEY'] || '',
    },
  },
  modules: [
    '@nuxt/ui',
    '@nuxtjs/eslint-module',
    '@pinia/nuxt',
    '@element-plus/nuxt',
    'nuxt-lazy-load',
  ],
  imports: {
    dirs: ['stores'],
    presets: [
      {
        from: 'pinia',
        imports: ['defineStore'],
      },
      {
        from: '@vueuse/core',
        imports: ['useLocalStorage'],
      },
      {
        from: 'nitropack',
        imports: ['NitroFetchRequest'],
      },
    ],
  },
  lazyLoad: {
    images: true,
    videos: true,
    audios: true,
    iframes: true,
    native: false,
    directiveOnly: false,
    loadingClass: 'isLoading',
    loadedClass: 'isLoaded',
    appendClass: 'lazyLoad',
  },
  components: [
    {
      path: '~/components/',
      pathPrefix: false,
    },
  ],
  elementPlus: {
    importStyle: 'scss',
  },
  css: ['~/assets/scss/main.scss'],
  colorMode: {
    preference: 'light',
  },
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@use "@/assets/scss/element.scss" as element;`,
        },
      },
    },
  },
  typescript: {
    strict: true,
  },
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
})
