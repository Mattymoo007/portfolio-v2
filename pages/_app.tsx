import "~/styles/globals.css"
import type { AppProps } from "next/app"
import Script from "next/script"
import { DefaultSeo } from "next-seo"

function MyApp({ Component, pageProps, router }: AppProps) {
  return (
    <>
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-9DJT5QK59S"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){window.dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'G-9DJT5QK59S');
        `}
      </Script>

      <DefaultSeo
        title="Matt's Portfolio"
        description="Portfolio Matthew Bracke"
        twitter={{
          handle: "@CozmicMatt",
          site: "https://twitter.com/CozmicMatt",
          cardType: "summary_large_image",
        }}
      />

      <Component {...pageProps} key={router.route} />
    </>
  )
}

export default MyApp
