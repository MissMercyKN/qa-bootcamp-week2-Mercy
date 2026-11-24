// Function with typed inputs and an explicit return type (: number)
function calculateTotal(price: number, quantity: number, discount: number = 0): number {
  const subtotal = price * quantity;
  return subtotal - discount;
}

console.log("Total without discount:", calculateTotal(15, 2));   
console.log("Total with discount:", calculateTotal(15, 2, 5));  