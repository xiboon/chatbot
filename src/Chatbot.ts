import { Search } from "./Search.js";
import { Markov, MarkovData } from "kurwov";
import Util from "./Util.js";
export interface Question {
    question: string;
    answer: string;
    normalized?: string;
}
export interface ChatbotOptions {
    maxMatches?: number;
    maxFetched?: number;
    maxRepeated?: number;
    data: Question[];
}
export class Chatbot {
    maxMatches: number;
    maxFetched: number;
    maxRepeated: number;
    data: Question[];
    repeated: any[];
    searchClass: Search;
    constructor(options: ChatbotOptions) {
        this.maxMatches = options.maxMatches || 20;
        this.maxFetched = options.maxFetched || 100000;
        this.maxRepeated = options.maxRepeated || 10;
        this.data = options.data.map(e => ({question: e.question, answer: e.answer, normalized: Util.normalize(e.question)})).sort(Math.random);
        this.repeated = [];
        this.searchClass = new Search(this);
        setInterval(() => {
            this.repeated = this.repeated.slice(0 - this.maxRepeated, -1);
            this.data.sort(Math.random);
        }, 60000);
    }
    async reply(text: string) {
        const bestMatches = await this.searchClass.search(text);
        if (bestMatches.length === 0) {
            return "I don't know what to say";
        }
        const dataset = new MarkovData(bestMatches);
        const answer = Markov.generate({data: dataset});
        if (this.repeated.slice(0 - this.maxRepeated, -1).includes(answer)) {
            return Markov.generate({data: dataset});
        }
        this.repeated.push(answer);
        return answer;
    }
}
