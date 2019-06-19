
// Returns true when an a file is an image file.
function isImage(file) {
  return (file.type.split('/')[0] === 'image')
}

export default isImage