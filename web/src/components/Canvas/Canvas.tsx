const Canvas = () => {
  const data = [
    'https://upload.wikimedia.org/wikipedia/commons/2/27/Red_square.svg',
    'https://upload.wikimedia.org/wikipedia/commons/2/27/Red_square.svg',
  ]
  return (
    <div>
      {data.map((item, index) => (
        <img src={item} alt="" key={index}></img>
      ))}
    </div>
  )
}

export default Canvas
