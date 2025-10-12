import { Navbar, Container, Nav } from 'react-bootstrap';
import { Routes, Route, BrowserRouter, Link, Outlet } from 'react-router-dom';
import { useContext } from 'react';
import { Provider } from 'react-redux';
import store from './store'
import { AuthProvider } from './components/AuthProvider';
import { AuthContext } from './components/AuthProvider';
import { useNavigate } from 'react-router-dom';
import { getAuth } from 'firebase/auth'

import AuthPage from './pages/AuthPage';
import News from './pages/News';
import Library from './pages/Library';
import Memories from './pages/Memories';
import Characters from './pages/Characters';
import GameProfile from './pages/GameProfile';
import CharacterProfile from './pages/CharacterProfile';
import LandingPage from './pages/LandingPage';
import Tracker from './pages/Tracker';
import GameTrack from './pages/GameTrack';

export const BASE_URL = `https://ca18a0d5-cf20-4dc9-93fb-47752d961543-00-vme42hdhelap.sisko.replit.dev`;

function Layout() {
    const { currentUser } = useContext(AuthContext);
    const navigate = useNavigate();
    const auth = getAuth();

    return (
        <>
            <Navbar expand='md' style={{ backgroundColor: '#E6B2BA' }}>
                <Container>
                    <Navbar.Brand as={Link} to='/landing'><strong>Otome Haven</strong></Navbar.Brand>

                    <Navbar.Toggle aria-controls='main-navbar' />

                    <Navbar.Collapse id='main-navbar'>
                        <Nav className='me-auto'>
                            <Nav.Link as={Link} to='/news'><strong>News</strong></Nav.Link>
                            <Nav.Link as={Link} to='/memories'><strong>Memories</strong></Nav.Link>
                            <Nav.Link as={Link} to='/games'><strong>Library</strong></Nav.Link>
                            <Nav.Link as={Link} to='/tracker'><strong>Tracker</strong></Nav.Link>
                            <Nav.Link onClick={() => {
                                if (currentUser) {
                                    auth.signOut()
                                        .then(() => navigate('/login'));
                                } else {
                                    navigate('/login');
                                }
                            }}
                            ><strong>{currentUser ? 'Logout' : 'Login'}</strong></Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <Outlet />
        </>
    )
}

export default function App() {
    return (
        <>
            <AuthProvider>
                <Provider store={store}>
                    <BrowserRouter>
                        <Routes>
                            <Route path='/' element={<Layout />}>
                                <Route path='login' element={<AuthPage />} />
                                <Route path='landing' element={<LandingPage />} />
                                <Route path='games' element={<Library />} />
                                <Route path='memories' element={<Memories />} />
                                <Route path='memories/:userId/:gameId/:id' element={<GameProfile />} />
                                <Route path='memories/:userId/:gameId/:charId/:id' element={<CharacterProfile />} />
                                <Route path='tracker' element={<Tracker />} />
                                <Route path='tracker/:userId/:gameId/:id' element={<GameTrack />} />
                                <Route path='characters/:userId/:gameId/:imgId' element={<Characters />} />
                                <Route path='news' element={<News />} />
                            </Route>
                        </Routes>
                    </BrowserRouter>
                </Provider>
            </AuthProvider>
        </>
    )
}
