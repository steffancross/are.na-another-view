import { Form, InputField, Submit } from '@redwoodjs/forms'
import { Link, routes } from '@redwoodjs/router'
import { Metadata } from '@redwoodjs/web'

const HomePage = () => {
  const fetchData = async (data) => {
    try {
      const response = await fetch(
        `http://api.are.na/v2/channels/${data.channelLink}`
      )
      const result = await response.json()
      console.log(result)
    } catch (error) {
      console.error(error)
    }
  }

  const onSubmit = (link) => {
    fetchData(link)
  }

  return (
    <>
      <Metadata title="Home" description="Home page" />

      <h1>Another Viewer</h1>
      <p>testing testing</p>
      <Link to={routes.about()}>ABOUT</Link>
      <Form onSubmit={onSubmit}>
        <label>Channel Link</label>
        <InputField name="channelLink"></InputField>
        <Submit>GO</Submit>
      </Form>
    </>
  )
}

export default HomePage
