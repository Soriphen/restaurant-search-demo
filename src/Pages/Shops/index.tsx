import { Item, ItemGroup } from '@tablecheck/tablekit-item';
import * as React from 'react';

import { ResultsData, LocationPayload } from 'Interfaces/results.interface';

import { ShopsWrapper } from './styles';

function Shop({ term }: LocationPayload): JSX.Element {
  // const [shopData, setShopData] = React.useState(null);

  // React.useEffect(() => {
  //   const fetchShopSearch = async () => {
  //     const response = await fetch(
  //       `https://staging-snap.tablecheck.com/v2/shop_search?geo_latitude=${geo.lat}&geo_longitude=${geo.lon}&shop_universe_id=57e0b91744aea12988000001&locale=en&per_page=5`
  //     );
  //     const data = await response.json();
  //     setShopData(data);
  //   };
  //   fetchShopSearch();
  // }, [geo]);

  // console.log(shopData);

  return <Item>{term}</Item>;
}

export function Locations({ locations }: ResultsData): JSX.Element {
  // React.useEffect(() => {
  //   console.log(locations, cuisines, shops);
  // }, [locations, cuisines, shops]);

  return (
    <ShopsWrapper>
      <ItemGroup>
        {locations &&
          locations.map((value) => (
            <Shop
              key={`${value.payload.locationType}_${value.payload.term}_${value.payload.area}`}
              geo={value.payload.geo}
              term={value.payload.term}
              locationType={value.payload.locationType}
              area={value.payload.area}
            />
          ))}
      </ItemGroup>
    </ShopsWrapper>
  );
}
