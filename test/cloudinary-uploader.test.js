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
  const Wrapper = cloudinaryUploader()(Wrapped)
  expect(() => shallow(<Wrapper />)).toThrow()
})

test('cloudinaryUploader can receive arguments via env vars', () => {
  process.env.CLOUDINARY_CLOUD_NAME = 'foo'
  process.env.CLOUDINARY_BUCKET = 'bar'
  const Wrapped = () => <h1>Hi</h1>
  const Wrapper = cloudinaryUploader()(Wrapped)
  expect(() => shallow(<Wrapper />)).not.toThrow()
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

test('cloudinaryUploader can receive options as props', () => {
  const Wrapped = () => <h1>Hi</h1>
  const Wrapper = cloudinaryUploader()(Wrapped)
  const component = shallow(<Wrapper cloudName="foo" bucket="bar" />)
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
    expect(responseJson.file).toEqual(fileData)
    expect(responseJson.folder).toEqual(props.bucket)
    expect(responseJson.public_id).toEqual('test')
    expect(responseJson.upload_preset).toEqual('default')
  })
})

test('cloudinaryUploader sets `publicId`', () => {
  const Wrapped = () => <h1>Hi</h1>
  const Wrapper = cloudinaryUploader({ ...props, cloudinaryPublicId: 'custom-name' })(Wrapped)
  const component = shallow(<Wrapper />)
  const { upload } = component.props()
  return upload(fileData, file).then(response => {
    component.update()
    const responseJson = JSON.parse(response.body)
    expect(responseJson.public_id).toEqual('custom-name')
  })
})

test('cloudinaryUploader allows custom `publicId` creator', () => {
  const Wrapped = () => <h1>Hi</h1>
  const createPublicId = file => 'foo-' + file.name
  const Wrapper = cloudinaryUploader({ ...props, createPublicId })(Wrapped)
  const component = shallow(<Wrapper />)
  const { upload } = component.props()
  return upload(fileData, file).then(response => {
    component.update()
    const responseJson = JSON.parse(response.body)
    expect(responseJson.public_id).toEqual('foo-test')
  })
})

test('cloudinaryUploader adds extension to `publicId` of raw files', () => {
  const rawFile = { name: 'test.xls', type: 'application/xls' }
  const Wrapped = () => <h1>Hi</h1>
  const Wrapper = cloudinaryUploader({ ...props, cloudinaryPublicId: 'custom-name' })(Wrapped)
  const component = shallow(<Wrapper />)
  const { upload } = component.props()
  return upload(fileData, rawFile).then(response => {
    component.update()
    const responseJson = JSON.parse(response.body)
    expect(responseJson.public_id).toEqual('custom-name.xls')
  })
})

test('cloudinaryUploader throws an error if request fails', () => {
  const Wrapped = () => <h1>Hi</h1>
  const Wrapper = cloudinaryUploader({ ...props, endpoint: '/failure' })(Wrapped)
  const component = shallow(<Wrapper />)
  const { upload } = component.props()
  
  expect.assertions(1)
  return upload(fileData, file).catch(err => {
    expect(err.name).toEqual('HttpError')
  })
})

test('cloudinaryUploader updates the `uploadStatus` prop if request fails', () => {
  const Wrapped = () => <h1>Hi</h1>
  const Wrapper = cloudinaryUploader({ ...props, endpoint: '/failure' })(Wrapped)
  const component = shallow(<Wrapper />)
  const { upload } = component.props()
  
  expect.assertions(1)
  return upload(fileData, file).catch(() => {
    component.update()
    const { uploadStatus } = component.props()
    expect(uploadStatus).toEqual('upload-failure')
  })
})