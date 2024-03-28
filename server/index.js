const WebSocket = require('ws')
const os = require('os');
const pty = require('node-pty');
const path = require('path');
require('dotenv').config();

console.log(`Setting CWD ${process.env.CWD}`)

const CWD = process.env.CWD || path.join(__dirname, 'kevin-output');

const shell = os.platform() === 'win32' ? 'powershell.exe' : 'bash';

const commandProcessor = (command) => {
    return command;
}

const outputProcessor = (output) => {
    return output;
}

const setupWebsocketAndPty = () =>{
  const wss = new WebSocket.Server({ port: 6060 })

  console.log("Socket is up and running...")

  wss.on('connection', ws => {
      console.log("new session")
      var ptyProcess = pty.spawn(shell, [], {
          name: 'xterm-color',
          cwd: CWD,
          env: process.env,
          cols: 128,
      });

      // Catch incoming request
      ws.on('message', command => {
          var processedCommand = commandProcessor(command)
          // console.log(processedCommand, "incoming command");
          ptyProcess.write(processedCommand);
      })

      // Output: Sent to the frontend
      ptyProcess.on('data', function (rawOutput) {
          var processedOutput = outputProcessor(rawOutput);
          ws.send(processedOutput);
          console.log('Processed Output:', processedOutput);
      });
  })
}

const main = async () => {
  setupWebsocketAndPty();
}

main()