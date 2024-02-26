class Description {
    constructor (n, text) {
        this.n = n;
        this.text = text;
    }

    build () {
        if (this.text) {
            const d = document.createElement("div");
            d.classList.add("description");
            d.textContent = this.text;
            d.onclick = e => {
                e.stopPropagation();
                const active = document.querySelector(".active");
                if (active) active.classList.remove("active");
                e.target.classList.add("active");
                currentSelection = this.n;
            };
            const descriptionContainer = document.getElementById("description-container");
            descriptionContainer.append(d);
        }
    }
}