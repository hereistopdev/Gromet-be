import { stockLimits } from "../constants/stockLimits";

type InputType = {
    data: any[];
    startIndex: number;
    endIndex: number;
    filterKeys?: string[];
};

const getTrafficLight = (stock: number): string => {
    if (stock === stockLimits.none) return 'red';
    if (stock < stockLimits.few) return 'orange';
    return 'green';
};

export const filterProducts = ({
    data,
    startIndex,
    endIndex,
    filterKeys,
}: InputType) => {
    return data
        .slice(startIndex, endIndex)
        .map(item => {
            if (!filterKeys) return item;
            return filterKeys.reduce((
                filteredItem: Record<string, any>,
                key
            ) => {
                if (key === 'stock') {
                    filteredItem['traffic_light'] = getTrafficLight(item[key]);
                } else {
                    filteredItem[key] = item[key];
                }
                return filteredItem;
            }, {});
        });
};