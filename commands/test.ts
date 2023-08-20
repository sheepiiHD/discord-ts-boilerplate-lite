import { SlashCommandBuilder } from '@discordjs/builders';
import {Client, CommandInteraction, User} from "discord.js";

export const data = new SlashCommandBuilder()
  .setName('test')
  .setDescription('Setup the whitelist server bot')
  .toJSON()

export const execute = async (client: Client, commandName: string, interaction: CommandInteraction | any) => {
 const user = interaction.user as User;

 await interaction.reply({content: `${user.username} this is you`, ephemeral: true});
};
