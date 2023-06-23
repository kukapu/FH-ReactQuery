import { useQuery } from "@tanstack/react-query"

const getRandomNumberFromApi = async (): Promise<number> => {
  const response = await fetch('https://www.random.org/integers/?num=1&min=1&max=500&col=1&base=10&format=plain&rnd=new')
  const numberString = await response.text()
  // throw new Error('Error from API') // Hace 3 intentos de llamada hasta error por defecto
  return parseInt(numberString)
}

export const useRandom = () => {

  const query = useQuery({
    queryKey: [ 'randomNumber' ], 
    queryFn: getRandomNumberFromApi,
    retry: 1,
  })

  // const { isLoading, isFetching, error, data } = query

  return query
}