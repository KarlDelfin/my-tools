import { createRouter, createWebHistory } from 'vue-router'
import WebsiteCheckerView from '../views/WebsiteCheckerView.vue'
import ImageToTextView from '../views/ImageToTextView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/website-checker',
      name: 'websiteChecker',
      component: WebsiteCheckerView,
    },
    {
      path: '/image-to-text',
      name: 'imageToText',
      component: ImageToTextView,
    },
  ],
})

export default router
