import { type } from "os";

export type RecordsResponse = {
    content: RecordItem[];
    totalPages: number;    
}

export type RecordItem = {
    id: number;
    moment: string;
    name: string;
    age: number;
    gameTitle: string;
    gamePlatform: Platform,
    genderName: string;
}

export type Platform = 'XBOX' | 'PC' | 'PLAYSTATION';