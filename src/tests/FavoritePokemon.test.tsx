import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

test('É exibida na tela a mensagem No favorite pokemon found caso a pessoa não tenha Pokémon favorito.', async () => {
  const { user } = renderWithRouter(<App />, { route: '/pokemon/25' });
  await user.click(screen.getByText(/Favorite/i));
  const message = screen.getByText('No favorite Pokémon found');
  expect(message).toBeInTheDocument();
});

it('should only display favorite pokemon', async () => {
  const { user } = renderWithRouter(<App />, { route: '/pokemon/25' });
  await user.click(screen.getByText(/Pokémon favoritado?/i));
  await user.click(screen.getByText(/Favorite/i));
  const favoritedPokemon = screen.getByText(/Pikachu/i);
  expect(favoritedPokemon).toBeInTheDocument();
});
