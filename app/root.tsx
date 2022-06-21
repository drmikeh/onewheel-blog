import type {
    LinksFunction,
    LoaderFunction,
    MetaFunction,
} from '@remix-run/node'
import { json } from '@remix-run/node'
import {
    Links,
    LiveReload,
    Meta,
    Outlet,
    Scripts,
    ScrollRestoration,
    useLoaderData,
} from '@remix-run/react'

// import defaultTailwindStyles from './styles/root.css'
import tailwindStylesheetUrl from './styles/tailwind.css'

import { getUser } from './session.server'
import { getEnv } from './env.server'

export const links: LinksFunction = () => {
    return [
        // { rel: 'stylesheet', href: defaultTailwindStyles },
        { rel: 'stylesheet', href: tailwindStylesheetUrl },
    ]
}

export const meta: MetaFunction = () => ({
    charset: 'utf-8',
    title: 'Remix Notes',
    viewport: 'width=device-width,initial-scale=1',
})

type LoaderData = {
    user: Awaited<ReturnType<typeof getUser>>
    ENV: ReturnType<typeof getEnv>
}

export const loader: LoaderFunction = async ({ request }) => {
    // console.log(`Server has ENV: ${JSON.stringify(ENV)}`)
    return json<LoaderData>({
        user: await getUser(request),
        ENV: getEnv(),
    })
}

export default function App() {
    // console.log(`Client has ENV: ${JSON.stringify(ENV)}`)
    const data = useLoaderData()

    return (
        <html lang="en" className="h-full">
            <head>
                <Meta />
                <Links />
            </head>
            <body className="h-full">
                <div className="m-4">
                    <Outlet />
                </div>
                <ScrollRestoration />
                <Scripts />
                <script
                    dangerouslySetInnerHTML={{
                        __html: `window.ENV = ${JSON.stringify(data.ENV)}`,
                    }}
                />
                <LiveReload />
            </body>
        </html>
    )
}
