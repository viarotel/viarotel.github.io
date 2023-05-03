import request from '../utils/request/index'

const baseURL = 'https://ungh.cc/'

const getRepos = async () => {
  const res = await request
    .get(`${baseURL}/orgs/viarotel-org/repos`)
    .catch((e) => console.warn(e))
  return res?.repos || []
}

export default {
  repos: await getRepos(),
}
