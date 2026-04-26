import { Note } from './note';

export type RegisterRequest = {
    email: string;
    password: string;
};

export type User = {
    username: string;
    email: string;
    avatar: string;
};

export type LoginRequest = {
    email: string;
    password: string;
};

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

export type UpdateUserRequest = {
    username: string;
};
