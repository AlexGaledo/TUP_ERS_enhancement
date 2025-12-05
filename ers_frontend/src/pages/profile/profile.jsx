// src/pages/profile/Profile.jsx
import { useEffect, useState } from 'react';
import './Profile.css';
import { useNavigate } from "react-router-dom";
import { useUser } from '../../context/UserContext.jsx';
import { useMessageModal } from '../../context/MessageModal.jsx';
import GoogleAuthenticator from '../../components/GoogleAuthenticator.jsx';

const Profile = () => {
  const { user, personalInfo, familyBackground, retrievePersonalInfo } = useUser() || {};
  const { showMessage } = useMessageModal() || { showMessage: () => {} };

  // loading state
  const [loading, setLoading] = useState(false);
  const [loadedOnce, setLoadedOnce] = useState(false);

  // Profile picture state
  const [profileImage, setProfileImage] = useState(null);

  // Personal info state
  const [lastName, setLastName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [middleName, setMiddleName] = useState('');
  const [extensionName, setExtensionName] = useState('');
  const [campus, setCampus] = useState('');
  const [department, setDepartment] = useState('');
  const [course, setCourse] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [age, setAge] = useState('');
  const [email, setEmail] = useState('');
  const [birthPlace, setBirthPlace] = useState('');
  const [height, setHeight] = useState('');
  const [facebook, setFacebook] = useState('');
  const [citizenship, setCitizenship] = useState('');
  const [weight, setWeight] = useState('');
  const [lrn, setLrn] = useState('');
  const [religion, setReligion] = useState('');
  const [civilStatus, setCivilStatus] = useState('');
  const [gender, setGender] = useState('');

  // Family background state
  const [fatherName, setFatherName] = useState('');
  const [fatherContact, setFatherContact] = useState('');
  const [fatherEducation, setFatherEducation] = useState('');
  const [fatherOccupation, setFatherOccupation] = useState('');
  const [fatherEmployer, setFatherEmployer] = useState('');
  const [fatherEmployerAddress, setFatherEmployerAddress] = useState('');
  const [fatherIncome, setFatherIncome] = useState('');

  const [motherName, setMotherName] = useState('');
  const [motherContact, setMotherContact] = useState('');
  const [motherEducation, setMotherEducation] = useState('');
  const [motherOccupation, setMotherOccupation] = useState('');
  const [motherEmployer, setMotherEmployer] = useState('');
  const [motherEmployerAddress, setMotherEmployerAddress] = useState('');
  const [motherIncome, setMotherIncome] = useState('');

  const [guardianName, setGuardianName] = useState('');
  const [guardianAddress, setGuardianAddress] = useState('');
  const [guardianContact, setGuardianContact] = useState('');
  const [guardianEducation, setGuardianEducation] = useState('');
  const [guardianOccupation, setGuardianOccupation] = useState('');
  const [guardianEmployer, setGuardianEmployer] = useState('');
  const [guardianEmployerAddress, setGuardianEmployerAddress] = useState('');
  const [guardianRelationship, setGuardianRelationship] = useState('');
  const [guardianIncome, setGuardianIncome] = useState('');

  const [siblingsCount, setSiblingsCount] = useState('');
  const [yearlyIncome, setYearlyIncome] = useState('');

  // Educational attainment – school row
  const [schoolLevel, setSchoolLevel] = useState('secondary');
  const [schoolLastAttended, setSchoolLastAttended] = useState('');
  const [schoolAddress, setSchoolAddress] = useState('');
  const [courseProgram, setCourseProgram] = useState('');
  const [major, setMajor] = useState('STEM');
  const [honor, setHonor] = useState('with_honor');
  const [honorDistinction, setHonorDistinction] = useState('none');
  const [yearGraduated, setYearGraduated] = useState('2023');

  const [curriculumCategory, setCurriculumCategory] = useState('k12'); // k12 | old | college_bg
  const [track, setTrack] = useState('STEM');

  // Educational attainment – Grade 11/12 subject grades
  const [basicCalculus, setBasicCalculus] = useState('');
  const [preCalculus, setPreCalculus] = useState('');
  const [generalMath, setGeneralMath] = useState('');
  const [probStat, setProbStat] = useState('');
  const [solidGeometry, setSolidGeometry] = useState('');

  const [genChem1, setGenChem1] = useState('');
  const [genChem2, setGenChem2] = useState('');
  const [genPhysics1, setGenPhysics1] = useState('');
  const [biology, setBiology] = useState('');

  const [readingWriting, setReadingWriting] = useState('');
  const [oralComm, setOralComm] = useState('');
  const [englishAnalytics, setEnglishAnalytics] = useState('');
  const [englishEfficiency, setEnglishEfficiency] = useState('');

  // Employment background state (single record)
  const [companyName, setCompanyName] = useState('');
  const [companyPosition, setCompanyPosition] = useState('');
  const [inclusiveDates, setInclusiveDates] = useState('');
  const [duration, setDuration] = useState('');
  const [titleAwards, setTitleAwards] = useState('');
  const [sponsor, setSponsor] = useState('');
  const [dateAwarded, setDateAwarded] = useState('');
  const [refName, setRefName] = useState('');
  const [refPosition, setRefPosition] = useState('');
  const [refCompany, setRefCompany] = useState('');
  const [refCity, setRefCity] = useState('');
  const [refContact, setRefContact] = useState('');
  const [consentChecked, setConsentChecked] = useState(false);

  const [activeTab, setActiveTab] = useState('personal'); // 'personal' | 'family' | 'education' | 'employment'
  
  const navigate = useNavigate();

  const handleSubmitEmployment = e => {
    e.preventDefault();
    // hook to backend later
  };

  const handleOpenChangePassword = () => {
    navigate('/auth/change-password');
  };

  // Fetch user info on mount / user change
  useEffect(() => {
    if (!user || loadedOnce) return;
    (async () => {
      setLoading(true);
      try {
        await retrievePersonalInfo();
        setLoadedOnce(true);
      } catch (err) {
        showMessage({ type: 'error', title: 'Load failed', message: 'Unable to load your profile.' });
      } finally {
        setLoading(false);
      }
    })();
  }, [user, retrievePersonalInfo, loadedOnce, showMessage]);

  // Populate personal info state when fetched
  useEffect(() => {
    if (!personalInfo) return;
    setFirstName(personalInfo.firstname || '');
    setLastName(personalInfo.lastname || '');
    setMiddleName(personalInfo.middlename || '');
    setExtensionName(personalInfo.extension_name || '');
    setGender(personalInfo.gender || '');
    setCampus(personalInfo.campus || '');
    setDepartment(personalInfo.department || '');
    setCourse(personalInfo.course || '');
    setAge(personalInfo.age || '');
    setFacebook(personalInfo.facebook_link || '');
    setBirthPlace(personalInfo.birthplace || '');
    setHeight(personalInfo.height_cm != null ? `${personalInfo.height_cm} cm` : '');
    setWeight(personalInfo.weight_lbs != null ? `${personalInfo.weight_lbs} lbs` : '');
    setCitizenship(personalInfo.citizenship || '');
    setReligion(personalInfo.religion || '');
    setCivilStatus(personalInfo.civil_status || '');
    setLrn(personalInfo.lrn || '');
    // birthDate currently not in API; leave blank
  }, [personalInfo]);

  // Populate family background when fetched
  useEffect(() => {
    if (!familyBackground) return;
    setFatherName(familyBackground.father_name || '');
    setFatherOccupation(familyBackground.father_occupation || '');
    setFatherContact(familyBackground.father_contact || '');
    setFatherEducation(familyBackground.father_highest_education || '');
    setFatherEmployer(familyBackground.father_employer || '');
    setFatherEmployerAddress(familyBackground.father_employer_address || '');
    setFatherIncome(familyBackground.father_income_bracket || '');

    setMotherName(familyBackground.mother_name || '');
    setMotherOccupation(familyBackground.mother_occupation || '');
    setMotherContact(familyBackground.mother_contact || '');
    setMotherEducation(familyBackground.mother_highest_education || '');
    setMotherEmployer(familyBackground.mother_employer || '');
    setMotherEmployerAddress(familyBackground.mother_employer_address || '');
    setMotherIncome(familyBackground.mother_income_bracket || '');

    setGuardianName(familyBackground.guardian_name || '');
    setGuardianOccupation(familyBackground.guardian_occupation || '');
    setGuardianContact(familyBackground.guardian_contact || '');
    setGuardianEducation(familyBackground.guardian_highest_education || '');
    setGuardianEmployer(familyBackground.guardian_employer || '');
    setGuardianEmployerAddress(familyBackground.guardian_employer_address || '');
    setGuardianIncome(familyBackground.guardian_income_bracket || '');
    // relationship not in API; leave blank
    setSiblingsCount(familyBackground.number_of_siblings || '');
    setYearlyIncome(familyBackground.income_bracket || '');
  }, [familyBackground]);

  useEffect(() => {
    if (user && user.email) setEmail(user.email);
    if (user && user.birthday) {
      try {
        const d = new Date(user.birthday);
        if (!isNaN(d.getTime())) {
          const mm = String(d.getMonth() + 1).padStart(2, '0');
          const dd = String(d.getDate()).padStart(2, '0');
          const yyyy = String(d.getFullYear());
          setBirthDate(`${mm} / ${dd} / ${yyyy}`);
        }
      } catch {}
    }
  }, [user]);

  const renderStatic = value => (
    <div className="pill-input">
      {value || '—'}
    </div>
  );

  return (
    <div className="profile-page">
      <div className="profile-layout">
        {/* Left vertical tabs */}
        <aside className="profile-sidebar">
          <button
            className={`profile-tab ${activeTab === 'personal' ? 'active' : ''}`}
            onClick={() => setActiveTab('personal')}
          >
            <span className="icon">👤</span>
            <span className="profile-tab-label">Personal Information</span>
          </button>
          <button
            className={`profile-tab ${activeTab === 'family' ? 'active' : ''}`}
            onClick={() => setActiveTab('family')}
          >
            <span className="icon">👪</span>
            <span className="profile-tab-label">Family Background</span>
          </button>
          <button
            className={`profile-tab ${activeTab === 'education' ? 'active' : ''}`}
            onClick={() => setActiveTab('education')}
          >
            <span className="icon">🎓</span>
            <span className="profile-tab-label">Educational Attainment</span>
          </button>
          <button
            className={`profile-tab ${activeTab === 'employment' ? 'active' : ''}`}
            onClick={() => setActiveTab('employment')}
          >
            <span className="icon">💼</span>
            <span className="profile-tab-label">Employment Background</span>
          </button>
        </aside>

        {/* Main card */}
        <section className="profile-card">
          {/* PERSONAL INFORMATION TAB */}
          {activeTab === 'personal' && (
            <>
              <header className="profile-card-header">
                {/* Avatar with hover + upload */}
                <div className={`profile-avatar-slot ${!profileImage ? 'empty' : ''}`}>
                  <button
                    type="button"
                    className="avatar-inner"
                    onClick={() => {
                      const input = document.getElementById('profile-image-input');
                      if (input) input.click();
                    }}
                  >
                    {profileImage ? (
                      <img
                        src={profileImage}
                        alt="Profile"
                        className="avatar-image"
                      />
                    ) : (
                      <span className="avatar-icon-placeholder" />
                    )}
                  </button>
                  <input
                    id="profile-image-input"
                    type="file"
                    accept="image/*"
                    style={{ display: 'none' }}
                    onChange={e => {
                      const file = e.target.files?.[0];
                      if (!file) return;
                      const reader = new FileReader();
                      reader.onload = ev => {
                        if (typeof ev.target?.result === 'string') {
                          setProfileImage(ev.target.result);
                        }
                      };
                      reader.readAsDataURL(file);
                    }}
                  />
                </div>

                {/* User summary from context */}
                {user && (
                  <div style={{display:'flex',gap:'.5rem',flexWrap:'wrap',marginTop:'.5rem'}}>
                    <div style={{background:'rgba(255,255,255,0.06)',border:'1px solid rgba(255,255,255,0.12)',borderRadius:'9999px',padding:'.25rem .75rem'}}>
                      Username: <strong>{user.username}</strong>
                    </div>
                    {user.tup_id && (
                      <div style={{background:'rgba(255,255,255,0.06)',border:'1px solid rgba(255,255,255,0.12)',borderRadius:'9999px',padding:'.25rem .75rem'}}>
                        TUP ID: <strong>{String(user.tup_id).toUpperCase()}</strong>
                      </div>
                    )}
                    {user.email && (
                      <div style={{background:'rgba(255,255,255,0.06)',border:'1px solid rgba(255,255,255,0.12)',borderRadius:'9999px',padding:'.25rem .75rem'}}>
                        Email: <strong>{user.email}</strong>
                      </div>
                    )}
                      <button
                          type="button"
                          className="profile-change-password-btn"
                          onClick={handleOpenChangePassword}
                        >
                          Change password
                      </button>
                  </div>
                )}

                {/* Name rows */}
                {loading && <div style={{width:'100%', textAlign:'center', marginBottom:'1rem'}}>Loading profile...</div>}
                <div className="profile-name-row">
                  <div className="field-group">
                    <label>Last Name</label>
                    {renderStatic(lastName)}
                  </div>
                  <div className="field-group">
                    <label>First Name</label>
                    {renderStatic(firstName)}
                  </div>
                  <div className="field-group">
                    <label>Middle Name</label>
                    {renderStatic(middleName)}
                  </div>
                </div>

                <div className="profile-name-row">
                  <div className="field-group">
                    <label>Extension Name</label>
                    {renderStatic(extensionName)}
                  </div>

                  {/* Gender + change password block */}
                  <div className="field-group">
                    <label>Gender</label>
                    <div className="gender-block">
                      <div className="gender-row">
                        <div className="pill-input">
                          {gender || '—'}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </header>

              <hr className="profile-divider" />

              {/* Google Authenticator Section */}
              <GoogleAuthenticator userId={user?.id} />

              <hr className="profile-divider" />

              {/* 3‑column info grid */}
              <div className="profile-grid">
                <div className="field-group">
                  <label>Campus</label>
                  {renderStatic(campus)}
                </div>
                <div className="field-group">
                  <label>Department</label>
                  {renderStatic(department)}
                </div>
                <div className="field-group">
                  <label>Course</label>
                  {renderStatic(course)}
                </div>

                <div className="field-group">
                  <label>Birth date</label>
                  {renderStatic(birthDate)}
                </div>
                <div className="field-group">
                  <label>Age</label>
                  {renderStatic(age)}
                </div>
                <div className="field-group">
                  <label>Email Address</label>
                  {renderStatic(email)}
                </div>

                <div className="field-group">
                  <label>Birth place</label>
                  {renderStatic(birthPlace)}
                </div>
                <div className="field-group">
                  <label>Height</label>
                  {renderStatic(height)}
                </div>
                <div className="field-group">
                  <label>Facebook</label>
                  {renderStatic(facebook)}
                </div>

                <div className="field-group">
                  <label>Citizenship</label>
                  {renderStatic(citizenship)}
                </div>
                <div className="field-group">
                  <label>Weight</label>
                  {renderStatic(weight)}
                </div>
                <div className="field-group">
                  <label>Learner’s Reference Number</label>
                  {renderStatic(lrn)}
                </div>

                <div className="field-group">
                  <label>Religion</label>
                  {renderStatic(religion)}
                </div>
                <div className="field-group">
                  <label>Civil Status</label>
                  <select
                    className="pill-select"
                    value={civilStatus}
                    onChange={e => setCivilStatus(e.target.value)}
                  >
                    <option value="">
                      {civilStatus || 'Select civil status'}
                    </option>
                    <option value="single">Single</option>
                    <option value="married">Married</option>
                    <option value="widowed">Widowed</option>
                    <option value="separated">Separated</option>
                  </select>
                </div>
              </div>
            </>
          )}

          {/* FAMILY BACKGROUND TAB */}
          {activeTab === 'family' && (
            <div className="family-section">
              <h2 className="family-block-title">Father</h2>
              <div className="family-grid">
                <div className="field-group">
                  <label>Name</label>
                  {renderStatic(fatherName)}
                </div>
                <div className="field-group">
                  <label>Contact Number</label>
                  {renderStatic(fatherContact)}
                </div>
                <div className="field-group">
                  <label>Highest Education</label>
                  <select
                    className="pill-select"
                    value={fatherEducation}
                    onChange={e => setFatherEducation(e.target.value)}
                  >
                    <option value="">
                      {fatherEducation || '- select Highest Education -'}
                    </option>
                    <option value="elementary">Elementary</option>
                    <option value="highschool">Highschool</option>
                    <option value="undergrad">Undergraduate</option>
                    <option value="graduate">Graduate</option>
                    <option value="masteral">Masteral</option>
                    <option value="doctoral">Doctoral</option>
                  </select>
                </div>
                <div className="field-group">
                  <label>Profession / Occupation</label>
                  {renderStatic(fatherOccupation)}
                </div>
                <div className="field-group">
                  <label>Employer</label>
                  {renderStatic(fatherEmployer)}
                </div>
                <div className="field-group">
                  <label>Employer Address</label>
                  {renderStatic(fatherEmployerAddress)}
                </div>
                <div className="field-group">
                  <label>Income Bracket per month</label>
                  <select
                    className="pill-select"
                    value={fatherIncome}
                    onChange={e => setFatherIncome(e.target.value)}
                  >
                    <option value="">
                      {fatherIncome || '- select salary -'}
                    </option>
                    <option value="below_10k">Below 10,000</option>
                    <option value="above_10k">Above 10,000</option>
                    <option value="above_20k">Above 20,000</option>
                    <option value="above_100k">Above 100,000</option>
                    <option value="above_200k">Above 200,000</option>
                    <option value="above_500k">Above 500,000</option>
                  </select>
                </div>
              </div>

              <hr className="family-divider" />

              <h2 className="family-block-title">Mother</h2>
              <div className="family-grid">
                <div className="field-group">
                  <label>Name</label>
                  {renderStatic(motherName)}
                </div>
                <div className="field-group">
                  <label>Contact Number</label>
                  {renderStatic(motherContact)}
                </div>
                <div className="field-group">
                  <label>Highest Education</label>
                  <select
                    className="pill-select"
                    value={motherEducation}
                    onChange={e => setMotherEducation(e.target.value)}
                  >
                    <option value="">
                      {motherEducation || '- select Highest Education -'}
                    </option>
                    <option value="elementary">Elementary</option>
                    <option value="highschool">Highschool</option>
                    <option value="undergrad">Undergraduate</option>
                    <option value="graduate">Graduate</option>
                    <option value="masteral">Masteral</option>
                    <option value="doctoral">Doctoral</option>
                  </select>
                </div>
                <div className="field-group">
                  <label>Profession / Occupation</label>
                  {renderStatic(motherOccupation)}
                </div>
                <div className="field-group">
                  <label>Employer</label>
                  {renderStatic(motherEmployer)}
                </div>
                <div className="field-group">
                  <label>Employer Address</label>
                  {renderStatic(motherEmployerAddress)}
                </div>
                <div className="field-group">
                  <label>Income Bracket per month</label>
                  <select
                    className="pill-select"
                    value={motherIncome}
                    onChange={e => setMotherIncome(e.target.value)}
                  >
                    <option value="">
                      {motherIncome || '- select salary -'}
                    </option>
                    <option value="below_10k">Below 10,000</option>
                    <option value="above_10k">Above 10,000</option>
                    <option value="above_20k">Above 20,000</option>
                    <option value="above_100k">Above 100,000</option>
                    <option value="above_200k">Above 200,000</option>
                    <option value="above_500k">Above 500,000</option>
                  </select>
                </div>
              </div>

              <hr className="family-divider" />

              <h2 className="family-block-title">Guardian</h2>
              <div className="family-grid">
                <div className="field-group">
                  <label>Name</label>
                  {renderStatic(guardianName)}
                </div>
                <div className="field-group">
                  <label>Complete Address</label>
                  {renderStatic(guardianAddress)}
                </div>
                <div className="field-group">
                  <label>Contact Number</label>
                  {renderStatic(guardianContact)}
                </div>
                <div className="field-group">
                  <label>Highest Education</label>
                  <select
                    className="pill-select"
                    value={guardianEducation}
                    onChange={e => setGuardianEducation(e.target.value)}
                  >
                    <option value="">
                      {guardianEducation || '- select Highest Education -'}
                    </option>
                    <option value="elementary">Elementary</option>
                    <option value="highschool">Highschool</option>
                    <option value="undergrad">Undergraduate</option>
                    <option value="graduate">Graduate</option>
                    <option value="masteral">Masteral</option>
                    <option value="doctoral">Doctoral</option>
                  </select>
                </div>
                <div className="field-group">
                  <label>Profession / Occupation</label>
                  {renderStatic(guardianOccupation)}
                </div>
                <div className="field-group">
                  <label>Employer</label>
                  {renderStatic(guardianEmployer)}
                </div>
                <div className="field-group">
                  <label>Employer Address</label>
                  {renderStatic(guardianEmployerAddress)}
                </div>
                <div className="field-group">
                  <label>Relationship</label>
                  {renderStatic(guardianRelationship)}
                </div>
                <div className="field-group">
                  <label>Income Bracket per month</label>
                  <select
                    className="pill-select"
                    value={guardianIncome}
                    onChange={e => setGuardianIncome(e.target.value)}
                  >
                    <option value="">
                      {guardianIncome || '- select salary -'}
                    </option>
                    <option value="below_10k">Below 10,000</option>
                    <option value="above_10k">Above 10,000</option>
                    <option value="above_20k">Above 20,000</option>
                    <option value="above_100k">Above 100,000</option>
                    <option value="above_200k">Above 200,000</option>
                    <option value="above_500k">Above 500,000</option>
                  </select>
                </div>
              </div>

              <hr className="family-divider" />

              <div className="family-grid">
                <div className="field-group">
                  <label>Number of Sibling/s</label>
                  <select
                    className="pill-select"
                    value={siblingsCount}
                    onChange={e => setSiblingsCount(e.target.value)}
                  >
                    <option value="">
                      {siblingsCount || '- select sibling -'}
                    </option>
                    <option value="only_child">Only child</option>
                    <option value="1_2">1–2</option>
                    <option value="3_plus">3 or more</option>
                  </select>
                </div>
                <div className="field-group">
                  <label>Income Bracket per year</label>
                  <select
                    className="pill-select"
                    value={yearlyIncome}
                    onChange={e => setYearlyIncome(e.target.value)}
                  >
                    <option value="">
                      {yearlyIncome || 'Not more than 100k'}
                    </option>
                    <option value="lt_200k">Not more than 200k</option>
                    <option value="lt_500k">Not more than 500k</option>
                    <option value="gt_500k">More than 500k</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* EDUCATIONAL ATTAINMENT TAB */}
          {activeTab === 'education' && (
            <div className="education-section">
              <h2 className="education-title">Educational Attainment</h2>

              <div className="education-grid education-grid-top">
                <div className="field-group">
                  <label>School Level</label>
                  <select
                    className="pill-select"
                    value={schoolLevel}
                    onChange={e => setSchoolLevel(e.target.value)}
                  >
                    <option value="secondary">Secondary</option>
                    <option value="senior_high">Senior High School</option>
                    <option value="college">College</option>
                  </select>
                </div>

                <div className="field-group">
                  <label>School Last Attended</label>
                  {renderStatic(schoolLastAttended)}
                </div>

                <div className="field-group">
                  <label>School Address</label>
                  {renderStatic(schoolAddress)}
                </div>

                <div className="field-group">
                  <label>Course / Program</label>
                  {renderStatic(courseProgram)}
                </div>

                <div className="field-group">
                  <label>Major / Specialization</label>
                  <select
                    className="pill-select"
                    value={major}
                    onChange={e => setMajor(e.target.value)}
                    
                  >
                    <option value="STEM">STEM</option>
                    <option value="ABM">ABM</option>
                    <option value="HUMSS">HUMSS</option>
                    <option value="GAS">GAS</option>
                    <option value="TVL">TVL</option>
                  </select>
                </div>

                <div className="field-group">
                  <label>Honor</label>
                  <select
                    className="pill-select"
                    value={honor}
                    onChange={e => setHonor(e.target.value)}
                    
                  >
                    <option value="with_honor">With Honor</option>
                    <option value="with_high_honor">With High Honor</option>
                    <option value="with_highest_honor">With Highest Honor</option>
                    <option value="none">None</option>
                  </select>
                </div>

                <div className="field-group">
                  <label>Honor / Distinction</label>
                  <select
                    className="pill-select"
                    value={honorDistinction}
                    onChange={e => setHonorDistinction(e.target.value)}
                    
                  >
                    <option value="none">None</option>
                    <option value="valedictorian">Valedictorian</option>
                    <option value="salutatorian">Salutatorian</option>
                    <option value="deans_list">Dean&apos;s Lister</option>
                  </select>
                </div>

                <div className="field-group">
                  <label>Year Graduated</label>
                  <select
                    className="pill-select"
                    value={yearGraduated}
                    onChange={e => setYearGraduated(e.target.value)}
                    
                  >
                    <option value="2025">2025</option>
                    <option value="2024">2024</option>
                    <option value="2023">2023</option>
                    <option value="2022">2022</option>
                    <option value="2021">2021</option>
                    <option value="2020">2020</option>
                  </select>
                </div>
              </div>

              <hr className="education-divider" />

              <div className="education-category-row">
                <span className="education-category-label">Category</span>
                <div className="education-category-options">
                  <label className="radio-pill">
                    <input
                      type="radio"
                      name="curriculumCategory"
                      checked={curriculumCategory === 'k12'}
                      onChange={() => setCurriculumCategory('k12')}
                      disabled
                    />
                    <span>K–12</span>
                  </label>
                  <label className="radio-pill">
                    <input
                      type="radio"
                      name="curriculumCategory"
                      checked={curriculumCategory === 'old'}
                      onChange={() => setCurriculumCategory('old')}
                      disabled
                    />
                    <span>Old Curriculum</span>
                  </label>
                  <label className="radio-pill">
                    <input
                      type="radio"
                      name="curriculumCategory"
                      checked={curriculumCategory === 'college_bg'}
                      onChange={() => setCurriculumCategory('college_bg')}
                      disabled
                    />
                    <span>With College Background</span>
                  </label>
                </div>
              </div>

              <div className="education-subjects">
                <div className="education-subject-column">
                  <h3 className="education-subject-heading">Math</h3>
                  <div className="field-group">
                    <label>Basic Calculus</label>
                    {renderStatic(basicCalculus)}
                  </div>
                  <div className="field-group">
                    <label>Pre-Calculus</label>
                    {renderStatic(preCalculus)}
                  </div>
                  <div className="field-group">
                    <label>General Math</label>
                    {renderStatic(generalMath)}
                  </div>
                  <div className="field-group">
                    <label>Probability &amp; Statistics</label>
                    {renderStatic(probStat)}
                  </div>
                  <div className="field-group">
                    <label>Solid Geometry</label>
                    {renderStatic(solidGeometry)}
                  </div>
                </div>

                <div className="education-subject-column">
                  <h3 className="education-subject-heading">Science</h3>
                  <div className="field-group">
                    <label>Gen. Chemistry I</label>
                    {renderStatic(genChem1)}
                  </div>
                  <div className="field-group">
                    <label>Gen. Chemistry II</label>
                    {renderStatic(genChem2)}
                  </div>
                  <div className="field-group">
                    <label>Gen. Physics I</label>
                    {renderStatic(genPhysics1)}
                  </div>
                  <div className="field-group">
                    <label>Biology</label>
                    {renderStatic(biology)}
                  </div>
                </div>

                <div className="education-subject-column">
                  <h3 className="education-subject-heading">English</h3>
                  <div className="field-group">
                    <label>Reading and Writing</label>
                    {renderStatic(readingWriting)}
                  </div>
                  <div className="field-group">
                    <label>Oral Communication</label>
                    {renderStatic(oralComm)}
                  </div>
                  <div className="field-group">
                    <label>English for Analytics</label>
                    {renderStatic(englishAnalytics)}
                  </div>
                  <div className="field-group">
                    <label>English Efficiency</label>
                    {renderStatic(englishEfficiency)}
                  </div>
                </div>
              </div>

              <div className="education-track-row">
                <span className="education-track-label">Track</span>
                <div className="education-track-input">
                  <select
                    className="pill-select"
                    value={track}
                    onChange={e => setTrack(e.target.value)}
                    
                  >
                    <option value="STEM">
                      Science, Technology, Engineering and Mathematics (STEM)
                    </option>
                    <option value="ABM">
                      Accountancy, Business and Management (ABM)
                    </option>
                    <option value="HUMSS">
                      Humanities and Social Sciences (HUMSS)
                    </option>
                    <option value="GAS">
                      General Academic Strand (GAS)
                    </option>
                    <option value="TVL">
                      Technical-Vocational-Livelihood (TVL)
                    </option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* EMPLOYMENT BACKGROUND TAB */}
          {activeTab === 'employment' && (
            <form className="employment-section" onSubmit={handleSubmitEmployment}>
              <h2 className="employment-title">Employment Background</h2>

              <div className="employment-grid employment-grid-top">
                <div className="field-group">
                  <label>Name of Company</label>
                  {renderStatic(companyName)}
                </div>
                <div className="field-group">
                  <label>Position</label>
                  {renderStatic(companyPosition)}
                </div>
                <div className="field-group">
                  <label>Inclusive Dates</label>
                  {renderStatic(inclusiveDates)}
                </div>
              </div>

              <div className="employment-grid employment-grid-middle">
                <div className="field-group">
                  <label>Duration (Years / Months)</label>
                  {renderStatic(duration)}
                </div>
                <div className="field-group">
                  <label>Title Awards</label>
                  {renderStatic(titleAwards)}
                </div>
                <div className="field-group">
                  <label>Sponsor</label>
                  {renderStatic(sponsor)}
                </div>
                <div className="field-group">
                  <label>Date Awarded</label>
                  {renderStatic(dateAwarded)}
                </div>
              </div>

              <div className="employment-grid employment-grid-bottom">
                <div className="field-group">
                  <label>Name</label>
                  {renderStatic(refName)}
                </div>
                <div className="field-group">
                  <label>Position</label>
                  {renderStatic(refPosition)}
                </div>
                <div className="field-group">
                  <label>Company</label>
                  {renderStatic(refCompany)}
                </div>
                <div className="field-group">
                  <label>City</label>
                  {renderStatic(refCity)}
                </div>
                <div className="field-group">
                  <label>Contact Number</label>
                  {renderStatic(refContact)}
                </div>
              </div>

              <hr className="employment-divider" />

              <div className="consent-section">
                <h3 className="consent-title">Data Subject Consent Form</h3>
                <p className="consent-text">
                  In accordance with RA 10173 or the Data Privacy Act of 2012, I give my consent to the
                  collection, use, processing, and disclosure of my personal data for legitimate
                  educational and administrative purposes required by the University.
                </p>
                <ol className="consent-list">
                  <li>
                    I am aware that Technological University of the Philippines (TUP) collects and stores
                    my personal data during my admission and enrollment, including my demographic profile
                    and contact details.
                  </li>
                  <li>
                    I agree to personally update these data through personal request from the Office of
                    the University Registrar.
                  </li>
                  <li>
                    I understand that the University will protect my school records and that I may
                    authorize a representative subject to University policy.
                  </li>
                  <li>
                    I authorize the University to manage my data for reporting, statistics, employment,
                    and other lawful purposes that may serve my best interest as a student or graduate.
                  </li>
                </ol>

                <label className="consent-checkbox-row">
                  <input
                    type="checkbox"
                    checked={consentChecked}
                    onChange={e => setConsentChecked(e.target.checked)}
                  />
                  <span>
                    I affirm that all information given here is true and correct, and I agree to the full
                    implementation of this consent.
                  </span>
                </label>
              </div>

              <div className="employment-submit-row">
                <button
                  type="submit"
                  className="employment-submit-btn"
                  disabled={!consentChecked}
                >
                  Submit
                </button>
              </div>
            </form>
          )}
        </section>
      </div>
    </div>
  );
};

export default Profile;
