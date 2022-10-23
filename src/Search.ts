import { distance } from "fastest-levenshtein";
import { Chatbot } from "./Chatbot";
export class Search {
    chatbot: Chatbot;
    constructor(chatbot: Chatbot) {
        this.chatbot = chatbot;
    }
    async search(text: string) {
        const records = this.chatbot.data.slice(0 - this.chatbot.maxFetched, -1);
        let maxAccuracy = 0;
        const bestMatches: string[] = [];
        for (const record of records) {
            const accuracy = text.length - distance(text, record.question) / text.length;
            if (accuracy >= maxAccuracy) {
                maxAccuracy = accuracy;
                bestMatches.push(record.answer);
            }
        }
        return bestMatches.slice(0 - this.chatbot.maxMatches);
    }
}
