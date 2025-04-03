// Hex color validation regex
export const isValidHex = (hex) => /^#([0-9A-F]{3}){1,2}$/i.test(hex);

// Color contrast test
export const checkContrast = async (hex, contrastText) => {
  const response = await fetch(
      'https://www.aremycolorsaccessible.com/api/are-they', {
        mode: 'cors',
        method: 'POST',
        body: JSON.stringify({colors: [hex, contrastText]}),
      });
  const data = await response.json();
  return data.overall;
};