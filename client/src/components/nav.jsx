export default function Nav({ children }) {
  return (
    <div className="fr-container">
      <nav
        className="fr-nav"
        role="navigation"
        aria-label="Menu principal"
      >
        <ul className="fr-nav__list">
          {children}
        </ul>
      </nav>
    </div>
  );
};
