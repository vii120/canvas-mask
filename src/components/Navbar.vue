<template>
  <nav>
    <router-link to="/" class="logo">picanvas</router-link>
    <router-link to="/">Home</router-link>
    <router-link to="/playground">Playground</router-link>
    <a href="https://github.com/vii120/picanvas" target="_blank" rel="noopener">
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
  padding: 0 0.6rem;
  background-color: rgba($secondary-color, 0.5);
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  .logo {
    margin-right: auto;
    font-size: 0.5rem;
  }
  a {
    padding: 0.1rem;
    padding-right: 0.3rem;
  }
}
</style>
