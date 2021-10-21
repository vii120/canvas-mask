<template>
  <div
    class="canvas-wrapper"
    :style="{
      width: `${imgWidth}px`,
      height: `${imgHeight}px`,
    }"
  >
    <div
      class="canvas-bg"
      :style="{ 'background-image': `url(${uploadImg})` }"
    ></div>
    <canvas
      ref="canvas"
      @mousedown="onDrawStart"
      @mousemove="onDrawing"
      @mouseup="onDrawEnd"
      @mouseout="onDrawEnd"
    ></canvas>
    <div
      class="custom-cursor"
      :class="{ eraser: useEraser }"
      :style="{
        top: `${currentY}px`,
        left: `${currentX}px`,
        width: `${penSize}px`,
        height: `${penSize}px`,
      }"
    ></div>
    <div class="reupload-btn" @click="resetUploadImg">
      change another photo?
    </div>
  </div>
</template>

<script>
/* eslint-disable no-unused-vars */
import { mapState, mapActions } from 'vuex';

export default {
  name: 'Canvas',
  data() {
    return {
      canvasCtx: null,
      isDrawing: false,
      currentX: null,
      currentY: null,
    };
  },
  watch: {
    penSize(val) {
      this.canvasCtx.lineWidth = val;
    },
  },
  computed: {
    ...mapState('Image', ['uploadImg', 'imgWidth', 'imgHeight', 'canvasEl']),
    ...mapState('Tools', ['penType', 'penSize']),
    useEraser() {
      return this.penType === 'eraser';
    },
  },
  methods: {
    ...mapActions('Image', ['updateCanvasEl', 'resetUploadImg']),
    clearCanvas() {
      this.canvasCtx.clearRect(
        this.currentX,
        this.currentY,
        this.penSize,
        this.penSize
      );
    },
    onDrawStart() {
      if (this.isDrawing) return;
      this.isDrawing = true;
    },
    onDrawing(e) {
      // set mouse position
      this.currentX = e.offsetX;
      this.currentY = e.offsetY;
      if (!this.isDrawing) return;
      // using eraser
      if (this.useEraser) {
        this.clearCanvas(e);
        return;
      }
      // get next position
      const nextX = e.offsetX;
      const nextY = e.offsetY;
      // draw
      this.canvasCtx.beginPath();
      this.canvasCtx.moveTo(this.currentX, this.currentY);
      this.canvasCtx.lineTo(nextX, nextY);
      this.canvasCtx.stroke();
      // update current position
      this.currentX = nextX;
      this.currentY = nextY;
    },
    onDrawEnd() {
      if (!this.isDrawing) return;
      this.isDrawing = false;
    },
    initCanvas() {
      const canvasEl = this.$refs.canvas;
      canvasEl.width = this.imgWidth;
      canvasEl.height = this.imgHeight;
      this.updateCanvasEl(canvasEl);

      this.canvasCtx = canvasEl.getContext('2d');
      this.canvasCtx.lineJoin = 'round'; // style of connect part
      this.canvasCtx.lineCap = 'round'; // style of end part
      this.canvasCtx.lineWidth = this.penSize;
      this.canvasCtx.strokeStyle = '#fff';
    },
  },
  mounted() {
    this.initCanvas();
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.canvas-wrapper {
  position: relative;
  box-shadow: 0 0 5px rgba(#000, 0.5);
  margin: auto;
  .canvas-bg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    @include bg-img;
  }
  canvas {
    display: block;
    opacity: 0.7;
    cursor: none;
  }
  .reupload-btn {
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    margin: 0.1rem auto;
    cursor: pointer;
    border-bottom: 1px dashed;
  }
}

.custom-cursor {
  position: absolute;
  top: 0;
  left: 0;
  pointer-events: none;
  border-radius: 50%;
  background-color: rgba(#fff, 0.8);
  transform: translate(-50%, -50%);
  box-shadow: 0 0 5px rgba(#000, 0.5);
  &.eraser {
    border-radius: 0;
    transform: none;
  }
}
</style>
