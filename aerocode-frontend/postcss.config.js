module.exports = {
  plugins: {
    tailwindcss: {
      config: {
        content: [
          "./index.html",
          "./src/**/*.{js,ts,jsx,tsx}",
        ],
        theme: {
          extend: {
            colors: {
              'primary': '#003366',      
              'secondary': '#FFC400',    
              'accent': '#4B8BBE',     
              
              'success': '#10B981',     
              'warning': '#F59E0B',     
              'danger': '#EF4444',       
              'info': '#6B7280',        
            },
            fontFamily: {
              'sans': ['Inter', 'Arial', 'sans-serif'], 
              'mono': ['Space Mono', 'monospace'], 
            },
            screens: {
              'xs': '475px',         
              'tablet': '768px',        
            },
            spacing: {
                '128': '32rem',
                '144': '36rem',
            }
          },
        },
      },
    },
    autoprefixer: {},
  },
};