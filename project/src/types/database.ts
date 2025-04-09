export interface Partner {
  id: string;
  created_at: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  status: 'active' | 'inactive';
  commission: number;
  total_orders: number;
  completed_orders: number;
  rating: number;
  wallet_balance: number;
  pending_payouts: number;
  total_earned: number;
  current_location: string | null;
  availability: boolean;
}

export interface Order {
  id: string;
  created_at: string;
  customer_name: string;
  pickup_location: string;
  drop_location: string;
  status: 'pending' | 'in_progress' | 'completed' | 'cancelled';
  assigned_partner_id: string | null;
  amount: number;
  priority: 'high' | 'medium' | 'normal';
  estimated_time: string | null;
  completed_at: string | null;
}

export interface Transaction {
  id: string;
  created_at: string;
  type: 'credit' | 'debit';
  amount: number;
  partner_id: string | null;
  method: string;
  status: 'completed' | 'pending' | 'failed';
  description: string | null;
}