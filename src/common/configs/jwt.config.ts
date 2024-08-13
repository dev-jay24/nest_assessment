import { registerAs } from '@nestjs/config';

const JwtConfiguration = registerAs('JWT', () => ({
  secret: process.env.JWT_SECRET,
  expiresIn: process.env.JWT_TONE_EXPIRY_TIME
    ? process.env.JWT_TONE_EXPIRY_TIME
    : '24h',
  ignoreTokenExpiration: false,
}));

export default JwtConfiguration;
