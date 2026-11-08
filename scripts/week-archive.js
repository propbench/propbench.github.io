(() => {
    const weekday = new Date().getUTCDay() + 1;

    if (weekday === 1) {
        document.querySelectorAll('a[href="/archive/"], a[href="/fa/archive/"]').forEach((link) => {
            link.hidden = true;
        });
    }

    document.querySelectorAll("[data-current-weekday-list]").forEach((list) => {
        list.querySelectorAll("[data-weekday]").forEach((card) => {
            card.hidden = Number(card.dataset.weekday) !== weekday;
        });
    });

    const archiveList = document.querySelector("[data-previous-weekdays-list]");
    if (archiveList) {
        const cards = [...archiveList.querySelectorAll("[data-weekday]")];
        const previousDays = cards.filter((card) => Number(card.dataset.weekday) < weekday);
        cards.forEach((card) => {
            card.hidden = Number(card.dataset.weekday) >= weekday;
        });
        archiveList.hidden = previousDays.length === 0;

        const count = document.querySelector("[data-archive-count]");
        if (count) {
            count.hidden = previousDays.length === 0;
            const number = previousDays.length.toLocaleString(document.documentElement.lang === "fa" ? "fa-IR" : "en-US");
            count.textContent = count.dataset.countTemplate.replace("{count}", number);
        }

        const empty = document.querySelector("[data-archive-empty]");
        if (empty) {
            empty.hidden = previousDays.length !== 0;
        }
    }

    const now = new Date();
    const nextUtcMidnight = Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() + 1);
    window.setTimeout(() => window.location.reload(), nextUtcMidnight - now.getTime() + 100);
})();
