import { ofetch } from 'ofetch'

const baseURL = 'https://ungh.cc'

const excludes = ['waline-service']

async function getRepos() {
  const res = await ofetch(`${baseURL}/orgs/viarotel-org/repos`, {
    method: 'GET',
  }).catch(e => console.warn(e))

  const repos = res?.repos || []

  const data = repos
    .filter(item => !excludes.includes(item.name))
    .sort((a, b) => b.stars - a.stars)

  return data
}

export default {
  async load() {
    return {
      repos: await getRepos(),
    }
  },
}
