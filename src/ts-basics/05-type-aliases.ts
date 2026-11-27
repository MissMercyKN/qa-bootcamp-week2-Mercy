// TOPIC: Type Aliases (type Name = { ... })
// QA USE: Creates a reusable blueprint for API responses so you don't repeat object shapes across tests.

type Product = {
  id: string;
  name: string;
  price: number;
  inStock?: boolean;
};

const pliers: Product = {
  id: "01M85A78M8ZCSEJBH0TB198PAR",
  name: "Combination Pliers",
  price: 14.15,
};

console.log(`${pliers.name} costs $${pliers.price}`);