import { createApp } from 'vue'

import App from './App.vue'

import router from './router'

import { createPinia } from 'pinia'

import ElementPlus from 'element-plus'

import 'element-plus/dist/index.css'

import { openDatabase } from './database'


openDatabase()
  .then(() => {

    console.log('IndexedDB 初始化成功')


    const app = createApp(App)

    app.use(router)

    app.use(createPinia())

    app.use(ElementPlus)

    app.mount('#app')

  })
  .catch(error => {

    console.error(
      'IndexedDB 初始化失败',
      error
    )

  })