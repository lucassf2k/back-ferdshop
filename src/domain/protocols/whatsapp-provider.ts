export interface WhatsappProvider {
  sendMessage(params: { number: string; message: string }): Promise<void>;
}
