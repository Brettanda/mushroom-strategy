import { AbstractCard } from "./AbstractCard";
import { cards } from "../types/strategy/cards";
import { HassEntities, HassEntity } from "home-assistant-js-websocket";
import { AreaRegistryEntry } from "../types/homeassistant/data/area_registry";
import { EntityRegistryEntry } from "../types/homeassistant/data/entity_registry";
import { TemplateCardConfig } from "../types/lovelace-mushroom/cards/template-card-config";

// noinspection JSUnusedGlobalSymbols Class is dynamically imported.
/**
 * Area Card Class
 *
 * Used to create a card for an entity of the area domain.
 *
 * @class
 * @extends AbstractCard
 */
class AreaCard extends AbstractCard {
  /**
   * Default configuration of the card.
   *
   * @type {TemplateCardConfig}
   * @private
   */
  #defaultConfig: TemplateCardConfig = {
    // type: "custom:stack-in-card",
    // cards: [{
      type: "custom:mushroom-template-card",
      primary: undefined,
      secondary: "",
      icon: "mdi:texture-box",
      icon_color: "blue",
      tap_action: {
        action: "navigate",
        navigation_path: "",
      },
      hold_action: {
        action: "none",
      },
    // }
    //   , {
    //   type: "custom:mushroom-chips-card",
    //   chips: [],
    //   alignment: "end"
    // }]
  };

  /**
   * Class constructor.
   *
   * @param {AreaRegistryEntry} area The area entity to create a card for.
   * @param {cards.TemplateCardOptions} [options={}] Options for the card.
   *
   * @throws {Error} If the Helper module isn't initialized.
   */
  constructor(area: AreaRegistryEntry, options: cards.TemplateCardOptions = {}, secondary: { [key: string]: HassEntity[] }, occupancy: HassEntity[], chips: { [key: string]: EntityRegistryEntry[] | HassEntity[] } = {}) {
    super(area);

    // Don't override the default card type if default is set in the strategy options.
    if (options.type === "default") {
      delete options.type;
    }

    // Initialize the default configuration.
    // this.#defaultConfig.cards[0].primary = area.name;
    this.#defaultConfig.primary = area.name;
    // this.#defaultConfig.cards[0].icon = area?.icon ?? "mdi:texture-box";
    this.#defaultConfig.icon = area?.icon ?? "mdi:texture-box";
    // if (this.#defaultConfig.cards[0].tap_action && ("navigation_path" in this.#defaultConfig.cards[0].tap_action)) {
    if (this.#defaultConfig.tap_action && ("navigation_path" in this.#defaultConfig.tap_action)) {
      // this.#defaultConfig.cards[0].tap_action.navigation_path = area.area_id;
      this.#defaultConfig.tap_action.navigation_path = area.area_id;
    }

    if (secondary.temps.length) {
      // this.#defaultConfig.cards[0].secondary = `${secondary.temps[0].state} ${secondary.temps[0].attributes.unit_of_measurement}`;
      // this.#defaultConfig.cards[0].secondary = `{{ states('${secondary.temps[0].entity_id}') }} {{ state_attr('${secondary.temps[0].entity_id}','unit_of_measurement') }}`;
      this.#defaultConfig.secondary = `{{ states('${secondary.temps[0].entity_id}') }} {{ state_attr('${secondary.temps[0].entity_id}','unit_of_measurement') }}`;
    }

    // if (occupancy.length) {
    //   this.#defaultConfig.cards[0].badge_color = "orange";
    //   occupancy.map(occ => {
    //     console.log("occupancy", occ.state);
    //     if (occ.state === "on") {
    //       this.#defaultConfig.cards[0].badge_icon = "mdi:walk";
    //       return;
    //     }
    //   })
    //   // this.#defaultConfig.badge_icon 
    // }

    if (occupancy.length) {
      // this.#defaultConfig.cards[0].badge_icon = "";
      this.#defaultConfig.badge_icon = "";
      let first = false;
      occupancy.map(o => {
        if (!first) {
          // this.#defaultConfig.cards[0].badge_icon += `{% if is_state('${o.entity_id}', 'on') %}mdi:walk`;
          this.#defaultConfig.badge_icon += `{% if is_state('${o.entity_id}', 'on') %}mdi:walk`;
        } else {
          // this.#defaultConfig.cards[0].badge_icon += `{% elif is_state('${o.entity_id}', 'on') %}mdi:walk`;
          this.#defaultConfig.badge_icon += `{% elif is_state('${o.entity_id}', 'on') %}mdi:walk`;
        }
        first = true;
      });
      // this.#defaultConfig.cards[0].badge_icon += "{% endif %}";
      this.#defaultConfig.badge_icon += "{% endif %}";
    }

    // console.log("chips", chips);
    // if (chips.light && chips.light.length > 0) {
    //   this.#defaultConfig.cards[1].chips.push({
    //     type: "conditional",
    //     or: chips.light.map(c => { return { condition: "state", entity: c.entity_id, state: "on" } }),
    //     chip: {
    //       type: "template",
    //       content: `${chips.light.length}`,
    //       icon: `mdi:lightbulb-group`
    //     }
    //   })
    // }
    // console.log(chips.openings);
    // if (chips.openings && chips.openings.length > 1) {
    //   this.#defaultConfig.cards[1].chips.push({
    //     type: "conditional",
    //     // // or: chips.openings.map(c => { return { condition: "state", entity: c.entity_id, state: "on" } }),
    //     or: {
    //       condition: "state",
    //       entity: chips.openings[1].entity_id,
    //       state: "Open"
    //     },
    //     chip: {
    //       type: "template",
    //       content: `${chips.openings.length}`,
    //       icon: `mdi:door`
    //     }
    //     // type: "entity",
    //     // entity: chips.openings[0].entity_id,
    //     // icon: `mdi:door`
    //   })
    // }

    this.config = Object.assign(this.config, this.#defaultConfig, options);
  }
}

export { AreaCard };
