import Header from '@/app/(after-login)/(with-logo)/_component/header';
import NavBar from '@/app/(after-login)/(with-logo)/_component/navbar';
import { ReactNode } from 'react';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className='relative flex min-h-dvh w-screen flex-col items-center justify-center'>
      <Header />
      <main className='flex h-full w-full max-w-md flex-col items-center justify-center gap-6 px-4 py-16'>
        {children}
      </main>
      <NavBar />
    </div>
  );
}
