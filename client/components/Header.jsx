import Head from 'next/head'

export default function Header({ title, description }) {
    return (
        <Head>
            <title>{`WinWin DAO - ${title}`}</title>
            <meta name="description" content={`A DAO for Web3 Grants- ${title} - ${description}`} />
            <link rel="icon" href="/favicon.ico" />
            <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        </Head>
    )
}