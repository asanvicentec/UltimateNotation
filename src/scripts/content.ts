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

if (tab) {
    tab.childNodes.forEach((item, index) => {
        if (item.nodeName.toLowerCase() === "span") {

            const note = item.firstChild!.textContent;
            let spacesToRemove = item.firstChild!.textContent.substring(1).length;

            // Conversion
            item.firstChild!.textContent = solfegeDictionary[note[0].toLowerCase()] + item.firstChild!.textContent.substring(1)

            if (item.lastChild!.classList.contains("chord-bass")) {
                item.lastChild!.textContent = solfegeDictionary[item.lastChild!.textContent.toLowerCase()] + item.lastChild!.textContent.substring(1)
                spacesToRemove += -Math.abs(item.lastChild!.textContent!.length) + 1;
            }

            // Remove spaces
            if (tab.childNodes[index + 1].nodeName === "#text") {

                spacesToRemove += -Math.abs(item.firstChild!.textContent!.length) + 1;
                tab.childNodes[index + 1].textContent = tab.childNodes[index + 1].textContent!.slice(0, spacesToRemove);
            }
        }
    })
}