import Arena from 'are.na'

import { Form, InputField } from '@redwoodjs/forms'

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

    // getting the slug from the link
    const splitLink = channelLink.split('/')
    const slug = splitLink[splitLink.length - 1]

    // replacing the link in the input field with just the slug
    event.preventDefault()
    const inputElement = document.getElementById(
      'channel-link'
    ) as HTMLInputElement
    inputElement.value = slug

    // retrigger resize input
    // Trigger the resizeInput function manually
    resizeInput({ currentTarget: inputElement })

    fetchData(slug)
  }

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      onSubmit({ channelLink: event.target.value })
    }
  }

  const handlePaste = (event) => {
    const pastedText = event.clipboardData.getData('text')
    onSubmit({ channelLink: pastedText })
  }

  const resizeInput: React.FormEventHandler<HTMLInputElement> = (event) => {
    const input = event.currentTarget
    input.style.width = input.value.length + 10 + 'ch'
  }

  return (
    <>
      <div className="header">
        <div>
          <Logo />
          <h4>Another View</h4>
        </div>
        <Form onSubmit={onSubmit} autoComplete="off">
          <InputField
            name="channelLink"
            id="channel-link"
            placeholder="Link to channel or slug"
            onPaste={handlePaste}
            onKeyDown={handleKeyPress}
            onInput={resizeInput}
          ></InputField>
        </Form>
      </div>
    </>
  )
}

export default ChannelLink
