import { PAYMENT_STATUS_LABELS, PAYMENT_SCHEME_LABELS } from '../payment-constants'

describe('Payment Constants', () => {
  describe('PAYMENT_STATUS_LABELS', () => {
    it('should have all required status labels', () => {
      expect(PAYMENT_STATUS_LABELS).toHaveProperty('pending')
      expect(PAYMENT_STATUS_LABELS).toHaveProperty('completed')
      expect(PAYMENT_STATUS_LABELS).toHaveProperty('rejected')
    })

    it('should have correct labels', () => {
      expect(PAYMENT_STATUS_LABELS.pending).toBe('Pendiente')
      expect(PAYMENT_STATUS_LABELS.completed).toBe('Completada')
      expect(PAYMENT_STATUS_LABELS.rejected).toBe('Rechazado')
    })
  })

  describe('PAYMENT_SCHEME_LABELS', () => {
    it('should have all required scheme labels', () => {
      expect(PAYMENT_SCHEME_LABELS).toHaveProperty('limit')
      expect(PAYMENT_SCHEME_LABELS).toHaveProperty('credit')
      expect(PAYMENT_SCHEME_LABELS).toHaveProperty('wallet')
    })

    it('should have correct labels', () => {
      expect(PAYMENT_SCHEME_LABELS.limit).toBe('Limit')
      expect(PAYMENT_SCHEME_LABELS.credit).toBe('Credit')
      expect(PAYMENT_SCHEME_LABELS.wallet).toBe('Wallet')
    })
  })
})