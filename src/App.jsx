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

function Layout() {
    const { currentUser } = useContext(AuthContext);
    const navigate = useNavigate();
    const auth = getAuth();

    return (
        <>
            <Navbar expand='md' style={{ backgroundColor: '#E6B2BA' }}>
                <Container>
                    <Navbar.Brand as={Link} to='/news'><strong>Otome Haven</strong></Navbar.Brand>

                    <Navbar.Toggle aria-controls='main-navbar' />

                    <Navbar.Collapse id='main-navbar'>
                        <Nav className='me-auto'>
                            <Nav.Link as={Link} to='/news'><strong>News</strong></Nav.Link>
                            <Nav.Link><strong>Memories</strong></Nav.Link>
                            <Nav.Link><strong>New Game</strong></Nav.Link>
                            <Nav.Link><strong>Tracker</strong></Nav.Link>
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
                                <Route path='news' element={<News />} />
                            </Route>
                        </Routes>
                    </BrowserRouter>
                </Provider>
            </AuthProvider>
        </>
    )
}