export default function rankingStorage(name, assertions, score) {
  const playerStats = { name, assertions, score };

  if (localStorage.ranking === undefined) localStorage.ranking = '[]'; // Cria localStorage se vazio.

  const currentStorage = JSON.parse(localStorage.ranking);
  currentStorage.push(playerStats);
  localStorage.ranking = JSON.stringify(currentStorage);
}
