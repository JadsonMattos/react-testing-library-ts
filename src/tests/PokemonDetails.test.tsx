import { screen, waitFor } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

const details = '/pokemon/25';
test('se as informações detalhadas do Pokémon selecionado são mostradas na tela', () => {
  renderWithRouter(<App />, { route: details });
  const nameDetails = screen.getByRole('heading', { name: /pikachu details/i });
  expect(nameDetails).toBeInTheDocument();
  const linkDetails = screen.queryByRole('link', { name: /more details/i });
  expect(linkDetails).not.toBeInTheDocument();
  const sectionDetails = screen.getByRole('heading', { name: /summary/i });
  expect(sectionDetails).toBeInTheDocument();
  const sectionParagraph = screen.getByText(/this intelligent pokémon roasts hard berries with electricity to make them tender enough to eat\./i);
  expect(sectionParagraph).toBeInTheDocument();
});

test('se existe na página uma seção com os mapas contendo as localizações do Pokémon', () => {
  renderWithRouter(<App />, { route: details });
  const locations = screen.getByRole('heading', { name: /game locations of pikachu/i });
  expect(locations).toBeInTheDocument();
  expect(screen.getByText(/kanto viridian forest/i)).toBeInTheDocument();
  expect(screen.getByText(/kanto power plant/i)).toBeInTheDocument();
  const maps = screen.getAllByAltText(/pikachu location/i);
  expect(maps).toHaveLength(2);
  expect(maps[0]).toHaveAttribute('src', 'https://archives.bulbagarden.net/media/upload/0/08/Kanto_Route_2_Map.png');
  expect(maps[1]).toHaveAttribute('src', 'https://archives.bulbagarden.net/media/upload/b/bd/Kanto_Celadon_City_Map.png');
});

test('se o usuário pode favoritar um Pokémon por meio da página de detalhes', async () => {
  const { user } = renderWithRouter(<App />, { route: details });
  const checkbox = screen.getByRole('checkbox', { name: /pokémon favoritado\?/i });
  expect(checkbox).toBeInTheDocument();
  expect(checkbox).not.toBeChecked();
  await user.click(checkbox);
  await waitFor(() => expect(checkbox).toBeChecked());
  expect(localStorage.getItem('favorite_pokemon')).toBe(null);
  await user.click(checkbox);
  await waitFor(() => expect(checkbox).not.toBeChecked());
  expect(localStorage.getItem('favorite_pokemon')).toBe(null);
});
