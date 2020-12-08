// selfはserviceWorkerをさす
const CacheName = "Cache:v1";

self.addEventListener("install", (event) => {
  console.log("ServiceWorker install:", event);
});

self.addEventListener("activate", (event) => {
  console.log("ServiceWorker activate:", event);
});

const networkFallingBackToCache = async (request) => {
  const cache = await caches.open(CacheName); // 定義した名前でキャッシュを開く
  try {
    const response = await fetch(request); // リクエストに対してレスポンスを保持
    await cache.put(request, response.clone()); // responseをコピーして(一度しか読み取れないものがあるから)、キャッシュに保存
    return response;
  } catch (err) {
    console.error(err);
    return cache.match(request);
  }
};

self.addEventListener("fetch", (event) => {
  // fetchに介入
  event.respondWith(networkFallingBackToCache(event.request));
});
