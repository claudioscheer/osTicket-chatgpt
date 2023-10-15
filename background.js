chrome.runtime.onMessage.addListener(function (request, _, sendResponse) {
  const { ticketItems, promp, apiKey, type } = request;

  sendResponse({ message: "Hello from background.js" });
});
