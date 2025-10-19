import { Navbar, Container, Nav, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { Routes, Route, BrowserRouter, Link, Outlet } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import { Provider, useDispatch, useSelector } from 'react-redux';
import store from './store'
import { AuthProvider } from './components/AuthProvider';
import { AuthContext } from './components/AuthProvider';
import { useNavigate } from 'react-router-dom';
import { getAuth } from 'firebase/auth'
import { fetchUser } from './features/usersSlice';

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
import CharacterTrack from './pages/CharacterTrack';
import ErrorPage from './pages/ErrorPage';

export const BASE_URL = `https://f0ad1990-65fa-4e35-9ef6-ab7678471771-00-3w49yiqer77u1.pike.replit.dev`;

function Layout() {
    const { currentUser } = useContext(AuthContext);
    const navigate = useNavigate();
    const auth = getAuth();
    const dispatch = useDispatch();
    const users = useSelector((state) => state.users.users);

    useEffect(() => {
        if (currentUser?.uid) {
            dispatch(fetchUser({ userId: currentUser?.uid }));
        }
    }, [currentUser, dispatch]);

    console.log(users);

    return (
        <>
            <Navbar expand='md' style={{ backgroundColor: '#E6B2BA' }}>
                <Container>
                    <Navbar.Brand as={Link} to='/'><strong>Otome Haven</strong></Navbar.Brand>

                    <Navbar.Toggle aria-controls='main-navbar' />

                    <Navbar.Collapse id='main-navbar'>
                        <Nav className='me-auto'>
                            <Nav.Link as={Link} to='/news'><strong>News</strong></Nav.Link>
                            <Nav.Link as={Link} to='/memories'><strong>Memories</strong></Nav.Link>
                            <Nav.Link as={Link} to='/games'><strong>Library</strong></Nav.Link>
                            <Nav.Link as={Link} to='/tracker'><strong>Tracker</strong></Nav.Link>
                            <OverlayTrigger
                                placement="bottom"
                                overlay={
                                    currentUser && users ? (
                                        <Tooltip id="logout-tooltip">Logout</Tooltip>
                                    ) : (
                                        <></>
                                    )
                                }
                            >
                                <Nav.Link
                                    onClick={() => {
                                        if (currentUser) {
                                            auth.signOut().then(() => navigate('/login'));
                                        } else {
                                            navigate('/login');
                                        }
                                    }}
                                >
                                    <strong>{currentUser ? (Array.isArray(users) ? `${users[0]?.username}` : users?.username) : 'Login'}</strong>
                                </Nav.Link>
                            </OverlayTrigger>
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
                                <Route index element={<LandingPage />} />
                                <Route path='login' element={<AuthPage />} />
                                <Route path='games' element={<Library />} />
                                <Route path='memories' element={<Memories />} />
                                <Route path='memories/:userId/:gameId/:id' element={<GameProfile />} />
                                <Route path='memories/:userId/:gameId/:charId/:id' element={<CharacterProfile />} />
                                <Route path='tracker' element={<Tracker />} />
                                <Route path='tracker/:userId/:gameId/:id' element={<GameTrack />} />
                                <Route path='tracker/:id' element={<CharacterTrack />} />
                                <Route path='characters/:userId/:gameId/:imgId' element={<Characters />} />
                                <Route path='news' element={<News />} />
                            </Route>
                            <Route path='*' element={<ErrorPage />} />
                        </Routes>
                    </BrowserRouter>
                </Provider>
            </AuthProvider>
        </>
    )
}
