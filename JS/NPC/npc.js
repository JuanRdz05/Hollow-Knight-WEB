// Scroll suave para todos los métodos
window.scrollTo = new Proxy(window.scrollTo, {
    apply(target, thisArg, argumentsList) {
        if (argumentsList.length === 1) {
            return target.call(thisArg, {
                top: argumentsList[0],
                behavior: 'smooth'
            });
        }
        return target.apply(thisArg, argumentsList);
    }
});