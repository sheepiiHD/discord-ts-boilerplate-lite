import {Client} from "discord.js";
import { refreshApplicationCommands } from "../utils/system/loadCommands";

export default (client: Client) => {
  client.once('ready', async() => {

    //Refresh commands, so they're always up to date :)
    await refreshApplicationCommands();

    console.log(`Logged in as ${client.user?.tag}!`);
  });
};
