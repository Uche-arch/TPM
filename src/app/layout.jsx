import "./globals.css";

export const metadata = {
  title: "TPM Planner",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css"
        />
        <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap" rel="stylesheet"/>
        {/* <link href="https://fonts.googleapis.com/css2?family=Anton&display=swap" rel="stylesheet"/> */}


      </head>
      <body className="bg-slate-950 text-white">{children}</body>
    </html>
  );
}
