'use client'

import { useEffect, useState } from 'react'
import { HONEYPOT_FIELD, STARTED_FIELD } from '@/lib/form-guard-fields'

/**
 * Anti-spam fields for the public forms (checked on the server by guardSubmission):
 *  - a honeypot that people never see but bots fill in
 *  - a timestamp set when the form appears, so instant bot submissions can be spotted
 */
export default function FormGuardFields() {
  const [startedAt, setStartedAt] = useState('')

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setStartedAt(String(Date.now()))
  }, [])

  return (
    <>
      <div style={{ position: 'absolute', left: '-10000px', width: 1, height: 1, overflow: 'hidden' }}>
        <label>
          Leave this field empty
          <input type="text" name={HONEYPOT_FIELD} tabIndex={-1} autoComplete="off" defaultValue="" />
        </label>
      </div>
      <input type="hidden" name={STARTED_FIELD} value={startedAt} />
    </>
  )
}
