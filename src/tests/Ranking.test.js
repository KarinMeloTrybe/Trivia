import React from 'react';
 import { screen } from '@testing-library/react';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
 import userEvent from '@testing-library/user-event';
 import App from '../App';

 describe('testa a tela de Ranking', () =>{
   
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

      const ranking =  [
        {
          "name":"Danilo Ramalho Silva",
          "email":"https://www.gravatar.com/avatar/c52678bb868ec3dd07ed8723d522b457",
          "score":2
        },
        {
          "name":"Karin",
          "email":"https://www.gravatar.com/avatar/c52678bb868ec3dd07ed8723d522b457",
          "score":78
        },
        {
            "name":"Paulo",
            "email":"https://www.gravatar.com/avatar/c52678bb868ec3dd07ed8723d522b457",
            "score":5
          }
        ];
      beforeEach(() => {
          jest.restoreAllMocks();
        localStorage.setItem('ranking', JSON.stringify(ranking));
      });
      afterEach(() => localStorage.clear());

    test('verifica se ao clicar no botão "Início" o usuário é redirecionado corretamente', () => {
 const {
    history
 } = renderWithRouterAndRedux(<App />, INITIAL_STATE, '/ranking');
 const btnHome = screen.getByRole('button', { name: /Início/i });
 userEvent.click(btnHome);
 expect(history.location.pathname).toBe('/');
  });
  test('verifica se o score é apresentado na tela', () => {
  const{ history } = renderWithRouterAndRedux(<App />, INITIAL_STATE, '/ranking');
  expect(history.location.pathname).toBe('/ranking')
    const getScore1 = screen.getByTestId('player-score-0')
    expect(getScore1.textContent).toContain('78');
    const getScore2 = screen.getByTestId('player-score-2')
    expect(getScore2.textContent).toContain('2');
     });
     test('verifica se nome do usuário é apresentado na tela', () => {
        const{ history } = renderWithRouterAndRedux(<App />, INITIAL_STATE, '/ranking');
        expect(history.location.pathname).toBe('/ranking')
          const getScore1 = screen.getByTestId('player-name-0')
          expect(getScore1.textContent).toContain('Karin');
          const getScore2 = screen.getByTestId('player-name-2')
          expect(getScore2.textContent).toContain('Danilo Ramalho Silva');
           });
           test('verifica se email do usuário é apresentado na tela', () => {
            const{ history } = renderWithRouterAndRedux(<App />, INITIAL_STATE, '/ranking');
            expect(history.location.pathname).toBe('/ranking')
            const img = screen.getAllByAltText('imagem do usuário');
              expect(img[0]).toHaveAttribute('src', 'https://www.gravatar.com/avatar/c52678bb868ec3dd07ed8723d522b457');
              expect(img[1]).toHaveAttribute('src', 'https://www.gravatar.com/avatar/c52678bb868ec3dd07ed8723d522b457');
               });
 });
 
    