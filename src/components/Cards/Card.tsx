import React, { ReactNode } from 'react';
import { Card } from 'react-native-paper';

interface CardProps {
  type?: 'elevated' | 'outlined' | 'contained';
  title?: string;
  subtitle?: string;
  left?: (props: any) => React.ReactNode;
  right?: (props: any) => React.ReactNode;
  content?: ReactNode;
  children?: ReactNode;
  actions?: ReactNode;
  cover?: any; // change this to correct type
  rest?: any;
}

const Cards: React.FC<CardProps> = ({
  type = 'elevated',
  title,
  subtitle,
  left,
  right,
  content,
  children,
  actions,
  cover,
  ...rest
}) => {
  return (
    <Card {...rest} mode={type}>
      {cover && <Card.Cover source={{ uri: cover }} />}
      <Card.Title title={title} subtitle={subtitle} left={left} right={right} />
      <Card.Content>
        {content}
        {children}
      </Card.Content>
      {actions && <Card.Actions>{actions}</Card.Actions>}
    </Card>
  );
};
export default Cards;
