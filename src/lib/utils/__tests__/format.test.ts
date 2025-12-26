import { formatCurrency } from "../format"

describe("formatCurrency", () => {
  it("should format Colombian Pesos correctly", () => {
    expect(formatCurrency(1000, "COP")).toMatch(/\$\s*1[.,]000/)
    expect(formatCurrency(1234567, "COP")).toMatch(/\$\s*1[.,]234[.,]567/)
    expect(formatCurrency(0, "COP")).toMatch(/\$\s*0/)
  })

  it("should format US Dollars correctly", () => {
    expect(formatCurrency(1000, "USD")).toMatch(/\$\s*1[.,]000/)
    expect(formatCurrency(1234567, "USD")).toMatch(/\$\s*1[.,]234[.,]567/)
  })

  it("should handle negative amounts", () => {
    expect(formatCurrency(-1000, "COP")).toMatch(/-\$\s*1[.,]000/)
  })

  it("should handle decimal amounts", () => {
    const result = formatCurrency(1000.5, "USD")
    expect(result).toMatch(/\$\s*1[.,]000/)
  })

  it("should handle unknown currencies", () => {
    const result = formatCurrency(1000, "EUR" as any)
    expect(result).toMatch(/EUR\s*1[.,]000/)
  })

  it("should return a string", () => {
    expect(typeof formatCurrency(1000, "COP")).toBe("string")
  })
})
