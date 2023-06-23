import { useRandom } from './hooks/useRandom'
import './App.css'


function App() {

  const query = useRandom()
 

  return (
    <div className='App App-header'>
      { 
        query.isFetching 
        ? ( <h2>Loading...</h2> )
        : (!query.error && <h2>Random Number: { query.data }</h2>)
      }
      { !query.isLoading && query.error && <h2>{ `${query.error}` }</h2> }
      <button onClick={ () => query.refetch() } disabled={ query.isFetching } >
        { query.isFetching ? '...' : 'Get Random Number'}
      </button>
    </div>
  )
}

export default App
