import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface BlogPost {
    id: bigint;
    title: string;
    content: string;
    date: string;
    tags: Array<string>;
    isVlog: boolean;
    imageUrl: string;
    excerpt: string;
    category: string;
}
export interface ContactMessage {
    id: bigint;
    name: string;
    email: string;
    message: string;
    timestamp: bigint;
}
export interface backendInterface {
    getAllBlogPosts(): Promise<Array<BlogPost>>;
    getAllContactMessages(password: string): Promise<Array<ContactMessage>>;
    getBlogPost(id: bigint): Promise<BlogPost>;
    initializePosts(): Promise<void>;
    submitContactMessage(name: string, email: string, message: string): Promise<bigint>;
}
