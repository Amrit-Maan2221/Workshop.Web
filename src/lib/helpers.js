export const formatColumnHeader = (col) => {
  if (!col) return "";

  // 1. Find the first uppercase letter or digit (the end of the identifier)
  const match = col.match(/[A-Z0-9]/);
  if (!match) return col; // Fallback if no uppercase found

  const startIndex = match.index;
  const usefulName = col.substring(startIndex);

  // 2. Separate CamelCase with spaces
  // ServiceName -> Service Name
  return usefulName
    .replace(/([A-Z0-9])/g, " $1")
    .trim();
};