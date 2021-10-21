<template>
  <div class="upload-wrapper" v-if="!uploadImg">
    <input type="file" id="file" @change="onUpload" accept="image/*" />
    <label for="file" class="btn">
      {{ isUploading ? 'loading...' : 'upload your image' }}
    </label>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: 'Upload',
  computed: {
    ...mapState('Image', ['uploadImg', 'isUploading']),
  },
  methods: {
    ...mapActions('Image', ['onUpload']),
  },
};
</script>
<style lang="scss">
.upload-wrapper {
  height: 8rem;
  display: flex;
  justify-content: center;
  align-items: center;
  input {
    display: none;
  }
}
</style>
