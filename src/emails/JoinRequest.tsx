import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Text,
  Preview,
  Section,
  Row,
  Column,
  Link,
  Hr,
  Img,
} from '@react-email/components';
import * as React from 'react';

interface JoinRequestEmailProps {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  tier: string;
  company?: string;
  linkedin?: string;
  paymentAmount: string;
  country: string;
}

const baseUrl = process.env.VERCEL_URL
  ? `https://{process.env.VERCEL_URL}`
  : 'http://localhost:3000';

export const JoinRequestEmail = ({
  firstName,
  lastName,
  email,
  phone,
  tier,
  company,
  linkedin,
  paymentAmount,
  country,
}: JoinRequestEmailProps) => (
  <Html>
    <Head>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Great+Vibes&display=swap');
      `}</style>
    </Head>
    <Preview>New Founding Circle Application: {firstName} {lastName}</Preview>
    <Body style={main}>
      <Container style={container}>
        <Section style={logoContainer}>
          <Text style={calligraphy}>Herscape</Text>
        </Section>
        <Heading style={h1}>New Founding Circle Application</Heading>
        <Text style={text}>
          A new application has been submitted for the Founding Circle. Please review the details below and respond promptly.
        </Text>

        <Section style={section}>
          <Heading style={h2}>Applicant Information</Heading>
          <Row style={row}>
            <Column style={label}>Name</Column>
            <Column style={value}>{firstName} {lastName}</Column>
          </Row>
          <Row style={row}>
            <Column style={label}>Email</Column>
            <Column style={value}><Link href={`mailto:${email}`} style={link}>{email}</Link></Column>
          </Row>
          <Row style={row}>
            <Column style={label}>Phone</Column>
            <Column style={value}>{phone}</Column>
          </Row>
          <Row style={row}>
            <Column style={label}>Membership Tier</Column>
            <Column style={value_tier}>{tier}</Column>
          </Row>
          {company && (
            <Row style={row}>
              <Column style={label}>Company</Column>
              <Column style={value}>{company}</Column>
            </Row>
          )}
          {linkedin && (
            <Row style={row}>
              <Column style={label}>LinkedIn</Column>
              <Column style={value}><Link href={linkedin} style={link}>{linkedin}</Link></Column>
            </Row>
          )}
          <Row style={row}>
            <Column style={label}>Country</Column>
            <Column style={value}>{country}</Column>
          </Row>
        </Section>
        
        <Hr style={hr} />

        <Section style={section}>
          <Heading style={h2}>Payment Information</Heading>
          <Text style={text}>Payment has been completed successfully through PayPal.</Text>
          <Row style={row}>
            <Column style={label}>Amount Paid</Column>
            <Column style={paymentValue}>{paymentAmount}</Column>
          </Row>
          <Row style={row}>
            <Column style={label}>Payment Method</Column>
            <Column style={value}>PayPal</Column>
          </Row>
          <Row style={row}>
            <Column style={label}>Payment Status</Column>
            <Column style={value}>Completed</Column>
          </Row>
          <Row style={row}>
            <Column style={label}>Transaction Date</Column>
            <Column style={value}>{new Date().toLocaleDateString()}</Column>
          </Row>
        </Section>

        <Section style={warningSection}>
            <Heading style={h3}>New Member Activated</Heading>
            <Text style={warningText}>This member has completed payment and their membership is now active.</Text>
        </Section>

        <Hr style={hr} />

        <Text style={footer}>
          This application was submitted through the Herscape website. Reply to this email to respond directly to the applicant at <Link href={`mailto:${email}`} style={link}>{email}</Link>.
        </Text>
      </Container>
    </Body>
  </Html>
);

export default JoinRequestEmail;

const herscapeGreen = '#A3C563';
const darkGreen = '#2E4628';
const mediumGreen = '#5A8C49';
const lightGreenBg = '#F0F9E8';
const borderColor = '#DCECCB';
const warningBg = '#F9FBE7';
const warningBorder = '#E6EAA8';
const warningColor = '#7E863D';

const main = {
  backgroundColor: lightGreenBg,
  fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
  backgroundColor: '#ffffff',
  margin: '0 auto',
  padding: '20px 0 48px',
  marginBottom: '64px',
  borderRadius: '8px',
  boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
  maxWidth: '600px',
};

const logoContainer = {
  textAlign: 'center' as const,
  padding: '40px 0 20px',
};

const calligraphy = {
  fontFamily: "'Great Vibes', cursive",
  color: darkGreen,
  fontSize: '60px',
  lineHeight: '1',
  margin: '0',
};

const h1 = {
  color: darkGreen,
  fontSize: '32px',
  fontWeight: 'bold',
  textAlign: 'center' as const,
  margin: '30px 0',
  padding: '0',
};

const h2 = {
    color: darkGreen,
    fontSize: '22px',
    fontWeight: 'bold',
    margin: '20px 0 15px',
};

const h3 = {
    color: warningColor,
    fontSize: '18px',
    fontWeight: 'bold',
    margin: '0 0 10px',
}

const text = {
  color: '#555555',
  fontSize: '16px',
  lineHeight: '26px',
  margin: '16px 0',
};

const section = {
  padding: '0 24px',
};

const row = {
  margin: '10px 0',
};

const label = {
  width: '150px',
  color: '#888888',
  fontSize: '15px',
};

const value = {
  color: '#1d1d1f',
  fontSize: '15px',
};

const value_tier = {
    ...value,
    textTransform: 'capitalize' as const,
    fontWeight: 'bold',
};

const paymentValue = {
    ...value,
    fontSize: '18px',
    fontWeight: 'bold',
    color: mediumGreen
};

const link = {
  color: mediumGreen,
  textDecoration: 'underline',
};

const hr = {
  borderColor: borderColor,
  margin: '30px 0',
};

const warningSection = {
    margin: '20px 24px',
    padding: '16px',
    backgroundColor: warningBg,
    border: `1px solid ${warningBorder}`,
    borderRadius: '8px',
};

const warningText = {
    ...text,
    color: warningColor,
    margin: '0',
};

const footer = {
  color: '#888888',
  fontSize: '12px',
  textAlign: 'center' as const,
  lineHeight: '24px',
  padding: '0 24px',
}; 