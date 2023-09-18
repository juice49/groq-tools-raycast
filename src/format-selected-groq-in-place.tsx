import { Clipboard, getSelectedText, showHUD } from '@raycast/api'
import '@groqfmt/wasm/dist/wasm-exec.js'
import { format } from '@groqfmt/wasm'
import loadGroqfmt from './lib/load-groqfmt'

const Command = async () => {
  const groqfmt = await loadGroqfmt()
  const input = await getSelectedText()

  // TODO: Error handling.
  const result = format({
    input: input ?? '',
    groqfmt,
  })

  if (typeof result?.error !== 'undefined') {
    await showHUD(`Error: ${result.error.message}`)
    return
  }

  await Clipboard.paste(result.result ?? input ?? '')
  await showHUD('Formatted GROQ')
}

export default Command
