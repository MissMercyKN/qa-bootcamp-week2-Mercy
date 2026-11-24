// TOPIC: Objects & Optional Properties (?)
// QA USE: Models JSON payloads and API responses where certain fields might be omitted.

let cartItem: {
  productId: string;
  quantity: number;
  discountCode?: string; // '?' means this property is optional (can be undefined)
} = {
  productId: "01M85A78M8ZCSEJBH0TB198PAR",
  quantity: 2,
};

console.log("Cart item:", cartItem);