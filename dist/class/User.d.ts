import { Note } from './Note';
export declare class User {
    private name;
    private list;
    constructor(name: string);
    setName(newName: string): void;
    getName(): string;
    setNote(note: Note): void;
    removeNote(titleNota: string): void;
    getNotes(): Note[];
    searchNote(title: string): boolean;
}
