import React, { useState } from 'react';
import {
  Building2,
  GraduationCap,
  Award,
  FileText,
  Edit3,
  Plus,
  Trash2,
  X,
  Save,
  CheckCircle2,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Globe
} from 'lucide-react';
import { UserProfile, Education, Experience, Company, University } from '../types';

interface ProfileViewProps {
  profile: UserProfile;
  isOwnProfile: boolean;
  onSaveProfile: (updatedProfile: UserProfile) => void;
  universities: (string | University)[];
  factories: (string | Company)[];
  departments: string[];
  designations: string[];
}

export const ProfileView: React.FC<ProfileViewProps> = ({
  profile,
  isOwnProfile,
  onSaveProfile,
  universities,
  factories,
  departments,
  designations
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState<UserProfile>(profile);

  // Smart Autocomplete Inputs for Education Modal
  const [showAddEdu, setShowAddEdu] = useState(false);
  const [eduUniSearch, setEduUniSearch] = useState('');
  const [eduDeptSearch, setEduDeptSearch] = useState('');
  const [newEdu, setNewEdu] = useState<Partial<Education>>({
    degree: 'B.Sc. in Textile Engineering',
    startYear: '2018',
    endYear: '2022',
    batch: '',
    institutionType: 'public_university'
  });

  // Smart Autocomplete Inputs for Experience Modal
  const [showAddExp, setShowAddExp] = useState(false);
  const [expFactorySearch, setExpFactorySearch] = useState('');
  const [expDeptSearch, setExpDeptSearch] = useState('');
  const [expDesigSearch, setExpDesigSearch] = useState('');
  const [newExp, setNewExp] = useState<Partial<Experience>>({
    employmentType: 'full_time',
    location: 'Gazipur, Dhaka',
    startDate: '2022-01-01',
    currentWorkplace: true
  });

  const [newSkillText, setNewSkillText] = useState('');

  const handleSave = () => {
    onSaveProfile(editedProfile);
    setIsEditing(false);
  };

  const handleAddEducation = () => {
    if (!eduUniSearch) return;
    const addedEdu: Education = {
      id: `edu-${Date.now()}`,
      institutionName: eduUniSearch,
      department: eduDeptSearch || 'Textile Engineering',
      degree: newEdu.degree || 'B.Sc in Textile Engineering',
      batch: newEdu.batch,
      startYear: newEdu.startYear || '2018',
      endYear: newEdu.endYear,
      current: newEdu.current,
      institutionType: newEdu.institutionType || 'public_university',
      isApproved: true
    };

    setEditedProfile({
      ...editedProfile,
      educations: [...editedProfile.educations, addedEdu]
    });

    setShowAddEdu(false);
    setEduUniSearch('');
    setEduDeptSearch('');
  };

  const handleAddExperience = () => {
    if (!expFactorySearch) return;
    const addedExp: Experience = {
      id: `exp-${Date.now()}`,
      factoryName: expFactorySearch,
      department: expDeptSearch || 'Merchandising',
      designation: expDesigSearch || 'Executive',
      employmentType: newExp.employmentType || 'full_time',
      location: newExp.location || 'Gazipur, Dhaka',
      startDate: newExp.startDate || '2022-01-01',
      endDate: newExp.endDate,
      currentWorkplace: newExp.currentWorkplace,
      isApproved: true
    };

    setEditedProfile({
      ...editedProfile,
      experiences: [...editedProfile.experiences, addedExp]
    });

    setShowAddExp(false);
    setExpFactorySearch('');
    setExpDeptSearch('');
    setExpDesigSearch('');
  };

  const handleAddSkill = () => {
    if (!newSkillText.trim()) return;
    if (!editedProfile.skills.includes(newSkillText.trim())) {
      setEditedProfile({
        ...editedProfile,
        skills: [...editedProfile.skills, newSkillText.trim()]
      });
    }
    setNewSkillText('');
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    setEditedProfile({
      ...editedProfile,
      skills: editedProfile.skills.filter(s => s !== skillToRemove)
    });
  };

  return (
    <div className="space-y-4 max-w-4xl mx-auto">
      
      {/* Cover & Header Card */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-xs relative">
        <div className="h-36 bg-gradient-to-r from-teal-700 via-slate-800 to-emerald-800 relative">
          <img src={profile.coverPhoto} alt="Cover" className="w-full h-full object-cover opacity-75" />
        </div>

        <div className="p-6 relative">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 -mt-16 sm:-mt-20">
            <img
              src={profile.profilePhoto}
              alt={profile.firstName}
              className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl object-cover ring-4 ring-white dark:ring-slate-900 shadow-xl"
            />

            {isOwnProfile && (
              <div className="flex gap-2">
                {isEditing ? (
                  <button
                    onClick={handleSave}
                    className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-xs font-bold shadow-md flex items-center gap-1.5 transition-all"
                  >
                    <Save className="w-4 h-4" /> Save Profile
                  </button>
                ) : (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="px-4 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-800 dark:text-slate-200 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all"
                  >
                    <Edit3 className="w-4 h-4" /> Edit Profile
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Profile Name & Headline Edit */}
          <div className="mt-4 space-y-2">
            {isEditing ? (
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    value={editedProfile.firstName}
                    onChange={(e) => setEditedProfile({ ...editedProfile, firstName: e.target.value })}
                    className="p-2 bg-slate-100 dark:bg-slate-800 border rounded-xl text-xs"
                    placeholder="First Name"
                  />
                  <input
                    type="text"
                    value={editedProfile.lastName}
                    onChange={(e) => setEditedProfile({ ...editedProfile, lastName: e.target.value })}
                    className="p-2 bg-slate-100 dark:bg-slate-800 border rounded-xl text-xs"
                    placeholder="Last Name"
                  />
                </div>
                <input
                  type="text"
                  value={editedProfile.headline}
                  onChange={(e) => setEditedProfile({ ...editedProfile, headline: e.target.value })}
                  className="w-full p-2 bg-slate-100 dark:bg-slate-800 border rounded-xl text-xs"
                  placeholder="Headline e.g. Senior Merchandiser at DBL Group | BUTEX Batch 38"
                />
              </div>
            ) : (
              <div>
                <h1 className="text-xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
                  {profile.firstName} {profile.lastName}
                  {profile.emailVerified && <CheckCircle2 className="w-4 h-4 text-teal-500 fill-teal-500/20" />}
                </h1>
                <p className="text-xs text-slate-600 dark:text-slate-300 font-medium mt-1 leading-relaxed">
                  {profile.headline}
                </p>
              </div>
            )}

            <div className="flex flex-wrap items-center gap-3 pt-2 text-xs text-slate-500 dark:text-slate-400">
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-teal-600" /> {profile.district}, Bangladesh
              </span>
              <span className="flex items-center gap-1">
                <Mail className="w-3.5 h-3.5" /> {profile.email}
              </span>
              <span className="flex items-center gap-1">
                <Phone className="w-3.5 h-3.5" /> {profile.mobile}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* About Section */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-xs space-y-3">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">About</h3>
        {isEditing ? (
          <textarea
            value={editedProfile.about}
            onChange={(e) => setEditedProfile({ ...editedProfile, about: e.target.value })}
            rows={3}
            className="w-full p-3 text-xs bg-slate-100 dark:bg-slate-800 border rounded-xl"
          />
        ) : (
          <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-line">
            {profile.about}
          </p>
        )}
      </div>

      {/* Experience Section */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-2">
            <Building2 className="w-4 h-4 text-teal-600" /> Smart Factory Experience
          </h3>
          {isEditing && (
            <button
              onClick={() => setShowAddExp(true)}
              className="text-xs font-semibold text-teal-600 dark:text-teal-400 flex items-center gap-1 hover:underline"
            >
              <Plus className="w-4 h-4" /> Add Factory Experience
            </button>
          )}
        </div>

        {/* Experience List */}
        <div className="space-y-3">
          {(isEditing ? editedProfile : profile).experiences.map((exp) => (
            <div key={exp.id} className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-800 flex justify-between items-start">
              <div className="space-y-1 text-xs">
                <h4 className="font-bold text-slate-900 dark:text-white">{exp.designation}</h4>
                <p className="text-teal-600 dark:text-teal-400 font-semibold">{exp.factoryName}</p>
                <p className="text-slate-500">Dept: {exp.department} • {exp.location}</p>
                <p className="text-[10px] text-slate-400 font-mono">{exp.startDate} - {exp.currentWorkplace ? 'Present' : exp.endDate}</p>
              </div>
              {isEditing && (
                <button
                  onClick={() => {
                    setEditedProfile({
                      ...editedProfile,
                      experiences: editedProfile.experiences.filter(e => e.id !== exp.id)
                    });
                  }}
                  className="p-1 text-rose-500 hover:bg-rose-50 rounded-lg"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>
          ))}
        </div>

        {/* Modal / Inline Form to Add Experience */}
        {showAddExp && (
          <div className="p-4 bg-teal-50/50 dark:bg-teal-950/20 border border-teal-200 dark:border-teal-800 rounded-xl space-y-3 text-xs">
            <div className="flex justify-between items-center">
              <span className="font-bold text-teal-900 dark:text-teal-200">Add Smart Factory Experience</span>
              <button onClick={() => setShowAddExp(false)}><X className="w-4 h-4" /></button>
            </div>

            {/* Smart Factory Autocomplete Input */}
            <div>
              <label className="block text-[11px] font-medium text-slate-600 dark:text-slate-400 mb-1">
                Factory / Company Name (Autocomplete)
              </label>
              <input
                type="text"
                list="factories-list"
                value={expFactorySearch}
                onChange={(e) => setExpFactorySearch(e.target.value)}
                placeholder="Type or select factory e.g. DBL Group, Babylon, Beximco..."
                className="w-full p-2 bg-white dark:bg-slate-800 border rounded-lg"
              />
              <datalist id="factories-list">
                {factories.map((f, idx) => {
                  const name = typeof f === 'string' ? f : f.name;
                  return <option key={typeof f === 'string' ? `pv-fac-${idx}-${f}` : f.id} value={name} />;
                })}
              </datalist>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-[11px] font-medium mb-1">Department</label>
                <input
                  type="text"
                  list="departments-list"
                  value={expDeptSearch}
                  onChange={(e) => setExpDeptSearch(e.target.value)}
                  placeholder="Testing Lab, Merchandising..."
                  className="w-full p-2 bg-white dark:bg-slate-800 border rounded-lg"
                />
                <datalist id="departments-list">
                  {departments.map((d) => (
                    <option key={d} value={d} />
                  ))}
                </datalist>
              </div>

              <div>
                <label className="block text-[11px] font-medium mb-1">Designation</label>
                <input
                  type="text"
                  list="designations-list"
                  value={expDesigSearch}
                  onChange={(e) => setExpDesigSearch(e.target.value)}
                  placeholder="Executive, Senior Officer..."
                  className="w-full p-2 bg-white dark:bg-slate-800 border rounded-lg"
                />
                <datalist id="designations-list">
                  {designations.map((des) => (
                    <option key={des} value={des} />
                  ))}
                </datalist>
              </div>
            </div>

            <button
              type="button"
              onClick={handleAddExperience}
              className="px-4 py-2 bg-teal-600 text-white rounded-lg font-bold"
            >
              Add Experience
            </button>
          </div>
        )}
      </div>

      {/* Smart Education Section */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-2">
            <GraduationCap className="w-4 h-4 text-emerald-600" /> Smart Education Entry
          </h3>
          {isEditing && (
            <button
              onClick={() => setShowAddEdu(true)}
              className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1 hover:underline"
            >
              <Plus className="w-4 h-4" /> Add Institution
            </button>
          )}
        </div>

        <div className="space-y-3">
          {(isEditing ? editedProfile : profile).educations.map((edu) => (
            <div key={edu.id} className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-800 flex justify-between items-start">
              <div className="space-y-1 text-xs">
                <h4 className="font-bold text-slate-900 dark:text-white">{edu.institutionName}</h4>
                <p className="text-emerald-600 dark:text-emerald-400 font-semibold">{edu.degree} ({edu.department})</p>
                {edu.batch && <p className="text-slate-500 font-mono text-[10px]">Batch {edu.batch}</p>}
                <p className="text-[10px] text-slate-400">{edu.startYear} - {edu.endYear || 'Present'}</p>
              </div>
              {isEditing && (
                <button
                  onClick={() => {
                    setEditedProfile({
                      ...editedProfile,
                      educations: editedProfile.educations.filter(e => e.id !== edu.id)
                    });
                  }}
                  className="p-1 text-rose-500 hover:bg-rose-50 rounded-lg"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>
          ))}
        </div>

        {/* Add Education Form */}
        {showAddEdu && (
          <div className="p-4 bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800 rounded-xl space-y-3 text-xs">
            <div className="flex justify-between items-center">
              <span className="font-bold text-emerald-900 dark:text-emerald-200">Add Institution (Autocomplete)</span>
              <button onClick={() => setShowAddEdu(false)}><X className="w-4 h-4" /></button>
            </div>

            <div>
              <label className="block text-[11px] font-medium mb-1">University / College Name</label>
              <input
                type="text"
                list="universities-list"
                value={eduUniSearch}
                onChange={(e) => setEduUniSearch(e.target.value)}
                placeholder="Type e.g. BUTEX, BUFT, Primeasia, TEC Tangail..."
                className="w-full p-2 bg-white dark:bg-slate-800 border rounded-lg"
              />
              <datalist id="universities-list">
                {universities.map((u, idx) => {
                  const name = typeof u === 'string' ? u : u.name;
                  return <option key={typeof u === 'string' ? `pv-uni-${idx}-${u}` : u.id} value={name} />;
                })}
              </datalist>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <input
                type="text"
                value={newEdu.degree}
                onChange={(e) => setNewEdu({ ...newEdu, degree: e.target.value })}
                placeholder="Degree e.g. B.Sc. in Textile Engineering"
                className="p-2 bg-white dark:bg-slate-800 border rounded-lg"
              />
              <input
                type="text"
                value={newEdu.batch}
                onChange={(e) => setNewEdu({ ...newEdu, batch: e.target.value })}
                placeholder="Batch e.g. 38"
                className="p-2 bg-white dark:bg-slate-800 border rounded-lg"
              />
            </div>

            <button
              type="button"
              onClick={handleAddEducation}
              className="px-4 py-2 bg-emerald-600 text-white rounded-lg font-bold"
            >
              Add Education
            </button>
          </div>
        )}
      </div>

      {/* Skills & Resume Attachment */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        
        {/* Skills Card */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-xs space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">Technical Skills</h3>
          
          <div className="flex flex-wrap gap-1.5">
            {(isEditing ? editedProfile : profile).skills.map((skill) => (
              <span
                key={skill}
                className="bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs font-medium px-2.5 py-1 rounded-lg flex items-center gap-1"
              >
                {skill}
                {isEditing && (
                  <button onClick={() => handleRemoveSkill(skill)} className="text-slate-400 hover:text-rose-500">
                    <X className="w-3 h-3" />
                  </button>
                )}
              </span>
            ))}
          </div>

          {isEditing && (
            <div className="flex gap-2 pt-2">
              <input
                type="text"
                value={newSkillText}
                onChange={(e) => setNewSkillText(e.target.value)}
                placeholder="Add skill e.g. FastReact, ISO 17025"
                className="flex-1 p-2 text-xs bg-slate-100 dark:bg-slate-800 border rounded-xl"
              />
              <button
                onClick={handleAddSkill}
                className="px-3 py-2 bg-teal-600 text-white text-xs font-bold rounded-xl"
              >
                Add
              </button>
            </div>
          )}
        </div>

        {/* Attached Resume Document */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-xs space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-2">
            <FileText className="w-4 h-4 text-rose-500" /> Attached Resume PDF
          </h3>

          {profile.resumeUrl ? (
            <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700 flex items-center justify-between text-xs">
              <span className="font-semibold text-slate-800 dark:text-slate-200 truncate">
                {profile.resumeName || 'Textile_Engineer_CV.pdf'}
              </span>
              <a
                href={profile.resumeUrl}
                target="_blank"
                rel="noreferrer"
                className="px-3 py-1 bg-teal-600 text-white font-bold rounded-lg shrink-0"
              >
                Download
              </a>
            </div>
          ) : (
            <p className="text-xs text-slate-500">No PDF resume attached yet.</p>
          )}
        </div>

      </div>

    </div>
  );
};
