<template>
  <div class="intro-wrapper">
    <div class="demo-box">
      <img src="../assets/demo-origin.png" alt="draw" class="demo-origin" />
      <img src="../assets/demo-draw.png" alt="draw" class="demo-draw" />
      <img
        src="../assets/demo-result-transparent.png"
        alt="transparent"
        class="demo-transparent"
      />
      <img src="../assets/demo-result.png" alt="result" class="demo-colored" />
      <div class="title-box">
        <h1 class="logo">Canvas Mask</h1>
        <h2>crop picture with what you paint!</h2>
        <router-link to="/playground" class="btn start-btn">
          try it!
        </router-link>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Intro',
};
</script>
<style lang="scss">
.intro-wrapper {
  position: relative;
  padding-top: 0.7rem;
  z-index: 1;
  .demo-box {
    position: relative;
    display: flex;
    flex-wrap: wrap;
    padding-bottom: 0.8rem;
    z-index: -1;
    &:hover {
      img {
        filter: brightness(0.7);
        opacity: 0.4;
        &:hover {
          filter: none;
          opacity: 1;
          transform: translateY(-0.2rem);
          box-shadow: 0 0 0.5rem rgba(#000, 0.5);
        }
      }
    }
    img {
      display: block;
      width: 25%;
      min-height: 4rem;
      transition: all 0.5s;
      opacity: 0.7;
      box-shadow: 0 0 0.3rem rgba(#000, 0.3);
      cursor: crosshair;
      @include mobileWidth {
        width: 50%;
        box-shadow: none;
      }
    }
  }
  .title-box {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    padding-bottom: 0.3rem;
    z-index: 1;
    &:before {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-image: linear-gradient(to bottom, transparent, $main-bg);
      z-index: -1;
    }

    @include mobileWidth {
      bottom: 50%;
      transform: translateY(50%);
      padding-bottom: 0.5rem;
      &:before {
        background-image: none;
        background-color: rgba(#fff, 0.5);
      }
    }
  }
  h1 {
    font-size: 1rem;
    font-weight: bold;
    letter-spacing: 0.1rem;
    color: $primary-color;
    text-shadow: 5px 5px #fff;
  }
  h2 {
    font-size: 0.3rem;
  }
  .start-btn {
    width: 5rem;
    margin-top: 0.5rem;
    font-size: 0.3rem;
    background-image: linear-gradient(45deg, $primary-color 50%, #c19477 50%);
  }
}
</style>
