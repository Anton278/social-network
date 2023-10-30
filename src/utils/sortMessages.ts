import { Chat, Message } from "@/models/Chat";

export function sortMessages(chat: Chat) {
  const chatCopy = JSON.parse(JSON.stringify(chat));
  chatCopy.messages = chatCopy.messages.sort(
    (a: Message, b: Message) => b.timeStamp - a.timeStamp
  );
  return chatCopy;
}
