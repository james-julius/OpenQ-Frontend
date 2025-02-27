/**
 * @jest-environment jsdom
 */
import React from 'react';
import { render, screen } from '../../test-utils';
import ContractWizard from '../../components/ContractWizard/ContractWizard';
import userEvent from '@testing-library/user-event';

describe('ContractWizard', () => {
  it('should open wizard and direct to discord server', async () => {
    // ARRANGE
    const user = userEvent.setup();
    render(<ContractWizard wizardVisibility={true} />);

    // ACT
    await user.click(screen.getByText('No'));
    await user.click(screen.getByText('No'));
    await user.click(screen.getByText('No'));
    await user.click(screen.getByText('No'));
    expect(await screen.findByText(/we didn't find a suitable contract/i)).toBeInTheDocument();
    expect(screen.getByRole('link').href).toBe('https://discord.gg/puQVqEvVXn');
  });

  it('should open wizard and direct to repating contract', async () => {
    // ARRANGE
    const user = userEvent.setup();
    render(<ContractWizard wizardVisibility={true} />);

    // ACT
    await user.click(screen.getByText('No'));
    await user.click(screen.getByText('No'));
    await user.click(screen.getByText('No'));
    await user.click(screen.getByText('Yes'));
    expect(await screen.findByText(/Create a Fixed Contest Contract to send funds to any GitHub issue/i));
  });

  it('should open wizard and direct to repating contract', async () => {
    // ARRANGE
    const user = userEvent.setup();
    render(<ContractWizard wizardVisibility={true} />);

    // ACT
    await user.click(screen.getByText('No'));
    await user.click(screen.getByText('Yes'));
    expect(await screen.findByText(/Deploy split price contract/i));
    expect(await screen.findByText(/Reward Split/i));
  });
});
