import React from 'react'
import { shallow } from 'enzyme'
import { cloudinaryUploader } from '../src/'

const props = {
  bucket: 'test-bucket',
  cloudName: 'test-name',
}

const file = {
  name: 'test.jpg',
  type: 'image/jpg',
}

const fileData = 'mockData'

test('cloudinaryUploader has correct displayName', () => {
  const Wrapped = () => <h1>Hi</h1>
  const Wrapper = cloudinaryUploader(props)(Wrapped)
  expect(Wrapper.displayName).toEqual('cloudinaryUploader(Wrapped)')
})

test('cloudinaryUploader throws an error if `bucket` or `cloudName` are not provided', () => {
  const Wrapped = () => <h1>Hi</h1>
  const wrapperFunc = () => cloudinaryUploader()(Wrapped)
  expect(wrapperFunc).toThrowError('cloudinaryUploader(): Must provide cloudName and bucket')
})

test('cloudinaryUploader adds upload props to component', () => {
  const Wrapped = () => <h1>Hi</h1>
  const Wrapper = cloudinaryUploader(props)(Wrapped)
  const component = shallow(<Wrapper />)
  expect(component.props()).toMatchObject({ 
    upload: expect.any(Function), 
    uploadStatus: expect.any(String),
  })
})

test('cloudinaryUploader sends the api request with the correct options', () => {
  const Wrapped = () => <h1>Hi</h1>
  const Wrapper = cloudinaryUploader(props)(Wrapped)
  const component = shallow(<Wrapper />)
  const { upload } = component.props()
  return upload(fileData, file).then(response => {
    component.update()
    const { uploadStatus } = component.props()
    expect(uploadStatus).toEqual('upload-success')
    const responseJson = JSON.parse(response.body)
    expect(responseJson['file']).toEqual(fileData)
    expect(responseJson['folder']).toEqual(props.bucket)
    expect(responseJson['public_id']).toEqual('test')
    expect(responseJson['upload_preset']).toEqual('default')
  })
})

test('cloudinaryUploader throws an error if request fails', () => {
  const Wrapped = () => <h1>Hi</h1>
  const Wrapper = cloudinaryUploader({ ...props, endpoint: '/failure' })(Wrapped)
  const component = shallow(<Wrapper />)
  const { upload } = component.props()
  expect(() => upload(fileData, file).toThrow())
})

test('cloudinaryUploader updates the `uploadStatus` prop if request fails', () => {
  const Wrapped = () => <h1>Hi</h1>
  const Wrapper = cloudinaryUploader({ ...props, endpoint: '/failure' })(Wrapped)
  const component = shallow(<Wrapper />)
  const { upload } = component.props()
  return upload(fileData, file).catch(() => {
    component.update()
    const { uploadStatus } = component.props()
    expect(uploadStatus).toEqual('upload-failure')
  })
})