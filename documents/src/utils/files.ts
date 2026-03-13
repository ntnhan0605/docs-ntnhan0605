export async function readMarkdownFile(file: string) {
  if (typeof window === 'undefined') {
    try {
      const fileReaded = (await import('fs')).readFileSync(
        (await import('path')).resolve(file),
        'utf-8',
      )
      return fileReaded
    } catch (error) {
      return null
    }
  } else {
    // const reader = new FileReader()
  }
}
