<template>
  <div class="result-wrapper">
    <div
      class="img-wrapper"
      :style="{
        width: `${imgWidth}px`,
        height: `${imgHeight}px`,
        'background-color': isTransparent ? 'transparent' : bgColor,
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
    <div class="btn-box">
      <input type="color" id="color" @input="onSelectColor" />
      <label for="color" class="btn">
        select background
      </label>
      <div class="check-wrapper" @click="isTransparent = !isTransparent">
        <span class="checkbox" :class="{ checked: isTransparent }"></span>
        transparent
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex';

export default {
  name: 'Result',
  data() {
    return {
      bgColor: '#fff',
      isTransparent: true,
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
      this.bgColor = e.target.value;
      this.isTransparent = false;
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
    @include bgImg;
  }
  input[type='color'] {
    // display: none;
    width: 0;
    height: 0;
    overflow: hidden;
  }
  .btn-box {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 0.2rem;
  }
  .check-wrapper {
    display: flex;
    align-items: center;
    margin-left: 0.3rem;
    font-weight: bold;
    cursor: pointer;
    .checkbox {
      position: relative;
      width: 0.3rem;
      height: 0.3rem;
      margin-right: 0.1rem;
      display: flex;
      justify-content: center;
      align-items: center;
      border: 2px solid;
      border-radius: 50%;
      &.checked:before {
        content: '\2713';
        font-size: 0.3rem;
      }
    }
  }
}
</style>
