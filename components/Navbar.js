import React from 'react';
import Link from 'next/link';

export default function Navbar() {
    return (
        <nav className="flex justify-between items-center py-4">
            <p className="text-2xl font-bold text-grey-800">My Todos</p>
            <div className="flex">
                <Link
                    href="/api/auth/logout"
                    className=" rounded bg-blue-500 hover:bg-blue-600 text-white py-2 px-4"
                >
                    Logout
                </Link>
                <Link
                    href="/api/auth/login"
                    className="rounded bg-blue-500 hover:bg-blue-600 text-white py-2 px-4"
                >
                    Login
                </Link>
            </div>
        </nav>
    );
}