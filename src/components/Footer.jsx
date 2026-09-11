const Footer = () => {
    return (
        <footer>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <h1>Shopping Cart</h1>
                <p>&copy; 2026 Carissa Chandra</p>
            </div>

            <aside style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <h2 style={{ display: 'flex', height: '40px', alignItems: 'end' }}>Quick Links</h2>
                <a href="/" style={{ color: 'var(--color-on-text)' }}>Home</a>
                <a href="/cart" style={{ color: 'var(--color-on-text)' }}>Cart</a>
            </aside>
        </footer>
    )
};

export default Footer;