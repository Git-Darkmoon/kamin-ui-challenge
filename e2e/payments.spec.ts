import { test, expect } from "@playwright/test"

test.describe("Payment Management Platform", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/pagos")
  })

  test("should display the payments page correctly", async ({ page }) => {
    await expect(page).toHaveTitle(/Pagos/)

    // Check header
    await expect(page.getByText("Pagos")).toBeVisible()

    // Check stats cards
    await expect(page.getByText("Total pagos")).toBeVisible()
    await expect(page.getByText("Completados")).toBeVisible()
    await expect(page.getByText("Pendientes")).toBeVisible()
    await expect(page.getByText("Rechazados")).toBeVisible()

    // Check payments table
    await expect(page.getByText("Identificación")).toBeVisible()
    await expect(page.getByText("Nombre")).toBeVisible()
  })

  test("should filter payments by search", async ({ page }) => {
    // Wait for payments to load
    await page.waitForSelector('[data-testid="payments-table"]', {
      timeout: 10000,
    })

    const searchInput = page.getByPlaceholder(/buscar por destinatario/i)
    await searchInput.fill("Maria")

    // Should filter results
    await expect(page.getByText("Maria")).toBeVisible()

    // Clear search
    await searchInput.clear()
  })

  test("should sort payments by amount", async ({ page }) => {
    // Wait for payments to load
    await page.waitForSelector('[data-testid="payments-table"]', {
      timeout: 10000,
    })

    // Click on Order Amount to sort
    await page.getByText("Order Amount").click()

    // Verify sort indicator appears
    await expect(
      page.locator('button:has-text("Order Amount") svg')
    ).toBeVisible()
  })

  test("should navigate through pagination", async ({ page }) => {
    // Wait for payments to load
    await page.waitForSelector('[data-testid="payments-table"]', {
      timeout: 10000,
    })

    const nextButton = page.getByText("Siguiente")

    // Check if pagination exists (only if there are more than 6 payments)
    const isNextButtonVisible = await nextButton.isVisible()

    if (isNextButtonVisible) {
      await nextButton.click()

      // Should show page 2
      await expect(page.getByText("Página 2")).toBeVisible()

      // Go back to page 1
      await page.getByText("Anterior").click()
      await expect(page.getByText("Página 1")).toBeVisible()
    }
  })

  test("should open and close create payment modal", async ({ page }) => {
    const createButton = page.getByText(/crear pago/i)
    await createButton.click()

    // Modal should appear
    await expect(page.getByText(/nuevo pago/i)).toBeVisible()

    // Close modal
    await page.getByText(/cancelar/i).click()

    // Modal should disappear
    await expect(page.getByText(/nuevo pago/i)).not.toBeVisible()
  })

  test("should create a new payment", async ({ page }) => {
    const createButton = page.getByText(/crear pago/i)
    await createButton.click()

    // Fill form
    await page.getByLabel(/recipient/i).fill("Test User")
    await page.getByLabel(/amount/i).fill("100000")
    await page.getByLabel(/currency/i).selectOption("COP")
    await page.getByLabel(/payment method/i).selectOption("visa")

    // Submit form
    await page.getByText(/create payment/i).click()

    // Should show success message or close modal
    await expect(page.getByText(/nuevo pago/i)).not.toBeVisible({
      timeout: 5000,
    })
  })

  test("should download payment invoice", async ({ page }) => {
    // Wait for payments to load
    await page.waitForSelector('[data-testid="payments-table"]', {
      timeout: 10000,
    })

    const downloadPromise = page.waitForEvent("download")

    // Click first download button
    await page.locator("button:has(svg)").first().click()

    const download = await downloadPromise
    expect(download.suggestedFilename()).toMatch(/factura-.*\.pdf$/)
  })

  test("should navigate to other pages", async ({ page }) => {
    // Test reportes page
    await page.getByText("Reportes").click()
    await expect(page).toHaveURL("/reportes")
    await expect(page.getByText("Reportes en construcción")).toBeVisible()

    // Test ayuda page
    await page.getByText("Ayuda").click()
    await expect(page).toHaveURL("/ayuda")
    await expect(
      page.getByText("Centro de Ayuda en construcción")
    ).toBeVisible()

    // Test configuración page
    await page.getByText("Configuración").click()
    await expect(page).toHaveURL("/configuracion")
    await expect(page.getByText("Configuración en construcción")).toBeVisible()

    // Return to payments
    await page.getByText("Volver a Pagos").click()
    await expect(page).toHaveURL("/pagos")
  })

  test("should work on mobile viewport", async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 })

    await page.goto("/pagos")

    // Should show mobile layout
    await expect(page.getByText("Total transacciones")).toBeVisible()

    // Mobile navigation should work
    const menuButton = page.locator('button[aria-label="Toggle menu"]')
    if (await menuButton.isVisible()) {
      await menuButton.click()
      await expect(page.getByText("Reportes")).toBeVisible()
    }
  })
})
