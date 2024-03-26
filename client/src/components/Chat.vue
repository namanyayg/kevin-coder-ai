<template>
  <form @submit.prevent="sendMessage">
    <input type="text" v-model="message" />
    <button>Send</button>
  </form>
</template>

<script>
export default {
  name: 'ChatView',
  data() {
    return {
      message: "",
      messages: [],
    };
  },
  methods: {
    chat(message) {
      this.messages.push({
        role: "user",
        content: message
      }); // Append the new message to the messages array
      console.log(message)
      // Send the entire messages array to the OpenAI API
      return fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.VUE_APP_OPENAI_API_KEY}`
        },
        body: JSON.stringify({
          model: 'gpt-4-turbo-preview',
          messages: this.messages
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.error) throw new Error(data.error.message);
          console.log(data)
          // Update the this.messages array with the response from OpenAI
          const choices = data.choices;
          const lastChoice = choices[choices.length - 1];
          const responseMessage = lastChoice.message;
          this.messages.push({
            role: "assistant",
            content: responseMessage.content
          });
          console.log(this.messages)
          return responseMessage.content
        })
        .catch((error) => {
          console.error(error);
        });
    },
    async planAndExecuteGoal (goal){
      const message = `
You are inside a shell.
Provide a series of terminal commands one after the other to ${goal}

Use only valid node js code and jest for testing.
Also write a test for the same.

All the text you give will directly be sent to a terminal, so don't include any unnecessary text and always give full response for any code. ONLY reply in valid terminal commands. Do NOT use echo or sed, only use "nano" to edit files.

EVERYTHING YOU SAY WILL DIRECTLY BE SENT TO A TERMINAL, so only reply with a stream of keypresses that will get the result. Please only provide a stream of keypresses to be piped into an actual terminal without any explanation or text. You can provide control characters like ^X to close nano. Instead of "Enter", use \\n. Please only send valid commands and keypresses that can execute the goal in a terminal directly, do not write any explanation or comments or I might lose my job.`
      const responseMessage = await chat(message)

      // remove ```bash and ``` from the message
      let responseMessageCleaned = responseMessage
        .replace(/```bash/g, '')
        .replace(/```/g, '')

      // convert all escape sequences to ascii characters. For example, ^O is represented by \x0f (ASCII 15) and ^X is represented by \x18 (ASCII 24).
      responseMessageCleaned = responseMessageCleaned
        .replace(/\^O/g, '\x0f')
        .replace(/\^X/g, '\x18')

      // replace \\n to \n
      responseMessageCleaned = responseMessageCleaned.replace(/\\n/g, '\n')

      // Send the response to the socket, line by line, using executeLikeNaturalTyping
      const lines = responseMessageCleaned.split('\n');
      console.log(lines)
      // executeLinesWhenReady(lines)
      this.$emit('lines', lines)
    },

    sendMessage() {
      this.$emit("send-message", this.message);
      this.message = "";
    },
  },
};
</script>