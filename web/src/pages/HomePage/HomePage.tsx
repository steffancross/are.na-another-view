import { Link, routes } from '@redwoodjs/router'
import { Metadata } from '@redwoodjs/web'

import Canvas from 'src/components/Canvas/Canvas'
import ChannelLink from 'src/components/ChannelLink/ChannelLink'

const HomePage = () => {
  return (
    <>
      <Metadata title="Home" description="Home page" />

      <h1>Another Viewer</h1>
      {/* <Link to={routes.about()}>ABOUT</Link> */}
      <ChannelLink />
      {/* <Canvas /> */}
    </>
  )
}

export default HomePage
