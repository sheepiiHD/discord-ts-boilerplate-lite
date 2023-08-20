import config from "./configuration/config";
import intents from './utils/interfaces/Gateways';
import partials from './utils/interfaces/Partials';
import loadEvents from "./utils/system/loadEvents";
import loadPrototypes from "./utils/system/loadPrototypes";
import loadCommands from "./utils/system/loadCommands";
import loadInteractions from "./utils/system/loadInteractions";

const dc = require('discord.js');
const client = new dc.Client({
  partials: partials,
  intents: intents,
});

//Load all the commands
loadCommands(client);

//Load all the events in events folder
loadEvents(client);

//Load all the interactions in the interactions folder
loadInteractions(client);

//Load all the prototypes and overrides of objects
loadPrototypes();

client.login(config.token);
