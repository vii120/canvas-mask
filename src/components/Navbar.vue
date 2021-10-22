<template>
  <nav>
    <router-link to="/" class="logo">Canvas Mask</router-link>
    <router-link to="/">Home</router-link>
    <router-link to="/playground">Playground</router-link>
    <a
      href="https://github.com/vii120/canvas-mask"
      target="_blank"
      rel="noopener"
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
    padding-right: 0.3rem;
  }
}
</style>
