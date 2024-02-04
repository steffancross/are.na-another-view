import { render } from '@redwoodjs/testing/web'

import Guide from './Guide'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('Guide', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<Guide />)
    }).not.toThrow()
  })
})
