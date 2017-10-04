var elementEvents = {
    customEvent: {
        eventObj: new Event ("customEvent"),
        dispatch: () => {
            window.dispatchEvent(elementEvents.customEvent.eventObj)
        },
        listen: () => {
            // any func
        }
    }
};


for(let key in elementEvents){
    window.addEventListener(key, elementEvents[key].listen);
}