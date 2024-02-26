function deleteImage (img, name) {
    const checkContainer = document.createElement("div");
    checkContainer.id = "check-container";
    const question = document.createElement("h5");
    question.textContent = "Remove this image?";
    const buttonContainer = document.createElement("div");
    const yesButton = document.createElement("button");
    yesButton.textContent = "yes";
    yesButton.onclick = () => {
        img.src = undefined;
        localStorage.removeItem(name);
        window.location.reload();
    };
    const noButton = document.createElement("button");
    noButton.textContent = "no";
    noButton.onclick = () => checkContainer.remove();
    buttonContainer.append(yesButton, noButton);
    checkContainer.append(question, buttonContainer);
    document.body.append(checkContainer);
}