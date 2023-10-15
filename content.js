chrome.runtime.onMessage.addListener(function (request, _, sendResponse) {
  const ticketItems = getAllEvents();
  if (request.type === "generate_reply") {
    sendResponse({ ticketItems });
  }
});

function recursive(node, data) {
  if (node.classList && node.id.includes("thread-entry")) {
    const text = node.querySelector(".thread-body div").textContent;
    const title = node.querySelector(".header").textContent.trim();
    data.push({ type: "thread-entry", title, text });
  }

  if (node.classList && node.classList.contains("thread-event")) {
    const text = node.querySelector(".description").textContent;
    data.push({ type: "thread-event", text });
  }

  for (let child of node.children) {
    recursive(child, data);
  }
}

function getAllEvents() {
  const threadItems = document.getElementById("thread-items");

  const ticketEvents = [];
  recursive(threadItems, ticketEvents);

  return ticketEvents;
}
