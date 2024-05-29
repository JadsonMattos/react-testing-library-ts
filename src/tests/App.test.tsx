import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

test('Teste se o topo da aplicação contém um conjunto fixo de links de navegação:', () => {
  renderWithRouter(<App />);
  const homeLink = screen.getByRole('link', { name: /Home/i });
  expect(homeLink).toBeInTheDocument();
  const aboutLink = screen.getByRole('link', { name: /About/i });
  expect(aboutLink).toBeInTheDocument();
  const favoritePokemonLink = screen.getByRole('link', { name: /Favorite Pokémon/i });
  expect(favoritePokemonLink).toBeInTheDocument();
});

test('Teste se a aplicação é redirecionada para a página inicial, na URL /, ao clicar no link Home da barra de navegação.', async () => {
  const { user } = renderWithRouter(<App />, { route: '/about' });
  expect(screen.getByRole('link', { name: /About/i })).toBeInTheDocument();
  const homeLink = screen.getByRole('link', { name: /Home/i });
  await user.click(homeLink);
  expect(homeLink).toBeInTheDocument();
});

test('Teste se a aplicação é redirecionada para a página de About, na URL /about, ao clicar no link About da barra de navegação.', async () => {
  const { user } = renderWithRouter(<App />, { route: '/' });
  expect(screen.getByRole('link', { name: /Home/i })).toBeInTheDocument();
  const aboutLink = screen.getByRole('link', { name: /About/i });
  await user.click(aboutLink);
  expect(aboutLink).toBeInTheDocument();
});

test('Teste se a aplicação é redirecionada para a página de Pokémon Favoritados, na URL /favorites, ao clicar no link Favorite Pokémon da barra de navegação.', async () => {
  const { user } = renderWithRouter(<App />, { route: '/' });
  expect(screen.getByRole('link', { name: /Home/i })).toBeInTheDocument();
  const favoritePokemonLink = screen.getByRole('link', { name: /Favorite Pokémon/i });
  await user.click(favoritePokemonLink);
  expect(favoritePokemonLink).toBeInTheDocument();
});

test('Teste se a aplicação é redirecionada para a página Not Found ao entrar em uma URL desconhecida.', async () => {
  renderWithRouter(<App />, { route: '/digimon' });
  expect(screen.getByText(/Page requested not found/i)).toBeInTheDocument();
});
