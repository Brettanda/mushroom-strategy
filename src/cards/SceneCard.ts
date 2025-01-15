import { AbstractCard } from "./AbstractCard";
import { cards } from "../types/strategy/cards";
import { LovelaceChipConfig } from "../types/lovelace-mushroom/utils/lovelace/chip/types";
import { EntityRegistryEntry } from "../types/homeassistant/data/entity_registry";
import { ChipsCardConfig } from "../types/lovelace-mushroom/cards/chips-card";
import { generic } from "../types/strategy/generic";
import isCallServiceActionConfig = generic.isCallServiceActionConfig;
import isCallServiceActionTarget = generic.isCallServiceActionTarget;


// noinspection JSUnusedGlobalSymbols Class is dynamically imported.
/**
 * Scene Card Class
 *
 * Used to create a card for controlling an entity of the scene domain.
 *
 * @class
 * @extends AbstractCard
 */
class SceneCard extends AbstractCard {
  /**
   * Default configuration of the card.
   *
   * @type {SceneCardConfig}
   * @private
   */
  #defaultConfig: ChipsCardConfig = {
    type: "custom:mushroom-chips-card",
    chips: [],
  };

  /**
   * Class constructor.
   *
   * @param {EntityRegistryEntry} entity The hass entity to create a card for.
   * @param {cards.ChipsCardOptions} [options={}] Options for the card.
   * @throws {Error} If the Helper module isn't initialized.
   */
  constructor(entity: EntityRegistryEntry, options: cards.SceneCardOptions = {}, scenes: LovelaceChipConfig[] = []) {
    super(entity);

    this.#defaultConfig.chips = scenes;
    
    // Set the target for tap action.
    // if (
    //   isCallServiceActionConfig(this.#defaultConfig.tap_action)
    //   && isCallServiceActionTarget(this.#defaultConfig.tap_action.target)
    // ) {
    //   this.#defaultConfig.double_tap_action.target.entity_id = entity.entity_id;
    // }

    this.config = Object.assign(this.config, this.#defaultConfig, options);
  }
}

export { SceneCard };
