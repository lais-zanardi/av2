import React from 'react';

const Footer: React.FC = () => {
    const currentYear = new Date().getFullYear(); 

    return (
        <footer 
           className="fixed bottom-0 right-0 w-full bg-gray-50 text-xs text-gray-700 p-3 border-t border-gray-200 z-20" 
        >
            <div className="flex justify-center items-center gap-x-3">
                <span>&copy; {currentYear} Aerocode - Desenvolvimento de Software.</span>
                
                <div className="space-x-4">
                    <span>Versão 1.0.0</span>
                    <span className="font-medium text-green-600">Status: Conectado</span>
                </div>
            </div>
        </footer>
    );
};

export default Footer;