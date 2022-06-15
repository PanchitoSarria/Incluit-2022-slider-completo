import React, { useState, useEffect } from 'react';
import { FiChevronRight, FiChevronLeft } from 'react-icons/fi';
import { FaQuoteRight } from 'react-icons/fa';
import data from './data';

const URL = 'https://my-json-server.typicode.com/PanchitoSarria/api-testing-mockup/reviews'

function App() {
  const [people, setPeople] = useState([])
  const [index, setIndex] = useState(0)

  const fetchData = async () => {
    try {
      const response = await fetch(URL)
      const jsonData = await response.json()
      setPeople(jsonData)
    } catch (error) {
      console.log('hubo un error: ', error.message)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  useEffect(() => {
    const lastIndex = people.length - 1
    if(index < 0){
      setIndex(lastIndex)
    }
    if(index > lastIndex){
      setIndex(0)
    }
  }, [index, people])

  useEffect(() => {
    const sliderTimer = setTimeout(() => {
      setIndex(index + 1)
    }, 4000)

    return () => clearTimeout(sliderTimer)
  }, [index])


  return (
    <section className="section">
      <div className="title">
        <h2>
          <span>/</span> Reviews
        </h2>
      </div>
      <div className="section-center">
        {
          people.map((person, personIndex) => {
            const {id, image, name, title, quote} = person
            let position = 'nextSlide'
            if(index === personIndex){
              position = 'activeSlide'
            }
            if((index === 0 && personIndex === (people.length - 1)) || personIndex === (index - 1)){
              position = 'lastSlide'
            }

            return (
              <article key={id} className={position} data-index={personIndex}>
                <img src={image} alt="Picture" className='person-img'/>
                <h4>{name}</h4>
                <p className="title">{title}</p>
                <p className="text">{quote}</p>
                <FaQuoteRight className='icon'/>
              </article>
            )
          })
        }
        <button className='prev' onClick={() => setIndex(index - 1)}>
          <FiChevronLeft />
        </button>
        <button className='next' onClick={() => setIndex(index + 1)}>
          <FiChevronRight />
        </button>
      </div>
    </section>
  )
}

export default App;
