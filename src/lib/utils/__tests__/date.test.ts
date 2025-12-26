import { formatShortDate } from "../date"

describe("formatShortDate", () => {
  it("should format dates correctly", () => {
    const date = new Date("2024-12-26")
    const result = formatShortDate(date)
    // Accept various date formats (locale dependent)
    expect(result).toMatch(
      /(\d{1,2}\/\d{1,2}\/\d{4})|(dic \d{1,2}, \d{4})|(Dec \d{1,2}, \d{4})/
    )
  })

  it("should handle string dates", () => {
    const result = formatShortDate("2024-12-26")
    expect(result).toMatch(
      /(\d{1,2}\/\d{1,2}\/\d{4})|(dic \d{1,2}, \d{4})|(Dec \d{1,2}, \d{4})/
    )
  })

  it("should handle invalid dates gracefully", () => {
    const invalidDate = new Date("invalid-date")
    const result = formatShortDate(invalidDate)
    expect(result).toMatch(/Invalid Date/)
  })

  it("should handle edge case dates", () => {
    const newYear = new Date("2024-01-01T00:00:00.000Z")
    const result = formatShortDate(newYear)
    expect(result).toMatch(/(ene 01, 2024)|(Jan 01, 2024)|(dic 31, 2023)/)
  })

  it("should return a string", () => {
    const result = formatShortDate(new Date())
    expect(typeof result).toBe("string")
  })
})
