export interface ResultsData {
  locations: Location[];
  cuisines: Cuisine[];
  shops: Shop[];
  shopSearchData: ShopSearchData | null;
  setShopSearchData: React.Dispatch<React.SetStateAction<ShopSearchData>>;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isOpen: boolean;
}

export interface ResultsAndSearchProps {
  shopSearchData: ShopSearchData | null;
  termQuery: string | null;
  results: ResultsData | null;
}

export interface ResultsAndSearchShopProps {
  shop: ShopSearch;
}

export interface UseShopSearch {
  isLoading: boolean;
  searchValue: string;
  setShopSearchData: React.Dispatch<React.SetStateAction<ShopSearchData>>;
  setSearchValue: React.Dispatch<React.SetStateAction<string>>;
  results: ResultsData | null;
  shopSearchData: ShopSearchData;
  termQuery: string | null;
}

export type ShopSearchData = {
  shops: ShopSearch[];
  meta: Meta;
} | null;

export interface SetShopSearchProps {
  setShopSearchData: React.Dispatch<React.SetStateAction<null>>;
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
  location_type?: string;
  locationType?: string;
  term: string;
  area: null | string;
  geo: Geo;
  setShopSearchData: React.Dispatch<React.SetStateAction<ShopSearchData>>;
  shopSearchData: ShopSearchData | null;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isOpen: boolean;
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
  shopSlug?: string;
  shop_slug?: string;
  location_name?: string;
  locationName?: string;
  shop: string;
}

export enum Type {
  Shops = 'shops'
}

export interface Meta {
  record_count: number;
}

export interface ShopSearch {
  location_kana_name: string;
  budget_lunch_max?: string;
  service_modes: string[];
  search_image?: string;
  locale: Locale;
  location_name_translations: Translation[];
  tags: string[];
  kana_name: string;
  cuisines: string[];
  budget_dinner_min: string;
  booking_page_mode: string;
  is_smartpay: boolean;
  name_translations: Translation[];
  name: string[];
  content_body_translations: Translation[];
  geocode: Geocode;
  currency: string;
  tagline_translations: Type[];
  content_title_translations: Translation[];
  slug: string;
  budget_lunch_min?: string;
  budget_dinner_max: null | string;
  distance: number;
  _id: string;
  availability: Type[];
}

export interface Translation {
  translation: string;
  locale: Locale;
}

export enum Locale {
  En = 'en',
  Ja = 'ja',
  ZhCN = 'zh-CN',
  ZhTW = 'zh-TW'
}

export interface Geocode {
  lon: number;
  lat: number;
}
