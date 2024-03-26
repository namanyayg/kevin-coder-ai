const WebSocket = require('ws')
var os = require('os');
var pty = require('node-pty');

const shell = os.platform() === 'win32' ? 'powershell.exe' : 'bash';


let terminalPromptString = '';

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
          cwd: 'test',
          env: process.env,
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