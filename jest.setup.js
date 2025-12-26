import "@testing-library/jest-dom"
import { TextEncoder, TextDecoder } from "util"

// Polyfill for TextEncoder/TextDecoder
global.TextEncoder = TextEncoder
global.TextDecoder = TextDecoder

// Mock Next.js modules that aren't available in test environment
jest.mock("next/cache", () => ({
  unstable_cache: jest.fn((fn) => fn),
}))

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    back: jest.fn(),
  }),
  useSearchParams: () => new URLSearchParams(),
  usePathname: () => "/",
}))

// Mock jsPDF to prevent errors in tests
jest.mock("jspdf", () => {
  return {
    __esModule: true,
    default: jest.fn().mockImplementation(() => ({
      setFontSize: jest.fn(),
      setFont: jest.fn(),
      text: jest.fn(),
      line: jest.fn(),
      save: jest.fn(),
    })),
  }
})

// Mock Next.js router
jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    back: jest.fn(),
  }),
  useSearchParams: () => new URLSearchParams(),
  usePathname: () => "/pagos",
}))

// Mock file system operations
jest.mock("fs/promises", () => ({
  readFile: jest.fn().mockResolvedValue("[]"),
  writeFile: jest.fn().mockResolvedValue(undefined),
  access: jest.fn().mockResolvedValue(undefined),
}))

// Mock path module
jest.mock("path", () => ({
  join: jest.fn((...args) => args.join("/")),
  resolve: jest.fn((...args) => args.join("/")),
}))
