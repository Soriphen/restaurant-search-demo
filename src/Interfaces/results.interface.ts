// export type NestedObject<Type> = {
//   [key: string]: NestedObject<Type> | Type[] | Type;
// };

// export type Locations = {
//   payload: {
//     geo: { lat: number; lon: number };
//     term: string;
//     location_type: string;
//     area: string | null;
//   };
//   text: string;
//   type: string;
// };

// export type ResultsData = {
//   cuisines: NestedObject<number | string>[];
//   locations: Locations[];
//   shops: NestedObject<number | string>[];
// };

// export type ShopProps = {
//   lat: number;
//   lon: number;
//   term: string;
// };

// export type Results = {
//   results: ResultsData | null;
// };
export interface ResultsData {
  locations: Location[];
  cuisines: Cuisine[];
  shops: Shop[];
}

export interface Cuisine {
  text: string;
  type: string;
  payload: CuisinePayload;
}

export interface CuisinePayload {
  term: string;
}

export interface Location {
  text: string;
  type: string;
  payload: LocationPayload;
}

export interface LocationPayload {
  locationType: string;
  term: string;
  area: null | string;
  geo: Geo;
}

export interface Geo {
  lat: number;
  lon: number;
}

export interface Shop {
  text: string;
  type: Type;
  payload: ShopPayload;
}

export interface ShopPayload {
  shopSlug: string;
  locationName?: string;
}

export enum Type {
  Shops = 'shops'
}
