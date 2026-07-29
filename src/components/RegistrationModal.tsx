import React, { useState } from 'react';
import {
  User,
  Mail,
  Phone,
  Lock,
  Calendar,
  Building2,
  GraduationCap,
  MapPin,
  CheckCircle2,
  X,
  ArrowRight,
  ShieldCheck,
  Plus
} from 'lucide-react';
import { UserProfile, RoleType, Company, University } from '../types';

interface RegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRegisterSuccess: (newUser: UserProfile) => void;
  universities: (string | University)[];
  factories: (string | Company)[];
  departments: string[];
  designations: string[];
}

export const RegistrationModal: React.FC<RegistrationModalProps> = ({
  isOpen,
  onClose,
  onRegisterSuccess,
  universities,
  factories,
  departments,
  designations
}) => {
  const [step, setStep] = useState<1 | 2 | 3>(1);

  // Form State
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [role, setRole] = useState<RoleType>('professional');
  const [mobile, setMobile] = useState('');
  const [otpCode, setOtpCode] = useState('');
  const [mobileVerified, setMobileVerified] = useState(false);
  const [email, setEmail] = useState('');
  const [emailVerified, setEmailVerified] = useState(false);
  const [password, setPassword] = useState('');
  const [dob, setDob] = useState('1998-05-15');
  const [gender, setGender] = useState<'male' | 'female' | 'other'>('male');
  const [bloodGroup, setBloodGroup] = useState('B+');
  const [nationality, setNationality] = useState('Bangladeshi');
  const [district, setDistrict] = useState('Dhaka');
  const [currentAddress, setCurrentAddress] = useState('Uttara, Dhaka');
  const [permanentAddress, setPermanentAddress] = useState('Tangail');

  // Step 3 Smart Autocomplete entries
  const [selectedUni, setSelectedUni] = useState('Bangladesh University of Textiles (BUTEX)');
  const [selectedBatch, setSelectedBatch] = useState('38');
  const [selectedDegree, setSelectedDegree] = useState('B.Sc. in Textile Engineering');
  const [selectedFactory, setSelectedFactory] = useState('DBL Group');
  const [selectedDept, setSelectedDept] = useState('Merchandising');
  const [selectedDesig, setSelectedDesig] = useState('Executive');

  if (!isOpen) return null;

  const handleVerifyOtp = () => {
    if (otpCode.length >= 4) {
      setMobileVerified(true);
    }
  };

  const handleVerifyEmail = () => {
    if (email.includes('@')) {
      setEmailVerified(true);
    }
  };

  const handleSubmitRegistration = (e: React.FormEvent) => {
    e.preventDefault();

    const newUser: UserProfile = {
      id: `usr-${Date.now()}`,
      firstName: firstName || 'Textile',
      lastName: lastName || 'Engineer',
      headline: `${selectedDesig} at ${selectedFactory} | ${selectedUni}`,
      role: role,
      profilePhoto: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&h=300&fit=crop',
      coverPhoto: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=1000&h=300&fit=crop',
      mobile: mobile || '+8801700000000',
      mobileVerified: true,
      email: email || `user.${Date.now()}@textileconnectbd.com`,
      emailVerified: true,
      dob,
      gender,
      bloodGroup,
      nationality,
      currentAddress,
      permanentAddress,
      district,
      about: `Textile professional registered on Textile Connect BD. Specialized in ${selectedDept}.`,
      educations: [
        {
          id: `edu-${Date.now()}`,
          institutionName: selectedUni,
          institutionType: 'public_university',
          degree: selectedDegree,
          department: selectedDept,
          batch: selectedBatch,
          startYear: '2016',
          endYear: '2020',
          current: false,
          isApproved: true
        }
      ],
      experiences: [
        {
          id: `exp-${Date.now()}`,
          factoryName: selectedFactory,
          department: selectedDept,
          designation: selectedDesig,
          employmentType: 'full_time',
          location: `${district}, Bangladesh`,
          startDate: '2021-01-01',
          currentWorkplace: true,
          isApproved: true
        }
      ],
      skills: ['Textile Engineering', selectedDept, 'Production Quality'],
      certificates: [],
      awards: [],
      followersCount: 1,
      connectionsCount: 0,
      connectionStatus: 'none',
      availableForJob: true,
      totalExperienceYears: 3
    };

    onRegisterSuccess(newUser);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-900 w-full max-w-2xl rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-teal-400" /> Textile Connect BD Registration
            </h3>
            <p className="text-[11px] text-slate-300">Step {step} of 3: {step === 1 ? 'Personal Info' : step === 2 ? 'Verification & Security' : 'Smart Institution & Factory Setup'}</p>
          </div>
          <button onClick={onClose} className="p-1 text-slate-400 hover:text-white rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmitRegistration} className="p-6 overflow-y-auto space-y-4 text-xs flex-1">
          
          {/* STEP 1: Personal Info */}
          {step === 1 && (
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-medium mb-1 text-slate-700 dark:text-slate-300">First Name *</label>
                  <input
                    type="text"
                    required
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="e.g. Abdullah"
                    className="w-full p-2.5 bg-slate-100 dark:bg-slate-800 border rounded-xl"
                  />
                </div>
                <div>
                  <label className="block font-medium mb-1 text-slate-700 dark:text-slate-300">Last Name *</label>
                  <input
                    type="text"
                    required
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="e.g. Al Mamun"
                    className="w-full p-2.5 bg-slate-100 dark:bg-slate-800 border rounded-xl"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block font-medium mb-1">Date of Birth</label>
                  <input
                    type="date"
                    value={dob}
                    onChange={(e) => setDob(e.target.value)}
                    className="w-full p-2 bg-slate-100 dark:bg-slate-800 border rounded-xl"
                  />
                </div>
                <div>
                  <label className="block font-medium mb-1">Gender</label>
                  <select
                    value={gender}
                    onChange={(e) => setGender(e.target.value as any)}
                    className="w-full p-2 bg-slate-100 dark:bg-slate-800 border rounded-xl"
                  >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block font-medium mb-1">Blood Group</label>
                  <select
                    value={bloodGroup}
                    onChange={(e) => setBloodGroup(e.target.value)}
                    className="w-full p-2 bg-slate-100 dark:bg-slate-800 border rounded-xl"
                  >
                    <option value="A+">A+</option>
                    <option value="B+">B+</option>
                    <option value="O+">O+</option>
                    <option value="AB+">AB+</option>
                    <option value="A-">A-</option>
                    <option value="B-">B-</option>
                    <option value="O-">O-</option>
                    <option value="AB-">AB-</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-medium mb-1">District</label>
                  <input
                    type="text"
                    value={district}
                    onChange={(e) => setDistrict(e.target.value)}
                    placeholder="Dhaka / Gazipur / Chattogram"
                    className="w-full p-2 bg-slate-100 dark:bg-slate-800 border rounded-xl"
                  />
                </div>
                <div>
                  <label className="block font-medium mb-1">Account Role</label>
                  <select
                    value={role}
                    onChange={(e) => setRole(e.target.value as RoleType)}
                    className="w-full p-2 bg-slate-100 dark:bg-slate-800 border rounded-xl"
                  >
                    <option value="professional">Textile Professional / Engineer</option>
                    <option value="student">Textile Student</option>
                    <option value="hr">RMG HR / Talent Recruiter</option>
                    <option value="factory_owner">Factory Owner / Management</option>
                  </select>
                </div>
              </div>

              <div className="pt-4 flex justify-end">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="px-5 py-2.5 bg-teal-600 text-white font-bold rounded-xl flex items-center gap-2"
                >
                  Next: Verification <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: Mobile OTP & Email Verification */}
          {step === 2 && (
            <div className="space-y-4">
              
              {/* Mobile OTP Box */}
              <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700 space-y-2">
                <label className="block font-bold text-slate-800 dark:text-slate-200">Mobile Number (OTP Verification)</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                    placeholder="+8801711223344"
                    className="flex-1 p-2 bg-white dark:bg-slate-800 border rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={() => setOtpCode('5842')}
                    className="px-3 py-1.5 bg-slate-200 dark:bg-slate-700 font-semibold rounded-lg"
                  >
                    Send OTP
                  </button>
                </div>

                {otpCode && !mobileVerified && (
                  <div className="flex gap-2 pt-1">
                    <input
                      type="text"
                      value={otpCode}
                      onChange={(e) => setOtpCode(e.target.value)}
                      placeholder="Enter 4-digit OTP"
                      className="w-32 p-2 bg-white dark:bg-slate-800 border rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={handleVerifyOtp}
                      className="px-3 py-1.5 bg-teal-600 text-white font-bold rounded-lg"
                    >
                      Verify Mobile
                    </button>
                  </div>
                )}

                {mobileVerified && (
                  <p className="text-emerald-600 font-semibold flex items-center gap-1 mt-1">
                    <CheckCircle2 className="w-4 h-4" /> Mobile Number Verified (+880)
                  </p>
                )}
              </div>

              {/* Email Verification Box */}
              <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700 space-y-2">
                <label className="block font-bold text-slate-800 dark:text-slate-200">Email Address (Email Verification)</label>
                <div className="flex gap-2">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="engineer@textile.com"
                    className="flex-1 p-2 bg-white dark:bg-slate-800 border rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={handleVerifyEmail}
                    className="px-3 py-1.5 bg-teal-600 text-white font-bold rounded-lg"
                  >
                    Verify Email
                  </button>
                </div>
                {emailVerified && (
                  <p className="text-emerald-600 font-semibold flex items-center gap-1 mt-1">
                    <CheckCircle2 className="w-4 h-4" /> Email Verified
                  </p>
                )}
              </div>

              {/* Password */}
              <div>
                <label className="block font-medium mb-1">Create Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full p-2.5 bg-slate-100 dark:bg-slate-800 border rounded-xl"
                />
              </div>

              <div className="pt-4 flex justify-between">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="px-4 py-2 bg-slate-200 text-slate-700 font-bold rounded-xl"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className="px-5 py-2.5 bg-teal-600 text-white font-bold rounded-xl flex items-center gap-2"
                >
                  Next: Smart Education & Factory <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: Smart Education & Factory Autocomplete Selection */}
          {step === 3 && (
            <div className="space-y-4">
              
              {/* Smart University Autocomplete */}
              <div className="p-3 bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800/40 rounded-xl space-y-2">
                <label className="block font-bold text-emerald-900 dark:text-emerald-300">
                  Smart Education Entry (Bangladesh Institutions Autocomplete)
                </label>
                <input
                  type="text"
                  list="reg-uni-list"
                  value={selectedUni}
                  onChange={(e) => setSelectedUni(e.target.value)}
                  placeholder="Start typing institution e.g. BUTEX, BUFT, Primeasia, TEC Tangail..."
                  className="w-full p-2.5 bg-white dark:bg-slate-800 border rounded-xl text-xs"
                />
                <datalist id="reg-uni-list">
                  {universities.map((u, idx) => {
                    const name = typeof u === 'string' ? u : u.name;
                    return <option key={typeof u === 'string' ? `uni-${idx}-${u}` : u.id} value={name} />;
                  })}
                </datalist>

                <div className="grid grid-cols-2 gap-2 pt-1">
                  <input
                    type="text"
                    value={selectedBatch}
                    onChange={(e) => setSelectedBatch(e.target.value)}
                    placeholder="Batch e.g. 38"
                    className="p-2 bg-white dark:bg-slate-800 border rounded-lg"
                  />
                  <input
                    type="text"
                    value={selectedDegree}
                    onChange={(e) => setSelectedDegree(e.target.value)}
                    placeholder="Degree e.g. B.Sc in Textile Engineering"
                    className="p-2 bg-white dark:bg-slate-800 border rounded-lg"
                  />
                </div>
              </div>

              {/* Smart Factory Selection Autocomplete */}
              <div className="p-3 bg-teal-50/50 dark:bg-teal-950/20 border border-teal-200 dark:border-teal-800/40 rounded-xl space-y-2">
                <label className="block font-bold text-teal-900 dark:text-teal-300">
                  Smart Factory Selection (Bangladeshi Garments & Textile Mills Autocomplete)
                </label>
                <input
                  type="text"
                  list="reg-fac-list"
                  value={selectedFactory}
                  onChange={(e) => setSelectedFactory(e.target.value)}
                  placeholder="Type factory e.g. DBL Group, Babylon, Beximco, Envoy, Pacific Jeans..."
                  className="w-full p-2.5 bg-white dark:bg-slate-800 border rounded-xl text-xs"
                />
                <datalist id="reg-fac-list">
                  {factories.map((f, idx) => {
                    const name = typeof f === 'string' ? f : f.name;
                    return <option key={typeof f === 'string' ? `fac-${idx}-${f}` : f.id} value={name} />;
                  })}
                </datalist>

                <div className="grid grid-cols-2 gap-2 pt-1">
                  <input
                    type="text"
                    list="reg-dept-list"
                    value={selectedDept}
                    onChange={(e) => setSelectedDept(e.target.value)}
                    placeholder="Department e.g. Merchandising, Testing Lab..."
                    className="p-2 bg-white dark:bg-slate-800 border rounded-lg"
                  />
                  <datalist id="reg-dept-list">
                    {departments.map((d) => (
                      <option key={d} value={d} />
                    ))}
                  </datalist>

                  <input
                    type="text"
                    list="reg-desig-list"
                    value={selectedDesig}
                    onChange={(e) => setSelectedDesig(e.target.value)}
                    placeholder="Designation e.g. Executive, Senior Officer..."
                    className="p-2 bg-white dark:bg-slate-800 border rounded-lg"
                  />
                  <datalist id="reg-desig-list">
                    {designations.map((des) => (
                      <option key={des} value={des} />
                    ))}
                  </datalist>
                </div>
              </div>

              <div className="pt-4 flex justify-between">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="px-4 py-2 bg-slate-200 text-slate-700 font-bold rounded-xl"
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-teal-600 hover:bg-teal-700 text-white font-extrabold rounded-xl shadow-lg shadow-teal-600/30 flex items-center gap-2"
                >
                  Complete Registration <CheckCircle2 className="w-4 h-4" />
                </button>
              </div>

            </div>
          )}

        </form>
      </div>
    </div>
  );
};
