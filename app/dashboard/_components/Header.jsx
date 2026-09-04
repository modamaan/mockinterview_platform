"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { UserButton, SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import { ModeToggle } from "@/components/ModeToggle";
import Link from "next/link";

const Header = ({ logo }) => {
  const [isUserButtonLoaded, setUserButtonLoaded] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const SkeletonLoader = () => (
    <div className="w-8 h-8 bg-gray-300 rounded-full animate-pulse"></div>
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      setUserButtonLoaded(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const path = usePathname();

  return (
    <header className="bg-secondary shadow-md">
      <div className="container mx-auto flex items-center justify-between py-4 px-6">
        <Link href="/dashboard">
          <a className="flex items-center">
            <Image src={logo} width={80} height={80} alt="logo" />
          </a>
        </Link>
        <nav className="hidden md:flex space-x-8">
          {[
            { href: "/dashboard", label: "Dashboard" },
            { href: "/dashboard/question", label: "Questions" },
            { href: "/dashboard/upgrade", label: "Upgrade" },
            { href: "/dashboard/howit", label: "How it works?" },
          ].map(({ href, label }) => (
            <Link key={href} href={href}>
              <a
                className={`hover:text-black hover:font-bold transition-all ${
                  path === href ? "text-black font-bold" : "text-gray-700"
                }`}
              >
                {label}
              </a>
            </Link>
          ))}
        </nav>
        <div className="flex items-center space-x-4">
          <ModeToggle />
          {isUserButtonLoaded ? (
            <>
              <SignedIn>
                <UserButton afterSignOutUrl="/" />
              </SignedIn>
              <SignedOut>
                <SignInButton
                  mode="modal"
                  afterSignInUrl="/dashboard"
                  afterSignUpUrl="/dashboard"
                >
                  <Button size="lg" variant="ghost">
                    Login
                  </Button>
                </SignInButton>
              </SignedOut>
            </>
          ) : (
            <SkeletonLoader />
          )}
          <button
            onClick={toggleMenu}
            className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
          >
            <span className="sr-only">Open main menu</span>
            {isOpen ? (
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            )}
          </button>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden">
          <div className="px-5 pb-3">
            <ul className="space-y-1">
              {[
                { href: "/dashboard", label: "Dashboard" },
                { href: "/dashboard/question", label: "Questions" },
                { href: "/dashboard/upgrade", label: "Upgrade" },
                { href: "/dashboard/howit", label: "How it works?" },
              ].map(({ href, label }) => (
                <Link key={href} href={href}>
                  <a
                    className={`block px-3 py-2 rounded-md text-base font-medium hover:text-black hover:font-bold transition-all ${
                      path === href ? "text-black font-bold" : "text-gray-700"
                    }`}
                  >
                    {label}
                  </a>
                </Link>
              ))}
            </ul>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;