import React from 'react'
import { useState } from 'react';
import Button from '../components/Button';

function Home() {

  const [id, setId] = useState(null);

  const [isInfoAvailable, setIsInfoAvailable] = useState(true);
  const [isRecordAvailable, setIsRecordAvailable] = useState(true);

  const [employeeInfo, setEmployeeInfo] = useState({
    certificateId: "654654654",
    name: "Prince Singh",
    issueDate: "2024-01-01",
    progrma: "SDE Internship",
    issuedBy: "Rohit"

  });

 


  return (

    <div>
      {/* bg -color */}
      <div className="absolute inset-0 -z-10 h-full w-full bg-green-50 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"><div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-green-400 opacity-20 blur-[100px]"></div></div>



      {/* Main Home content  */}

      {!isInfoAvailable && <div className='flex flex-col items-center justify-center h-screen'>
        <div className='flex flex-col gap-7 justify-center items-center'>
          {/* tite */}
          <h1 class="text-4xl font-bold text-center "><span class="text-green-500">&lt;</span>Validate<span class="text-green-500">Certificate/&gt;</span>
          </h1>

          {/* form */}
          <div className='flex flex-col items-center justify-center mt-10 gap-4'>

            <label className='text-2xl font-semibold' htmlFor="certificateId">Certificate ID</label>

            <div class="w-full max-w-sm min-w-[200px]">
              <input class="text-xl w-full h-12 bg-transparent placeholder:text-slate-400 
                placeholder:text-xl
              text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-1.5 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-800 shadow-sm focus:shadow-lg focus:border-slate-800" placeholder="Enter Certificate ID..." />
            </div>
          </div>
          {/* button */}
          <Button onClick={() => {setIsInfoAvailable(true)}} name="Validate" />


        </div>

      </div>}

      {/* Empyoee Info Section  */}

      {
        isInfoAvailable && isRecordAvailable ? (
          <div className="flex flex-col gap-3 items-center justify-center min-h-screen px-4 py-8">
            <h2 className="text-3xl font-semibold mb-6">Certificate Information</h2>
            <div className="bg-transparent shadow-xl rounded-xl p-8 w-full max-w-4xl">
              <div className="space-y-6 text-lg">
                <div className="flex  justify-around font-semibold">
                  <span>Certificate ID:</span>
                  <span className="font-normal">{employeeInfo.certificateId}</span>
                </div>
                <div className="flex justify-around">
                  <span className="font-semibold">Name:</span>
                  <span>{employeeInfo.name}</span>
                </div>
                <div className="flex justify-around">
                  <span className="font-semibold">Issue Date:</span>
                  <span>{employeeInfo.issueDate}</span>
                </div>
                <div className="flex justify-around">
                  <span className="font-semibold">Program:</span>
                  <span>{employeeInfo.progrma}</span>
                </div>
                <div className="flex justify-around">
                  <span className="font-semibold">Issued By:</span>
                  <span>{employeeInfo.issuedBy}</span>
                </div>
              </div>
            </div>
            {/* Go Back Button */}

            <Button onClick={() => setIsInfoAvailable(false)} name="Go Back" />

          </div>
        ) : (
          //No record found section
          <div className="flex flex-col items-center justify-center min-h-screen gap-5">
            <h2 className="text-3xl font-semibold mb-6 text-red-600">No Record Found</h2>
            <p className="text-slate-900 text-3xl">Please check the Certificate ID and try again.</p>
            <Button onClick={() => setIsInfoAvailable(false)} name="Go Back" />
          </div>
        )


      }

    </div>
  )
}

export default Home
