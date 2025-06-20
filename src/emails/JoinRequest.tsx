import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Text,
  Preview,
  Row,
  Column,
  Section,
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
  message?: string;
}

export const JoinRequestEmail = ({
  firstName,
  lastName,
  email,
  phone,
  tier,
  company,
  linkedin,
  message,
}: JoinRequestEmailProps) => (
  <Html>
    <Head />
    <Preview>New Join Request from {firstName} {lastName}</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={heading}>New Join Request</Heading>
        <Section style={section}>
          <Row>
            <Column style={label}>First Name</Column>
            <Column style={value}>{firstName}</Column>
          </Row>
          <Row>
            <Column style={label}>Last Name</Column>
            <Column style={value}>{lastName}</Column>
          </Row>
          <Row>
            <Column style={label}>Email</Column>
            <Column style={value}>{email}</Column>
          </Row>
           <Row>
            <Column style={label}>Phone</Column>
            <Column style={value}>{phone}</Column>
          </Row>
          <Row>
            <Column style={label}>Tier</Column>
            <Column style={value}>{tier}</Column>
          </Row>
          {company && (
            <Row>
              <Column style={label}>Company</Column>
              <Column style={value}>{company}</Column>
            </Row>
          )}
          {linkedin && (
            <Row>
              <Column style={label}>LinkedIn</Column>
              <Column style={value}>{linkedin}</Column>
            </Row>
          )}
          {message && (
             <Row>
              <Column style={label}>Message</Column>
            </Row>
          )}
        </Section>
        {message && (
          <Text style={messageText}>{message}</Text>
        )}
      </Container>
    </Body>
  </Html>
);

export default JoinRequestEmail;

const main = {
  backgroundColor: '#f6f9fc',
  fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};

const container = {
  backgroundColor: '#ffffff',
  margin: '0 auto',
  padding: '20px 0 48px',
  marginBottom: '64px',
};

const heading = {
  fontSize: '28px',
  fontWeight: 'bold',
  marginTop: '48px',
  textAlign: 'center' as const,
};

const section = {
  padding: '24px',
  border: 'solid 1px #dedede',
  borderRadius: '5px',
  textAlign: 'left' as const,
};

const label = {
  width: '120px',
  fontWeight: 'bold',
  padding: '5px 0',
};

const value = {
  padding: '5px 0',
};

const messageText = {
  ...value,
  padding: '20px',
  backgroundColor: '#f8f8f8',
  borderRadius: '5px',
  border: '1px solid #eee',
  marginTop: '20px',
} 