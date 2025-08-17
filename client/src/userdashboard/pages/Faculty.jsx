import React from 'react';
import { FiMail } from 'react-icons/fi';
import deepika from '../../assets/images/deepika.png'; // Ensure path is correct
import priya from '../../assets/images/priya.jpg';     // Ensure path is correct
import subrahmanyam from '../../assets/images/nbs.jpg';    // Ensure path is correct
import divya from '../../assets/images/divyasree.jpg'; // Ensure path is correct
import neelima from '../../assets/images/neelima.jpg'

// --- Static Data for Faculty ---
const facultyData = {
    hod: {
        name: 'Dr. N. Deepika Rani',
        qualifications: 'B.E., M.E., Ph.D.',
        position: 'Professor & Head',
        imageUrl: deepika,
        email: 'deepika.rani@example.com',
    },
    staff: [
        {
            name: 'Dr. N. Bala Subrahmanyam',
            qualifications: 'B.E, M.E., Ph.D, MISTE, MIETE',
            position: 'Professor',
            imageUrl: subrahmanyam,
            email: 'drnbsubrahmanyam@gvpce.ac.in',
        },
        {
            name: 'Ms. B. Keerthi Priya',
            qualifications: 'M.Tech',
            position: 'Assistant Professor',
            imageUrl: priya,
            email: 'keerthi.priya@example.com',
        },
        {
            name: 'Mrs. U. Divya Sree',
            qualifications: 'M.Tech.,(Ph.D)',
            position: 'Assistant Professor',
            imageUrl: divya,
            email: 'divyasree@gvpce.ac.in',
        },
        {
            name: 'Mrs. M. Neelima',
            qualifications: 'M.Tech.,(Ph.D)',
            position: 'Assistant Professor',
            imageUrl: neelima,
            email: 'mneelima@gvpce.ac.in',
        },
    ]
};

const FacultyProfileCard = ({ member }) => {
    return (
        <div className="bg-white rounded-xl shadow-lg overflow-hidden w-full max-w-md mx-auto transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
            <div className="flex flex-row">
                {/* Image container */}
                <div className="w-1/3 h-48">
                    <img
                        className="w-full h-full object-cover"
                        src={member.imageUrl}
                        alt={`Profile of ${member.name}`}
                    />
                </div>
                
                {/* Content container */}
                <div className="w-2/3 p-4 flex flex-col justify-between">
                    <div>
                        <h2 className="text-xl font-bold text-gray-800 mb-1">
                            {member.name}
                        </h2>
                        <p className="text-blue-600 font-medium mb-1 text-sm">
                            {member.position}
                        </p>
                        <p className="text-gray-600 mb-2 text-sm">
                            {member.qualifications}
                        </p>
                    </div>
                    
                    <a
                        href={`mailto:${member.email}`}
                        className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium transition-colors text-sm self-start"
                    >
                        <FiMail className="w-4 h-4 mr-1" />
                        Contact
                    </a>
                </div>
            </div>
        </div>
    );
};

const Faculty = () => {
    // Combine HOD and other staff into a single array for mapping
    const allFaculty = [facultyData.hod, ...facultyData.staff];

    return (
        <div className="bg-white mt-10 py-20 px-4 sm:px-6 lg:px-8">
            {/* Page Header */}
            <div className="max-w-4xl mx-auto text-center mb-16">
                <h1 className="text-4xl sm:text-5xl md:text-[3.25rem] font-extrabold text-[#2c3286] tracking-tight font-[Poppins]">
  Our Faculty
</h1>

                <p className="mt-4 text-lg sm:text-xl text-gray-600">
                    The guiding minds behind our department's success.
                </p>
            </div>

            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {allFaculty.map((member) => (
                        <div key={member.email} className="flex justify-center">
                            <FacultyProfileCard member={member} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Faculty;