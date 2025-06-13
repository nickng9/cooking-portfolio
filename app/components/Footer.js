export default function Footer() {
  return (
    <footer
      className="mt-12 py-4 border-t text-center text-sm"
      role="contentinfo"
    >
      <span className="inline-block animate-pulse" aria-hidden="true">
        🍰
      </span>
      <span className="sr-only">Cake icon</span> © {new Date().getFullYear()}{" "}
      Your Name
    </footer>
  );
}
