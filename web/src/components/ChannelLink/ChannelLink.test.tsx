import { render } from '@redwoodjs/testing/web'

import ChannelLink from './ChannelLink'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('ChannelLink', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<ChannelLink />)
    }).not.toThrow()
  })
})
