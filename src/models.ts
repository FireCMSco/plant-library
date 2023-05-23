import {buildCollection, buildProperty, EntityReference} from "firecms";

export type Sunlight = "bright_direct" | "bright_indirect" | "shade" | "dark";
export type WateringFrequency = "daily" | "twice_a_week" |"weekly" | "monthly" | "rarely";

export type Plant = {
  name: string;
  scientific_name: string;
  other_names: string[];
  sunlight: string;
  watering: string;
  extra_care: string;
  picture: string;
  geographic_origin: string;
  curiosities: string;
}

