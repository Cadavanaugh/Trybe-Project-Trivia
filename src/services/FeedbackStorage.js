import md5 from 'crypto-js/md5';

export default function rankingStorage(name, score, email) {
  const playerStats = {
    name,
    score,
    picture: `https://www.gravatar.com/avatar/${md5(email).toString()}` };

  if (localStorage.ranking === undefined) localStorage.ranking = '[]'; // Cria localStorage se vazio.

  const currentStorage = JSON.parse(localStorage.ranking);
  currentStorage.push(playerStats);
  localStorage.ranking = JSON.stringify(currentStorage);
}
