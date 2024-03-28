<template>
  <section>
    <p class="intro"><strong>Kevin the Coder</strong> <em>(Alpha PoC)</em> interacts with your local filesystem using a
      websocket connection to pty
      <em>(that <a href="https://github.com/namanyayg/kevin">you have to separately install</a>)</em> and writes
      JavaScript code and Jest tests to write any code that
      you want. Currently, it cannot read or modify existing codebases.
    </p>
    <hr />
    <p>Since I started freelancing around <span class="tilde">~</span>{{ yearsAgo }} years ago, it has been a dream of
      mine to create a bot that could write code for me <em>(so I could delegate the boilerplate and focus on the
        creative parts of programming).</em></p>
    <p>Seeing <a href="https://www.cognition-labs.com/">Devin</a> made me realize that my teenage dream is close to
      becoming reality. For personal satisfaction, I&rsquo;ve embarked on making my own <a
        href="https://github.com/namanyayg/kevin">open-source</a> interface.</p>
    <p>The name comes from the legendary phreaker and my childhood hero <strong>Kevin Mitnick</strong> and is a play on
      Cognition Labs&rsquo; product name.</p>
    <p>I have clocked around <span class="tilde">~</span>8 hours working on Kevin till now, so please keep the
      appropriate expectations. I&rsquo;ve made Kevin for myself as a hobby project and I&rsquo;m usually actively working on <a
        href="https://nmn.gl/">something else</a>.</p>
    <p><strong>Tasks:</strong></p>
    <ul>
      <li class="checked"><input type="checkbox" checked /><s>Make a terminal web interface connected to the local
          filesystem using websocket and node-pty.</s></li>
      <li class="checked"><input type="checkbox" checked /><s>Make GPT4 work with the terminal using nano, node, and
          jest.</s></li>
      <li><input type="checkbox" />Set up RAG so it can modify any existing codebase</li>
    </ul>
  </section>
</template>

<script>
export default {
  name: 'AboutView',
  data() {
    return {
      yearsAgo: new Date().getFullYear() - 2014
    }
  }
}
</script>

<style scoped>
section {
  width: 40em;
  margin: 4em auto 0;
  font-size: 1.25em;
  line-height: 1.5;
}

hr {
  border: none;
  border-bottom: thin solid #ccc;
}

.tilde {
  transform: translateY(.3em);
  display: inline-block;
}

ul {
  list-style: none;
  padding-left: 0;
}

ul input {
  margin-right: .5em;
}

li {
  margin-bottom: .5em;
}

.checked {
  color: #666;
}
</style>