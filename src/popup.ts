document.getElementById("copyToClipboardBtn")!.addEventListener("click", () => copySong());

async function copySong() {
    console.log("e");
    const [tab] = await chrome.tabs.query({active: true, lastFocusedWindow: true});

    await chrome.tabs.update(tab.id, { active: true });
    await chrome.windows.update(tab.windowId, { focused: true });

    const response = await chrome.tabs.sendMessage(tab.id, {});
}