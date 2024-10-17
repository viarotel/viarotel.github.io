import { ofetch } from 'ofetch'

const baseURL = 'https://ungh.cc'

const whitelist = ['escrcpy', 'cleants', 'vite-uniapp-template', 'markvite', 'packages', 'environments']

async function getRepos() {
  const res = await ofetch(`${baseURL}/orgs/viarotel-org/repos`, {
    method: 'GET',
  }).catch(e => console.warn(e))

  const repos = res?.repos || []

  const data = whitelist.reduce((arr, name) => {
    const item = repos.find(item => item.name === name)

    if (item) {
      arr.push(item)
    }

    return arr
  }, [])

  return data
}

export default {
  async load() {
    return {
      repos: await getRepos(),
    }
  },
}
