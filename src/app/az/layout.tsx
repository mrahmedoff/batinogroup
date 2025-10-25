import Layout from '../components/Layout';

export default function AzLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Layout locale="az">{children}</Layout>;
}
