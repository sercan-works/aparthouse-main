import VerifyEmailClient from './VerifyEmailClient';

export default function VerifyEmail({ params }: { params: { key: string } }) {
  return <VerifyEmailClient verificationKey={params.key} />;
} 