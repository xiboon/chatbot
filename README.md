<h1 align=center>Kurwbot</h1>
A chatbot made with markov chains.

## Usage
```ts
import { Chatbot } from 'kurwbot';
const chatbot = new Chatbot({data: [{question: 'hi', answer: 'hello'}]});
console.log(await chatbot.reply('hi')); // hello
```
