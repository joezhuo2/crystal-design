export type Split = 'none' | 'words' | 'chars' | 'lines'
export type Token = { text: string; space: boolean }

export const splitText = (text: string, mode: Split): Token[] => {
  if (mode === 'none') return [{ text, space: false }]
  if (mode === 'lines' && text.includes('\n')) {
    return text.split('\n').map((line) => ({ text: line, space: false }))
  }
  const parts = mode === 'chars' ? Array.from(text) : text.split(/(\s+)/)
  return parts.filter(Boolean).map((part) => ({ text: part, space: /^\s+$/.test(part) }))
}

export const staggerDelay = (tokens: Token[], index: number, delay: number, stagger: number) =>
  delay + tokens.slice(0, index).filter((token) => !token.space).length * stagger
