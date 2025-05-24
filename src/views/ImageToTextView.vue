<template>
  <div class="container">
    <div class="wrapper">
      <div :class="text == '' ? '' : 'row m-2'">
        <h2>Image to Text</h2>
        <div class="col">
          <div class="input-group mb-2">
            <input
              class="form-control"
              type="file"
              @change="selectImage"
              ref="fileInput"
              accept=".jpeg, .jpg, .png"
            />
            <button
              :disabled="text == ''"
              class="btn btn-danger input-group-text"
              @click="clearText"
            >
              &times;
            </button>
          </div>
        </div>
        <div v-if="text != ''" class="col border rounded">
          <div class="d-flex justify-content-center">
            <img class="base64_image shadow m-2" :src="base64" height="200" width="200" />
          </div>
        </div>
      </div>
      <div class="clipboard-container">
        <button class="clipboard-btn" @click="copyText" :disabled="text == ''">
          <i class="bi bi-clipboard"></i>
        </button>
        <textarea
          class="form-control mb-3"
          v-model="text"
          rows="10"
          cols="100"
          readonly
          placeholder="Paste image here..."
        ></textarea>
      </div>
    </div>
  </div>
</template>

<script>
import { ElLoading, ElMessage } from 'element-plus'
import { createWorker } from 'tesseract.js'

export default {
  data() {
    return {
      base64: '',
      inputFile: [],
      text: '',
      file: [],
    }
  },

  methods: {
    copyText() {
      ElMessage.success('Text copied to clipboard')
      navigator.clipboard.writeText(this.text)
    },

    clearText() {
      this.text = ''
      const dataTransfer = new DataTransfer()
      this.$refs.fileInput.files = dataTransfer.files
    },

    pasteImage(e) {
      const file = e.clipboardData.files[0]
      this.file = file
      const fileType = file.type
      if (fileType === 'image/jpeg' || fileType === 'image/jpg' || fileType === 'image/png') {
        const dataTransfer = new DataTransfer()
        dataTransfer.items.add(file)
        this.$refs.fileInput.files = dataTransfer.files

        this.convertImageToText()

        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = async () => {
          const base64 = reader.result
          this.base64 = base64
        }
        return
      }

      console.log('Please select an image only')
    },

    selectImage(e) {
      const file = e.target.files[0]
      this.file = file

      this.convertImageToText()

      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = async () => {
        const base64 = reader.result
        this.base64 = base64
      }
    },

    async convertImageToText() {
      const loading = ElLoading.service({
        lock: true,
        text: 'Loading',
        background: 'rgba(0, 0, 0, 0.7)',
      })
      try {
        const worker = await createWorker('eng')
        const ret = await worker.recognize(this.file)
        this.text = ret.data.text
        await worker.terminate()
        loading.close()
      } catch {
        loading.close()
      }
    },
  },

  mounted() {
    window.addEventListener('paste', this.pasteImage)
  },
}
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 80vh;
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
.clipboard-container {
  position: relative;
}

.clipboard-btn {
  position: absolute;
  top: 5px;
  right: 10px;
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
  color: #007bff;
}

.clipboard-btn:hover {
  color: #0056b3;
}

.base64_image {
  width: 100%;
  height: 100%;
}
</style>
