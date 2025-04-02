// Hex color validation regex
export const isValidHex = (hex) => /^#([0-9A-F]{3}){1,2}$/i.test(hex);