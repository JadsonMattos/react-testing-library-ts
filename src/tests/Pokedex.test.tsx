import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

test('se a página contém um heading h2 com o texto Encountered Pokémon', () => {
  renderWithRouter(<App />, { route: '/' });
  const heading = screen.getByRole('heading', { name: /Encountered Pokémon/i });
  expect(heading).toBeInTheDocument();
});

test('se é exibido o próximo Pokémon da lista quando o botão Próximo Pokémon é clicado', async () => {
  const { user } = renderWithRouter(<App />, { route: '/' });
  const pokemonName = screen.getByTestId('pokemon-name');
  expect(pokemonName).toBeInTheDocument();
  const buttonNext = screen.getByRole('button', { name: /próximo pokémon/i });
  expect(buttonNext).toBeInTheDocument();
  await user.click(buttonNext);
  expect(pokemonName.textContent).toBe('Charmander');
  await user.click(buttonNext);
  await user.click(buttonNext);
  await user.click(buttonNext);
  await user.click(buttonNext);
  await user.click(buttonNext);
  await user.click(buttonNext);
  await user.click(buttonNext);
  expect(pokemonName.textContent).toBe('Dragonair');
  await user.click(buttonNext);
  expect(pokemonName.textContent).toBe('Pikachu');
});

test('se é mostrado apenas um Pokémon por vez', () => {
  renderWithRouter(<App />, { route: '/' });
  const pokemons = screen.getAllByTestId('pokemon-name');
  expect(pokemons).toHaveLength(1);
});

test('se a Pokédex tem os botões de filtro', () => {
  renderWithRouter(<App />, { route: '/' });
  const filterButton = screen.getAllByTestId('pokemon-type-button');
  const buttonTypes = filterButton.map((button) => button.textContent);
  const uniqueButton = [...new Set(buttonTypes)];
  expect(buttonTypes.length).toBe(uniqueButton.length);
  expect(buttonTypes).toEqual(expect.arrayContaining(['Electric', 'Fire', 'Bug', 'Poison', 'Psychic', 'Normal', 'Dragon']));
  const allButton = screen.getByText('All');
  expect(allButton).toBeInTheDocument();
});

test('se a Pokédex contém um botão para resetar o filtro', async () => {
  const { user } = renderWithRouter(<App />, { route: '/' });
  const resetButton = screen.getByRole('button', { name: /All/i });
  expect(resetButton).toBeInTheDocument();
  const filterFire = screen.getByRole('button', { name: /fire/i });
  await user.click(filterFire);
  expect(screen.getByText(/charmander/i)).toBeInTheDocument();
  await user.click(resetButton);
  expect(screen.getByText(/pikachu/i)).toBeInTheDocument();
});
