import axios from 'axios';
import { ip } from '../../configs/ip';
import { IMessage } from '../../Models/chat';

function getOrCreateMessage(targetIds: string[]) {
  return axios.post(`${ip}/conversation`, {targetIds});
}

function getConversation(lastConversationId: undefined| string) {
  return axios.get(`${ip}/conversation`, {params: {lastConversationId}});
}

function getMessageByConversationId(conversationId: string,lastMessageId: undefined| string) {
  return axios.get(`${ip}/conversation/${conversationId}/message`, {params: {lastMessageId}});
}

function createMessage(conversationId: string,message: IMessage) {
  return axios.post(`${ip}/conversation/${conversationId}/message`, {message});
}


const service = {
  getOrCreateMessage,
  getConversation,
  getMessageByConversationId,
  createMessage
};
export default service;
