import { IPerson } from "../interfaces/IPerson";

export class Person implements IPerson {
  firstName: string;
  lastName: string;
  age: number;

  constructor(firstName: string, lastName: string, age: number) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.age = age;
  }

  displayName(): string {
    return `Hello ${this.firstName}, ${this.lastName} - age : ${this.age}`;
  }
}
