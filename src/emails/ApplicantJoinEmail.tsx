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

interface ApplicantJoinEmailProps {
  firstName: string;
  tier: string;
  paymentAmount: string;
}

export const ApplicantJoinEmail = ({
  firstName,
  tier,
  paymentAmount,
}: ApplicantJoinEmailProps) => (
  <Html>
    <Head>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Great+Vibes&display=swap');
      `}</style>
    </Head>
    <Preview>Your Herscape Founding Circle Application</Preview>
    <Body style={main}>
      <Container style={container}>
        <Section style={logoContainer}>
          <Text style={calligraphy}>Herscape</Text>
        </Section>
        <Heading style={h1}>Thank You for Applying!</Heading>
        <Text style={text}>
          Hi {firstName},
        </Text>
        <Text style={text}>
          Welcome to the Herscape Founding Circle! We&apos;re thrilled to have you as a new <span style={tierHighlight}>{tier}</span> member. Your membership has been activated successfully.
        </Text>

        <Hr style={hr} />

        <Section style={section}>
          <Heading style={h2}>Welcome to the Family!</Heading>
          
          <div style={paymentBox}>
            <Row style={row}>
                <Column style={label}>Membership Tier</Column>
                <Column style={paymentValue}>{tier}</Column>
            </Row>
          </div>

          <Text style={{...text, textAlign: 'center', margin: '20px 0'}}>
            Thank you for joining the Herscape Founding Circle! You are now part of an exclusive community of women entrepreneurs.
          </Text>

          <div style={detailsBox}>
            <Text style={{...text, textAlign: 'center', margin: '20px 0'}}>
              We&apos;ll be in touch soon with your exclusive member benefits and upcoming events.
            </Text>
            <Text style={{...text, textAlign: 'center', margin: '20px 0'}}>
              Welcome to the most influential women in women&apos;s entrepreneurship!
            </Text>
          </div>
        </Section>

        <Section style={warningSection}>
            <Heading style={h3}>What&apos;s Next?</Heading>
            <Text style={warningText}>Keep an eye on your inbox for exclusive member communications and upcoming events.</Text>
        </Section>

        <Hr style={hr} />

        <Text style={footer}>
          If you have any questions, please don&apos;t hesitate to contact us at <Link href="mailto:contact@herscape.org" style={link}>contact@herscape.org</Link>.
        </Text>
         <Text style={footer}>
          The Herscape Team
        </Text>
      </Container>
    </Body>
  </Html>
);

export default ApplicantJoinEmail;

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
    textAlign: 'center' as const,
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

const paymentBox = {
    background: '#f8f9fa',
    padding: '15px 20px',
    borderRadius: '8px',
    border: '1px solid #e9ecef',
    textAlign: 'center' as const,
};

const detailsBox = {
    padding: '15px 20px',
    borderRadius: '8px',
    border: `1px solid ${borderColor}`,
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

const paymentValue = {
    color: mediumGreen,
    fontSize: '32px',
    fontWeight: 'bold',
};

const tierHighlight = {
    fontWeight: 'bold',
    textTransform: 'capitalize' as const,
    color: mediumGreen,
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
    textAlign: 'center' as const,
    margin: '0',
};

const footer = {
  color: '#888888',
  fontSize: '12px',
  textAlign: 'center' as const,
  lineHeight: '24px',
  padding: '0 24px',
}; 