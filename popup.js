document.addEventListener("DOMContentLoaded", () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const url = tabs[0].url;
    chrome.tabs.sendMessage(
      tabs[0].id,
      { action: "getMetadata", stype: "popup", url: url },
      (response) => {
        console.log("popup:", response);
        if (response) {
          document.getElementById("title").innerText = response.title;
          document.getElementById("description").innerText =
            response.description;
          document.getElementById("canonical").innerText = response.canonical;
          document.getElementById("ogTitle").innerText = response.ogTitle;
          document.getElementById("ogDescription").innerText =
            response.ogDescription;
          document.getElementById("ogImage").src = response.ogImage;
          document.getElementById("ogUrl").innerText = response.ogUrl;
        } else {
          document.getElementById("title").innerText = "No data found";
        }
      }
    );
  });
});
