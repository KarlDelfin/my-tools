<template>
  <div>
    <el-header>
      <el-menu class="el-menu-demo d-flex justify-content-end" mode="horizontal">
        <el-sub-menu index="2">
          <template #title>Hi! {{ `${user.firstName} ${user.lastName}` }}</template>
          <el-menu-item class="text-danger" @click="logout">
            <i class="bi bi-power me-2"></i> Logout
          </el-menu-item>
        </el-sub-menu>
      </el-menu>
    </el-header>

    <div class="main_container">
      <div>
        <SideMenu />
      </div>

      <div>
        <RouterView />
      </div>
    </div>
  </div>
</template>
<script>
import { ElMessage } from 'element-plus'

import SideMenu from './components/SideMenu.vue'
export default {
  components: { SideMenu },
  data() {
    return {
      user: {},
    }
  },
  methods: {
    logout() {
      localStorage.clear()
      this.$router.push('/')
      ElMessage.success('You have been logout')
    },
  },
  mounted() {},
}
</script>
