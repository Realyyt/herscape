export interface FormData {
  name: string;
  email: string;
  company?: string;
  role?: string;
  message?: string;
}

export interface TestimonialProps {
  quote: string;
  name: string;
  title: string;
}

export interface FeatureProps {
  title: string;
  description: string;
  icon: React.ReactNode;
}