import "../globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-800">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-white p-2 rounded shadow"
        >
          Skip to content
        </a>
        <Header />
        <main id="main-content" className="max-w-4xl mx-auto p-6">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
