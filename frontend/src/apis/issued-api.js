import LibraryAppBackend from './LibraryAppBackend';

const getIssuedBooks = async () => {
  try {
    console.log('Making API call to fetch issued books');
    const response = await LibraryAppBackend.get('/issued/all');
    console.log('API response for issued books:', response);
    
    // Ensure we're returning the data array or an empty array if data is not available
    if (response && response.data) {
      return Array.isArray(response.data) ? response.data : [];
    } else {
      console.warn('No data received from issued books API');
      return [];
    }
  } catch (error) {
    console.error('Error fetching issued books:', error);
    // Return empty array instead of throwing to prevent component crashes
    return [];
  }
};

const issueBook = async (issueData) => {
    const { data } = await LibraryAppBackend.post('/issued/issue', issueData);
    return data;
};

const returnBook = async (issueId) => {
    const { data } = await LibraryAppBackend.post('/issued/return', { issueId });
    return data;
};

const getAllStudents = async () => {
    const { data } = await LibraryAppBackend.get('/user/students');
    return data;
};

export { getIssuedBooks, issueBook, returnBook, getAllStudents };