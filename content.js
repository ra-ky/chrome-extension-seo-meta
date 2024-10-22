// 주어진 URL에서 메타 데이터를 추출하는 함수
async function getPageMetadata(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const text = await response.text();
  const parser = new DOMParser();
  const doc = parser.parseFromString(text, "text/html");

  const title = doc.querySelector("title")?.innerText || "No title found";
  const description =
    doc.querySelector(
      'meta[name="description"], meta[name="DESCRIPTION"], meta[name="Description"]'
    )?.content || "No description found";
  const canonical =
    doc.querySelector(
      'link[rel="canonical"], link[rel="Canonical"], link[rel="CANONICAL"]'
    )?.href || "No canonical found";
  const ogTitle =
    doc.querySelector('meta[property="og:title"]')?.content ||
    "No og:title found";

  const ogDescription =
    doc.querySelector('meta[property="og:description"]')?.content ||
    "No og:title found";

  let ogImage = doc.querySelector('meta[property="og:image"]')?.content;

  if (ogImage) {
    // 절대 경로가 아닌 경우 도메인 추가
    if (!ogImage.startsWith("http")) {
      ogImage = `${window.location.origin}${
        ogImage.startsWith("/") ? "" : "/"
      }${ogImage}`;
    }
  } else {
    ogImage = "No og:image found";
  }

  const ogUrl =
    doc.querySelector('meta[property="og:url"]')?.content || "No og:url found";

  return {
    title,
    description,
    canonical,
    ogTitle,
    ogDescription,
    ogImage,
    ogUrl,
  };
}

// 메타 데이터를 background.js로 전달
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  // console.log(message);
  // console.log(sender);
  // console.log(sendResponse);
  if (message.action === "getMetadata") {
    getPageMetadata(message.url)
      .then((metadata) => {
        // console.log("then:", metadata);
        sendResponse(metadata);
      })
      .catch((error) => {
        // console.log("catch:", error);
        sendResponse(null);
      });
    return true;
  }
});
