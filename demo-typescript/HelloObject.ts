import { Person } from "./models/Person";

const fabien = new Person("Fabien", "grignoux", 39);

const phrase: string = fabien.displayName();

console.log(phrase);
