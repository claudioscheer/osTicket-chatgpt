chrome.runtime.onMessage.addListener(function (request, _, sendResponse) {
  console.log(request, sendResponse);

  sendResponse({ message: "Hello from background.js" });
});
