class Square {
    constructor (i, name) {
        this.n = i;
        this.id = `square-${i}`;
        this.name = name;
        this.imageTaken = false;
    }

    build () {
        const grid = document.getElementById("grid");
        const d = document.createElement("div");
        d.id = this.id;
        d.classList.add("grid-square");
        if (this.n != 13) {
            const imgInput = document.createElement("input");
                imgInput.type = "file";
                imgInput.id = "image-uploader";
                imgInput.accept = "image/*";
                imgInput.style.display = "none";
            const img = document.createElement("img");
                img.classList.add("square-image");
            const imageDelete = document.createElement("div");
                imageDelete.classList.add("delete-button");
                imageDelete.textContent = "x";
            if (localStorage.getItem(this.name)) {
                const dataImage = localStorage.getItem(this.name);
                img.src = dataImage;
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
                if (localStorage.getItem(this.name + " matched") == "true") name.classList.add("correct");
            name.onclick = e => {
                if (currentSelection > 0) {
                    if (currentSelection == this.n) {
                        const active = document.querySelector(".active");
                        ding.play();
                        if (active) active.remove();
                        if (!localStorage.getItem(this.name)) {
                            name.classList.add("correct");
                            localStorage.setItem(this.name + " matched", "true");
                        };
                        currentSelection = 0;
                    } else {
                        error.play();
                        name.classList.add("incorrect");
                        setTimeout(() => name.classList.remove("incorrect"), 500);
                    }
                };
            };
            imgInput.onchange = e => this.uploadImage(e, img, b, d, imageDelete, number);
            img.onclick = () => {
                if (this.imageTaken) deleteImage(img, this.name);
            };
            this.imageTaken ? d.append(imgInput, img, imageDelete, name) : d.append(imgInput, img, b, number, name);
        } else {
            const img = document.createElement("img");
            img.id = "emblem";
            img.src = "emblem.png";
            d.append(img);
        }
        grid.append(d);
    }

    uploadImage (e, img, b, d, imageDelete, number) {
        if (!e.target.files[0].type.startsWith("image/")) return;
        this.imageTaken = true;
        b.style.visibility = "hidden";
        const imgMeasure = document.createElement("img");
        imgMeasure.src = URL.createObjectURL(e.target.files[0]);
        number.style.visibility = "hidden";
        d.append(imageDelete);
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
                    return dataURL;
                }
                localStorage.setItem(this.name, imgData);
            }
        };
    }
}