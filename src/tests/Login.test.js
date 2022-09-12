import React from 'react';
 import { screen, waitFor } from '@testing-library/react';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
 import userEvent from '@testing-library/user-event';
import Login from '../pages/Login';
import App from '../App';

test('verifica se a rota chamada é a correta', () => {
    const{history}=renderWithRouterAndRedux(<Login />);
    const correctPath = '/'
    expect(history.location.pathname).toBe(correctPath);
  });
  test('verifica se as validações da page são realizadas corretamente', () => {
  renderWithRouterAndRedux(<Login />);
    const Email = 'test@email.com';
    const Name =  'Usuario';
    const inputName = screen.getByPlaceholderText('Digite seu nome');
    const inputEmail = screen.getByPlaceholderText('Digite seu email');
    const playBtnValidation = screen.getByRole('button', { name: /Play/i });
  expect(inputName).toBeInTheDocument();
  expect(inputEmail).toBeInTheDocument();
  expect(playBtnValidation).toBeInTheDocument();
userEvent.type(inputName, Name);
expect(playBtnValidation).toBeDisabled();
userEvent.clear(inputName);
userEvent.type(inputEmail, Email);
expect(playBtnValidation).toBeDisabled();
userEvent.clear(inputEmail);
userEvent.type(inputName, Name);
userEvent.type(inputEmail, Email);
expect(playBtnValidation).toBeEnabled();
  });
  test('verifica se ao clicar no botão Play o usuário é redirecionado corretamente', async () => {
  const token = {
    "response_code":0,
    "response_message":"Token Generated Successfully!",
    "token":"f00cb469ce38726ee00a7c6836761b0a4fb808181a125dcde6d50a9f3c9127b6"
  };
    const{ history }=renderWithRouterAndRedux(<App />);
  const Email = 'test@email.com';
  const Name =  'Usuario';
  const inputName = screen.getByPlaceholderText('Digite seu nome');
  const inputEmail = screen.getByPlaceholderText('Digite seu email');
  const playBtnValidation = screen.getByRole('button', { name: /Play/i });
  expect(playBtnValidation).toBeInTheDocument();
  userEvent.type(inputName, Name);
  userEvent.type(inputEmail, Email);
  userEvent.click(playBtnValidation);
  global.fetch = jest.fn().mockResolvedValue({
    json: jest.fn().mockResolvedValue(token),
  });
  await waitFor(
    () => expect(history.location.pathname).toBe('/game'),
    { timeout: 3000 },
  );
  });
  test('verifica se ao clicar no botão Configurações o usuário é redirecionado corretamente', () => {
    const{ history }=renderWithRouterAndRedux(<App />);
   const btnConfiguration = screen.getByRole('button', { name: /Configurações/i });
    userEvent.click(btnConfiguration);
      expect(history.location.pathname).toBe('/settings');
    });
