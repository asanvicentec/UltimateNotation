import { copyTextToClipboard } from "./scripts/utils";

document.getElementById("copyToClipboardBtn")!.addEventListener("click", () => copySong());
const resNode = document.querySelector("#result");

const getContent = () => {
    return document.querySelector('.tab').innerText;
}

async function copySong() {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.scripting.executeScript({
            target: { tabId: tabs[0].id },
            func: getContent
        }, (result) => {
            copyTextToClipboard(result[0].result);
            resNode!.innerHTML = "Copied successfully!"
        });
    });
}