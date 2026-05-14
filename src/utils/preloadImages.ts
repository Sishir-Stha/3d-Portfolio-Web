/**
 * Preload images with progress callback.
 * Returns array of loaded HTMLImageElement instances for cache.
 */
export function preloadImages(
  urls: string[],
  onProgress?: (loaded: number, total: number) => void
): Promise<HTMLImageElement[]> {
  let loaded = 0;
  const total = urls.length;

  return Promise.all(
    urls.map(
      (url) =>
        new Promise<HTMLImageElement>((resolve) => {
          const img = new Image();
          img.onload = () => {
            loaded++;
            onProgress?.(loaded, total);
            resolve(img);
          };
          img.onerror = () => {
            loaded++;
            onProgress?.(loaded, total);
            // Resolve with the img anyway to avoid breaking the sequence
            resolve(img);
          };
          img.src = url;
        })
    )
  );
}

/**
 * Preload images in batches to avoid overwhelming the browser.
 */
export async function preloadImagesBatched(
  urls: string[],
  batchSize: number = 20,
  onProgress?: (loaded: number, total: number) => void
): Promise<HTMLImageElement[]> {
  const results: HTMLImageElement[] = [];
  let totalLoaded = 0;

  for (let i = 0; i < urls.length; i += batchSize) {
    const batch = urls.slice(i, i + batchSize);
    const batchResults = await preloadImages(batch, (batchLoaded) => {
      onProgress?.(totalLoaded + batchLoaded, urls.length);
    });
    results.push(...batchResults);
    totalLoaded += batch.length;
  }

  return results;
}
