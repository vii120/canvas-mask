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
      <input type="color" id="color" @input="onSelectColor" :value="bgColor" />
      <label for="color" class="btn">
        select background
      </label>
      <div class="check-wrapper" @click="isTransparent = !isTransparent">
        <span class="switcher" :class="{ active: isTransparent }"></span>
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
      bgColor: '#ffffff',
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
    .switcher {
      position: relative;
      width: 0.5rem;
      height: 0.1rem;
      margin-right: 0.1rem;
      border-radius: 0.2rem;
      background-color: #fff;
      transition: all 0.2s;
      &:before {
        content: '';
        position: absolute;
        left: 0;
        top: 50%;
        transform: translateY(-50%);
        width: 0.2rem;
        height: 0.2rem;
        border-radius: 50%;
        background-color: $secondary-color;
        transition: all 0.2s;
      }
      &.active {
        background-color: $secondary-color;
        &:before {
          left: calc(100% - 0.2rem);
          background-color: $primary-color;
        }
      }
    }
  }
}
</style>
