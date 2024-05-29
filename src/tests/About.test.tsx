import { render, screen } from '@testing-library/react';
import About from '../pages/About/About';

describe('Teste se a página contém as informações sobre a Pokédex.', () => {
  test('se a página contém um heading h2 com o texto About Pokédex', () => {
    render(<About />);
    const heading = screen.getByText(/About Pokédex/i);
    expect(heading).toBeInTheDocument();
  });

  test('se a página contém dois parágrafos com texto sobre a Pokédex.', () => {
    render(<About />);
    expect(screen.getByText(/This application simulates a Pokédex, a digital encyclopedia containing all Pokémon./i)).toBeInTheDocument();
    expect(screen.getByText(/One can filter Pokémon by type, and see more details for each one of them./i)).toBeInTheDocument();
  });

  test('se a página contém a seguinte imagem de uma Pokédex: https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png', () => {
    render(<About />);
    const image = screen.getByRole('img');
    expect(image).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
    expect(image).toBeInTheDocument();
  });
});
