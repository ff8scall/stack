/**
 * IndexNow API Integration
 * 검색 엔진(Bing, Yandex 등)에 신규/수정된 URL을 즉시 통보합니다.
 */

const INDEXNOW_ENDPOINTS = [
  'https://api.indexnow.org/IndexNow', // Bing, Yandex, etc.
  'https://searchadvisor.naver.com/indexnow', // Naver
];
const HOST = 'stack.lego-sia.com';
const KEY = '083642cc731a4b27909fef930cda8a90';
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`;

interface IndexNowPayload {
  host: string;
  key: string;
  keyLocation: string;
  urlList: string[];
}

/**
 * 대량의 URL을 모든 등록된 IndexNow API 엔드포인트로 전송합니다.
 * @param urls 전송할 URL 리스트 (최대 10,000개 권장)
 */
export async function notifyIndexNow(urls: string[]) {
  if (!urls || urls.length === 0) return;

  const payload: IndexNowPayload = {
    host: HOST,
    key: KEY,
    keyLocation: KEY_LOCATION,
    urlList: urls,
  };

  const results = await Promise.all(
    INDEXNOW_ENDPOINTS.map(async (endpoint) => {
      try {
        const response = await fetch(endpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json; charset=utf-8',
          },
          body: JSON.stringify(payload),
        });

        if (response.ok) {
          console.log(`[IndexNow] Successfully notified ${urls.length} URLs to ${endpoint}. Status: ${response.status}`);
          return true;
        } else {
          const text = await response.text();
          console.error(`[IndexNow] Failed to notify ${endpoint}. Status: ${response.status}`);
          console.error(`[IndexNow] Error response: ${text}`);
          return false;
        }
      } catch (error) {
        console.error(`[IndexNow] Network error for ${endpoint}:`, error);
        return false;
      }
    })
  );

  return results.some((res) => res === true);
}
