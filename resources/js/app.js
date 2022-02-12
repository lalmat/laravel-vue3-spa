/**
 * Entry point of Vue Front Application
 */

// Initialize Vue Engine
import { createApp } from "vue"
const app = createApp({})

// Set the main View-Component import
import App from './App.vue'
app.component('App', App)

// Add Store Management
import store from "./store"
app.use(store);

// Add routing management
import router from './routes.js'
app.use(router)

// Add locales management
import i18n from './locales'
app.use(i18n)

// Start the app
app.mount("#app")
