import React, { Component } from 'react'
// import PropTypes from 'prop-types'
import wrapDisplayName from 'recompose/wrapDisplayName'
import { api } from '@launchpadlab/lp-requests'
import { first, removeExtension } from './utils'

/**
 * A function that returns a React HOC for uploading files to (Cloudinary)[https://cloudinary.com].
 *
 * `cloudinaryUploader` exposes the following props to the wrapped component: 
 * - `upload`: A function that submits a `POST` request to the Cloudinary endpoint with the `file` object and `fileData`.
 * - `uploadStatus`: A string representing the status of the `upload` request, either `uploading`, `upload-success`, or `upload-failure`.
 * 
 * @name cloudinaryUploader
 * @type Function
 * @param {string} cloudName - The name of the Cloudinary cloud to upload to.
 * @param {string} bucket - The name of the Cloudinary bucket to upload to.
 * @param {string} [uploadPreset=default] - The name of the Cloudinary upload preset.
 * @param {string} [fileType=auto] - The type of file.
 * @param {string} [endpoint=https://api.cloudinary.com/v1_1/] - The endpoint for the upload request.
 * @param {object} [requestOptions=DEFAULT_REQUEST_OPTIONS] - Options for the request, as specified by (`lp-requests`)[https://github.com/LaunchPadLab/lp-requests/blob/master/src/http/http.js].
 * @returns {Function} - A HOC that can be used to wrap a component.
 *
 *
 * @example
 *
 * function CloudinaryFileInput ({ upload, uploadStatus, input, meta ... }) {
 *   const { onChange } = input
 *   const { submit } = meta
 *   return (
 *    <FileInput 
 *      input={ input }
 *      meta={ meta }
 *      onLoad={ (fileData, file) => upload(fileData, file).then(() => submit(form)) }
 *      className={ uploadStatus }
 *    />
 *   )
 * }
 * 
 * CloudinaryFileInput.propTypes = {
 *   ...formPropTypes,
 *   upload: PropTypes.func.isRequired,
 *   uploadStatus: PropTypes.string.isRequired,
 * }
 *
 * export default compose(
 *    cloudinaryUploader({
 *      cloudName: 'my-cloudinary-cloud-name',
 *      bucket: 'my-cloudinary-bucket',
 *    }),
 * )(CloudinaryFileInput)
 *
**/

// Status enum
export const CloudinaryUploadStatus = {
  LOADING: 'uploading',
  SUCCESS: 'upload-success',
  FAILURE: 'upload-failure',
}

// Option defaults
const DEFAULT_ENDPOINT = 'https://api.cloudinary.com/v1_1/'
const DEFAULT_FILE_TYPE = 'auto'
const DEFAULT_UPLOAD_PRESET = 'default'
const DEFAULT_REQUEST_OPTIONS = {
  headers: {
    'Accept': 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
    'Content-Type': 'application/json',
  },
  mode: 'cors',
}

// Removes file extension from file name if asset is an image or pdf
// Otherwise, Cloudinary will add an extra extension to the file name
function createPublicId (file) {
  const { type, name } = file
  const isImageType = first(type.split('/')) === 'image'
  const isPdfType = type === 'application/pdf'
  return (isPdfType || isImageType) ? removeExtension(name) : name
}

// HOC to handle uploads to cloudinary. Provides child with an 'upload' function and an 'uploadStatus' string

function cloudinaryUploader ({
  cloudName,
  bucket,
  uploadPreset=DEFAULT_UPLOAD_PRESET,
  fileType=DEFAULT_FILE_TYPE,
  endpoint=DEFAULT_ENDPOINT,
  requestOptions=DEFAULT_REQUEST_OPTIONS,
}={}) {
  if (!cloudName || !bucket) throw new Error('cloudinaryUploader(): Must provide cloudName and bucket')
  // Create upload function with given options
  function uploadRequest (fileData, file) {
    const publicId = createPublicId(file)
    const url = `${ endpoint }/${ cloudName }/${ fileType }/upload`
    const body = { file: fileData, folder: bucket, publicId, uploadPreset }
    return api.post(url, body, requestOptions)
  }
  return Wrapped =>
    class Wrapper extends Component {
      static displayName = wrapDisplayName(Wrapped, 'cloudinaryUploader')
      constructor (props) {
        super(props)
        this.upload = this.upload.bind(this)
        this.state = { uploadStatus: '' }
      }
      upload (fileData, file) {
        this.setState({ uploadStatus: CloudinaryUploadStatus.LOADING })
        return uploadRequest(fileData, file)
          .then(res => {
            this.setState({ uploadStatus: CloudinaryUploadStatus.SUCCESS })
            return res
          })
          .catch(error => {
            this.setState({ uploadStatus: CloudinaryUploadStatus.FAILURE })
            throw error
          })
      }
      render () {
        const { uploadStatus } = this.state
        return (
          <Wrapped 
            upload={ this.upload }
            uploadStatus={ uploadStatus }
            { ...this.props }
          />
        )
      }
    }
}

export default cloudinaryUploader