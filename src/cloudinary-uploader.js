import React, { Component } from 'react'
// import PropTypes from 'prop-types'
import wrapDisplayName from 'recompose/wrapDisplayName'
import { api } from '@launchpadlab/lp-requests'
import { first, removeExtension } from './utils'

// Status enum
export const CloudinaryUploadStatus = {
  LOADING: 'uploading',
  SUCCESS: 'upload-success',
  FAILURE: 'upload-failure',
}

// Option defaults
const DEFAULT_ENDPOINT = 'https://api.cloudinary.com/v1_1/'
const DEFAULT_FILE_TYPE = 'auto'
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
  uploadPreset,
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