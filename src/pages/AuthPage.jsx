import { Form, Container, Button, Modal, Image } from 'react-bootstrap';
import { useState, useContext, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import {
    createUserWithEmailAndPassword,
    getAuth,
    signInWithEmailAndPassword
} from 'firebase/auth';
import { saveUser } from '../features/usersSlice';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../components/AuthProvider'

import Notification from '../components/Notification';

export default function AuthPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [file, setFile] = useState(null);

    const [showModal, setShowModal] = useState(false);
    const [showToast, setShowToast] = useState(false);
    const [message, setMessage] = useState("");

    const auth = getAuth();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { currentUser } = useContext(AuthContext);


    useEffect(() => {
        if (currentUser) return navigate('/news');
    }, [currentUser, navigate])

    //new user
    const handleSignUp = async (e) => {
        e.preventDefault();
        try {
            const res = await createUserWithEmailAndPassword(
                auth,
                email,
                password,
            );
            console.log(res.user);
            dispatch(saveUser({ userId: res.user.uid, username, file }));
        } catch (error) {
            console.error(error);
            setMessage("Email has been taken");
            handleShowToast();
        }
    }

    //login
    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await signInWithEmailAndPassword(auth, email, password);
        } catch (error) {
            console.error(error)
            setMessage("Invalid Email or Password");
            handleShowToast();
        }
    }

    const handleShowToast = () => setShowToast(true);
    const handleCloseToast = () => setShowToast(false);

    return (
        <>
            <Container className='mt-5'>
                <Form
                    className='rounded-4 border p-5'
                    style={{ backgroundColor: '#FFF7F3' }}
                    onSubmit={handleLogin}
                >
                    <div className="ratio ratio-21x9 overflow-hidden rounded-4 mb-2">
                        <Image
                            src="src/assets/authpage-wallpaper.jpg"
                            className="img-fluid w-100 h-100 object-fit-cover"
                            alt="Login wallpaper"
                        />
                    </div>
                    <h1 style={{ fontFamily: 'Comic Sans MS' }}>Login</h1>
                    <Form.Group className='mt-3'>
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            type='email'
                            placeholder='Enter email here'
                            required
                        />
                    </Form.Group>

                    <Form.Group className='mt-3'>
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            type='password'
                            placeholder='Enter password here'
                            required
                        />
                    </Form.Group>

                    <Button
                        className='mt-3 rounded-5 w-100'
                        type='submit'
                        style={{ backgroundColor: '#E6B2BA', borderColor: 'transparent' }}
                    >
                        Login
                    </Button>
                </Form>

                <Button
                    className='mt-3 rounded-5 w-100'
                    onClick={() => setShowModal(true)}
                    style={{ backgroundColor: '#E6B2BA', borderColor: 'transparent' }}
                >
                    No account yet? Create here
                </Button>
            </Container>

            <Modal

                show={showModal}
                onHide={() => setShowModal(false)}
                animation={true}
            >
                <Modal.Header
                    style={{ backgroundColor: '#E6B2BA' }}
                    closeButton
                >
                    <Modal.Title style={{ fontFamily: 'Comic Sans MS' }}>Register Account</Modal.Title>
                </Modal.Header>
                <Modal.Body
                    style={{ backgroundColor: '#FFF7F3' }}
                >
                    <Form onSubmit={handleSignUp}>
                        <Form.Group className='mt-3'>
                            <Form.Label>Username</Form.Label>
                            <Form.Control
                                value={username}
                                onChange={e => setUsername(e.target.value)}
                                type='text'
                                placeholder='Enter username here'
                                required
                            />
                        </Form.Group>

                        <Form.Group className='mt-3'>
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                type='email'
                                placeholder='Enter email here'
                                required
                            />
                        </Form.Group>

                        <Form.Group className='mt-3'>
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                type='password'
                                placeholder='Enter password here'
                                required
                            />
                        </Form.Group>

                        <Form.Group className='mt-3'>
                            <Form.Label>Profile Image</Form.Label>
                            <Form.Control
                                onChange={e => setFile(e.target.files[0])}
                                type='file'
                                required
                            />
                        </Form.Group>

                        <Button
                            className='mt-3 rounded-5 w-100'
                            type='submit'
                            style={{ backgroundColor: '#E6B2BA', borderColor: 'transparent' }}
                        >
                            Register
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>

            <Notification showToast={showToast} message={message} closeToast={handleCloseToast} />
        </>
    )
}