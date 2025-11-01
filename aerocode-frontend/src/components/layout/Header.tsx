import React from 'react';

interface BreadcrumbItem {
    label: string;
    path: string;
}

interface HeaderProps {
    pageTitle: string;
    breadcrumbs: BreadcrumbItem[];
}


const Header: React.FC<HeaderProps> = ({ pageTitle, breadcrumbs }) => {
    return (
        <header className="fixed top-0 w-full h-20 bg-white border-b border-gray-100 p-4 flex flex-col justify-center
                           lg:left-54 md:ml-10 transition-all duration-200">
            
            {/* 1. Breadcrumb */}
            <div className="text-xs text-gray-500 flex items-center space-x-1 mb-1 overflow-x-auto">
                {breadcrumbs.map((item, index) => (
                    <React.Fragment key={index}>
                        <a 
                            href={item.path || '#'}
                            className="hover:text-gray-900 transition-colors duration-150 cursor-pointer whitespace-nowrap"
                        >
                            {item.label}
                        </a>
                        {index < breadcrumbs.length - 1 && (
                            <span className="text-gray-300 mx-1">/</span>
                        )}
                    </React.Fragment>
                ))}
            </div>

            {/* 2. Título da Página */}
            <h1 className="text-2xl font-semibold text-gray-800 text-left">
                {pageTitle}
            </h1>
        </header>
    );
};

export default Header;
