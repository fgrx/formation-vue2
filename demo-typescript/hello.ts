const lastName = "Grignoux";
const firstName = "Fabien";
const age = 39;

function displayName(firstName: string, lastName: string, age: number): string {
  return `${firstName} ${lastName} - age ${age}`;
}

console.log(`Hello ${displayName(firstName, lastName, age)}`);
