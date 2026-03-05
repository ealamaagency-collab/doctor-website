import type React from "react"
import type { Metadata } from "next"
import { Tajawal, Cairo } from "next/font/google"
import Script from "next/script"
import "./globals.css"

const tajawal = Tajawal({
  subsets: ["arabic", "latin"],
  weight: ["200", "300", "400", "500", "700", "800", "900"],
  variable: "--font-tajawal",
  display: "swap",
})

const cairo = Cairo({
  subsets: ["arabic", "latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-cairo",
  display: "swap",
})

export const metadata: Metadata = {
  title: "د. إيهاب ياسين - جراحة واستبدال المفاصل",
  description: "عودة إلى الحركة بدون ألم - د. إيهاب ياسين متخصص في جراحة واستبدال مفاصل الورك والركبة والخلايا الجذعية",
  generator: "v0.app",
  keywords: "جراحة المفاصل, تبديل مفصل الورك, تبديل مفصل الركبة, الخلايا الجذعية, د. إيهاب ياسين",
  authors: [{ name: "Dr. Ehab Yassin" }],
  openGraph: {
    title: "د. إيهاب ياسين - جراحة واستبدال المفاصل",
    description: "عودة إلى الحركة بدون ألم",
    url: "https://DrEhabYassin.com",
    siteName: "Dr. Ehab Yassin",
    locale: "ar_EG",
    type: "website",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ar" dir="rtl" className={`${tajawal.variable} ${cairo.variable}`}>
      <body className="font-sans antialiased">
        {children}

        <Script
          id="chatbase-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(){
                if(!window.chatbase||window.chatbase("getState")!=="initialized"){
                  window.chatbase=(...arguments)=>{
                    if(!window.chatbase.q){window.chatbase.q=[]}
                    window.chatbase.q.push(arguments)
                  };
                  window.chatbase=new Proxy(window.chatbase,{
                    get(target,prop){
                      if(prop==="q"){return target.q}
                      return(...args)=>target(prop,...args)
                    }
                  })
                }
                const onLoad=function(){
                  const script=document.createElement("script");
                  script.src="https://www.chatbase.co/embed.min.js";
                  script.id="tnum-6DEeeYMiMseOIQu_";
                  script.domain="www.chatbase.co";
                  document.body.appendChild(script)
                };
                if(document.readyState==="complete"){
                  onLoad()
                }else{
                  window.addEventListener("load",onLoad)
                }
              })();
            `,
          }}
        />
      </body>
    </html>
  )
}
