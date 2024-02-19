let squares = [];
let descriptions = [];
let currentSelection = 0;

for (let i = 0; i < 5; i++) {
    for (let j = 0; j < 5; j++) {
        const n = 1 + j + (i * 5);
        squares.push(new Square(n, placenames[n-1][0]));
        descriptions.push(new Description(n, placenames[n-1][1]));
    }
};

const descriptionsCopy = [...descriptions];
let descriptionsShuffle = [];

while (descriptionsCopy.length > 0) {
    const r = Math.floor(Math.random() * descriptionsCopy.length);
    descriptionsShuffle.push(descriptionsCopy[r]);
    descriptionsCopy.splice(r, 1);
}

squares.forEach(s => s.build());
descriptionsShuffle.forEach(d => d.build());