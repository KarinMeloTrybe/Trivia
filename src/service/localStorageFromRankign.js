if (!JSON.parse(localStorage.getItem('ranking'))) {
  localStorage.setItem('ranking', JSON.stringify([]));
}

export const saveRankingToLocalStorage = (player) => localStorage
  .setItem('ranking', JSON.stringify(player));

export const getRakingLocalStorage = () => JSON.parse(localStorage.getItem('ranking'));

export function saveRaking(ranking) {
  const players = getRakingLocalStorage();
  if (!players) {
    saveRankingToLocalStorage([ranking]);
  } else {
    saveRankingToLocalStorage([...players, ranking]);
  }
}
