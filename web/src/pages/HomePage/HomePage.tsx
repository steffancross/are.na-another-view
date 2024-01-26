import { Form, InputField, Submit } from '@redwoodjs/forms'
import { Link, routes } from '@redwoodjs/router'
import { Metadata } from '@redwoodjs/web'

const HomePage = () => {
  const onSubmit = () => {
    console.log('hello')
  }

  return (
    <>
      <Metadata title="Home" description="Home page" />

      <h1>Another Viewer</h1>
      <p>testing testing</p>
      <Link to={routes.about()}>ABOUT</Link>
      <Form onSubmit={onSubmit}>
        <label>Channel Link</label>
        <InputField name="input"></InputField>
        <Submit>GO</Submit>
      </Form>
    </>
  )
}

export default HomePage
