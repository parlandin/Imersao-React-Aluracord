import Head from "next/head"
import favicon from "../images/favicon.ico"

export default function HeadPage() {
    return (
        <>
        <Head>
            <meta charSet="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <link rel="shortcut icon" href={favicon.src} type="image/x-icon" />
            </Head>
        </>
    )
}