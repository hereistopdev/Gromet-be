type InputType = {
    prodCategory: string;
};

type CategoryQueryType = {
    category: string;
    sub_category?: { $in: string[] };
};

export const extractCategories = ({
    prodCategory,
}: InputType): CategoryQueryType[] => {

    return prodCategory.split(',').reduce((
        acc: CategoryQueryType[],
        categoryStr: string
    ) => {
        const [category, ...subCategories] = categoryStr.split('.');
        const categoryQuery: CategoryQueryType = {
            category,
            ...(subCategories.length > 0 && { sub_category: { $in: subCategories } }),
        };
        acc.push(categoryQuery);
        return acc;
    }, []);
};
