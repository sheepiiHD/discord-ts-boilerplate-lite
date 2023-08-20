import { Client, Interaction } from 'discord.js';
import fs from 'fs';
import path from 'path';

export default function loadInteractions(client: Client | any) {
  const interactionHandlers: { [type: string]: any } = {};

  const interactionTypes = ['button', 'select-menu'];

  for (let type of interactionTypes) {
    // Construct path to the current interaction type directory
    const dirPath = path.join(__dirname, '..', '..', 'interactions', type);
    // Read all files in the directory
    const files = fs.readdirSync(dirPath);

    for (let file of files) {
      // Skip non-TS files
      if (!file.endsWith('.ts')) continue;

      // Import interaction module
      const interactionModule = require(path.join(dirPath, file));

      // Store the handler by type and interactionName
      if (!interactionHandlers[type]) interactionHandlers[type] = {};
      interactionHandlers[type][interactionModule.interactionName] = interactionModule.execute;
    }
    console.log(`Successfully loaded ${type} interactions`)
  }

  client.on('interactionCreate', async(interaction: Interaction | any) => {

    if(interaction.isCommand()){
      const command = client.commands.get(interaction?.commandName);
      if (!command) return;

      try {
        await command(client, interaction.commandName, interaction);
      } catch (error) {
        console.error(error);
        await interaction.reply({
          content: 'There was an error while executing this command!',
          ephemeral: true
        }).expireInteractionResponse(5000);
      }
    }

    const type = interaction.isButton() ? 'button' :
        interaction.isContextMenuCommand() ? 'context-menu' :
        interaction.isMessageComponent() ? 'message-component':
        interaction.isStringSelectMenu() ? 'select-menu' : null;

    if (type && interactionHandlers[type] && interactionHandlers[type][interaction.customId]) {
      interactionHandlers[type][interaction.customId](client, interaction);
    }
  });

  console.log('Successfully loaded interactions');
}
