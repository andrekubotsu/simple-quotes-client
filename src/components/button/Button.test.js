import { render, screen }from '@testing-library/react';
import { Button } from './Button';

test('renders button with text',  () => {
    render(<Button>Text</Button>);

    const buttonEl = screen.getByText('Text');
    expect(buttonEl).toBeInTheDocument();
});