export default (id, items) => {
    let matchingItem = null;

    if (items.length > 0) {
        items.forEach((item) => {
            if (item.id === id) {
                matchingItem = item;
            }
        });
    }

    if (matchingItem) {
        return matchingItem;
    }

    return window.location.hash = '/';
};
