const lang = 'ja'
const siteName = 'NDL OCR x IIIF'
const siteDesc =
  '国立国会図書館「次世代デジタルライブラリー」で公開されているOCR結果をIIIFビューアで表示します。'
const shortName = 'NDL OCR x IIIF'
const siteKeywords = ['IIIF', 'OCR', 'デジタルアーカイブ'].join(', ')
const gtag = 'G-9R7V2059PB'
const hostname = 'http://static.ldas.jp'
const slug = '/ndl-ocr-iiif'

const env = {
  hostname,
  slug,
  siteName,
  siteDesc,
  step: 'https://step.aws.ldas.jp',
  ocr: 'https://ocr.aws.ldas.jp',
}

// `DEPLOY_ENV` が `GH_PAGES` の場合のみ `router.base = '/<repository-name>/'` を追加する
const routerBase =
  process.env.DEPLOY_ENV === 'GH_PAGES'
    ? {
        router: {
          base: slug + '/',
        },
      }
    : {}

export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  env,

  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: `%s`,
    title: siteName,
    meta: [
      { charset: 'utf-8' },
      { 'http-equiv': 'x-ua-compatible', content: 'ie=edge' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        name: 'format-detection',
        content: 'telephone=no, email=no, address=no',
      },
      // SEO関連
      { hid: 'description', name: 'description', content: siteDesc },
      { hid: 'keywords', name: 'keywords', content: siteKeywords },
      // ogp関連
      {
        hid: 'og:site_name',
        property: 'og:site_name',
        content: siteName,
      },
      { hid: 'og:type', property: 'og:type', content: 'website' },
      // { hid: 'og:url', property: 'og:url', content: basePath },
      { hid: 'og:title', property: 'og:title', content: siteName },
      {
        hid: 'og:description',
        property: 'og:description',
        content: siteDesc,
      },
      /*
      {
        hid: 'og:image',
        property: 'og:image',
        content: `${ogpImages}home.jpg`,
      },
      */
      { name: 'twitter:card', content: 'summary' },
      // pwa iOS
      { name: 'apple-mobile-web-app-capable', content: 'yes' },
      {
        name: 'apple-mobile-web-app-status-bar-style',
        content: 'black-translucent',
      },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  manifest: {
    lang,
    name: siteName,
    short_name: shortName,
    description: siteDesc,
    background_color: '#ffffff',
    theme_color: '#ffffff',
    display: 'standalone',
    orientation: 'portrait',
  },

  loading: { color: '#E64A19', height: '5px' },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    // https://go.nuxtjs.dev/stylelint
    '@nuxtjs/stylelint-module',
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    '@nuxtjs/i18n',
    '@nuxtjs/google-gtag',
    '@nuxtjs/sitemap',
  ],

  'google-gtag': {
    id: gtag, // 'G-4HCHKW275B', //サイトのID
    debug: true, // 開発環境でも表示したい場合
  },

  sitemap: {
    path: '/sitemap.xml',
    hostname,
  },

  i18n: {
    locales: [
      { code: 'en', iso: 'en_US', file: 'en.json' },
      { code: 'ja', iso: 'ja_JP', file: 'ja.json' },
    ],
    defaultLocale: lang,
    vueI18nLoader: true,
    lazy: true,
    langDir: 'lang/',
    // strategy: 'no_prefix'
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: '/',
  },

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang,
    },
  },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {},

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},

  ...routerBase,

  generate: {
    fallback: true,
  },
}
