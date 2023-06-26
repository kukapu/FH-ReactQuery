import axios from 'axios'

export const githubApi = axios.create({
  baseURL: 'https://api.github.com/repos/facebook/react',
  // headers: {
  //   Authorization: 'Bearer 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'
  // }
})

