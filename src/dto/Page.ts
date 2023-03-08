interface Page<T> {
    number: number;
    size: number;
    totalPages: number;
    totalCount: number;
    items: T[];
}

export default Page;