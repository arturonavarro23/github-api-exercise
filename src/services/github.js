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

function getUser(userName) {
  return new Promise((resolve, reject) => {
    Promise.all([api.get(`/users/${userName}`), api.get(`/users/${userName}/repos?per_page=10&sort=pushed`)])
      .then(values => {
        const [userValues, reposValues] = values;
        resolve({
          data: {
            ...userValues.data,
            repos: reposValues.data,
          },
        });
      })
      .catch(error => {
        reject(error);
      });
  });
}

export default {
  getRepositories,
  getComments,
  getUser,
};
