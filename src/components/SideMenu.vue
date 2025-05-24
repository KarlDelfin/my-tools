<template>
  <el-menu class="sideMenu" :default-active="activeLink">
    <router-link to="/website-checker">
      <el-menu-item index="/website-checker"
        ><i class="bi bi-hourglass-split me-2"></i>
        <span>Website Checker</span>
      </el-menu-item>
    </router-link>
    <router-link to="/image-to-text">
      <el-menu-item index="/image-to-text"
        ><i class="bi bi-card-list me-2"></i>
        <span>Image to Text</span>
      </el-menu-item>
    </router-link>
  </el-menu>
</template>
<script>
export default {
  data() {
    return {
      user: {},
      activeLink: '',
    }
  },
  watch: {
    $route(to) {
      this.activeLink = to.path
    },
  },
  mounted() {
    // this.activeLink = this.$route.path
    // this.user = JSON.parse(localStorage.getItem('user'))
    // if (this.user == null) {
    //   this.$router.push('/')
    // }
  },
}
</script>
