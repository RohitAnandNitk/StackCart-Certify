import React, { useState, useEffect } from 'react';
import Button from '../components/Button';
import { useCertificateStore } from '../store/useCertificateIdStore';
import toast from 'react-hot-toast';

function Home() {
  const { getInfo, certificateInformation, loading, setCertificateInformation } = useCertificateStore();

  const [inputValue, setInputValue] = useState('');
  // Use a single state to manage the view: 'input', 'loading', 'info', 'noRecord'
  const [currentView, setCurrentView] = useState('input');

  // Effect to manage view transitions based on API response
  useEffect(() => {
    if (loading) {
      setCurrentView('loading');
    } else if (certificateInformation) {
      setCurrentView('info');
    } else if (currentView === 'loading' && !certificateInformation && !loading) {
      // Only transition to 'noRecord' if we were previously loading and got no info
      setCurrentView('noRecord');
    }
  }, [certificateInformation, loading, currentView]);

  // Function to handle the validation logic
  const handleValidate = () => {
    if (!inputValue.trim()) {
      toast.error("Please enter a Certificate ID.");
      return;
    }
    setCurrentView('loading'); // Immediately show loading state
    getInfo({ certificateId: inputValue });
  };

  const handleGoBack = () => {
    setCertificateInformation(null); // Clear certificate data
    setInputValue(''); // Clear input field
    setCurrentView('input'); // Go back to the input form
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-transparent text-slate-800 font-inter relative overflow-hidden">
      {/* Background Design */}
      <div className="absolute inset-0 -z-10 h-full w-full bg-transparent bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
        <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-green-400 opacity-20 blur-[100px]"></div>
      </div>

      {/* Main Content */}
      {currentView === 'input' && (
        <div className='flex flex-col items-center justify-center p-4 max-w-lg w-full'>
          <div className='flex flex-col gap-7 justify-center items-center text-center'>
            <h1 className="text-4xl sm:text-5xl font-bold">
              <span className="text-green-500">&lt;</span>
              Validate
              <span className="text-green-500">Certificate/&gt;</span>
            </h1>

            {/* Form */}
            <div className='flex flex-col items-center justify-center mt-10 gap-4 w-full'>
              <label className='text-xl sm:text-2xl font-semibold' htmlFor="certificateId">Certificate ID</label>
              <div className="w-full">
                <input
                  id="certificateId"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  className="text-base sm:text-xl w-full h-12 bg-transparent placeholder:text-slate-400 text-slate-700 border border-slate-200 rounded-md px-3 py-1.5 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-800 shadow-sm focus:shadow-lg focus:border-slate-800"
                  placeholder="Enter Certificate ID..."
                />
              </div>
            </div>

            <Button
              onClick={handleValidate}
              name="Validate"
            />
          </div>
        </div>
      )}

      {currentView === 'loading' && (
        <div className="flex flex-col items-center justify-center min-h-screen gap-5">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-green-500"></div>
          <p className="text-xl sm:text-2xl font-semibold text-slate-700">Validating Certificate...</p>
        </div>
      )}

      {currentView === 'info' && certificateInformation && (
        <div className="flex flex-col gap-6 items-center justify-center min-h-screen px-4 py-8 w-full max-w-4xl">
          <h2 className="text-3xl sm:text-4xl font-semibold mb-4 text-center">Certificate Information</h2>
          <div className="bg-transparent shadow-xl rounded-xl p-6 sm:p-8 w-full border border-slate-200">
            <div className="space-y-4 sm:space-y-6 text-base sm:text-lg">
              <div className="flex flex-col sm:flex-row sm:justify-between">
                <span className="font-semibold w-full sm:w-1/2">Certificate ID:</span>
                <span className="font-normal w-full sm:w-1/2 break-words">{certificateInformation.certificateId}</span>
              </div>
              <div className="flex flex-col sm:flex-row sm:justify-between">
                <span className="font-semibold w-full sm:w-1/2">Name:</span>
                <span className="w-full sm:w-1/2 break-words">{certificateInformation.fullName}</span>
              </div>
              <div className="flex flex-col sm:flex-row sm:justify-between">
                <span className="font-semibold w-full sm:w-1/2">Issue Date:</span>
                <span className="w-full sm:w-1/2">
                  {new Date(certificateInformation.issueDate).toLocaleDateString('en-US', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                  })}
                </span>
              </div>
              <div className="flex flex-col sm:flex-row sm:justify-between">
                <span className="font-semibold w-full sm:w-1/2">Program:</span>
                <span className="w-full sm:w-1/2 break-words">{certificateInformation.program}</span>
              </div>
              <div className="flex flex-col sm:flex-row sm:justify-between">
                <span className="font-semibold w-full sm:w-1/2">Issued By:</span>
                <span className="w-full sm:w-1/2 break-words">{certificateInformation.issueBy}</span>
              </div>
              <div className="flex flex-col sm:flex-row sm:justify-between">
                <span className="font-semibold w-full sm:w-1/2">Program Start Date:</span>
                <span className="w-full sm:w-1/2">
                  {new Date(certificateInformation.startDate).toLocaleDateString('en-US', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                  })}
                </span>
              </div>
              <div className="flex flex-col sm:flex-row sm:justify-between">
                <span className="font-semibold w-full sm:w-1/2">Program End Date:</span>
                <span className="w-full sm:w-1/2">
                  {new Date(certificateInformation.endDate).toLocaleDateString('en-US', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                  })}
                </span>
              </div>
            </div>
          </div>
          <Button onClick={handleGoBack} name="Go Back" />
        </div>
      )}

      {currentView === 'noRecord' && (
        <div className="flex flex-col items-center justify-center min-h-screen gap-5 p-4 text-center">
          <h2 className="text-3xl sm:text-4xl font-semibold text-red-600">No Record Found</h2>
          <p className="text-lg sm:text-xl text-slate-900">Please check the Certificate ID and try again.</p>
          <Button onClick={handleGoBack} name="Go Back" />
        </div>
      )}
    </div>
  );
}

export default Home;