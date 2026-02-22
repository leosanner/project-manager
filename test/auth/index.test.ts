import { LoginSchema } from "@/schemas/auth";
import { validadeSchema } from "@/utils/schemas";

describe("Validate Login Input", () => {
  it("Receive invalid fields", () => {
    const mockData = {
      email: "jon@4.",
      password: "fakepass",
    };

    const actionResponse = validadeSchema(LoginSchema, mockData);

    expect(actionResponse.success).toBe(false);
  });
});
