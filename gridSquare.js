class Square {
    constructor (i, name) {
        this.n = i;
        this.id = `square-${i}`;
        this.name = name;
        this.imageTaken = false;
    }

    build () {
        const d = document.createElement("div");
        d.id = this.id;
        d.classList.add("grid-square");
        if (this.n != 13) {
            d.onclick = e => {
                if (currentSelection == this.n) {
                    const active = document.querySelector(".active");
                    if (active) active.remove();
                    d.classList.add("correct");
                };
            };
            const imgInput = document.createElement("input");
                imgInput.type = "file";
                imgInput.id = "image-uploader";
                imgInput.accept = "image/*";
                imgInput.style.display = "none";
            const img = document.createElement("img");
                img.classList.add("square-image");
                if (localStorage.getItem(this.name)) {
                    const dataImage = localStorage.getItem(this.name);
                    img.src = "data:image/png;base64," + dataImage;
                    img.classList.add("square-image");
                    this.imageTaken = true;
                };
            const number = document.createElement("div")
                number.classList.add("square-number")
                number.textContent = this.n;
            const b = document.createElement("button");
                b.classList.add("square-button");
                b.textContent = "upload image";
                b.onclick = () => imgInput.click();
            const name = document.createElement("div");
                name.classList.add("square-name");
                name.textContent = this.name;
            imgInput.onchange = e => this.uploadImage(e, img, b);
            this.imageTaken ? d.append(imgInput, img, number, name) : d.append(imgInput, img, b, number, name);
        } else {
            const img = document.createElement("img");
            img.id = "emblem";
            img.src = "emblem.png";
            d.append(img);
        }
        const grid = document.getElementById("grid");
        grid.append(d);
    }

    uploadImage (e, img, b) {
        if (!e.target.files[0].type.startsWith("image/")) return;
        b.style.display = "none";
        const imgMeasure = document.createElement("img");
        imgMeasure.src = URL.createObjectURL(e.target.files[0]);
        imgMeasure.onload = () => {
            img.src = URL.createObjectURL(e.target.files[0]);
            img.onload = () => {
                const imgData = getBaseImage();
                function getBaseImage () {
                    const canvas = document.createElement("canvas");
                    canvas.width = img.width;
                    canvas.height = img.height;
                    const ctx = canvas.getContext("2d");
                    ctx.drawImage(img, 0, 0, imgMeasure.width, imgMeasure.height, 0, 0, canvas.width, canvas.height);
                    const dataURL = canvas.toDataURL("image/png");
                    return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
                }
                localStorage.setItem(this.name, imgData);
            }
        };
    }
}