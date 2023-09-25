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

elementVisible(document.querySelector(".skills"), () => {
    document.querySelectorAll(".progress").forEach((value) => {
        value.style.width = value.parentElement.getAttribute("width");
    });
});
