import Arena from 'are.na'

import { Form, InputField, Submit } from '@redwoodjs/forms'

import { useStore } from 'src/stores/store'

import Logo from '../Logo/Logo'

const ChannelLink = () => {
  const setData = useStore((state) => state.setData)
  const setLoadingWheel = useStore((state) => state.setLoadingWheel)
  const setImagesLoaded = useStore((state) => state.setImagesLoaded)

  const fetchData = async (slug: string) => {
    const arena = new Arena()
    arena
      .channel(slug)
      .contents({ per: 100 })
      .then((chan) => setData(chan))
      .catch((err) => console.log(err))
  }

  const onSubmit = ({ channelLink }) => {
    setLoadingWheel(true)
    setImagesLoaded(false)
    const splitLink = channelLink.split('/')
    const slug = splitLink[splitLink.length - 1]
    fetchData(slug)
  }

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault()
      onSubmit()
    }
  }

  return (
    <>
      <div className="input">
        <div>
          <Logo />
          <h4>Another View</h4>
        </div>
        <Form onSubmit={onSubmit} autoComplete="off">
          <label htmlFor="channel-link">
            <InputField
              name="channelLink"
              id="channel-link"
              placeholder="Link to channel"
            ></InputField>
          </label>
        </Form>
      </div>
    </>
  )
}

export default ChannelLink
