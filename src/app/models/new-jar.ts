import { NewCard } from "./new-card";

export interface NewJar {
    "title": string,
    'timesPerDay': number,
    'recipientEmail': string,
    "cards": Array<NewCard>
}
