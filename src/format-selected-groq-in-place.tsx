import { Clipboard, getSelectedText } from '@raycast/api'
import '@groqfmt/wasm/dist/wasm-exec.js'
import { format } from '@groqfmt/wasm'
import loadGroqfmt from './lib/load-groqfmt'

const Command = async () => {
  const groqfmt = await loadGroqfmt()
  const input = await getSelectedText()

  // TODO: Error handling.
  const groq = format({
    input: input ?? '',
    groqfmt,
  })

  await Clipboard.paste(groq.result ?? input ?? '')
}

export default Command
