// GraphQL Context type
export interface GraphQLContext {
  // Add any context properties here
  // e.g., user authentication, request info, etc.
}

// Input validation helpers
export class ValidationError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'ValidationError'
  }
}

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export const validateRequired = (value: any, fieldName: string): void => {
  if (!value || (typeof value === 'string' && value.trim().length === 0)) {
    throw new ValidationError(`${fieldName} is required`)
  }
}

export const validateStringLength = (
  value: string,
  fieldName: string,
  minLength: number = 1,
  maxLength: number = 1000
): void => {
  if (value.length < minLength) {
    throw new ValidationError(`${fieldName} must be at least ${minLength} characters`)
  }
  if (value.length > maxLength) {
    throw new ValidationError(`${fieldName} must be less than ${maxLength} characters`)
  }
}

export const validatePositiveInteger = (value: number, fieldName: string): void => {
  if (!Number.isInteger(value) || value <= 0) {
    throw new ValidationError(`${fieldName} must be a positive integer`)
  }
}