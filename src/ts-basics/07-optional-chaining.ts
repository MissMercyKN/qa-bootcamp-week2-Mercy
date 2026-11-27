// TOPIC: Optional Chaining (?.) & Nullish Coalescing (??)
// QA USE: Safely reads nested fields from an API response without crashing when an outer object is missing.

type ApiUser = {
  id: number;
  preferences?: {
    darkMode?: boolean;
  };
};

const userWithoutPrefs: ApiUser = { id: 101 };

// '?.' stops safely and returns undefined instead of throwing a TypeError
// '??' provides a default fallback (false) when the left side is null or undefined
const isDarkMode: boolean = userWithoutPrefs.preferences?.darkMode ?? false;

console.log("Dark mode enabled:", isDarkMode); 