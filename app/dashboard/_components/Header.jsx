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
        <Link href="/dashboard" className="flex items-center">
          <Image src={logo} width={50} height={50} alt="logo" />
          <span className="ml-3 text-xl font-bold text-white">MyApp</span>
        </Link>
        <nav className="hidden md:flex space-x-8">
          <Link href="/dashboard">
            <a
              className={`text-white hover:text-primary transition ${
                path === "/dashboard" ? "font-bold" : ""
              }`}
            >
              Dashboard
            </a>
          </Link>
          <Link href="/dashboard/question">
            <a
              className={`text-white hover:text-primary transition ${
                path === "/dashboard/question" ? "font-bold" : ""
              }`}
            >
              Questions
            </a>
          </Link>
          <Link href="/dashboard/upgrade">
            <a
              className={`text-white hover:text-primary transition ${
                path === "/dashboard/upgrade" ? "font-bold" : ""
              }`}
            >
              Upgrade
            </a>
          </Link>
          <Link href="/dashboard/howit">
            <a
              className={`text-white hover:text-primary transition ${
                path === "/dashboard/howit" ? "font-bold" : ""
              }`}
            >
              How it works?
            </a>
          </Link>
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
            className="md:hidden text-white focus:outline-none"
          >
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
        <div className="md:hidden bg-secondary">
          <nav className="px-4 pt-4 pb-3 space-y-1">
            <Link href="/dashboard">
              <a
                className={`block text-white hover:text-primary transition ${
                  path === "/dashboard" ? "font-bold" : ""
                }`}
              >
                Dashboard
              </a>
            </Link>
            <Link href="/dashboard/question">
              <a
                className={`block text-white hover:text-primary transition ${
                  path === "/dashboard/question" ? "font-bold" : ""
                }`}
              >
                Questions
              </a>
            </Link>
            <Link href="/dashboard/upgrade">
              <a
                className={`block text-white hover:text-primary transition ${
                  path === "/dashboard/upgrade" ? "font-bold" : ""
                }`}
              >
                Upgrade
              </a>
            </Link>
            <Link href="/dashboard/howit">
              <a
                className={`block text-white hover:text-primary transition ${
                  path === "/dashboard/howit" ? "font-bold" : ""
                }`}
              >
                How it works?
              </a>
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;