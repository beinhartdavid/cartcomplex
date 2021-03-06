import Head from 'next/head';
import { table, minifyRecords } from './api/utils/Airtable';
import Todo from '../components/Todo';
import { useEffect, useContext } from 'react';
import { TodosContext } from '../contexts/TodosContext';
import TodoForm from '../components/TodoForm';
import { getSession } from '@auth0/nextjs-auth0';
import Link from 'next/link';

export default function Home({ initialTodos, user }) {
    const { todos, setTodos } = useContext(TodosContext);
    useEffect(() => {
        setTodos(initialTodos);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="max-w-xl m-auto p-2">
            <Head>
                <title>Complex?</title>
            </Head>

            <main>
                <nav>
                    <div className="flex items-center justify-between py-4  ">
                        <div className="flex justify-between items-center">
                            <div className="text-2xl font-bold text-gray-800 md:text-3xl">
                                <a href="#">Cart Complex</a>
                            </div>
                        </div>
                        <div className="flex">
                            {user ? (
                                <Link
                                    href="/api/auth/logout"
                                    className="rounded bg-blue-500 hover:bg-blue-600 text-white py-2 px-4"
                                >
                                    Logout
                                </Link>
                            ) : (
                                <Link
                                    href="/api/auth/login"
                                    className="rounded bg-blue-500 hover:bg-blue-600 text-white py-2 px-4"
                                >
                                    Login
                                </Link>
                            )}
                        </div>
                    </div>
                </nav>
                {user ? (
                    <>
                        <TodoForm />
                        <ul>
                            {todos &&
                                todos.map((todo) => (
                                    <Todo todo={todo} key={todo.id} />
                                ))}
                        </ul>
                    </>
                ) : (
                    <p className="text-center mt-4">
                        Please login to add items
                    </p>
                )}
            </main>
        </div>
    );
}

export async function getServerSideProps(context) {
    const session = await getSession(context.req, context.res);
    let todos = [];
    if (session?.user) {
        todos = await table
            .select({ filterByFormula: `userId = '${session.user.sub}'` })
            .firstPage();
    }
    return {
        props: {
            initialTodos: minifyRecords(todos),
            user: session?.user || null,
        },
    };
}