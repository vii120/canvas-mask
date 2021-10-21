<template>
  <div class="result-wrapper">
    <div
      class="img-wrapper"
      :style="{
        width: `${imgWidth}px`,
        height: `${imgHeight}px`,
        'background-color': useBgColor || 'transparent',
      }"
    >
      <div
        class="result-img"
        :style="{
          'background-image': `url(${uploadImg})`,
          'mask-image': `url(${canvasOutput})`,
        }"
      ></div>
    </div>
    <input type="color" id="color" @input="onSelectColor" />
    <label for="color" class="btn">
      select background
    </label>
    <div class="btn" @click="onSelectColor(null)">
      transparent
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex';

export default {
  name: 'Result',
  data() {
    return {
      useBgColor: null,
    };
  },
  computed: {
    ...mapState('Image', [
      'uploadImg',
      'imgWidth',
      'imgHeight',
      'canvasOutput',
    ]),
  },
  methods: {
    onSelectColor(e) {
      this.useBgColor = e ? e.target.value : null;
    },
  },
};
</script>
<style lang="scss">
.result-wrapper {
  .img-wrapper {
    box-shadow: 0 0 5px rgba(#000, 0.5);
    margin: auto;
  }
  .result-img {
    width: 100%;
    height: 100%;
    @include bg-img;
  }
  input[type='color'] {
    // display: none;
    visibility: hidden;
    width: 0;
    height: 0;
    overflow: hidden;
  }
  .btn {
    margin: 0.2rem;
  }
}
</style>
