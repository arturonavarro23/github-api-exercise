import api from '../utils/api';

function getRepositories(query) {
  return api.get('/search/repositories', {
    params: {
      q: query,
    },
  });
}

function getComments(repo) {
  const { name, owner } = repo;
  return api.get(`/repos/${owner.login}/${name}/comments`);
}

export default {
  getRepositories,
  getComments,
};
