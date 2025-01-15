import {AbstractCard} from "./AbstractCard";
import {cards} from "../types/strategy/cards";
import {EntityRegistryEntry} from "../types/homeassistant/data/entity_registry";
import {EntityCardConfig} from "../types/lovelace-mushroom/cards/entity-card-config";

/**
 * Image Card Class
 *
 * Used to create a card an entity of any domain.
 *
 * @class
 * @extends AbstractCard
 */
class ImageCard extends AbstractCard {
  /**
   * Default configuration of the card.
   *
   * @type {EntityCardConfig}
   * @private
   */
  #defaultConfig: EntityCardConfig = {
    type: "picture",
    // icon_color: "blue-grey",
  };

  /**
   * Class constructor.
   *
   * @param {EntityRegistryEntry} entity The hass entity to create a card for.
   * @param {cards.EntityCardOptions} [options={}] Options for the card.
   * @throws {Error} If the Helper module isn't initialized.
   */
  constructor(entity: EntityRegistryEntry, options: cards.EntityCardOptions = {}) {
    super(entity);

    this.config = Object.assign(this.config, this.#defaultConfig, options);
  }
}

export {ImageCard};
