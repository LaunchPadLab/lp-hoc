// Removes file extension from file name if asset is an image
// Otherwise, Cloudinary will add an extra extension to the file name

export default function removeExtension (fileName) {
  const extensionIdx = fileName.lastIndexOf('.')
  return fileName.slice(0, extensionIdx)
}