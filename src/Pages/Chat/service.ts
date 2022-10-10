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
  return axios.post(`${ip}/conversation/message`, { message, conversationId });
}

export function createMessageCron(conversationId: string, message: IMessage, time: string) {
  return axios.post(`${ip}/conversation/cron`, { message, conversationId, time });
}

export function createConversation(targetIds: string[]) {
  return axios.post(`${ip}/conversation`, { targetIds });
}

export function updateConversation(_id: string, payload: { [key: string]: any }) {
  return axios.put(`${ip}/conversation/${_id}`, payload);
}

export function getNumOfConversationUnseen() {
  return axios.get(`${ip}/conversation/unseen`);
}

export function postNumOfConversationUnseen({ conversationId }: { conversationId: string }) {
  return axios.post(`${ip}/conversation/unseen`, { conversationId });
}

export function getAllPhoto(payload: { userId: string }) {
  return axios.get(`${ip}/post/photos`, { params: payload });
}
