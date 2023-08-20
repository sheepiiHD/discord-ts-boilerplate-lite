import {InteractionResponse, Message } from "discord.js";


declare global {
  interface Promise<T> {
    expireMessage(this: Promise<Message>, time: number): Promise<Message>;

    expireInteractionResponse(this: Promise<InteractionResponse<boolean>>, time: number): Promise<InteractionResponse<boolean>>;
  }
}

export default () => {
  Promise.prototype.expireMessage = function (this: Promise<Message>, time: number) {
    return this.then(message => {
      setTimeout(() => {
        message.delete().catch(console.error);
      }, time);
      return message;
    });
  };

  Promise.prototype.expireInteractionResponse = function (this: Promise<InteractionResponse<boolean>>, time: number) {
    return this.then(interactionResponse => {
      setTimeout(() => {
        interactionResponse.delete().catch(console.error);
      }, time);
      return interactionResponse;
    });
  };

  console.log("Successfully loaded prototypes")
}
