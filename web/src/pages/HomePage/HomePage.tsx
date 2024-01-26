import { Link, routes } from '@redwoodjs/router'
import { Metadata } from '@redwoodjs/web'

import ChannelLink from 'src/components/ChannelLink/ChannelLink'

const HomePage = () => {
  return (
    <>
      <Metadata title="Home" description="Home page" />

      <h1>Another Viewer</h1>
      <p>testing testing</p>
      <Link to={routes.about()}>ABOUT</Link>
      <ChannelLink />
    </>
  )
}

export default HomePage
