module.exports = {
  theme: {
    extend: {
      keyframes: {
        'zoom-in': {
          '0%': { transform: 'scale(0.9)' },
          '50%': { transform: 'scale(1.1)' },
          '100%': { transform: 'scale(1)' }
        },
        'firework-1': {
          '0%': { 
            transform: 'translate(0, 0) scale(0)',
            opacity: '1',
            backgroundColor: '#ffb703'
          },
          '50%': { 
            transform: 'translate(-20px, -100px) scale(1)',
            opacity: '0.8'
          },
          '100%': { 
            transform: 'translate(-40px, -150px) scale(0)',
            opacity: '0'
          }
        },
        'firework-2': {
          '0%': { 
            transform: 'translate(0, 0) scale(0)',
            opacity: '1',
            backgroundColor: '#fb8500'
          },
          '50%': { 
            transform: 'translate(20px, -120px) scale(1)',
            opacity: '0.8'
          },
          '100%': { 
            transform: 'translate(40px, -170px) scale(0)',
            opacity: '0'
          }
        },
        'firework-3': {
          '0%': { 
            transform: 'translate(0, 0) scale(0)',
            opacity: '1',
            backgroundColor: '#ffb703'
          },
          '50%': { 
            transform: 'translate(-10px, -80px) scale(1)',
            opacity: '0.8'
          },
          '100%': { 
            transform: 'translate(-20px, -130px) scale(0)',
            opacity: '0'
          }
        }
      },
      animation: {
        'zoom-in': 'zoom-in 0.5s ease-out',
        'firework-1': 'firework-1 1.5s ease-out infinite',
        'firework-2': 'firework-2 1.8s ease-out infinite',
        'firework-3': 'firework-3 1.6s ease-out infinite'
      }
    }
  }
} 