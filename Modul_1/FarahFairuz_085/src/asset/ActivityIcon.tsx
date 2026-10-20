import React from 'react';
import Svg, { Circle, Path } from 'react-native-svg';

interface IconProps {
  size?: number;
  color?: string;
}

export default function ActivityIcon({
  size = 20,
  color = '#5B6CFF',
}: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Circle cx="13.5" cy="4" r="2" fill={color} />
      <Path
        d="M13.89 7.63c-.44-.39-1.02-.63-1.65-.63h-1.48c-1.1 0-2 .9-2 2v3c0 .55.45 1 1 1s1-.45 1-1v-2.5h.74l-1.39 6.27-2.3 2.3c-.39.39-.39 1.02 0 1.41.39.39 1.02.39 1.41 0l2.67-2.67c.28-.28.45-.66.47-1.07l.5-2.24 1.64 1.64v3.5c0 .55.45 1 1 1s1-.45 1-1v-4c0-.27-.11-.52-.29-.71l-1.65-1.65.65-2.94 1.49 1.49c.2.2.47.31.75.31h2c.55 0 1-.45 1-1s-.45-1-1-1h-1.59l-1.76-1.76z"
        fill={color}
      />
    </Svg>
  );
}
