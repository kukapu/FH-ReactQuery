import { useEffect, useReducer, useState } from 'react'
import './App.css'

function OldApp() {

  const [ number, setNumber ] = useState<number>()
  const [ isLoading, setIsLoading ] = useState<boolean>(false)
  const [error, setError] = useState<string>()
  const [ key, forceRefetch ] = useReducer((x)=> x + 1, 0)

  const getRandomNumberFromApi = async (): Promise<number> => {
    setIsLoading(true)
    const response = await fetch('https://www.random.org/integers/?num=1&min=1&max=500&col=1&base=10&format=plain&rnd=new')
    const numberString = await response.text()

    return parseInt(numberString)
  }

  useEffect(() => {
    setIsLoading(true)
    getRandomNumberFromApi()
      .then(setNumber)
      .catch( error => setError(error.message))
  }, [key])

  useEffect(() => {
    if (number) {
      setIsLoading(false)
    }
  }, [number])

  useEffect(() => {
    if( error ) {
      setIsLoading(false)
    }
  }, [error])
  
  

  return (
    <div className='App App-header'>
      { 
        isLoading 
        ? ( <h2>Loading...</h2> )
        : (!error && <h2>Random Number: { number }</h2>)
      }
      { !isLoading && error && <h2>{ error }</h2> }
      <button onClick={ forceRefetch } disabled={ isLoading } >
        { isLoading ? '...' : 'Get Random Number'}
      </button>
    </div>
  )
}

export default OldApp
