import { screen, render } from '@testing-library/react';
import NotFound from '../pages/NotFound/NotFound';

test('se a página contém um heading h2 com o texto Page requested not found', () => {
  render(<NotFound />);
  const heading = screen.getByRole('heading', { level: 2 });
  expect(heading).toHaveTextContent('Page requested not found');
});

test('se a página mostra a imagem com o texto alternativo https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif', () => {
  render(<NotFound />);
  const image = screen.getByAltText("Clefairy pushing buttons randomly with text I have no idea what i'm doing");
  expect(image).toHaveAttribute('src', '/404.gif');
});
