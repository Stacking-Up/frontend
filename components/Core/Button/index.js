/**
 * Returns the button object
 * @param  {string} type - The type of the button.
 * @param  {string} color - The color of the button: primary, secondary or grey.
 * @param  {string} className - The aditional class name of the button.
 * @param  {function} onClick - The function to be executed when the button is clicked.
 * @param  {any} children - The content of the button.
 * @param  {boolean} disabled - If the button is disabled or not.
 */
export const Button = ({type = "button", color = "primary", disabled = false, className = "", onClick, children}) =>
{
    const colorStyle = {
        "primary": "mx-2 my-2 bg-blue-bondi transition duration-150 ease-in-out hover:bg-blue-bondi-dark rounded text-white px-6 py-2 text-s",
        "secondary": "mx-2 my-2 bg-white transition duration-150 ease-in-out hover:bg-gray-200 hover:text-blue-bondi rounded border border-blue-bondi text-blue-bondi px-6 py-2 text-s",
        "grey": "mx-2 my-2 bg-gray-200 transition duration-150 ease-in-out hover:bg-gray-300 rounded text-blue-bondi px-6 py-2 text-s",
        "red": "mx-2 my-2 bg-red-600 transition duration-150 ease-in-out hover:bg-red-700 rounded border border-red-600 text-white px-6 py-2 text-s"
    };

    return(
        <button type={type}
        disabled={disabled}
        className={colorStyle[color]+ " " + className}
        onClick={onClick}> {children} </button>  
    );
};