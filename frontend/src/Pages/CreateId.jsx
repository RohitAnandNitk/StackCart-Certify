import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useCertificateStore } from '../store/useCertificateIdStore';

function CreateId() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { createId, loading, certificateId, setCertificateId } = useCertificateStore();
  const [showId, setShowId] = useState(false);

  // Use useEffect to watch for changes in the certificateId from the store
  useEffect(() => {
    if (certificateId) {
      setShowId(true);
    } else {
      setShowId(false);
    }
  }, [certificateId]);

  const onSubmit = async (data) => {
    const formattedData = {
      email: data.Email,
      fullName: data.Name,
      employeeId : data.employeeId,
      startDate: data.StartDate,
      endDate: data.endDate,
      program: data.Program,
      issueBy: data.Issue_By,
    };
    await createId(formattedData);
    // The if condition below is no longer needed due to the useEffect hook.
    // The UI will update automatically.
  };

  return (
    <>
      {!showId ? (
        <div className='flex flex-col items-center justify-center min-h-screen bg-transparent pt-48'>
          <div className='bg-transparent shadow-xl rounded-xl p-10 w-full max-w-2xl'>
            <h2 className='text-2xl text-slate-900 font-semibold mb-6 text-center'>
              Note: All fields are mandatory
            </h2>

            <form className='flex flex-col gap-6' onSubmit={handleSubmit(onSubmit)}>
              {/* Name */}
              <div className='flex flex-col gap-2'>
                <label className='text-lg font-medium'>Name</label>
                <input
                  {...register("Name", { required: true })}
                  placeholder="Enter full name"
                  className='border border-gray-300 rounded-lg px-4 py-2 text-lg w-full hover:border-green-700 hover:shadow-md hover:shadow-green-200 transition duration-200'
                />
                {errors.Name && <span className='text-red-500 text-sm'>This field is required</span>}
              </div>

              {/* Email */}
              <div className='flex flex-col gap-2'>
                <label className='text-lg font-medium'>Email</label>
                <input
                  type="email"
                  {...register("Email", { required: true })}
                  placeholder='Enter Employee Email'
                  className='border border-gray-300 rounded-lg px-4 py-2 text-lg w-full hover:border-green-700 hover:shadow-md hover:shadow-green-200 transition duration-200'
                />
                {errors.Email && <span className='text-red-500 text-sm'>This field is required</span>}
              </div>
              {/* emp Id */}
              <div className='flex flex-col gap-2'>
                <label className='text-lg font-medium'>Employee Id</label>
                <input
                  type="text"
                  {...register("employeeId", { required: true })}
                  placeholder='Enter Employee Id'
                  className='border border-gray-300 rounded-lg px-4 py-2 text-lg w-full hover:border-green-700 hover:shadow-md hover:shadow-green-200 transition duration-200'
                />
                {errors.employeeId && <span className='text-red-500 text-sm'>This field is required</span>}
              </div>

              {/* Start Date */}
              <div className='flex flex-col gap-2'>
                <label className='text-lg font-medium'>Start Date</label>
                <input
                  type="date"
                  {...register("StartDate", { required: true })}
                  className='border border-gray-300 rounded-lg px-4 py-2 text-lg w-full hover:border-green-700 hover:shadow-md hover:shadow-green-200 transition duration-200'
                />
                {errors.StartDate && <span className='text-red-500 text-sm'>This field is required</span>}
              </div>

              {/* End Date */}
              <div className='flex flex-col gap-2'>
                <label className='text-lg font-medium'>End Date</label>
                <input
                  type="date"
                  {...register("endDate", { required: true })}
                  className='border border-gray-300 rounded-lg px-4 py-2 text-lg w-full hover:border-green-700 hover:shadow-md hover:shadow-green-200 transition duration-200'
                />
                {errors.endDate && <span className='text-red-500 text-sm'>This field is required</span>}
              </div>

              {/* Program */}
              <div className='flex flex-col gap-2'>
                <label className='text-lg font-medium'>Program</label>
                <input
                  {...register("Program", { required: true })}
                  placeholder="Enter program name"
                  className='border border-gray-300 rounded-lg px-4 py-2 text-lg w-full hover:border-green-700 hover:shadow-md hover:shadow-green-200 transition duration-200'
                />
                {errors.Program && <span className='text-red-500 text-sm'>This field is required</span>}
              </div>

              {/* Issued By */}
              <div className='flex flex-col gap-2'>
                <label className='text-lg font-medium'>Issued By</label>
                <input
                  {...register("Issue_By", { required: true })}
                  placeholder="Enter issuer name"
                  className='border border-gray-300 rounded-lg px-4 py-2 text-lg w-full hover:border-green-700 hover:shadow-md hover:shadow-green-200 transition duration-200'
                />
                {errors.Issue_By && <span className='text-red-500 text-sm'>This field is required</span>}
              </div>

              {/* Submit Button */}
              <button
                disabled={loading}
                type="submit"
                className='bg-green-700 hover:bg-green-800 text-white text-lg font-semibold py-2 px-4 rounded-lg mt-4 transition duration-200'
              >
                {loading ? "Creating" : "Create"}
              </button>
            </form>
          </div>
        </div>
      ) : (
        <div className='flex flex-col items-center justify-center min-h-screen bg-transparent pt-48'>
          <div className='text-2xl font-semibold text-green-700 mb-4'>
            {`New Generated Certificate ID: ${certificateId}`}
          </div>
          <button
            onClick={() => {
              setCertificateId(null);
              setShowId(false);
            }}
            disabled={loading}
            className='bg-green-700 hover:bg-green-800 text-white text-lg font-semibold py-2 px-4 rounded-lg transition duration-200'
          >
            {loading ? "Goining Back" : "Go Back"}
          </button>
        </div>
      )}
    </>
  );
}

export default CreateId;