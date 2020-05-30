import { 
    capitalize,
    parseAmount,
 } from '../lib/helpers.js';

describe("capitalize", () => {
    test("returns capitalized string", () => {
        expect(capitalize("hello")).toBe("Hello");
    })
    test("returns empty string on no input", () => {
        expect(capitalize()).toBe("");
    })
    test("returns empty string on input that isn't string", () => {
        expect(capitalize(134)).toBe("");
        expect(capitalize({test: 1})).toBe("");
        expect(capitalize([1,2,3])).toBe("");
    })
})

describe("parseAmount", () => {
    test("returns array<string> of correctly parsed numbers", () => {
        expect(parseAmount(124.222, 2)).toEqual(["124","22"])
        expect(parseAmount(1234567.1234567, 4)).toEqual(["1,234,567","1235"])
        expect(parseAmount(0.123456789123, 8)).toEqual(["0","12345679"])
        expect(parseAmount(0)).toEqual("0")
    })

    test("returns false on incorrect input", () => {
        expect(parseAmount()).toBe(false);
        expect(parseAmount("abc")).toBe(false);
        expect(parseAmount("123.22b")).toBe(false);
    })

    // test("returns")
})