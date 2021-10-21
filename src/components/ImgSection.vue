<template>
  <div class="img-section" :class="[imgClass]">
    <Result v-show="delayDisplayOutput" />
    <Canvas v-show="!delayDisplayOutput" />
  </div>
</template>
<script>
import { mapState } from 'vuex';
import Canvas from '@/components/Canvas.vue';
import Result from '@/components/Result.vue';

const delay = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export default {
  name: 'ImgSection',
  components: { Canvas, Result },
  data() {
    return {
      imgClass: '',
      delayDisplayOutput: false,
    };
  },
  watch: {
    async displayOutput(val) {
      this.imgClass = 'fadeout';
      await delay(300);
      this.imgClass = '';
      this.delayDisplayOutput = val;
    },
  },
  computed: {
    ...mapState('Image', ['displayOutput']),
  },
  mounted() {
    this.delayDisplayOutput = this.displayOutput;
  },
};
</script>
<style lang="scss">
.img-section {
  position: relative;
  transition: all 0.3s;
  &.fadeout {
    opacity: 0;
    visibility: hidden;
  }
}
</style>
