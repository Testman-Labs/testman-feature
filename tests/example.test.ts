import { FeatureToJSON } from "../src";
import { describe, test, expect } from "@jest/globals"

describe("FeatureToJSON", () => {
    test("should return a JSON object", () => {
        const filePath = "tests/example.feature";
        const result = FeatureToJSON(filePath);
        expect(result.name).toBe("TEST-2208: (LOGIN) - Login con usuario y contraseña");
    });

    test("should return a JSON object with the correct scenarios", () => {
        const filePath = "tests/example.feature";
        const result = FeatureToJSON(filePath);
        expect(result.elements.length).toBe(2);
    });
});