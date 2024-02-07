articleClone.querySelectorAll('[data-name]').forEach(e => {
        const score = e.textContent.substring(0, 1)
        e.textContent = e.textContent.replace(score, solfegeDictionary[score.toLowerCase()])

    });