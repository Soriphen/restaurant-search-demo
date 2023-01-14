import * as React from 'react';
import { useLocation } from 'react-router-dom';

import { useDebounce } from 'Hooks/useDebounce';
import {
  ResultsData,
  ShopSearchData,
  Geo,
  UseShopSearch
} from 'Interfaces/results.interface';

export const useShopSearch = (): UseShopSearch => {
  const baseUrl = 'https://staging-snap.tablecheck.com/v2/autocomplete';
  const locale = 'en';
  const shopUniverseId = '57e0b91744aea12988000001';
  const [searchValue, setSearchValue] = React.useState<string>('');
  const [results, setResults] = React.useState<ResultsData | null>(null);
  const debouncedSearch = useDebounce(searchValue, 500);
  const [shopSearchData, setShopSearchData] =
    React.useState<ShopSearchData | null>(null);
  const location = useLocation();
  const [isLoading, setIsLoading] = React.useState(false);
  const query = new URLSearchParams(location.search);
  const termQuery = query.get('term');

  // Debounce search for locations
  React.useEffect(() => {
    const fetchResults = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(
          `${baseUrl}?locale=${locale}&shop_universe_id=${shopUniverseId}&text=${debouncedSearch}`
        );
        const data = await response.json();
        setResults(data);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
    if (debouncedSearch) {
      fetchResults();
    }
  }, [debouncedSearch]);

  // For searching with query parameter 'term' in the URL
  React.useEffect(() => {
    const fetchResults = async () => {
      try {
        const response = await fetch(
          `${baseUrl}?locale=${locale}&shop_universe_id=${shopUniverseId}&text=${termQuery}`
        );
        const data = await response.json();
        setResults(data);
      } catch (error) {
        console.error(error);
      }
    };

    const fetchShops = async (geo: Geo) => {
      try {
        const response = await fetch(
          `https://staging-snap.tablecheck.com/v2/shop_search?geo_latitude=${geo.lat}&geo_longitude=${geo.lon}&shop_universe_id=57e0b91744aea12988000001&locale=en&per_page=5`
        );
        const data = await response.json();

        setShopSearchData(data);
      } catch (error) {
        console.error(error);
      }
    };

    if (termQuery && !results) {
      fetchResults();
    }

    if (termQuery && results) {
      results?.locations?.forEach((loc) => {
        if (termQuery === loc.payload.term.toLocaleLowerCase()) {
          fetchShops(loc.payload.geo);
        }
      });
    }
  }, [termQuery, results]);

  return {
    isLoading,
    setShopSearchData,
    shopSearchData,
    searchValue,
    setSearchValue,
    results,
    termQuery
  };
};
