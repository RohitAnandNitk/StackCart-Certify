import React, { useState } from 'react';
import Button from '../components/Button';
import { useCertificateStore } from '../store/useCertificateIdStore';
import toast from 'react-hot-toast';

function Home() {
  const { getInfo, certificateInformation, loading, setCertificateInformation } = useCertificateStore();

  const [inputValue, setInputValue] = useState('');
  const [isValidateButtonClicked, setIsValidateButtonClicked] = useState(false);

  // Function to handle the validation logic
  const handleValidate = () => {
    // Check if the input value is empty before proceeding
    if (!inputValue.trim()) {
      toast.error("Please enter a Certificate ID.");
      // Do not set isValidateButtonClicked to true, stay on the form view
      return;
    }

    // If there is an input value, set the state and call the API
    setIsValidateButtonClicked(true);
    getInfo({ certificateId: inputValue });
  };

  const handleGoBack = () => {
    setIsValidateButtonClicked(false);
    setCertificateInformation(null);
    setInputValue(''); // Also reset the input field
  };

  return (
    <div>
      {/* Background Design */}
      <div className="absolute inset-0 -z-10 h-full w-full bg-green-50 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
        <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-green-400 opacity-20 blur-[100px]"></div>
      </div>

      {/* Main Content */}
      {!isValidateButtonClicked ? (
        <div className='flex flex-col items-center justify-center h-screen'>
          <div className='flex flex-col gap-7 justify-center items-center'>
            <h1 className="text-4xl font-bold text-center">
              <span className="text-green-500">&lt;</span>
              Validate
              <span className="text-green-500">Certificate/&gt;</span>
            </h1>

            {/* Form */}
            <div className='flex flex-col items-center justify-center mt-10 gap-4'>
              <label className='text-2xl font-semibold' htmlFor="certificateId">Certificate ID</label>
              <div className="w-full max-w-sm min-w-[200px]">
                <input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  className="text-xl w-full h-12 bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-1.5 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-800 shadow-sm focus:shadow-lg focus:border-slate-800"
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
      ) : certificateInformation ? (
        <div className="flex flex-col gap-3 items-center justify-center min-h-screen px-4 py-8">
          <h2 className="text-3xl font-semibold mb-6">Certificate Information</h2>
          <div className="bg-transparent shadow-xl rounded-xl p-8 w-full max-w-4xl">
            <div className="space-y-6 text-lg">
              <div className="flex justify-around font-semibold">
                <span>Certificate ID:</span>
                <span className="font-normal">{certificateInformation.certificateId}</span>
              </div>
              <div className="flex justify-around">
                <span className="font-semibold">Name:</span>
                <span>{certificateInformation.fullName}</span>
              </div>
              <div className="flex justify-around">
                <span className="font-semibold">Issue Date:</span>
                <span>
                  {new Date(certificateInformation.issueDate).toLocaleDateString('en-US', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                  })}
                </span>
              </div>
              <div className="flex justify-around">
                <span className="font-semibold">Program:</span>
                <span>{certificateInformation.program}</span>
              </div>
              <div className="flex justify-around">
                <span className="font-semibold">Issued By:</span>
                <span>{certificateInformation.issueBy}</span>
              </div>
              <div className="flex justify-around">
                <span className="font-semibold">Program Start Date:</span>
                <span>
                  {new Date(certificateInformation.startDate).toLocaleDateString('en-US', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                  })}
                </span>
              </div>
              <div className="flex justify-around">
                <span className="font-semibold">Program End Date:</span>
                <span>
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
      ) : (
        <div className="flex flex-col items-center justify-center min-h-screen gap-5">
          <h2 className="text-3xl font-semibold mb-6 text-red-600">No Record Found</h2>
          <p className="text-slate-900 text-3xl">Please check the Certificate ID and try again.</p>
          <Button onClick={handleGoBack} name="Go Back" />
        </div>
      )}
    </div>
  );
}

export default Home;