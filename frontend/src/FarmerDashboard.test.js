import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import FarmerDashboard from './FarmerDashboard';

describe('FarmerDashboard Order Management', () => {
  test('renders incoming orders and listings', () => {
    render(<FarmerDashboard />);
    expect(screen.getByText(/Produce Listings/i)).toBeInTheDocument();
    expect(screen.getByText(/Incoming Orders/i)).toBeInTheDocument();
  });

  test('accepts and declines an order', () => {
    render(<FarmerDashboard />);
    // Accept first order
    const acceptBtn = screen.getAllByText('Accept')[0];
    fireEvent.click(acceptBtn);
    expect(screen.getAllByText('accepted')[0]).toBeInTheDocument();
    // Decline second order
    const declineBtn = screen.getAllByText('Decline')[0];
    fireEvent.click(declineBtn);
    expect(screen.getAllByText('declined')[0]).toBeInTheDocument();
  });

  test('adds a new listing and validates input', () => {
    render(<FarmerDashboard />);
    fireEvent.click(screen.getByText('+ Add'));
    fireEvent.change(screen.getByPlaceholderText('Type'), { target: { value: 'Beans' } });
    fireEvent.change(screen.getByPlaceholderText('Quantity'), { target: { value: '200' } });
    fireEvent.change(screen.getByPlaceholderText('Price (KES)'), { target: { value: '3000' } });
    fireEvent.change(screen.getByPlaceholderText('Harvest Date'), { target: { value: '2025-08-01' } });
    fireEvent.click(screen.getByText('Add'));
    expect(screen.getByText(/Beans/i)).toBeInTheDocument();
  });

  test('does not add listing with missing required fields', () => {
    render(<FarmerDashboard />);
    fireEvent.click(screen.getByText('+ Add'));
    fireEvent.change(screen.getByPlaceholderText('Type'), { target: { value: '' } });
    fireEvent.change(screen.getByPlaceholderText('Quantity'), { target: { value: '' } });
    fireEvent.click(screen.getByText('Add'));
    // Form should still be visible due to validation
    expect(screen.getByPlaceholderText('Type')).toBeInTheDocument();
  });

  // Edge case: try to accept an already accepted order
  test('does not change status if order is already accepted', () => {
    render(<FarmerDashboard />);
    const acceptBtn = screen.getAllByText('Accept')[0];
    fireEvent.click(acceptBtn);
    expect(screen.getAllByText('accepted')[0]).toBeInTheDocument();
    // Try clicking accept again
    fireEvent.click(acceptBtn);
    expect(screen.getAllByText('accepted')[0]).toBeInTheDocument();
  });
}); 