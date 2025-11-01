import React, { useRef, useEffect, useCallback } from 'react';
import { FaTimes } from 'react-icons/fa';

interface ModalProps {
    isOpen: boolean;            
    onClose: () => void;        
    title: string;              
    children: React.ReactNode;  
    size?: 'sm' | 'md' | 'lg' | 'xl';
}

const Modal: React.FC<ModalProps> = ({
    isOpen,
    onClose,
    title,
    children,
    size = 'md',
}) => {
    
    const modalRef = useRef<HTMLDivElement>(null);
    const handleKeyDown = useCallback((event: KeyboardEvent) => {
        if (event.key === 'Escape' && isOpen) {
            onClose();
        }
    }, [isOpen, onClose]);

    useEffect(() => {
        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [handleKeyDown]);
    
    const getSizeClasses = (): string => {
        switch (size) {
            case 'sm':
                return 'max-w-md'; 
            case 'lg':
                return 'max-w-3xl';
            case 'xl':
                return 'max-w-5xl';
            case 'md':
            default:
                return 'max-w-xl'; 
        }
    };
    
    if (!isOpen) return null;

    return (
        <div 
            className="fixed inset-0 bg-gray-950/15 backdrop-blur-sm z-50 flex items-center justify-center p-4 transition-opacity duration-300"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
        >
            <div 
                ref={modalRef} 
                className={`bg-white shadow-2xl w-full mx-auto transform transition-all duration-300 ${getSizeClasses()}`}
            >
                {/* Cabeçalho do Modal */}
                <div className="flex items-center justify-between border-b border-gray-200 p-4">
                    <h2 id="modal-title" className="text-lg font-semibold text-gray-900">
                        {title}
                    </h2>
                    <button 
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600 transition-colors"
                        aria-label="Fechar"
                    >
                        <FaTimes className="w-5 h-5" />
                    </button>
                </div>
                
                {/* Corpo do Conteúdo (Onde o children é injetado) */}
                <div className="p-6 max-h-[80vh] overflow-y-auto">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default Modal;