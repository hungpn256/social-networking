import axios from 'axios';
import { ip } from '../../configs/ip';
import { IMessage } from '../../Models/chat';

export function getOrCreateMessage(targetIds: string[]) {
  return axios.post(`${ip}/conversation`, { targetIds });
}

export function getConversation(lastConversationUpdatedAt: undefined | string) {
  return axios.get(`${ip}/conversation`, { params: { lastConversationUpdatedAt } });
}

export function getMessageByConversationId(
  conversationId: string,
  lastMessageId: undefined | string
) {
  return axios.get(`${ip}/conversation/${conversationId}/message`, { params: { lastMessageId } });
}

export function createMessage(conversationId: string, message: IMessage) {
  console.log("🚀 ~ file: service.ts ~ line 21 ~ createMessage ~ conversationId", conversationId)
  return axios.post(`${ip}/conversation/message`, { message, conversationId });
}

export function createConversation(targetIds: string[]) {
  return axios.post(`${ip}/conversation`, { targetIds });
}
