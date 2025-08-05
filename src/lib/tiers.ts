export interface Tier {
  id: 'test' | 'pioneer' | 'angel';
  name: string;
  price: number;
  priceString: string;
  description: string;
  features: string[];
}

export const tiers: Tier[] = [
  {
    id: 'test',
    name: 'Test Tier',
    price: 1,
    priceString: '$1',
    description: 'Test payment option for development and testing.',
    features: ['Test payment only', 'Development use', 'No real benefits']
  },
  {
    id: 'pioneer',
    name: 'Pioneer',
    price: 250,
    priceString: '$250',
    description: 'All core perks, priority access to pitch circles and events.',
    features: ['Lifetime perks & discounts', 'Priority access to pitch circles', 'Exclusive events access']
  },
  {
    id: 'angel',
    name: 'Angel',
    price: 500,
    priceString: '$500',
    description: 'All Pioneer perks, plus Gold Club/Board eligibility and VIP status.',
    features: ['All Pioneer perks', 'Gold Club/Board eligibility', 'VIP status & recognition']
  }
];

export const tierMap = new Map<string, Tier>(tiers.map(tier => [tier.id, tier])); 