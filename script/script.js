function loading() {
    document.onreadystatechange = () => {
        if (document.readyState === "complete") {
            document.querySelector(".loader").style.display = "none";
            document.querySelector(".wrapper").style.display = "block";
            setTimeout(() => {
                document.querySelector(".wrapper").style.opacity = 1;
            }, 10);
        }
    };
}

function megaMenu() {
    let hoverMenu = false;
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

function dateCounter() {
    const eventDate = new Date(
        `Dec 31, ${new Date().getFullYear()} 23:59:59`
    ).getTime();
    const date = [
        document.getElementById("days"),
        document.getElementById("hours"),
        document.getElementById("minutes"),
        document.getElementById("seconds"),
    ];

    setInterval(() => {
        const timeLeft = eventDate - new Date().getTime();
        if (timeLeft < eventDate) dateCounter();

        const days = parseInt(timeLeft / (1000 * 60 * 60 * 24));
        const hours = parseInt(
            (timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = parseInt((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = parseInt((timeLeft % (1000 * 60)) / 1000);

        date[0].textContent = days < 10 ? `0${days}` : days;
        date[1].textContent = hours < 10 ? `0${hours}` : hours;
        date[2].textContent = minutes < 10 ? `0${minutes}` : minutes;
        date[3].textContent = seconds < 10 ? `0${seconds}` : seconds;
    }, 1000);
}

// Page Loading
loading();

// MegaMenu Show/Hide
megaMenu();

// Data Counter
dateCounter();

// Reveal elements on scroll
document
    .querySelectorAll(".wrapper > *:not(header, .landing)")
    .forEach((e) => elementVisible(e, () => e.classList.add("revealed"), 100));

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
            if (value.textContent === goal) clearInterval(counter);
            value.textContent++;
        }, 2000 / goal);
    });
});

// Get current year
const year = new Date().getFullYear();
document.querySelectorAll(".year").forEach((e) => (e.textContent = year));
