import { render, screen } from '@testing-library/react';
import Pokemon from '../components/Pokemon/Pokemon';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

test('se é renderizado um card com as informações de determinado Pokémon', () => {
  const card = {
    name: 'Pikachu',
    type: 'Electric',
    averageWeight: {
      value: 6.0,
      measurementUnit: 'kg',
    },
    image: 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png',
  };
  render(<Pokemon pokemon={ card } showDetailsLink={ false } isFavorite={ false } />);
  const namePokemon = screen.getByText('Pikachu');
  expect(namePokemon).toBeInTheDocument();
  const typePokemon = screen.getByText('Electric');
  expect(typePokemon).toBeInTheDocument();
  const weightPokemon = screen.getByText('Average weight: 6 kg');
  expect(weightPokemon).toBeInTheDocument();
  const imagePokemon = screen.getByAltText('Pikachu sprite');
  expect(imagePokemon).toHaveAttribute('alt', 'Pikachu sprite');
  expect(imagePokemon).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
  expect(imagePokemon).toBeInTheDocument();
});

test('se o card do Pokémon indicado na Pokédex contém um link de navegação para exibir detalhes desse Pokémon', () => {
  renderWithRouter(<App />, { route: '/' });
  const linkDetails = screen.getByRole('link', { name: /more details/i });
  expect(linkDetails).toHaveAttribute('href', '/pokemon/25');
  expect(linkDetails).toBeInTheDocument();
});

test('se ao clicar no link de navegação do Pokémon, é feito o redirecionamento da aplicação para a página de detalhes de Pokémon', async () => {
  const { user } = renderWithRouter(<App />, { route: '/' });
  const linkDetails = screen.getByRole('link', { name: /more details/i });
  expect(linkDetails).toBeInTheDocument();
  await user.click(linkDetails);
  expect(screen.getByRole('heading', { name: /pikachu details/i }));
});

test('se a URL exibida no navegador muda para /pokemon/<id>, em que <id> é o id do Pokémon cujos detalhes se deseja ver', async () => {
  const { user } = renderWithRouter(<App />, { route: '/' });
  const linkDetails = screen.getByRole('link', { name: /more details/i });
  expect(linkDetails).toBeInTheDocument();
  await user.click(linkDetails);
  expect(global.location.href).toEqual('http://localhost:3000/pokemon/25');
});

test('se existe um ícone de estrela nos Pokémon favoritados', async () => {
  const { user } = renderWithRouter(<App />, { route: '/pokemon/25' });
  const favorited = screen.getByRole('checkbox', { name: /pokémon favoritado\?/i });
  expect(favorited).toBeInTheDocument();
  await user.click(favorited);
  const icon = screen.getByRole('img', { name: /pikachu is marked as favorite/i });
  expect(icon).toHaveAttribute('src', '/star-icon.png');
  expect(icon).toBeInTheDocument();
});
