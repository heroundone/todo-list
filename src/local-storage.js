// upon load of page check local storage
function checkLocalStorage() {
    if(localStorage.length) {
        return true;
    }
    else {
        return false;
    };
};

/*addToLocalStorage

removeFromLocalStorage

extractLocalStorage*/

export {checkLocalStorage}