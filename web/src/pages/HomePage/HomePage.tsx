import { Link, routes } from '@redwoodjs/router'
import { Metadata } from '@redwoodjs/web'

const HomePage = () => {
  return (
    <>
      <Metadata title="Home" description="Home page" />

      <h1>Are.na Viewer</h1>
      <p>testing testing</p>
      <Link to={routes.about()}>ABOUT</Link>
    </>
  )
}

export default HomePage
