import axios from 'axios';
import { ip } from '../../configs/ip';
import { IMessage } from '../../Models/chat';

export function getOrCreateMessage(targetIds: string[]) {
  return axios.post(`${ip}/conversation`, { targetIds });
}

export function getConversation(lastConversationId: undefined | string) {
  return axios.get(`${ip}/conversation`, { params: { lastConversationId } });
}

export function getMessageByConversationId(
  conversationId: string,
  lastMessageId: undefined | string
) {
  return axios.get(`${ip}/conversation/${conversationId}/message`, { params: { lastMessageId } });
}

export function createMessage(conversationId: string, message: IMessage) {
  return axios.post(`${ip}/conversation/${conversationId}/message`, { message });
}
