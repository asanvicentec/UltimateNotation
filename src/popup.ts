import { CopyType } from "./scripts/enum";

document.getElementById("copyBasicBtn")!.addEventListener("click", () => copySong(CopyType.basic));
document.getElementById("copyAdvancedBtn")!.addEventListener("click", () => copySong(CopyType.advanced));

async function copySong(btnAction: CopyType) {

    const [tab] = await chrome.tabs.query({active: true, lastFocusedWindow: true});

    await chrome.tabs.update(tab.id, { active: true });
    await chrome.windows.update(tab.windowId, { focused: true });

    const response = await chrome.tabs.sendMessage(tab.id, {copySong: btnAction});
}