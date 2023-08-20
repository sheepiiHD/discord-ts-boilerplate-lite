import {ButtonInteraction, Client, Interaction} from "discord.js";

export const interactionName = 'button-test'
const execute = async(client: Client, interaction: ButtonInteraction) => {
  
  // This added on an experimental function that I created, which deletes the message after 5000ms (5 seconds). 
  // You can add this to the end of interactions, to delete them after some time. 
  await interaction.reply({
    content: 'hello world!',
    ephemeral: true
  }).expireInteractionResponse(5000);
}
