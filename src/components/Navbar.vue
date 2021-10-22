<template>
  <nav>
    <router-link to="/" class="logo">Canvas Mask</router-link>
    <router-link class="page-link" to="/">Home</router-link>
    <router-link class="page-link" to="/playground">Playground</router-link>
    <a
      href="https://github.com/vii120/canvas-mask"
      target="_blank"
      rel="noopener"
      class="github-link"
    >
      Github
    </a>
  </nav>
</template>
<script>
export default {
  name: 'Navbar',
};
</script>
<style lang="scss">
nav {
  padding: 0 0.3rem;
  background-color: rgba($secondary-color, 0.5);
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  .logo {
    margin-right: auto;
    font-size: 0.4rem;
    white-space: nowrap;
    letter-spacing: 0;
  }
  a {
    padding: 0.1rem;
    padding-bottom: 0.05rem;
    margin-bottom: 0.05rem;
    margin-right: 0.3rem;
  }
  .page-link {
    position: relative;
    &:before {
      content: '';
      position: absolute;
      top: 100%;
      left: 0;
      width: 0;
      height: 0.05rem;
      border-radius: 0.2rem;
      background-color: $primary-color;
      transition: all 0.2s;
    }
    &:hover,
    &.router-link-exact-active {
      &:before {
        width: 100%;
      }
    }
  }
  .github-link {
    border: 1px solid;
    border-radius: 0.3rem;
  }
}
</style>
