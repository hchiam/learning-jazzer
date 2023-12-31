// FuzzTarget.test.js
const target = require("./FuzzTarget.js");
describe("My describe", () => {
  it("My traditional test", () => {
    expect(target.fuzzMe("normal data")).toBe("ok");
    expect(target.fuzzMe("this is NOT a fuzz test")).toBe("ok");
  });
});
