import React from 'react';
 import { screen } from '@testing-library/react';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
 import userEvent from '@testing-library/user-event';
 import App from '../App';

  describe('testa a tela de Feedback', () =>{
   
    const INITIAL_STATE = {
        player: {
          score: 0,
          name: 'Danilo Ramalho Silva',
          email: 'daniloti@hotmail.com',
          time: false,
          remaningTime: 30,
          myTimer: 35,
          secondsTimer: 1,
          assertions: 0
        },
        TokenReducer: {
          token: '5d5b27f29813462eb7b9b641c5b1f64e80fe29db089fbf5fc7016d97fced8ffb',
          isFetching: false,
          invalidToken: false
        }
      }

    test('Verifica se ao clicar no botão Ranking, o usuário é redirecionado para a page correta', () => {
 const {
    history
 } = renderWithRouterAndRedux(<App />, INITIAL_STATE, '/feedback');
 const btnRanking = screen.getByRole('button', { name: /Ranking/i });
   userEvent.click(btnRanking);
 expect(history.location.pathname).toBe('/ranking');
  });
  test('Verifica se ao clicar no botão Play again, o usuário é redirecionado para a page correta', () => {
    const {
       history
    } = renderWithRouterAndRedux(<App />, INITIAL_STATE, '/feedback');
    const btnPlayAgain = screen.getByRole('button', { name: /Play again/i });
      userEvent.click(btnPlayAgain);
    expect(history.location.pathname).toBe('/');
     });
  })
 