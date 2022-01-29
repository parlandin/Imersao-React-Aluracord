import Head from "next/head"

export default function HeadPage() {
    return (
        <>
        <Head>
            <meta charSet="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <link rel="shortcut icon" href={"/images/favicon.ico"} type="image/x-icon" />
            </Head>
        </>
    )
}