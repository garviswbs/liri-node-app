const dogs = {
    raining: true,
    noise: "Woof!",
    makeNoise: function () {
        if (this.raining = true) {
            console.log(dogs.noise);
        }
    }
};

const cats = {
    raining: false,
    noise: "HISSSSSS!",
    makeNoise: function () {
        if (this.raining = false) {
            console.log(cats.noise);
        }
    }
};

console.log(cats);
console.log(dogs);

dogs.makeNoise();
cats.makeNoise();