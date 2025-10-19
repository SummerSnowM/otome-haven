import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { describe, test, expect, vi, beforeEach } from 'vitest'
import '@testing-library/jest-dom'
import AddCharacter from '../components/characters/AddCharacter.jsx'
import axios from 'axios'
import { useDispatch } from 'react-redux'

// 👇 use `vi.mock` instead of `jest.mock`
vi.mock('axios')
vi.mock('react-redux', () => ({
    useDispatch: vi.fn(),
}))
vi.mock('../../features/usersSlice', () => ({
    saveCharacter: vi.fn(() => ({ type: 'SAVE_CHARACTER' })),
}))
vi.mock('../../App', () => ({
    BASE_URL: 'http://mocked-api.com',
}))

describe('AddCharacter Component', () => {
    let mockDispatch
    let mockCloseModal
    let mockSetLoading

    beforeEach(() => {
        mockDispatch = vi.fn()
        mockCloseModal = vi.fn()
        mockSetLoading = vi.fn()
        useDispatch.mockReturnValue(mockDispatch)
        vi.clearAllMocks()
    })

    const setup = () => {
        render(
            <AddCharacter
                showModal={true}
                closeModal={mockCloseModal}
                imageId="testImageId"
                gameId="testGameId"
                userId="testUserId"
                setLoading={mockSetLoading}
            />
        )
    }

    test('renders modal and form fields', () => {
        setup()
        expect(screen.getByText('New Character')).toBeInTheDocument()
        expect(screen.getByLabelText('Character Name')).toBeInTheDocument()
        expect(screen.getByLabelText('Voice Actor')).toBeInTheDocument()
        expect(screen.getByLabelText('Personality')).toBeInTheDocument()
    })

    test('submits form and calls axios + redux dispatch on success', async () => {
        axios.post.mockResolvedValueOnce({
            data: { message: 'Character added!', status: 'success' },
        })

        setup()

        fireEvent.change(screen.getByLabelText('Character Name'), { target: { value: 'Alice' } })
        fireEvent.change(screen.getByLabelText('Voice Actor'), { target: { value: 'VA Name' } })
        fireEvent.change(screen.getByLabelText('Personality'), { target: { value: 'Cheerful' } })
        fireEvent.change(screen.getByLabelText('Your Review / Opinion:'), { target: { value: 'Loved the character!' } })
        fireEvent.change(screen.getByLabelText('Rating'), { target: { value: 5 } })

        const submitBtn = screen.getByRole('button', { name: /Add Character/i })
        fireEvent.click(submitBtn)

        await waitFor(() => {
            expect(axios.post).toHaveBeenCalled();
            const [url, body] = axios.post.mock.calls[0];

            expect(url).toContain('/characters/testGameId');
            expect(body).toMatchObject({
                name: 'Alice',
                voice_actor: 'VA Name',
                personality: 'Cheerful',
            });
        });


        await waitFor(() => {
            expect(mockSetLoading).toHaveBeenCalledWith(true)
            expect(mockCloseModal).toHaveBeenCalled()
        })
    })

    test('shows notification after submission', async () => {
        axios.post.mockResolvedValueOnce({
            data: { message: 'Character created successfully!', status: 'success' },
        })

        setup()

        fireEvent.change(screen.getByLabelText('Character Name'), { target: { value: 'Alice' } })
        fireEvent.change(screen.getByLabelText('Voice Actor'), { target: { value: 'VA Name' } })
        fireEvent.change(screen.getByLabelText('Personality'), { target: { value: 'Cheerful' } })
        fireEvent.change(screen.getByLabelText('Your Review / Opinion:'), { target: { value: 'Fun!' } })
        fireEvent.change(screen.getByLabelText('Rating'), { target: { value: 4 } })

        const submitBtn = screen.getByRole('button', { name: /Add Character/i })
        fireEvent.click(submitBtn)

        await waitFor(() => {
            expect(screen.getByText(/Character created successfully!/i)).toBeInTheDocument()
        })
    })
})
