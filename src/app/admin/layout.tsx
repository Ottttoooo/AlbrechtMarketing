import '../globals.css';

export const metadata = {
  title: 'Admin Dashboard',
  description: 'Administrative area',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen font-sans antialiased bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}
