export const sortArrayNumerically = (array, key) => {
    return array.sort(function(a, b) {
        return (a[key] - b[key]);
    });
}