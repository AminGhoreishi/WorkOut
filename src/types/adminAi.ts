export interface ChatMessage {
  id: string;
  role: "user" | "assistant" | "system";
  content: string;
  createdAt: string;
  model?: string;
}

export interface ChatSession {
  id: string;
  title: string;
  createdAt: string;
  messagesCount: number;
}

export interface AiPromptSuggestion {
  id: string;
  title: string;
  prompt: string;
  category: string;
}

export interface AdminAiChatProps {
  initialSessions?: ChatSession[];
}
