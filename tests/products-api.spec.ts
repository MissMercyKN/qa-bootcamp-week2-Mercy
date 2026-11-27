// 1. IMPORT: Bring in Playwright's test runner ('test') and assertion checker ('expect')
import { test, expect } from '@playwright/test';

// 2. TEST BLOCK: Name the test, and ask Playwright for the 'request' tool (our mini-Postman)
test('GET /products returns 200 and product list data', async ({ request }) => {

  // 3. ACT: Send a GET request and 'await' the server's reply before moving to the next line
  const response = await request.get('https://api.practicesoftwaretesting.com/products');

  // 4. ASSERT (Status): Check the envelope — did the server say "200 OK"?
  expect(response.status()).toBe(200);

  // 5. UNPACK: Open the envelope and read the JSON data inside ('await' because reading takes a moment)
  const body = await response.json();

  // 6. ASSERT (Content): Check the actual data inside the response
  expect(Array.isArray(body.data)).toBeTruthy(); // Is 'data' a list (array) of products?
  expect(body.data.length).toBeGreaterThan(0);   // Does the list have at least 1 product?
  expect(body.data[0]).toHaveProperty('name');   // Does the first product have a 'name' field?
});
