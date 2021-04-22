export interface IPerson {
  lastName: string;
  firstName: string;
  age: number;
  salary?: number;
  displayName(): string;
}
