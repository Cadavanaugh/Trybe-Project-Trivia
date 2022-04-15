import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styles from './Ranking.module.css';

class Ranking extends Component {
  render() {
    const ranking = JSON.parse(localStorage.ranking);
    ranking.sort((a, b) => b.score - a.score);
    return (
      <main className={ styles.main }>
        <h1 data-testid="ranking-title">Ranking</h1>
        <table className={ styles.list }>
          <thead>
            <th>Avatar</th>
            <th>Nome</th>
            <th>Pontuação</th>
          </thead>
          <tbody>
            {
              ranking.map((x, index) => (
                <tr key={ index }>
                  <td>
                    <img src={ x.picture } alt="Gravatar." />
                  </td>
                  <td data-testid={ `player-name-${index}` }>{x.name}</td>
                  <td data-testid={ `player-score-${index}` }>{x.score}</td>
                </tr>
              ))
            }
          </tbody>
        </table>
        <Link
          to="/"
          className={ styles.button }
        >
          <input
            type="button"
            data-testid="btn-go-home"
            value="Play Again"
          />
        </Link>
      </main>
    );
  }
}

export default Ranking;
