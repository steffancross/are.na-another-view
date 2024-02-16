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
    let pages: number
    const data: Array<any> = []
    const arena = new Arena()

    try {
      // arena will only send a max 'contents' array of 100. so have to get size of channel
      // first, then get all the content by pages of 100
      const channelOverview = await arena.channel(slug).get()
      pages = Math.ceil(channelOverview.length / 100)

      for (let i = 1; i <= pages; i++) {
        const content = await arena
          .channel(slug)
          .contents({ page: i, per: 100 })
        data.push(...content)
      }
    } catch {
      setLoadingWheel(false)
      setFetchError(true)
      setTimeout(() => {
        setFetchError(false)
      }, 2300)
    }

    setData(data)
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
