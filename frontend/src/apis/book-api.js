import LibraryAppBackend from './LibraryAppBackend';

const addBook = async (book) => {
    const { data } = await LibraryAppBackend.post('/book/add', { ...book });
    return data;
};

const getAllBooks = async () => {
    const { data } = await LibraryAppBackend.post('/book/all');
    return data;
};

export { addBook, getAllBooks };