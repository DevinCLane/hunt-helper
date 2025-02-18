import React from 'react'

export const Navbar = ({ loggedInUser }) => {
    return (
        <div>
            <header className="bg-white">
                <div className="mx-auto flex h-16 max-w-screen-xl items-center gap-8 px-4 sm:px-6 lg:px-8">
                    <div className='w-full text-blue-900'>

                        <div><span className='font-bold'>Hunt Helper 🏹</span></div>

                    </div>

                    <div className="flex flex-1 items-center  justify-end">

                        <div className="flex items-center gap-4">
                            <div className="sm:flex sm:gap-4">

                                {loggedInUser ?
                                    <a
                                        className="block rounded-md bg-teal-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-teal-700"
                                        href="#"
                                    >
                                        Logout
                                    </a>
                                    :
                                    <a
                                        className="block rounded-md bg-teal-600  px-5 py-2.5 text-sm font-medium text-white transition hover:bg-teal-700"
                                        href="#"
                                    >
                                        Login
                                    </a>
                                }

                                {!loggedInUser &&
                                    <a
                                        className="hidden rounded-md bg-gray-100 px-5 py-2.5 text-sm font-medium text-teal-600 transition hover:text-teal-600/75 sm:block"
                                        href="#"
                                    >
                                        Register
                                    </a>
                                }

                            </div>

                            <button
                                className="block rounded-sm bg-gray-100 p-2.5 text-gray-600 transition hover:text-gray-600/75 md:hidden"
                            >
                                <span className="sr-only">Toggle menu</span>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="size-5"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </header>

        </div>
    )
}