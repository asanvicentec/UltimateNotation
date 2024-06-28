const solfegeDictionary = {
    c: "DO",
    d: "RE",
    e: "MI",
    f: "FA",
    g: "SOL",
    a: "LA",
    b: "SI",
};

const tab: HTMLElement | null = document.querySelector('.tab');

chrome.runtime.onMessage.addListener((request) => {
        if (request.action === "convert") {
            convert()
        }
    }
);

function convert() {
    if (tab) {
        tab.childNodes.forEach((item, index) => {
            if (item.nodeName.toLowerCase() === "span") {

                const noteNode = item.firstChild;
                let spacesToRemove = noteNode!.textContent!.substring(1).length;

                // Conversion
                noteNode!.textContent = solfegeDictionary[noteNode!.textContent[0].toLowerCase()] + noteNode!.textContent!.substring(1)

                let lastChild = item.lastChild;
                if (lastChild!.classList.contains("chord-bass")) {
                    lastChild!.textContent = solfegeDictionary[lastChild!.textContent.toLowerCase()] + lastChild!.textContent.substring(1);
                    spacesToRemove += -Math.abs(lastChild!.textContent!.length) + 1;
                }

                // Remove spaces
                if (tab.childNodes[index + 1].nodeName === "#text") {

                    spacesToRemove += -Math.abs(noteNode!.textContent!.length) + 1;
                    tab.childNodes[index + 1].textContent = tab.childNodes[index + 1].textContent!.slice(0, spacesToRemove);
                }
            }
        })
    }
}
