export const getCitiesFromLocalStorage = () => {
    let cities = localStorage.getItem('cities');
    return cities ? cities.split(',') : [];
}

export const formattUnixTime = (unixTimeStamp) => {
    const date = new Date(unixTimeStamp * 1000);
    return `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
}

export const range = (min, max) => {
    const rangeResult = [];
    let i = min;
    while (i < max) {
        rangeResult.push(i);
        i++;
    }
    rangeResult.push(i);

    return rangeResult;
}