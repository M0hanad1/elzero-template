function elementVisible(ele, callBack, reveal = 350) {
    let started = false;

    window.addEventListener("scroll", () => {
        if (
            (ele.getBoundingClientRect().top < window.innerHeight - reveal) &
            !started
        ) {
            console.log("started");
            callBack();
            started = true;
        }
    });
}

// Reveal elements on scroll
document
    .querySelectorAll("body > *:not(header, .landing)")
    .forEach((value) =>
        elementVisible(value, () => value.classList.add("revealed"), 100)
    );

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

// Get current year
document.getElementById("year").textContent = new Date().getFullYear();
