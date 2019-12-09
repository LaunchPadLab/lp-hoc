// Enable async/await
import '@babel/polyfill'

import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

// Configure enzyme
Enzyme.configure({ adapter: new Adapter() })
