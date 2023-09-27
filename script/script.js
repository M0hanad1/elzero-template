// Page Loading
document.onreadystatechange = () => {
    if (document.readyState !== "complete") {
        document.querySelector(".wrapper").style.display = "none";
        document.querySelector(".loader").style.display = "block";
    } else {
        document.querySelector(".loader").style.display = "none";
        document.querySelector(".wrapper").style.display = "block";
    }
};

function megaMenu() {
    const menu = document.querySelector("header .mega-menu");
    const li = document.querySelector("header .nav > li:last-of-type");
    const hide = () => {
        li.classList.remove("hover");
        menu.classList.remove("show");
        hoverMenu = false;
    };

    menu.addEventListener("mouseenter", () => (hoverMenu = true));
    menu.addEventListener("mouseleave", hide);
    menu.addEventListener("click", hide);

    li.addEventListener("mouseenter", () => {
        li.classList.add("hover");
        menu.classList.add("show");
    });

    li.addEventListener("mouseleave", () => {
        setTimeout(() => {
            if (!hoverMenu) hide();
        }, 10);
    });
}

function elementVisible(ele, callBack, reveal = 350) {
    let started = false;

    window.addEventListener("scroll", () => {
        if (
            (ele.getBoundingClientRect().top < window.innerHeight - reveal) &
            !started
        ) {
            callBack();
            started = true;
        }
    });
}

// MegaMenu Show/Hide
megaMenu();

// Reveal elements on scroll
document
    .querySelectorAll(".wrapper > *:not(header, .landing)")
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
