import { useState } from 'react'

export default function useModal() {
    const [currentModal, setCurrentModal] = useState(null as null | string)

    const openModal = (modalName: string) => setCurrentModal(modalName)
    const closeModal = () => setCurrentModal(null)

    const toggleModal = (modalName: string) => {
        if (currentModal === modalName) {
            closeModal()
        } else {
            openModal(modalName)
        }
    }

    return { openModal, closeModal, toggleModal, currentModal }
}
