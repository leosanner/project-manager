import { LoginSchema } from "@/schemas/auth";

describe("LoginSchema security", () => {
  it("rejects invalid email patterns commonly used in injection attempts", () => {
    const payload = {
      email: "' OR 1=1 --@mail.com",
      password: "Strong@Pass1",
    };

    const parsed = LoginSchema.safeParse(payload);

    expect(parsed.success).toBe(false);
  });

  it("rejects weak passwords", () => {
    const payload = {
      email: "user@example.com",
      password: "weakpass",
    };

    const parsed = LoginSchema.safeParse(payload);

    expect(parsed.success).toBe(false);
  });

  it("accepts a valid credential shape", () => {
    const payload = {
      email: "user@example.com",
      password: "S0lid@Pass",
    };

    const parsed = LoginSchema.safeParse(payload);

    expect(parsed.success).toBe(true);
  });
});
