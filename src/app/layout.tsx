import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import AuthProvider from '@/auth/components/AuthProvider';

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

export const metadata: Metadata = {
  title: 'Task Management App',
  description:
    'A simple and efficient task management app built with Next.js, TypeScript, Tailwind CSS, Prisma, PostgreSQL, and Docker.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthProvider>
      <html lang='en'>
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
          {children}
        </body>
      </html>
    </AuthProvider>
  );
}
