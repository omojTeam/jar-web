import { NewCard } from "./new-card";

export interface NewJar {
    "title": string,
    'cardsPerDay': number,
    'recipientEmail': string,
    "cards": Array<NewCard>
}
