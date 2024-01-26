import { useState } from 'react'

import { Form, InputField, Submit } from '@redwoodjs/forms'

const ChannelLink = () => {
  const [data, setData] = useState([])

  const fetchData = async (slug) => {
    try {
      const response = await fetch(`http://api.are.na/v2/channels/${slug}`)
      const result = await response.json()
      setData(result.contents)
      console.log(result)
    } catch (error) {
      console.error(error)
    }
  }

  const onSubmit = ({ channelLink }) => {
    const splitLink = channelLink.split('/')
    const slug = splitLink[splitLink.length - 1]
    fetchData(slug)
  }

  return (
    <>
      <Form onSubmit={onSubmit}>
        <label htmlFor="channel-link">
          Channel Link/Slug
          <InputField name="channelLink" id="channel-link"></InputField>
        </label>
        <Submit>GO</Submit>
      </Form>
      {data.length > 0 ? (
        data.map((item, index) => (
          <img src={item.image.thumb.url} alt="" key={index}></img>
        ))
      ) : (
        <div></div>
      )}
    </>
  )
}

export default ChannelLink
