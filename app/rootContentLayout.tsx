'use client';

import { usePathname } from 'next/navigation';

const RootContentLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();

  const routesWithBackground = ['/sign-in', '/'];
  const hasBackgroundImage = routesWithBackground.includes(pathname);

  return (
    <div
      className={`min-h-screen flex flex-col ${
        hasBackgroundImage && 'bg-[url(/images/japan-1.jpg)]'
      }`}
    >
      <div className="container px-6 sm:px-8 mx-auto w-full lg:w-8/12 flex-grow py-2">
        <main>{children}</main>
      </div>
    </div>
  );
};

export default RootContentLayout;
