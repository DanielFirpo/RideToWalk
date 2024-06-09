import qs from "qs";
import { Media } from "@strapiTypes/schemas-to-ts/Media";

type ImageSize = "thumbnail" | "small" | "medium" | "large";
/**
 * Get a specific image URL by size, will return the closest size if unavailable.
 * @param {Media} image - The image.
 * @param {"thumbnail" | "xsmall" | "small" | "medium" | "large" | "xlarge"} [size="medium"] - The size, default medium.
 * @returns {string} The URL of the selected image.
 */
export function getImageURLBySize(image: Media, size: ImageSize = "medium"): string | undefined {
  const formats: ImageSize[] = ["thumbnail", "small", "medium", "large"];

  const requestedImage = image.attributes.formats[size]?.url;
  if (requestedImage) return process.env.NEXT_PUBLIC_API_URL + requestedImage;

  let smaller = formats.indexOf(size) - 1;
  let larger = formats.indexOf(size) + 1;

  for (; formats[smaller] || formats[larger]; smaller--, larger++) {
    const smallerFormat: ImageSize = formats[smaller];
    const largerFormat: ImageSize = formats[larger];

    if (image.attributes.formats[smallerFormat]) {
      return process.env.NEXT_PUBLIC_API_URL + image.attributes.formats[smallerFormat].url;
    } else if (image.attributes.formats[largerFormat]) {
      return process.env.NEXT_PUBLIC_API_URL + image.attributes.formats[largerFormat].url;
    }
  }
}

export function getStrapiURL(path = "") {
  return `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:1337"}${path}`;
}

/**
 * Server only.
 */
export async function fetchAPI(path: string, urlParamsObject = {}, options = {}) {
  try {
    const { requestUrl, mergedOptions } = buildStrapiRequest(path, urlParamsObject, options);

    // Trigger API call
    const response = await fetch(requestUrl, mergedOptions);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw new Error(`Please check if your server is running and you set all the required tokens.`);
  }
}

export async function fetchAPIClient(requestUrl: string, mergedOptions = {}) {
  try {
    // Trigger API call
    const response = await fetch(requestUrl, mergedOptions);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw new Error(`Please check if your server is running and you set all the required tokens.`);
  }
}

/**
 * Client only.
 */
export function buildStrapiRequest(path: string, urlParamsObject = {}, options = {}) {
  if (process.env.NEXT_PUBLIC_IS_STAGING) {
    console.warn(
      "Warning! NEXT_PUBLIC_IS_STAGING=true, which means the site will not be static and will be updated on every request!",
    );
  }

  // Merge default and user options
  const mergedOptions = {
    ...(process.env.NEXT_PUBLIC_IS_STAGING && { next: { revalidate: 5 } }),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.STRAPI_TOKEN ? process.env.STRAPI_TOKEN : process.env.NEXT_PUBLIC_API_TOKEN}`,
    },
    ...options,
  };

  // Build request URL
  const queryString = qs.stringify(urlParamsObject);
  const requestUrl = `${getStrapiURL(`/api${path}${queryString ? `?${queryString}` : ""}`)}`;

  return { requestUrl, mergedOptions };
}
