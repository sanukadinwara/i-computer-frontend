import React from 'react';
import { ImCross } from "react-icons/im";
import { useNavigate } from 'react-router-dom';

const BlockedPage = ({ until, setUser }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user"); 
    setUser(null); 
    navigate("/"); 
  };

  const unblockDate = new Date(until).toLocaleString('en-US', {
    dateStyle: 'full',
    timeStyle: 'short',
  });

  return (
    <div className="fixed inset-0 bg-gray-900 flex items-center justify-center p-6 z-[9999]">
      <div className="bg-white rounded-3xl p-8 max-w-md w-full text-center shadow-2xl">
        <div className="flex items-center justify-center w-24 h-24 mx-auto mb-6 rounded-full border-4 border-red-600">
            <ImCross className="text-red-600 text-3xl" />
        </div>
        
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Account Temporarily Blocked</h1>
        
        <p className="text-gray-600 mb-6 leading-relaxed">
          Your account has been blocked for a specific period of time. <br />
          It will be automatically unblocked on:<br />
          <span className="font-bold text-red-600">{unblockDate}</span>
        </p>
        
        <p className="text-sm text-gray-500 border-t pt-4">
          We sincerely apologize for any inconvenience caused.
        </p>

        <button 
          onClick={handleLogout}
          className="bg-gray-800 text-white px-6 py-2 rounded-full hover:bg-gray-700 transition cursor-pointer mt-5"
        >
          Logout & Go to Home
        </button>

      </div>
    </div>
  );
};

export default BlockedPage;