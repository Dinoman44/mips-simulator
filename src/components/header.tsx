import { Container, Nav, Navbar } from 'react-bootstrap';
import "../styles/navbar.css";

function Header() {
  return (
    <Navbar expand="lg">
        <Container>
            <Navbar.Brand href="/"><img src="/src/assets/logo.png" alt="MIPS Simulator Logo" style={{ height: '30px' }} /></Navbar.Brand>
            <Navbar.Brand href="/">MIPS Simulator</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
                <Nav.Link href="/pages/decode-encode.html">Encoder-Decoder</Nav.Link>
                <Nav.Link href="/pages/mips.html">MIPS Instructions</Nav.Link>
                <Nav.Link href="#">Simulator<sup>Beta</sup></Nav.Link>
            </Nav>
            </Navbar.Collapse>
        </Container>
    </Navbar>
  );
}

export { Header };