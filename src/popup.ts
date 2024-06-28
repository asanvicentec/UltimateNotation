import { copyTextToClipboard } from "./scripts/utils";

document.getElementById("copyToClipboardBtn")!.addEventListener("click", () => copySong());
document.getElementById("convertBtn")!.addEventListener("click", () => convertNotes());

const resNode = document.querySelector("#result");

const getContent = () => {
    return document.querySelector('.tab').innerText;
}

async function copySong() {
    await chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.scripting.executeScript({
            target: { tabId: tabs[0].id },
            func: getContent
        }, (result) => {
            copyTextToClipboard(result[0].result);
            resNode!.innerHTML = "Copied successfully!";
        });
    });
}

async function convertNotes() {
    const [tab] = await chrome.tabs.query({ active: true, lastFocusedWindow: true });
    const response = await chrome.tabs.sendMessage(tab.id, { action: "convert" });
}