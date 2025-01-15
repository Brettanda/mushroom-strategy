import { TemplateChipConfig, WeatherChipConfig, EntityChipConfig } from "../lovelace-mushroom/utils/lovelace/chip/types";

export namespace chips {
  export type EntityChipOptions = Omit<EntityChipConfig, "type">;
  export type TemplateChipOptions = Omit<TemplateChipConfig, "type">;
  export type WeatherChipOptions = Omit<WeatherChipConfig, "type">;
}
