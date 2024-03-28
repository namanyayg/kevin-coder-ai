<template>
  <main>
    <header>
      <h1>Kevin the Coder</h1>
      <h2 class="subtitle">Your Open Source AI Software Engineer</h2>
    </header>
    <Terminal></Terminal>
    <Chat></Chat>
    <About></About>
    <Colophon></Colophon>
  </main>
</template>

<script>
import Chat from './components/Chat.vue'
import Terminal from './components/Terminal.vue'
import About from './components/About.vue'
import Colophon from './components/Colophon.vue'
import './xterm.css'

export default {
  name: 'App',
  components: {
    Terminal,
    Chat,
    About,
    Colophon
  }
}
</script>

<style lang="stylus">
$font-family = 'Computer Modern Serif', Garamond, Georgia, "EB Garamond", serif;
html {
  font-size: 16px;
  overflow-x: hidden;
  font-family: $font-family;
  letter-spacing: -.3px;
}
body, html, #app {
  margin: 0;
  padding: 0;
}
h1, h2, h3 {
  font-weight: 400;
}
.subtitle {
  font-style: italic;
}
#app {
  width: 100%;
}
select, input, button {
  font-size: 1rem;
  font-family: $font-family;
  box-sizing: border-box;
}
main > header {
  text-align: center;
}
</style>
