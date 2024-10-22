// // 현재 탭의 URL을 사용하여 메타 데이터를 가져오는 함수
// function getMetadata(callback) {
//   chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
//     const url = tabs[0].url; // 현재 탭의 URL 가져오기

//     // content.js로 메시지 전송
//     chrome.tabs.sendMessage(
//       tabs[0].id,
//       { action: "getMetadata", stype: "popup", url: url },
//       (response) => {
//         if (chrome.runtime.lastError) {
//           console.error("Error:", chrome.runtime.lastError.message);
//           callback(null); // 에러 발생 시 null 전달
//         } else {
//           response.title = "BG:" + response.title;
//           callback(response); // 응답 받기
//         }
//       }
//     );
//   });
// }

// // 브라우저 액션을 클릭했을 때 메타 데이터를 가져옴
// chrome.action.onClicked.addListener((tab) => {
//   getMetadata((data) => {
//     console.log("Page metadata:", data);
//   });
// });
