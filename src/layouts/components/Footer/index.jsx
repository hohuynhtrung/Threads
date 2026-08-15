const FOOTER_LINKS = [
  { id: 1, label: "Threads Terms", href: "/terms" },
  { id: 2, label: "Privacy Policy", href: "/privacy" },
  { id: 3, label: "Cookies Policy", href: "/cookies" },
  { id: 4, label: "Report a problem", href: "/report" },
];

function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="w-full py-4 text-xs text-gray-400 flex flex-wrap items-center justify-center gap-x-4 gap-y-2">
      <span>© {currentYear}</span>
      {FOOTER_LINKS.map((link) => (
        <a
          key={link.id}
          href={link.href}
          className="hover:underline transition-all duration-150"
        >
          {link.label}
        </a>
      ))}
    </footer>
  );
}

export default Footer;
