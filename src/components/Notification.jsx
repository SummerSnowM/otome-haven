import { Toast, ToastContainer } from 'react-bootstrap';

export default function Notification({ showToast, closeToast, message }) {
    return (
        <>
            <ToastContainer
                position='top-end'
                className='me-3 mt-3'
                style={{ zIndex: 1 }}
            >
                <Toast
                    show={showToast}
                    onClose={closeToast}
                    animation={true}
                >
                    <Toast.Header closeButton>Status</Toast.Header>
                    <Toast.Body>{message}</Toast.Body>
                </Toast>
            </ToastContainer>
        </>
    )
}