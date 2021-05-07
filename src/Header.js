import shopify_glyph from './shopify_glyph.svg';
import './Header.css';

function Header() {
  return (
    <div className="header">
        <img src={shopify_glyph} alt="Shopify Glyph" className="icon" />
        <div className="title">The Shoppies</div>
    </div>
  );
}

export default Header;
