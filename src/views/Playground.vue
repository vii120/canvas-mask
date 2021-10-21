<template>
  <div class="playground">
    <Upload v-if="!uploadImg" />
    <template v-else>
      <Tools />
      <ImgSection />
    </template>
  </div>
</template>
<script>
import { mapState } from 'vuex';
import Upload from '@/components/Upload.vue';
import Tools from '@/components/Tools.vue';
import ImgSection from '@/components/ImgSection.vue';

export default {
  name: 'Playground',
  components: { Upload, ImgSection, Tools },
  computed: {
    ...mapState('Image', ['uploadImg']),
  },
};
</script>
<style lang="scss">
.playground {
  padding: 0.5rem 0 1.5rem;
}
</style>
