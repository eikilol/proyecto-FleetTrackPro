import { MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';

export const metadata = {
  title: 'FleetTrackPro',
  description: 'Sistema de gestión de flota de taxis',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <MantineProvider>{children}</MantineProvider>
      </body>
    </html>
  );
}