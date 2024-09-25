// components/TableComponent.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchItems, setCurrentPage } from '@/app/Redux/paginationSlice';

const TableComponent = () => {
  const dispatch = useDispatch();
  const { currentPage, itemsPerPage, items, totalItems, status, error } = useSelector((state) => state.pagination);

  useEffect(() => {
    dispatch(fetchItems());
  }, [dispatch]);

  // Calculate paginated items
  const paginatedItems = React.useMemo(() => 
    items.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage), 
    [items, currentPage, itemsPerPage]
  );

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handleNext = () => {
    if (currentPage < totalPages) {
      dispatch(setCurrentPage(currentPage + 1));
    }
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      dispatch(setCurrentPage(currentPage - 1));
    }
  };

  if (status === 'loading') {
    return <div className="text-center">Loading...</div>;
  }

  if (status === 'failed') {
    return <div className="text-center text-red-500">{error}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-6 text-center text-gray-900">User Table</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-lg">
          <thead>
            <tr className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white uppercase text-sm leading-normal">
              <th className="py-3 px-5 text-left">ID</th>
              <th className="py-3 px-5 text-left">Name</th>
              <th className="py-3 px-5 text-left">Email</th>
              <th className="py-3 px-5 text-left">Age</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 text-sm font-light">
            {paginatedItems.length > 0 ? (
              paginatedItems.map((user, index) => (
                <tr 
                  key={user.id} 
                  className={`border-b border-gray-200 transition duration-200 ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} hover:bg-gray-100`}
                >
                  <td className="py-4 px-5 text-left font-medium">{user.id}</td>
                  <td className="py-4 px-5 text-left">{user.name}</td>
                  <td className="py-4 px-5 text-left">{user.email}</td>
                  <td className="py-4 px-5 text-left">{user.age}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center py-4">No users found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      
      <div className="flex justify-between items-center mt-4">
        <button
          onClick={handlePrevious}
          disabled={currentPage === 1}
          className="bg-blue-500 text-white font-bold py-2 px-4 rounded disabled:bg-gray-300"
        >
          Previous
        </button>
        <span className="text-lg">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={handleNext}
          disabled={currentPage === totalPages}
          className="bg-blue-500 text-white font-bold py-2 px-4 rounded disabled:bg-gray-300"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default TableComponent;
