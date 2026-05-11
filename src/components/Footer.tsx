import Logo from "./Logo";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-24 border-t border-line bg-white">
      <div className="container-page py-10 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <Logo size="sm" />
        <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted">
          <a href="/obchodni-podminky" className="hover:text-ink">
            Obchodní podmínky
          </a>
          <a href="/ochrana-soukromi" className="hover:text-ink">
            Ochrana soukromí
          </a>
          <a href="mailto:matyas@socialmaty.cz" className="hover:text-ink">
            Kontakt
          </a>
        </div>
        <p className="text-xs text-muted">© {year} Projekt Organika™</p>
      </div>
    </footer>
  );
}
