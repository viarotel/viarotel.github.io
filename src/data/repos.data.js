import { ofetch } from 'ofetch'

const baseURL = 'https://ungh.cc'

async function getRepos() {
  const res = await ofetch(`${baseURL}/orgs/viarotel-org/repos`, {
    method: 'GET',
  }).catch(e => console.warn(e))
  return res?.repos || []
}

export default {
  async load() {
    return {
      repos: await getRepos(),
    }
  },
}
