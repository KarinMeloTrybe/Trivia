import React from 'react';
 import { screen, waitFor } from '@testing-library/react';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
 import App from '../App';
 import { questionsResponse, invalidTokenQuestionsResponse} from './helpers/questions';
import userEvent from '@testing-library/user-event';

 describe('testa a tela de jogo', () =>{

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
          token: '28ed9ba22f17fff2b5df0b96a0eaa0f6e67ea70aba2cd581ecabab1f86c53f52',
          isFetching: false,
          invalidToken: false
        },
        };

    test('verifica se o avatar e o nome do jogador estão corretos', async() => {
        global.fetch = jest.fn().mockResolvedValue({
            json: jest.fn().mockResolvedValue(questionsResponse),
          });
     const { history } = renderWithRouterAndRedux(<App />, INITIAL_STATE, '/game');
     await waitFor(
        () => expect(history.location.pathname).toBe('/game'),
        { timeout: 3000 },
      );
      const userName = 'Danilo Ramalho Silva'  
      const imgSrc = 'https://www.gravatar.com/avatar/c52678bb868ec3dd07ed8723d522b457'
      const playerName = screen.getByTestId('header-player-name')
      const playerAvatar = screen.getByAltText('foto de perfil')
        expect(playerName).toBeInTheDocument();
        expect(playerAvatar).toBeInTheDocument();
        expect(playerName.textContent).toBe(userName)
        expect(playerAvatar).toHaveAttribute('src', imgSrc)
         });

             test('verifica se o botão "next" não existe até a selecionar uma alternativa', async() => {
        global.fetch = jest.fn().mockResolvedValue({
            json: jest.fn().mockResolvedValue(questionsResponse),
          });
     const { history } = renderWithRouterAndRedux(<App />, INITIAL_STATE, '/game');
     await waitFor(
        () => expect(history.location.pathname).toBe('/game'),
        { timeout: 3000 },
      );
      const btnExist = screen.queryByTestId('btn-next')
        expect(btnExist).not.toBeInTheDocument();
        const answerCorrect =  screen.getByTestId('correct-answer')
        userEvent.click(answerCorrect)
        const getBtnNext = screen.queryByTestId('btn-next')
        expect(getBtnNext).toBeInTheDocument();
         });

         test('verifica se ao clicar no botão "next" a próxima pergunta é apresentada', async() => {
            global.fetch = jest.fn().mockResolvedValue({
                json: jest.fn().mockResolvedValue(questionsResponse),
              });
         const { history } = renderWithRouterAndRedux(<App />, INITIAL_STATE, '/game');
         await waitFor(
            () => expect(history.location.pathname).toBe('/game'),
            { timeout: 3000 },
          );
          const questionId = screen.getByTestId('question-text')
          expect(questionId.textContent).toContain('The Republic of Malta is the smallest microstate worldwide.');
            const answerCorrect =  screen.getByTestId('correct-answer')
            userEvent.click(answerCorrect)
            const getBtnNext = screen.queryByTestId('btn-next')
            userEvent.click(getBtnNext)
            const questionId2 = screen.getByTestId('question-text')
            expect(questionId2.textContent).toContain('In quantum physics, which of these theorised sub-atomic particles has yet to be observed?');
             });
             test('verifica se após clicar no botão "next" 5 vezes o jogador é direcionado para a page de feedback ', async() => {
                global.fetch = jest.fn().mockResolvedValue({
                    json: jest.fn().mockResolvedValue(questionsResponse),
                  });
             const { history } = renderWithRouterAndRedux(<App />, INITIAL_STATE, '/game');
             await waitFor(
                () => expect(history.location.pathname).toBe('/game'),
                { timeout: 3000 },
              );
                let answer=  screen.getByTestId('correct-answer')
                userEvent.click(answer)
                let getBtnNext = screen.queryByTestId('btn-next')
                userEvent.click(getBtnNext)
                 answer=  screen.getByTestId('wrong-answer-0')
                userEvent.click(answer)
                 getBtnNext = screen.queryByTestId('btn-next')
                userEvent.click(getBtnNext)
                answer=  screen.getByTestId('correct-answer')
                userEvent.click(answer)
                 getBtnNext = screen.queryByTestId('btn-next')
                userEvent.click(getBtnNext)
                answer=  screen.getByTestId('correct-answer')
                userEvent.click(answer)
                 getBtnNext = screen.queryByTestId('btn-next')
                userEvent.click(getBtnNext)
                answer=  screen.getByTestId('correct-answer')
                userEvent.click(answer)
                 getBtnNext = screen.queryByTestId('btn-next')
                userEvent.click(getBtnNext)
                expect(history.location.pathname).toBe('/feedback')
                 });
                 test('verifica se ao ultrapassar o tempo de 30s as alternativas ficam em "Disabled"', async() => {
                    global.fetch = jest.fn().mockResolvedValue({
                        json: jest.fn().mockResolvedValue(questionsResponse),
                      });
                 const { history } = renderWithRouterAndRedux(<App />, INITIAL_STATE, '/game');
                 await waitFor(
                    () => expect(history.location.pathname).toBe('/game'),
                    { timeout: 3000 },
                  );
                    const answerCorrect =  screen.getByTestId('correct-answer')
                    await waitFor(
                        () => expect(answerCorrect).toBeDisabled(),
                        { timeout: 32000 },
                      );
                     });
                     test('verifica se a pontuação é ajustada ao tempo de resposta', async() => {
                        global.fetch = jest.fn().mockResolvedValue({
                            json: jest.fn().mockResolvedValue(questionsResponse),
                          });
                     const { history } = renderWithRouterAndRedux(<App />, INITIAL_STATE, '/game');
                     await waitFor(
                        () => expect(history.location.pathname).toBe('/game'),
                        { timeout: 3000 },
                      );
                        const answerCorrect =  screen.getByTestId('correct-answer')
                        await waitFor(
                            () => userEvent.click(answerCorrect),
                            { timeout: 25000 },
                          );
                          const getScore = screen.getByTestId('header-score')
                          expect(getScore.textContent).toContain("39")
                         });
                         test('verifica se ao receber um token inválido o jogador é redirecionado para tela de login', async() => {
                            global.fetch = jest.fn().mockResolvedValue({
                                json: jest.fn().mockResolvedValue(invalidTokenQuestionsResponse),
                              });
                         const { history } = renderWithRouterAndRedux(<App />, INITIAL_STATE, '/game');
                         await waitFor(
                            () => expect(history.location.pathname).toBe('/game'),
                            { timeout: 3000 },
                          );
                            await waitFor(
                                () =>expect(history.location.pathname).toBe('/'),
                                { timeout: 4000 },
                              );
                             });
});
