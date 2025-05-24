<template>
  <div class="container">
    <div class="wrapper">
      <h2>Website Checker</h2>
      <p class="sample">Sample texts:</p>
      <ul class="bullet">
        <li><i>https://example.com</i></li>
        <li><i>example.com</i></li>
      </ul>

      <form @submit.prevent="submitForm" class="form">
        <el-input type="text" v-model="websiteLink" placeholder="Enter Website Link" />
        <el-button type="primary" @click="submitForm">Confirm</el-button>
      </form>

      <el-table :data="results" v-if="results.length > 0">
        <el-table-column label="IP Address" prop="ipAddress" />

        <el-table-column label="Country" prop="countryName" />

        <el-table-column label="Is Hosted by Proweaver" prop="isHosted" align="center">
          <template #default="scope">
            <el-tag type="success" v-if="scope.row.isHosted">Hosted by Proweaver</el-tag>
            <el-tag v-else type="danger">Not Hosted by Proweaver</el-tag>
          </template>
        </el-table-column>
      </el-table>
      <div v-else>
        <el-empty :description="description" />
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import axios from 'axios'
import { ElMessage, ElLoading } from 'element-plus'
export default {
  data() {
    return {
      results: [],
      websiteLink: '',
      description: 'Please enter website link',
      ips: [
        { ipAddress: '34.214.83.106' },
        { ipAddress: '18.140.34.16' },
        { ipAddress: '44.224.249.124' },
        { ipAddress: '54.189.47.138' },
        { ipAddress: '100.21.2.108' },
        { ipAddress: '44.235.89.121' },
        { ipAddress: '54.221.148.24' },
        { ipAddress: '34.211.168.15' },
        { ipAddress: '54.183.46.64' },
        { ipAddress: '44.237.241.111' },
        { ipAddress: '44.232.102.107' },
        { ipAddress: '44.226.83.219' },
        { ipAddress: '44.231.41.248' },
        { ipAddress: '35.167.241.91' },
        { ipAddress: '44.229.95.233' },
        { ipAddress: '52.42.48.89' },
        { ipAddress: '52.9.179.164' },
        { ipAddress: '166.62.119.28' },
        { ipAddress: '192.169.137.81' },
        { ipAddress: '104.238.100.115' },
        { ipAddress: '132.148.17.3' },
        { ipAddress: '209.182.192.90' },
        { ipAddress: '66.117.5.39' },
        { ipAddress: '104.247.73.113' },
        { ipAddress: '104.152.109.47' },
        { ipAddress: '132.148.128.189' },
        { ipAddress: '104.238.102.98' },
        { ipAddress: '54.177.17.254' },
        { ipAddress: '209.182.192.220' },
        { ipAddress: '166.62.41.108' },
        { ipAddress: '192.145.236.74' },
        { ipAddress: '118.139.176.222' },
        { ipAddress: '166.62.16.170' },
      ],
    }
  },

  methods: {
    submitForm() {
      const loading = ElLoading.service({
        lock: true,
        text: 'Loading',
        background: 'rgba(0, 0, 0, 0.7)',
      })
      this.results.length = 1
      if (this.websiteLink == '') {
        loading.close()
        ElMessage.warning('Please enter website link')
        this.results.length = 0
        this.description = 'Please enter website link'
        return
      }
      let isHosted = false
      let newUrl = ''

      const hasProtocol = /^https?:\/\//i.test(this.websiteLink)
      if (hasProtocol) {
        newUrl = this.websiteLink.replace(/^https?:\/\//i, '')
      } else {
        newUrl = this.websiteLink
      }
      axios
        .get(`https://api.ipstack.com/${newUrl}?access_key=938c46838746f3751c2ce322aa547f9e`)
        .then((response) => {
          this.results.ipAddress = response.data.ip
          this.results.countryName = response.data.country_name

          for (let i = 0; i < this.ips.length; i++) {
            if (this.ips[i].ipAddress === response.data.ip) {
              isHosted = true
              break // Stop once a match is found
            }
          }

          this.results.push({
            ipAddress: response.data.ip,
            isHosted: isHosted,
            countryName: response.data.country_name,
          })

          if (response.data.success == false) {
            loading.close()
            ElMessage.warning('Invalid website link')
            this.results.length = 0
            this.description = 'Invalid website link'
            return
          }
          loading.close()
        })
        .catch((e) => {
          ElMessage.error(e)
          loading.close()
        })
    },
  },
}
</script>

<style>
.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 90vh;
  width: 100%;
}

.wrapper {
  border: 1px solid #e1e1e1;
  padding: 30px;
  border-radius: 10px;
  width: 600px;
  max-width: 100%;
}
.wrapper h2 {
  text-align: center;
  border-bottom: 1px solid #e1e1e1;
  padding: 0 0 10px 0;
  font-weight: 600;
}
.wrapper i {
  display: block;
  color: var(--el-text-color-regular);
  text-align: left;
}
.container form {
  margin: 20px 0;
  display: flex;

  column-gap: 10px;
}
.result p span {
  display: block;
}
.sample {
  margin: 0;
  color: var(--el-text-color-regular);
  text-align: left;
}
</style>
