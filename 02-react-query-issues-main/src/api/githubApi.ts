import axios from 'axios'

export const githubApi = axios.create({
  baseURL: 'https://api.github.com/repos/facebook/react',
  headers: {
    Authorization: 'Bearer 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'
  }
})

