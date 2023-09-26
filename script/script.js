function elementVisible(element, callBack) {
    const ElementHeight = parseInt(getComputedStyle(element).height) / 1.5;
    let started = false;

    window.addEventListener("scroll", () => {
        if ((window.scrollY >= element.offsetTop - ElementHeight) & !started) {
            callBack();
            started = true;
        }
    });
}

// Skills width increase
elementVisible(document.querySelector(".skills"), () => {
    document.querySelectorAll(".progress").forEach((value) => {
        value.style.width = value.parentElement.getAttribute("width");
    });
});

// Stats counter
elementVisible(document.querySelector(".stats"), () => {
    document.querySelectorAll(".stats h3").forEach((value) => {
        const goal = value.getAttribute("goal");
        const counter = setInterval(() => {
            if (value.textContent === goal) {
                clearInterval(counter);
            }
            value.textContent++;
        }, 2000 / goal);
    });
});
