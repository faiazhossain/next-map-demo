import Script from "next/script";
export const metadata = {
  title: "Barikoi Maps Draw Polygon",
  description: "This branch shows how to draw polygon on map",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      {/* suppressHydrationWarning={true} this ignores hydration warning */}
      <body suppressHydrationWarning={true}>
        <link
          rel="stylesheet"
          href="https://cdn.barikoi.com/bkoi-gl-js/dist/bkoi-gl.css"
        />
        <Script
          src="https://cdn.barikoi.com/bkoi-gl-js/dist/bkoi-gl.js"
          strategy="beforeInteractive"
        />
        {children}
      </body>
    </html>
  );
}
