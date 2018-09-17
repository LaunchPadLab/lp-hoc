// Returns file name without the extension

export default function removeExtension (fileName) {
  const extensionIdx = fileName.lastIndexOf('.')
  return extensionIdx > 0 ? fileName.slice(0, extensionIdx) : fileName
}