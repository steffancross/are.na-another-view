import { useState } from 'react'

import Arena from 'are.na'

import { Form, InputField, Submit } from '@redwoodjs/forms'

const ChannelLink = () => {
  const [data, setData] = useState([])

  const fetchData = async (slug) => {
    const arena = new Arena()
    arena
      .channel(slug)
      .get()
      .then((chan) => setData(chan.contents))
      .catch((err) => console.log(err))

    console.log(data)
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
