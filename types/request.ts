import { Note } from './note';

export type CheckSessionRequest = {
    success: boolean;
};

export type ApiResponse = {
    notes: Note[];
    totalPages: number;
};

export type CreateNote = {
    title: string;
    content: string;
    tag: string;
};
