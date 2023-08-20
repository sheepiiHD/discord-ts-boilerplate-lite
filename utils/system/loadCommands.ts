import path, {join} from "path";
import {REST} from '@discordjs/rest';
import {Routes} from 'discord-api-types/v9';
import {readdirSync} from 'fs';
import config from "../../configuration/config";
import {Client} from "discord.js";

const commandsDir = path.join(__dirname, '..', '..', 'commands');

export async function refreshApplicationCommands() {

  // Read command files
  const commandFiles = readdirSync(commandsDir).filter(file => file.endsWith('.ts'));

  const commands = [];

  // Import command data from each file and add to commands array
  for (const file of commandFiles) {

    const command = await import(commandsDir + '\\' + file);
    commands.push(command.data);
  }

  const rest = new REST({version: '10'}).setToken(config.token);

  try {
    await rest.put(
      Routes.applicationCommands(config.clientID),
      {body: commands},
    );

    console.log('Successfully loaded commands cache');
  } catch (error) {
    console.error(error);
  }
}

export default function loadCommands(client: Client | any) {

  // Import command files
  const commandFiles = readdirSync(commandsDir).filter(file => file.endsWith('.ts'));

  // Create a new Map for commands
  client.commands = new Map();

  // Load command data and execute function from each file into the Map
  for (const file of commandFiles) {
    const command = require(`${commandsDir}/${file}`);
    client.commands.set(command.data.name, command.execute);
  }
  console.log('Successfully loaded commands');
}
