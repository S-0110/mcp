/*
  # Initial Schema Setup

  1. New Tables
    - `partners`
      - Basic partner information
      - Wallet and commission details
      - Status and performance metrics
    - `orders`
      - Order details and status
      - Customer information
      - Pickup and drop locations
    - `transactions`
      - Wallet transactions
      - Partner payouts
      - System transactions

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

-- Create partners table
CREATE TABLE IF NOT EXISTS partners (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz DEFAULT now(),
  name text NOT NULL,
  email text UNIQUE NOT NULL,
  phone text NOT NULL,
  role text NOT NULL DEFAULT 'Pickup Partner',
  status text NOT NULL DEFAULT 'inactive',
  commission numeric NOT NULL DEFAULT 8,
  total_orders integer DEFAULT 0,
  completed_orders integer DEFAULT 0,
  rating numeric DEFAULT 0,
  wallet_balance numeric DEFAULT 0,
  pending_payouts numeric DEFAULT 0,
  total_earned numeric DEFAULT 0,
  current_location text,
  availability boolean DEFAULT false
);

-- Create orders table
CREATE TABLE IF NOT EXISTS orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz DEFAULT now(),
  customer_name text NOT NULL,
  pickup_location text NOT NULL,
  drop_location text NOT NULL,
  status text NOT NULL DEFAULT 'pending',
  assigned_partner_id uuid REFERENCES partners(id),
  amount numeric NOT NULL,
  priority text DEFAULT 'normal',
  estimated_time text,
  completed_at timestamptz,
  CONSTRAINT valid_status CHECK (status IN ('pending', 'in_progress', 'completed', 'cancelled'))
);

-- Create transactions table
CREATE TABLE IF NOT EXISTS transactions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz DEFAULT now(),
  type text NOT NULL,
  amount numeric NOT NULL,
  partner_id uuid REFERENCES partners(id),
  method text NOT NULL,
  status text NOT NULL DEFAULT 'completed',
  description text,
  CONSTRAINT valid_type CHECK (type IN ('credit', 'debit'))
);

-- Enable RLS
ALTER TABLE partners ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Allow read access to partners" ON partners
  FOR SELECT USING (true);

CREATE POLICY "Allow read access to orders" ON orders
  FOR SELECT USING (true);

CREATE POLICY "Allow read access to transactions" ON transactions
  FOR SELECT USING (true);

-- Create policy for updating partner availability
CREATE POLICY "Partners can update their own availability" ON partners
  FOR UPDATE USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- Create policy for updating order status
CREATE POLICY "Partners can update assigned orders" ON orders
  FOR UPDATE USING (auth.uid() = assigned_partner_id)
  WITH CHECK (auth.uid() = assigned_partner_id);