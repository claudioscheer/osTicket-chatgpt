const btnGenerateReply = document.getElementById("generate_reply");
// const btnAnalyzeSentiment = document.getElementById("analyze_sentiment");
// const btnGetPriority = document.getElementById("get_priority");

btnGenerateReply.addEventListener("click", function () {
  chrome.tabs.query(
    { currentWindow: true, active: true },
    async function (tabArray) {
      const tabId = tabArray[0].id;

      const prompt_input = document.getElementById("prompt_input");
      const response = await chrome.tabs.sendMessage(tabId, {
        type: "generate_reply",
        prompt: prompt_input.value,
      });

      chrome.runtime.sendMessage(response, function (response) {
        console.log(response);
      });
    },
  );
});

const inputApiKey = document.getElementById("api_key");
chrome.storage.sync.get("api_key", function (data) {
  inputApiKey.value = data.api_key;
});

inputApiKey.addEventListener("change", function () {
  storeApiKey(inputApiKey.value);
});
inputApiKey.addEventListener("blur", function () {
  storeApiKey(inputApiKey.value);
});

function storeApiKey(value) {
  chrome.storage.sync.set({ api_key: value });
}
