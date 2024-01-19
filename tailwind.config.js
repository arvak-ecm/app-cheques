/** @type {import('tailwindcss').Config} */
export default {
  darkMode: false, // or 'media' or 'class'
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  
  theme: {
    extend: 
      {
        "animation": {
          "border-width": "border-width 3s infinite alternate",
          "text-gradient": "text-gradient 1.5s linear infinite",
          "background-shine": "background-shine 2s linear infinite",
          "background-shine2": "background-shine2 2s linear infinite"

        },
        "keyframes": {
          "text-gradient": {
            "to": {
              "backgroundPosition": "200% center"
            }
          },
          "border-width": {
            "from": {
              "width": "10px",
              "opacity": "0"
            },
            "to": {
              "width": "100px",
              "opacity": "1"
            }
          },
          "background-shine": {
            "from": {
              "backgroundPosition": "0 0"
            },
            "to": {
              "backgroundPosition": "-200% 0"
            }
          } ,
          "background-shine2": {
            "from": {
              "backgroundPosition": "0 0"
            },
            "to": {
              "backgroundPosition": "200% 0"
            }
          }

        }
      }
    
  },
  // eslint-disable-next-line no-undef
  plugins: [require("daisyui")],
};
