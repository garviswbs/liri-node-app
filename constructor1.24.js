class Programmer {
    constructor(name, job, age, language) {
        this.Name = name;
        this.Job = job;
        this.Age = age;
        this.Language = language;
    }
}

var bob = new Programmer('Bob', 'poopmonster', 34, "javascript");
console.log(bob);