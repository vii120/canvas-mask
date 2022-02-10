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
      @touchstart="onDrawStart"
      @touchmove="onDrawing"
      @touchend="onDrawEnd"
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
      change another photo
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
    setTouchPosition(e) {
      // touch event
      if (e.offsetX === undefined) {
        const rect = e.target.getBoundingClientRect();
        this.currentX = e.targetTouches[0].clientX - rect.x;
        this.currentY = e.targetTouches[0].clientY - rect.y;
      }
    },
    setMousePosition(e) {
      if (e.offsetX) {
        [this.currentX, this.currentY] = [e.offsetX, e.offsetY];
      }
    },
    clearCanvas(e) {
      this.setTouchPosition(e);
      this.canvasCtx.clearRect(
        this.currentX,
        this.currentY,
        this.penSize,
        this.penSize
      );
    },
    onDrawStart(e) {
      if (this.isDrawing) return;
      this.isDrawing = true;
      this.setTouchPosition(e);
      this.setMousePosition(e);
    },
    onDrawing(e) {
      if (!this.isDrawing) {
        this.setMousePosition(e);
        return;
      }
      // using eraser
      if (this.useEraser) {
        this.clearCanvas(e);
        return;
      }
      // get next position
      let nextX, nextY;
      if (e.offsetX === undefined) {
        // touch event
        const rect = e.target.getBoundingClientRect();
        nextX = e.targetTouches[0].clientX - rect.x;
        nextY = e.targetTouches[0].clientY - rect.y;
      } else {
        // mouse event
        [nextX, nextY] = [e.offsetX, e.offsetY];
      }
      // draw
      this.canvasCtx.beginPath();
      this.canvasCtx.moveTo(this.currentX, this.currentY);
      this.canvasCtx.lineTo(nextX, nextY);
      this.canvasCtx.stroke();
      // update current position
      [this.currentX, this.currentY] = [nextX, nextY];
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
    @include bgImg;
  }
  canvas {
    display: block;
    opacity: 0.7;
    cursor: none;
    user-select: none;
  }
  .reupload-btn {
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    margin: 0.1rem auto;
    white-space: nowrap;
    cursor: pointer;
    border-bottom: 1px dashed;
  }
}

.custom-cursor {
  position: absolute;
  top: 0;
  left: 0;
  pointer-events: none;
  user-select: none;
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
