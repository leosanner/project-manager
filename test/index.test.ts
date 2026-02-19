function sum(a: number, b: number) {
  return a + b;
}

describe("sum", () => {
  it("add two numbers", () => {
    expect(sum(2, 4)).toBe(6);
    expect(sum(1, -1)).toBe(0);
  });
});
