// TOPIC: Union Types (TypeA | TypeB)
// QA USE: Handles fields or parameters that accept multiple valid types (e.g., string or number IDs, or specific status codes).

function formatStatusCode(code: number | string): string {
  return `HTTP Status: ${code}`;
}

console.log(formatStatusCode(200));
console.log(formatStatusCode("404 Not Found"));