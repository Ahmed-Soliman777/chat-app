import { create } from "zustand";

type ChatUser = {
  onlineIds: string[];
};

export const useChatStore = create<ChatUser>((set) => ({
   onlineIds: [] 
}))
