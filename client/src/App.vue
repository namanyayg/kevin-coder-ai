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
</style>
