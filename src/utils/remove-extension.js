// Returns file name without the extension

export default function removeExtension (fileName) {
  const extensionIdx = fileName.lastIndexOf('.')
  return fileName.slice(0, extensionIdx)
}