<template>
  <div class="box">
    <div id="container">
      <div id="terminal"></div>
    </div>
  </div>
</template>

<script>
import { Terminal } from 'xterm';
import { AttachAddon } from 'xterm-addon-attach';
import { FitAddon } from 'xterm-addon-fit';
import { WebLinksAddon } from 'xterm-addon-web-links';
import EventBus from '../lib/EventBus.js';

export default {
  name: 'TerminalView',
  data() {
    return {
      ws: WebSocket,
      terminal: new Terminal,
      isPtyReady: true,
      terminalPromptSanitized: '',
      directoryPathRegex: /([a-zA-Z-_ ]*:?[\\/][a-zA-Z-_ ]*)/g
    }
  },
  created() {
    var protocol = (location.protocol === "https:") ? "wss://" : "ws://";
    var url = protocol + "localhost:6060" + "/ws"
    var ws = new WebSocket(url);
    this.ws = ws
  },
  methods: {
    closeConnection() {
      this.ws.close()
      window.close()
    },
    loadConnection() {
      let ws = this.ws
      var terminal = new Terminal({
        screenKeys: true,
        useStyle: true,
        cursorBlink: true,
        screenReaderMode: true,
        cols: 128,
      });
      this.terminal = terminal
      terminal.open(document.getElementById("terminal"));


      var attachAddon = new AttachAddon(this.ws, { bidirectional: true });

      var fitAddon = new FitAddon();
      terminal.loadAddon(fitAddon);
      fitAddon.fit()

      var webLinkAddon = new WebLinksAddon()
      terminal.loadAddon(webLinkAddon)

      ws.onclose = () => {
        terminal.clear()
        terminal.writeln('Requires active websocket connection to start! Set it up using the code on Kevin\'s Github.')
      }

      ws.onopen = () => {
        terminal.loadAddon(attachAddon)
        terminal._initialized = true;
        terminal.focus();

        terminal.onTitleChange(function (event) {
          console.log(event)
        });

        window.onresize = function () {
          fitAddon.fit();
        };
      }

      let latestData = ''
      let isInNano = false
      ws.onmessage = (message) => {
        latestData = message.data
        if (!this.terminalPromptSanitized) {
          setTimeout(() => {
            // remove any windows or unix directory path
            this.terminalPromptSanitized = message.data.replace(this.directoryPathRegex, '');
            console.log('terminal prompt chosen', this.terminalPromptSanitized)
            this.isPtyReady = true
            console.log('PTY is ready')
          }, 500)
        }

        if (latestData.includes('GNU nano')) {
          isInNano = true
        }
        // if in nano then it's ready,
        // otherwise if latest data is equal to the terminal prompt message,
        // then we can say that it is "ready"
        console.log('latest sanitized', latestData.replace(this.directoryPathRegex, ''))
        this.isPtyReady = isInNano ? true : latestData.replace(this.directoryPathRegex, '') === this.terminalPromptSanitized
        // console.log(this.isPtyReady ? 'PTY is ready' : 'PTY is not ready')
      }
    },
    sendSlowlyLikeNaturalTyping(string) {
      return new Promise((resolve) => {
        let i = 0;
        const interval = setInterval(() => {
          this.ws.send(string[i]);
          i++;
          if (i === string.length) {
            clearInterval(interval);
            resolve();
          }
        }, 50);
      });
    },
    async executeLinesWhenReady(lines) {
      for (const line of lines) {
        // don't execute if line = sh
        if (["shell", "sh", ""].includes(line)) {
          continue;
        }
        while (!this.isPtyReady) {
          console.log('waiting for pty to be ready')
          await new Promise((resolve) => setTimeout(resolve, 500));
        }
        await this.sendSlowlyLikeNaturalTyping(line + '\r');
        await new Promise((resolve) => setTimeout(resolve, 100));
      }
      while (!this.isPtyReady) {
        console.log('waiting for pty to be ready')
        await new Promise((resolve) => setTimeout(resolve, 500));
      }
      EventBus.emit('executionComplete')
    }
  },
  mounted() {
    window.executeLinesWhenReady = this.executeLinesWhenReady
    this.loadConnection()
    this.$emit("toggleTerminal", { terminal: this.terminal })
    EventBus.on('executeLinesWhenReady', this.executeLinesWhenReady)
  },
  unmounted() {
    delete window.executeLinesWhenReady
    this.closeConnection()
  }
}
</script>
<style>
.box {
  display: flex;
  justify-content: center;
}

.xterm .xterm-viewport {
  overflow-y: hidden !important;
  overflow-x: hidden !important;
}

.terminal {
  padding: 10px;
}
</style>