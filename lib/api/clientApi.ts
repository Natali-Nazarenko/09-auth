import { Note } from '@/types/note';
import { nextServer } from './api';
import {
    ApiResponse,
    CheckSessionRequest,
    CreateNote,
    LoginRequest,
    RegisterRequest,
    UpdateUserRequest,
    User,
} from '@/types/user';

export async function fetchNotes(page: number, search: string, tag?: string): Promise<ApiResponse> {
    const options = {
        method: 'GET',
        params: {
            page,
            perPage: 12,
            search,
            tag,
        },
    };

    const { data } = await nextServer.get<ApiResponse>('/notes', options);
    return data;
}

export async function fetchNoteById(noteId: Note['id']): Promise<Note> {
    const { data } = await nextServer.get<Note>(`/notes/${noteId}`);
    return data;
}

export async function createNote(payload: CreateNote): Promise<Note> {
    const { data } = await nextServer.post<Note>('/notes', payload);
    return data;
}

export async function deleteNote(noteId: Note['id']): Promise<Note> {
    const { data } = await nextServer.delete<Note>(`/notes/${noteId}`);
    return data;
}

export async function register(request: RegisterRequest) {
    const { data } = await nextServer.post<User>('/auth/register', request);
    console.log(data);
    return data;
}

export async function login(request: LoginRequest) {
    const { data } = await nextServer.post<User>('/auth/login', request);
    console.log(data);
    return data;
}

export async function logout(): Promise<void> {
    await nextServer.post('/auth/logout');
}

export async function checkSession() {
    const { data } = await nextServer.get<CheckSessionRequest>('/auth/session');
    return data.success;
}

export async function getMe() {
    const { data } = await nextServer.get<User>('/users/me');
    return data;
}

export async function updateMe(request: UpdateUserRequest) {
    const { data } = await nextServer.patch('/users/me', request);
    return data;
}
