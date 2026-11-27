import { test, expect } from '@playwright/test';

const API_URL = process.env.TOOLSHOP_API_URL || 'https://api.practicesoftwaretesting.com';

test.describe('Toolshop API Suite', () => {
  // Test 1: Creates a cart, adds a product, checks response fields, and deletes the cart even if checks fail
  test('POST /carts creates a cart, adds a product, checks fields, and cleans up', async ({ request }) => {
    // 1. Fetch a real in-stock product dynamically
    const productsRes = await request.get(`${API_URL}/products`);
    expect(productsRes.status(), await productsRes.text()).toBe(200);
    const productsBody = await productsRes.json();
    const inStockProduct =
      productsBody.data.find((p: any) => p.in_stock === true) ?? productsBody.data[0];

    // 2. Create a new cart
    const createCartRes = await request.post(`${API_URL}/carts`);
    expect([200, 201], await createCartRes.text()).toContain(createCartRes.status());
    const createCartBody = await createCartRes.json();
    const cartId = createCartBody.id;
    expect(cartId).toBeTruthy();

    // 3. Always delete the created cart in finally, even if an assertion below fails
    try {
      const addItemRes = await request.post(`${API_URL}/carts/${cartId}`, {
        data: {
          product_id: inStockProduct.id,
          quantity: 1,
        },
      });
      expect([200, 201], await addItemRes.text()).toContain(addItemRes.status());

      // Fetch the cart and verify response fields
      const getCartRes = await request.get(`${API_URL}/carts/${cartId}`);
      expect(getCartRes.status(), await getCartRes.text()).toBe(200);
      const cartBody = await getCartRes.json();

      expect(cartBody.id).toBe(cartId);
      expect(Array.isArray(cartBody.cart_items)).toBeTruthy();
      expect(cartBody.cart_items.length).toBe(1);
      expect(cartBody.cart_items[0].product_id).toBe(inStockProduct.id);
      expect(cartBody.cart_items[0].quantity).toBe(1);
    } finally {
      const deleteRes = await request.delete(`${API_URL}/carts/${cartId}`);
      expect([200, 204]).toContain(deleteRes.status());
    }
  });

  // Test 2: Requests a cart ID that doesn't exist and checks for a 404
  test('GET /carts/:id returns 404 for a non-existent cart ID', async ({ request }) => {
    const response = await request.get(`${API_URL}/carts/nonexistent-cart-id-99999`);
    expect(response.status(), await response.text()).toBe(404);
  });
});