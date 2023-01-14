import { Item, ItemGroup } from '@tablecheck/tablekit-item';
import * as React from 'react';

import {
  ResultsData,
  LocationPayload,
  CuisinePayload,
  ShopPayload,
  Shop,
  Location,
  Cuisine
} from 'Interfaces/results.interface';

const locationsStyles = (locations: Location[]) => {
  if (locations) {
    return { border: 'solid 1px grey' };
  }
  return { border: '0' };
};

const cuisinesStyles = (
  locations: Location[],
  cuisines: Cuisine[],
  shops: Shop[]
) => {
  if (shops && locations && cuisines) {
    return {
      borderLeft: 'solid 1px grey',
      borderRight: 'solid 1px grey'
    };
  }
  if (cuisines && locations) {
    return {
      borderLeft: 'solid 1px grey',
      borderRight: 'solid 1px grey',
      borderBottom: 'solid 1px grey'
    };
  }
  if (cuisines) {
    return { border: 'solid 1px grey' };
  }
  return { border: '0' };
};

const shopsStyles = (
  locations: Location[],
  cuisines: Cuisine[],
  shops: Shop[]
) => {
  if (shops && locations && cuisines) {
    return {
      border: 'solid 1px grey'
    };
  }
  if (shops && locations) {
    return {
      borderLeft: 'solid 1px grey',
      borderRight: 'solid 1px grey',
      borderBottom: 'solid 1px grey'
    };
  }
  if (shops) {
    return { border: 'solid 1px grey' };
  }
};

function Locations({
  term,
  geo,
  area,
  isOpen,
  setIsOpen,
  setShopSearchData
}: LocationPayload): JSX.Element {
  const fetchShops = async () => {
    try {
      const response = await fetch(
        `https://staging-snap.tablecheck.com/v2/shop_search?geo_latitude=${geo.lat}&geo_longitude=${geo.lon}&shop_universe_id=57e0b91744aea12988000001&locale=en&per_page=5`
      );
      const data = await response.json();
      setIsOpen(!isOpen);
      setShopSearchData(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Item
      customStyles="padding: 12px 20px 12px 48px; text-align: left"
      height="auto"
      onClick={fetchShops}
    >
      <div>{term}</div>
      <div>{area}</div>
    </Item>
  );
}
function Cuisines({ term }: CuisinePayload): JSX.Element {
  return (
    <Item
      customStyles="padding: 12px 20px 12px 48px; text-align: left"
      height="auto"
    >
      <div>{term}</div>
    </Item>
  );
}
function Shops({ shop, locationName }: ShopPayload): JSX.Element {
  return (
    <Item
      customStyles="padding: 12px 20px 12px 48px; text-align: left"
      height="auto"
    >
      <div>{shop}</div>
      <div>{locationName}</div>
    </Item>
  );
}

export function Results({
  locations,
  cuisines,
  shops,
  shopSearchData,
  setShopSearchData,
  setIsOpen,
  isOpen
}: ResultsData): JSX.Element {
  return (
    <>
      <div style={locationsStyles(locations)}>
        <ItemGroup hasIndent>
          {locations && (
            <p
              style={{
                textAlign: 'left',
                fontSize: 12,
                padding: '12px 20px 12px 48px',
                margin: '0'
              }}
            >
              AREA
            </p>
          )}
          {locations &&
            locations.map((value) => (
              <Locations
                key={`${value.payload.location_type}_${value.payload.term}_${value.payload.area}`}
                geo={value.payload.geo}
                term={value.payload.term}
                locationType={value.payload.location_type}
                area={value.payload.area}
                setShopSearchData={setShopSearchData}
                shopSearchData={shopSearchData}
                setIsOpen={setIsOpen}
                isOpen={isOpen}
              />
            ))}
        </ItemGroup>
      </div>
      <div style={cuisinesStyles(locations, cuisines, shops)}>
        <ItemGroup hasIndent>
          {cuisines && (
            <p
              style={{
                textAlign: 'left',
                fontSize: 12,
                padding: '12px 20px 12px 48px',
                margin: '0'
              }}
            >
              CUISINE
            </p>
          )}
          {cuisines &&
            cuisines.map((value) => (
              <Cuisines
                key={`${value.payload.term}`}
                term={value.payload.term}
              />
            ))}
        </ItemGroup>
      </div>
      <div style={shopsStyles(locations, cuisines, shops)}>
        <ItemGroup hasIndent>
          {shops && (
            <p
              style={{
                textAlign: 'left',
                fontSize: 12,
                padding: '12px 20px 12px 48px',
                margin: '0'
              }}
            >
              VENUE
            </p>
          )}
          {shops &&
            shops.map((value) => (
              <Shops
                key={`${value.payload.shop_slug}_${value.type}`}
                shop={value.text}
                locationName={value.payload.location_name}
              />
            ))}
        </ItemGroup>
      </div>
    </>
  );
}
