<template>
  <main>
    <Terminal></Terminal>
    <Chat></Chat>
  </main>
</template>

<script>
import Chat from './components/Chat.vue'
import Terminal from './components/Terminal.vue'
import './xterm.css'

export default {
  name: 'App',
  components: {
    Terminal,
    Chat
  }
}
</script>

<style>
html {
  font-size: 16px;
}
body, html {
  margin: 0;
  padding: 0;
}
body, html, select, input, button {
  font-size: 100%;
  font-family: 'Consolas', 'Courier New', monospace;
}
body {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f0f0f0;
}
</style>
