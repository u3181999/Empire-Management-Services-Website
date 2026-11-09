import type { z } from 'zod'

// Shared by the form server actions and the form components. Deliberately has no server-only imports.

/** A message for each field that failed, keyed by the field's name attribute. */
export type FieldErrors = Record<string, string>

/** What the person typed (never a password), echoed back so a rejected form can refill itself. */
export type FormValues = Record<string, string | string[]>

/** The result of a form action. On failure it carries everything the form needs to help the person fix it. */
export type ActionResult = {
  success: boolean
  /** Summary shown (and announced) above the form. */
  error?: string
  fieldErrors?: FieldErrors
  values?: FormValues
}

/** A trimmed string from the form, or '' if the field is missing. */
export function text(formData: FormData, name: string): string {
  const value = formData.get(name)
  return typeof value === 'string' ? value.trim() : ''
}

/** Snapshot of the submitted fields so they can be put back after a failed submission. */
export function readValues(formData: FormData, singles: string[], multis: string[] = []): FormValues {
  const values: FormValues = {}
  for (const name of singles) {
    const value = formData.get(name)
    if (typeof value === 'string') values[name] = value
  }
  for (const name of multis) values[name] = formData.getAll(name).filter((v): v is string => typeof v === 'string')
  return values
}

/** The first problem for each field, using the messages written in the schema. */
export function fieldErrorsFrom(error: z.ZodError): FieldErrors {
  const out: FieldErrors = {}
  for (const issue of error.issues) {
    const field = String(issue.path[0] ?? '')
    if (field && !(field in out)) out[field] = issue.message
  }
  return out
}

export const FIX_FIELDS_MESSAGE = 'Please fix the following and send the form again:'
