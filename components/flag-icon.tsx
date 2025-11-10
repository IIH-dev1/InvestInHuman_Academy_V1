/**
 * Flag Icon Component
 * Uses flagcdn.com for reliable SVG flags
 * Supports different sizes and styles
 */

import React from 'react';

interface FlagIconProps {
  countryCode: 'de' | 'fr' | 'gb' | 'sa' | 'tn';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  alt?: string;
}

export type FlagComponentProps = Omit<FlagIconProps, 'countryCode'>;

const sizeClasses = {
  sm: 'w-5 h-4',
  md: 'w-6 h-4',
  lg: 'w-8 h-5',
};

export function FlagIcon({ countryCode, size = 'md', className = '', alt }: FlagIconProps): JSX.Element {
  const sizeClass = sizeClasses[size];
  const defaultAlt = `${countryCode.toUpperCase()} flag`;

  return (
    <img
      src={`https://flagcdn.com/w40/${countryCode}.png`}
      alt={alt || defaultAlt}
      className={`${sizeClass} object-cover rounded shadow-sm inline-block ${className}`}
      loading="lazy"
    />
  );
}

// Pre-defined flag components for common use
export const FlagDE: React.FC<FlagComponentProps> = ({ size = 'md', className = '' }) => (
  <FlagIcon countryCode="de" size={size} className={className} alt="German flag" />
);

export const FlagFR: React.FC<FlagComponentProps> = ({ size = 'md', className = '' }) => (
  <FlagIcon countryCode="fr" size={size} className={className} alt="French flag" />
);

export const FlagGB: React.FC<FlagComponentProps> = ({ size = 'md', className = '' }) => (
  <FlagIcon countryCode="gb" size={size} className={className} alt="English flag" />
);

export const FlagSA: React.FC<FlagComponentProps> = ({ size = 'md', className = '' }) => (
  <FlagIcon countryCode="sa" size={size} className={className} alt="Arabic flag" />
);

export const FlagTN: React.FC<FlagComponentProps> = ({ size = 'md', className = '' }) => (
  <FlagIcon countryCode="tn" size={size} className={className} alt="Tunisian flag" />
);
