import Arena from 'are.na'

import { Form, InputField, Submit } from '@redwoodjs/forms'

import { useStore } from 'src/stores/store'

const ChannelLink = () => {
  const setData = useStore((state) => state.setData)

  const fetchData = async (slug) => {
    const arena = new Arena()
    arena
      .channel(slug)
      .contents({ per: 100 })
      .then((chan) => setData(chan))
      .catch((err) => console.log(err))
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
    </>
  )
}

export default ChannelLink
