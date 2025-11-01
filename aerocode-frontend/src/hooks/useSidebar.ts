import { useState } from 'react';

export const useSidebar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleSidebar = () => setIsOpen(prev => !prev);
    const closeSidebar = () => setIsOpen(false);

    return { isOpen, toggleSidebar, closeSidebar };
};