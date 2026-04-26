/**
 * IndexNow API Integration
 * 검색 엔진(Bing, Yandex 등)에 신규/수정된 URL을 즉시 통보합니다.
 */

const INDEXNOW_ENDPOINT = 'https://api.indexnow.org/IndexNow';
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
 * 대량의 URL을 IndexNow API로 전송합니다. (스트리밍 모드 대응)
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

  try {
    const response = await fetch(INDEXNOW_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify(payload),
    });

    if (response.ok) {
      console.log(`[IndexNow] Successfully notified ${urls.length} URLs.`);
      return true;
    } else {
      console.error(`[IndexNow] Failed to notify. Status: ${response.status}`);
      const text = await response.text();
      console.error(`[IndexNow] Error response: ${text}`);
      return false;
    }
  } catch (error) {
    console.error('[IndexNow] Network error:', error);
    return false;
  }
}
