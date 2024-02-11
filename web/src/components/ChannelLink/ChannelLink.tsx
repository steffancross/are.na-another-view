import { useState } from 'react'

import Arena from 'are.na'

import { Form, InputField } from '@redwoodjs/forms'

import { useStore } from 'src/stores/store'

import Logo from '../Logo/Logo'

const ChannelLink = () => {
  const setData = useStore((state) => state.setData)
  const setLoadingWheel = useStore((state) => state.setLoadingWheel)
  const setImagesLoaded = useStore((state) => state.setImagesLoaded)
  const [fetchError, setFetchError] = useState<boolean>(false)

  const fetchData = async (slug: string) => {
    setLoadingWheel(true)
    const arena = new Arena()
    arena
      .channel(slug)
      .contents({ per: 100 })
      .then((chan) => setData(chan))
      .catch(() => {
        setLoadingWheel(false)
        setFetchError(true)
        setTimeout(() => {
          setFetchError(false)
        }, 2300)
      })
  }

  const onSubmit = async ({ channelLink }) => {
    setImagesLoaded(false)

    // getting the slug from the link
    const splitLink = channelLink.split('/')
    const slug = splitLink[splitLink.length - 1]

    // clearing input for next
    event.preventDefault()
    const inputElement = document.getElementById(
      'channel-link'
    ) as HTMLInputElement
    inputElement.value = ''

    await fetchData(slug)
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
    input.style.width = input.value.length + 'ch'
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
      {fetchError ? (
        <div className="fetch-error">
          <p>Unable to find that channel.</p>
          <p>Check link or it may be a private channel.</p>
        </div>
      ) : null}
    </>
  )
}

export default ChannelLink
