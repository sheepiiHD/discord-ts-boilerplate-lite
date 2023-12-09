Hello, welcome to my boilerplate bot that I use, and have created myself.

Setup:
1. Go to configuration/secrets.ts and put your [bot token](https://discord.com/developers/applications/). Also **important**: enable all intents
2. Download and install [Node Package Manager](https://nodejs.org/en/download)
3. Open terminal, type `npm i -g ts-node`
4. Navigate to the folder of your this bot, type `npm i && npm start`
5. Once you've installed the dependencies `npm i`, you can now just do `npm start`

## Creating Commands
> Make a file named something.ts in the `commands/` folder. Name doesn't matter, but it should be informative.
```typescript
// Command with a crap ton of options, you can choose which ones you want. 
export const data = new SlashCommandBuilder()
  .setName('test')
  .setDescription('does something')
  .addStringOption(option =>
    option.setName('stringinput')
      .setDescription('Input a string')
      .setRequired(true))
  .addIntegerOption(option =>
    option.setName('intinput')
      .setDescription('Input an integer'))
  .addBooleanOption(option =>
    option.setName('boolinput')
      .setDescription('Input a boolean'))
  .addUserOption(option =>
    option.setName('userinput')
      .setDescription('Mention a user'))
  .addChannelOption(option =>
    option.setName('channelinput')
      .setDescription('Mention a channel'))
  .addRoleOption(option =>
    option.setName('roleinput')
      .setDescription('Mention a role'))
  .addMentionableOption(option =>
    option.setName('mentioninput')
      .setDescription('Mention a user, role or channel'))
  .toJSON();

export const execute = async (client: Client, interaction: CommandInteraction | any) => {
  const user = interaction.user as User;

  // Retrieve the options
  const stringInput = interaction.options.getString('stringinput');
  const intInput = interaction.options.getInteger('intinput');
  const boolInput = interaction.options.getBoolean('boolinput');
  const userInput = interaction.options.getUser('userinput');
  const channelInput = interaction.options.getChannel('channelinput');
  const roleInput = interaction.options.getRole('roleinput');
  const mentionInput = interaction.options.getMentionable('mentioninput');

  await interaction.reply({
    content: `${user.username}, you provided the following options:\n
              String: ${stringInput}\n
              Integer: ${intInput}\n
              Boolean: ${boolInput}\n
              User: ${userInput?.username}\n
              Channel: ${channelInput?.name}\n
              Role: ${roleInput?.name}\n
              Mentionable: ${mentionInput?.name || mentionInput?.username}`,
    ephemeral: true
  });
};
```

## Creating Events
> Make a file named eventNameHere.ts in the `events/` folder. ie. **voiceStateUpdate.ts**. you can find a list of events [here](https://old.discordjs.dev/#/docs/discord.js/v13/typedef/Events). 
```typescript
import {Client, VoiceState} from "discord.js";

export default (client: Client) => {
  client.on('voiceStateUpdate', async (oldState: VoiceState, newState: VoiceState) => {
    const person = newState.id;
    const channelName = newState.channel.name;

    await newState.member.send({
      content: `<@${person}> you have joined/exited ${channelName}`,
      ephemeral: true
    });
  });
};
```

## Creating Interactions
> Make a file named whatever.ts in the `interactions/` folder. It is important that you put it in the right folder. If it's a button, put it in the button folder. etc.  
```typescript
import {ButtonInteraction, Client, Interaction} from "discord.js";

export const interactionName = 'this-is-your-customId'
const execute = async(client: Client, interaction: ButtonInteraction) => {
  
  // This added on an experimental function that I created, which deletes the message after 5000ms (5 seconds). 
  // You can add this to the end of interactions, to delete them after some time. It's important to note
  // that I created this, and it may have consequences using it, I just haven't run into them yet. 
  // You can find these in the loadPrototypes.ts
  await interaction.reply({
    content: 'hello world!',
    ephemeral: true
  }).expireInteractionResponse(5000);
}
```

If you have questions about something here, I'm on [Lucid City Discord](https://discord.gg/lucidcity), my name is Sheepii.

Before you ask tho, I won't help with bot development, there are a million resources available for that. I also won't build a bot for you.

Also, this bot is working. So, if it isn't working, it's something you did wrong. 


