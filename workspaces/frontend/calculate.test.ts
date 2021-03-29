import { generateRoute } from 'geo-route-generator';

const startPos = {
  lat: 45.385348723467,
  lng: -72.644464557683,
};

const finalPos = {
  lat: 29.384348971766,
  lng: -85.526861831764,
};

const route = generateRoute(startPos, finalPos, 100);

test('Test of Index 11', () => {
  expect(route[11]).toEqual({
    lat: 43.4652287532629,
    lng: -74.19035223057264,
  });
});

test('Test of Index 54', () => {
  expect(route[54]).toEqual({
    lat: 36.58479886003155,
    lng: -79.72978305842722,
  });
});

test('Test of Index 99', () => {
  expect(route[99]).toEqual({
    lat: 29.38434897176612,
    lng: -85.5268618317634,
  });
});
