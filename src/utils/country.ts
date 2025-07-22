import { conf } from "@/setup/config";

// Function to get user's country from browser locale
function getCountryFromLocale() {
  const locale = navigator.language;
  const parts = locale.split("-");
  return parts.length > 1 ? parts[1] : null;
}

// Function to get user's country from IP address using an external service
async function getCountryFromIP() {
  try {
    const response = await fetch(conf().PROXY_URLS[0]);
    const data = await response.json();
    return data.countryCode;
  } catch (error) {
    console.error("Error fetching country from IP:", error);
    return null;
  }
}

// Combined function to get user's country
export async function getUsersCountry(): Promise<string> {
  let country = getCountryFromLocale();
  if (country) {
    return country;
  }
  country = await getCountryFromIP();
  return country || "US"; // Default to "US" if all else fails
}
