import functions from "./functions";

describe("functions", () => {
  it("should return multiplication", () => {
    expect(functions.multiplication(2, 5)).toBe(10);
  });

  // Note : expect prend une fonction anonyme pour tester l'erreur car le retour est alors une fonction
  it("should return an error", () => {
    expect(() => functions.multiplication(2, "a")).toThrowError();
  });

  it("should display contain name and age", () => {
    const person = {
      name: "Grignoux",
      firstName: "Fabien",
      age: "39",
    };
    expect(functions.displayPersonInfos(person)).toContain("Fabien");
    expect(functions.displayPersonInfos(person)).toContain("Grignoux");
    expect(functions.displayPersonInfos(person)).toContain("39");
  });
});
