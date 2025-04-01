export class MessageResponseDto {
    id: string;
    text: string;
    readAt: string;
    author: {
        id: string;
        name: string;
    };
} 