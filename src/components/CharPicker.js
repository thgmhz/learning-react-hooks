import React, { useState, useEffect } from 'react'

import './CharPicker.css'

const CharPicker = ({
  onCharSelect,
  selectedChar,
  side,
}) => {
  const [loadedCharacters, setCharacters] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const componentDidMount = () => {
    setIsLoading(true)

    fetch('https://swapi.co/api/people')
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch.')
        }
        
        return response.json()
      })
      .then(charData => {
        const selectedCharacters = charData.results.slice(0, 5)

        const charactersArray = selectedCharacters.map((char, index) => ({
          name: char.name,
          id: index + 1
        }))

        setIsLoading(false)
        setCharacters(charactersArray)
      })
      .catch(err => {
        console.log(err)
        setIsLoading(false)
      })
  }

  useEffect(componentDidMount, []) 

  let content = <p>Loading characters...</p>

  if (
    !isLoading &&
    loadedCharacters &&
    loadedCharacters.length > 0
  ) {
    content = (
      <select
        onChange={onCharSelect}
        value={selectedChar}
        className={side}
      >
        {loadedCharacters.map(char => (
          <option key={char.id} value={char.id}>
            {char.name}
          </option>
        ))}
      </select>
    )
  } else if (
    !isLoading &&
    (!loadedCharacters || loadedCharacters.length === 0)
  ) {
    content = <p>Could not fetch any data.</p>
  }
  
  return content
}

export default CharPicker
