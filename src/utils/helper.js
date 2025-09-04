const Arr2Map = (arr) => {
    return arr.reduce((map, item) => {
        map[item.id] = item;
        return map;
    }, {});
} 

const Map2Arr = (map) => {
    return Object.keys(map).map(id => map[id]);
}

export {Arr2Map, Map2Arr};