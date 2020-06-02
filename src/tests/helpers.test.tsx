import { 
    capitalize,
    parseAmount,
 } from '../lib/helpers';

describe("capitalize", () => {
    test("returns capitalized string", () => {
        expect(capitalize("hello")).toBe("Hello");
    })
})

describe("parseAmount", () => {
    test("returns array<string> of correctly parsed numbers", () => {
        expect(parseAmount(124.222, 2)).toEqual(["124","22"])
        expect(parseAmount(1234567.1234567, 4)).toEqual(["1,234,567","1235"])
        expect(parseAmount(0.123456789123, 8)).toEqual(["0","12345679"])
        expect(parseAmount(0)).toEqual(["0"])
    })
})