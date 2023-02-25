import { useEffect, useState } from 'react'

const IMAGES = [
  "https://icongr.am/devicon/angularjs-original.svg?size=128&color=currentColor",
  "https://icongr.am/devicon/babel-original.svg?size=128&color=currentColor",
  "https://icongr.am/devicon/bower-original.svg?size=128&color=currentColor",
  "https://icongr.am/devicon/chrome-original.svg?size=128&color=currentColor",
  "https://icongr.am/devicon/c-original.svg?size=128&color=currentColor",
  "https://icongr.am/devicon/ie10-original.svg?size=128&color=currentColor",
  "https://icongr.am/devicon/javascript-original.svg?size=128&color=currentColor",
  "https://icongr.am/devicon/typescript-original.svg?size=128&color=currentColor",
  "https://icongr.am/devicon/python-original.svg?size=128&color=currentColor",
  "https://icongr.am/devicon/docker-original.svg?size=128&color=currentColor",
]
  .flatMap(image => [`a|${image}`, `b|${image}`]) // [1,[2,2],3] => [1,2,2,3]
  .sort(() => Math.random() - 0.5);

const App = () => {

  const [guessed, setGuessed] = useState<String[]>([])
  const [selected, setSelected] = useState<String[]>([])

  useEffect(() => {
    if (selected.length === 2) {
      if (selected[0].split('|')[1] === selected[1].split('|')[1]) {
        setGuessed(guessed => guessed.concat(selected));
      }
      setTimeout(() => setSelected([]), 1000);
    }

  }, [selected])

  useEffect(() => {
    if (guessed.length === IMAGES.length) {
      alert("You win!")
      location.reload()
    }
  }, [guessed])

  return (
    <div className='container'>
      <h1 style={{ textAlign: 'center',marginBottom:40 }}>MEMOTECH</h1>
      <ul
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(5,1fr)',
          gap: 24,
          margin: 'auto',
        }}
      >
        {
          IMAGES.map(image => {
            const [, url] = image.split('|');
            return (
              <li
                key={image}
                style={{ cursor: 'pointer', padding: 12, border: '1px solid #666', borderRadius: 12 }}
                onClick={() => selected.length < 2 && setSelected(selected => selected.concat(image))}
              >
                {
                  selected.includes(image) || guessed.includes(image) ?
                    <img src={url} alt="icon" />
                    :
                    <img src="https://icongr.am/clarity/unknown-status.svg?size=128&color=currentColor" alt="incognit" />
                }
              </li>
            )
          })
        }
      </ul>
    </div>
  )
}

export default App