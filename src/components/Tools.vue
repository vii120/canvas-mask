<template>
  <div class="tool-wrapper">
    <div class="switch-btn" v-if="!displayOutput">
      <div
        class="btn"
        :class="{ active: penType === el }"
        v-for="(el, key) in switchBtns"
        :key="key"
        @click="changePenType(el)"
      >
        {{ el }}
      </div>
    </div>
    <div class="range-box" v-if="!displayOutput">
      <input type="range" v-model="pen" min="1" max="50" />
      <div class="num">{{ penSize }}</div>
    </div>
    <div class="btn tool-btn" @click="resetCanvasEl" v-if="!displayOutput">
      clear
    </div>
    <div class="btn tool-btn" @click="toggleDisplay">
      {{ displayOutput ? 'edit mode' : 'generate' }}
    </div>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: 'Tools',
  computed: {
    ...mapState('Tools', ['switchBtns', 'penType', 'penSize']),
    ...mapState('Image', ['canvasEl', 'displayOutput']),
    pen: {
      get() {
        return this.penSize;
      },
      set(val) {
        this.updatePenSize(val);
      },
    },
  },
  methods: {
    ...mapActions('Tools', ['changePenType', 'updatePenSize']),
    ...mapActions('Image', ['toggleDisplay', 'resetCanvasEl']),
  },
};
</script>
<style lang="scss">
.tool-wrapper {
  margin-bottom: 0.7rem;
  display: flex;
  justify-content: center;
  align-items: center;
  .tool-btn {
    margin: 0 0.15rem;
  }
  .switch-btn {
    margin-right: 0.5rem;
    display: flex;
    align-items: center;
    border-radius: 0.8rem;
    box-shadow: 5px 5px 0 $secondary-color;
    overflow: hidden;
    .btn {
      background-color: rgba($primary-color, 0.5);
      box-shadow: none;
      &.active {
        background-color: $primary-color;
      }
      &:first-of-type {
        border-radius: 0.8rem 0 0 0.8rem;
      }
      &:last-of-type {
        border-radius: 0 0.8rem 0.8rem 0;
      }
    }
  }
  .range-box {
    margin-right: 0.3rem;
    display: flex;
    align-items: center;
    .num {
      width: 0.5rem;
    }
  }
}
</style>
