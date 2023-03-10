const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.jsx',
    ],

    theme: {
        extend: {
            colors:{
                'pinif-1' : '#E97777',
                'pinif-2' : '#FF9F9F',
                'pinif-3' : '#FCDDB0',
            },
            fontFamily: {
                sans: ['Nunito', ...defaultTheme.fontFamily.sans],
                freehand: ['Freehand'],
            },
            gridTemplateColumns: {
                'min-80px' :'repeat(5, minmax(80px, 1fr))',
            },
        },
    },

    plugins: [require('@tailwindcss/forms')],
};
