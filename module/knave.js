// Import Modules
import { knaveActor } from "./actor/actor.js";
import { knaveActorSheet } from "./actor/actor-sheet.js";
import { knaveMonsterSheet } from "./monster/monster-sheet.js";
import { knaveItem } from "./item/item.js";
import { knaveItemSheet } from "./item/item-sheet.js";

Hooks.once('init', async function() {

  game.knave = {
    knaveActor,
    knaveItem
  };

  /* Register Game Settings */
  game.settings.register("knave", "autoMonsterHP", {
    name: "Automatically calculate monster HP?",
    hint: "Calculates monster HP based on hit dice and multiplier.",
    scope: "world",
    config: true,
    default: true,
    type: Boolean
  });

  game.settings.register("knave", "clearInvOnGen", {
    name: "Clear inventory on character generation?",
    hint: "Delete a character's current inventory before generation.",
    scope: "world",
    config: true,
    default: true,
    type: Boolean
  });

  game.settings.register("knave", "giveThanks", {
    name: "Give your thanks?",
    hint: "Special thanks to Anathema, nikolaj-a, asocalips and solarbear on the Foundry VTT Discord for helping me through the creation of this system. A HUGE thanks to Rabid Baboon for giving me the inpsiration to start!",
    scope: "world",
    config: true,
    default: true,
    type: Boolean
  });

  /**
   * Set an initiative formula for the system
   * @type {String}
   */
  CONFIG.Combat.initiative = {
    formula: "1d20",
    decimals: 2
  };

  // Define custom Entity classes
  CONFIG.Actor.entityClass = knaveActor;
  CONFIG.Item.entityClass = knaveItem;

  // Register sheet application classes
  Actors.unregisterSheet("core", ActorSheet);
  Actors.registerSheet("knave", knaveActorSheet, {types: ["character"], makeDefault: true });
  Actors.registerSheet("knave", knaveMonsterSheet, {types: ["monster"], makeDefault: true });
  Items.unregisterSheet("core", ItemSheet);
  Items.registerSheet("knave", knaveItemSheet, { makeDefault: true });

  // If you need to add Handlebars helpers, here are a few useful examples:
  Handlebars.registerHelper('concat', function() {
    var outStr = '';
    for (var arg in arguments) {
      if (typeof arguments[arg] != 'object') {
        outStr += arguments[arg];
      }
    }
    return outStr;
  });

  Handlebars.registerHelper('toLowerCase', function(str) {
    return str.toLowerCase();
  });

  Handlebars.registerHelper('toUpperCase', (str) => {
    return str.toUpperCase();
  })
});