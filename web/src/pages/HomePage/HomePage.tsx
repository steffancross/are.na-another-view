import { Metadata } from '@redwoodjs/web'

import Canvas from 'src/components/Canvas/Canvas'
import ChannelLink from 'src/components/ChannelLink/ChannelLink'
import Guide from 'src/components/Guide/Guide'

const HomePage = () => {
  return (
    <>
      <Metadata title="Home" description="Home page" />

      <ChannelLink />
      <Canvas />
      <Guide />
    </>
  )
}

export default HomePage
