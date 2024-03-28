<template>
  <footer>
    <p class="footer-credits">A brainchild of</p>
    <a rel="author" href="https://nmn.gl/" class="footer-title">
      <svg xmlns="http://www.w3.org/2000/svg" width="30" viewBox="0 0 406 405.47" class="svg-logo">
        <path d="M265 264.47v-122C265 74.91 210.27 20 142.71 20S20 74.77 20 142.32v243.15"></path>
        <path d="M141 142.47v121c0 67.56 55.71 122 123.26 122S386 331.66 386 264.1V20.47"></path>
      </svg><span class="logo__apostrophe">&rsquo;</span>s Lab</a>
    <p class="footer-credits">Handcrafted with love by <a href="https://nmn.gl/">Namanyay Goel ⚡</a></p>
  </footer>
</template>

<script>
export default {
  name: 'ColophonView'
}
</script>

<style lang="stylus" scoped>
$alt--font-family = 'Computer Modern Sans', Segoe UI, Avenir, Helvetica, monospace;
$color--alt-bg = #19202b;
$color--alt-bg--dark = #080f25;
$color--alt-bg-text = #edf4ff;
$color--alt-bg-text--light = #879bbb;
$spacing-unit =     2rem;

footer {
  color: $color--alt-bg-text--light;
  background: $color--alt-bg;
  background: radial-gradient($color--alt-bg, $color--alt-bg--dark);
  font-family: $alt--font-family;
  padding: $spacing-unit 0;
  margin: $spacing-unit * 3 0 0;
  font-weight: 400;
  text-align: center;
  color: $color--alt-bg-text--light;

  p {
    margin: 1.5rem 0;
  }

  a {
    border: none;
    text-decoration: none;
    color: inherit;
    &:hover {
      color: $color--alt-bg-text;
    }
  }
}

.svg-logo {
  // display: inline-block;
  margin-right: .2em;
  path {
    fill: none;
    stroke-linecap: round;
    stroke-miterlimit: 10;
    stroke-width: 40px;
    stroke: $color--alt-bg-text !important;
  }
}

.logo__apostrophe {
  transform: rotate(6deg) translate(-2px, 0);
  display: inline-block;
}

.footer-title {
  font-size: 2.1875rem;
  text-decoration: none;
  font-weight: 400;
  margin-bottom: $spacing-unit / 2;
  color: $color--alt-bg-text;
}
</style>