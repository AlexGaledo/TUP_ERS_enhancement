// src/pages/profile/Profile.jsx
import { useState } from 'react';
import './Profile.css';

const Profile = () => {
  // Profile picture state
  const [profileImage, setProfileImage] = useState(null);

  // Personal info state
  const [lastName, setLastName] = useState('Torion');
  const [firstName, setFirstName] = useState('Clifford Roy');
  const [middleName, setMiddleName] = useState('Middle Name');
  const [extensionName, setExtensionName] = useState('Goat');
  const [campus, setCampus] = useState('Manila');
  const [department, setDepartment] = useState('College of Science');
  const [course, setCourse] = useState('Computer Science');
  const [birthDate, setBirthDate] = useState('01 / 01 / 2005');
  const [age, setAge] = useState('20');
  const [email, setEmail] = useState('sample@tup.edu.ph');
  const [birthPlace, setBirthPlace] = useState('Caloocan');
  const [height, setHeight] = useState('165 cm');
  const [facebook, setFacebook] = useState('facebook.com/user');
  const [citizenship, setCitizenship] = useState('Filipino');
  const [weight, setWeight] = useState('60 lbs');
  const [lrn, setLrn] = useState('0123-4352-6567-9099');
  const [religion, setReligion] = useState('Catholic');
  const [civilStatus, setCivilStatus] = useState('Single');
  const [gender, setGender] = useState('male');

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

  const handleSubmitEmployment = e => {
    e.preventDefault();
    // hook to backend later
  };

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

                <div className="profile-name-row">
                  <div className="field-group">
                    <label>Last Name</label>
                    <input
                      className="pill-input"
                      type="text"
                      value={lastName}
                      onChange={e => setLastName(e.target.value)}
                    />
                  </div>
                  <div className="field-group">
                    <label>First Name</label>
                    <input
                      className="pill-input"
                      type="text"
                      value={firstName}
                      onChange={e => setFirstName(e.target.value)}
                    />
                  </div>
                  <div className="field-group gender-group">
                    <label>Male</label>
                    <input
                      type="radio"
                      name="gender"
                      checked={gender === 'male'}
                      onChange={() => setGender('male')}
                    />
                    <label>Female</label>
                    <input
                      type="radio"
                      name="gender"
                      checked={gender === 'female'}
                      onChange={() => setGender('female')}
                    />
                  </div>
                </div>

                <div className="profile-name-row">
                  <div className="field-group">
                    <label>Middle Name</label>
                    <input
                      className="pill-input"
                      type="text"
                      value={middleName}
                      onChange={e => setMiddleName(e.target.value)}
                    />
                  </div>
                  <div className="field-group">
                    <label>Extension Name</label>
                    <input
                      className="pill-input"
                      type="text"
                      value={extensionName}
                      onChange={e => setExtensionName(e.target.value)}
                    />
                  </div>
                </div>
              </header>

              <hr className="profile-divider" />

              <div className="profile-grid">
                <div className="field-group">
                  <label>Campus</label>
                  <input
                    className="pill-input"
                    type="text"
                    value={campus}
                    onChange={e => setCampus(e.target.value)}
                  />
                </div>
                <div className="field-group">
                  <label>Department</label>
                  <input
                    className="pill-input"
                    type="text"
                    value={department}
                    onChange={e => setDepartment(e.target.value)}
                  />
                </div>
                <div className="field-group">
                  <label>Course</label>
                  <input
                    className="pill-input"
                    type="text"
                    value={course}
                    onChange={e => setCourse(e.target.value)}
                  />
                </div>

                <div className="field-group">
                  <label>Birth date</label>
                  <input
                    className="pill-input"
                    type="text"
                    value={birthDate}
                    onChange={e => setBirthDate(e.target.value)}
                  />
                </div>
                <div className="field-group">
                  <label>Age</label>
                  <input
                    className="pill-input"
                    type="text"
                    value={age}
                    onChange={e => setAge(e.target.value)}
                  />
                </div>
                <div className="field-group">
                  <label>Email Address</label>
                  <input
                    className="pill-input"
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                  />
                </div>

                <div className="field-group">
                  <label>Birth place</label>
                  <input
                    className="pill-input"
                    type="text"
                    value={birthPlace}
                    onChange={e => setBirthPlace(e.target.value)}
                  />
                </div>
                <div className="field-group">
                  <label>Height</label>
                  <input
                    className="pill-input"
                    type="text"
                    value={height}
                    onChange={e => setHeight(e.target.value)}
                  />
                </div>
                <div className="field-group">
                  <label>Facebook</label>
                  <input
                    className="pill-input"
                    type="text"
                    value={facebook}
                    onChange={e => setFacebook(e.target.value)}
                  />
                </div>

                <div className="field-group">
                  <label>Citizenship</label>
                  <input
                    className="pill-input"
                    type="text"
                    value={citizenship}
                    onChange={e => setCitizenship(e.target.value)}
                  />
                </div>
                <div className="field-group">
                  <label>Weight</label>
                  <input
                    className="pill-input"
                    type="text"
                    value={weight}
                    onChange={e => setWeight(e.target.value)}
                  />
                </div>
                <div className="field-group">
                  <label>Learner’s Reference Number</label>
                  <input
                    className="pill-input"
                    type="text"
                    value={lrn}
                    onChange={e => setLrn(e.target.value)}
                  />
                </div>

                <div className="field-group">
                  <label>Religion</label>
                  <input
                    className="pill-input"
                    type="text"
                    value={religion}
                    onChange={e => setReligion(e.target.value)}
                  />
                </div>
                <div className="field-group">
                  <label>Civil Status</label>
                  <input
                    className="pill-input"
                    type="text"
                    value={civilStatus}
                    onChange={e => setCivilStatus(e.target.value)}
                  />
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
                  <input
                    className="pill-input"
                    type="text"
                    value={fatherName}
                    onChange={e => setFatherName(e.target.value)}
                  />
                </div>
                <div className="field-group">
                  <label>Contact Number</label>
                  <input
                    className="pill-input"
                    type="text"
                    value={fatherContact}
                    onChange={e => setFatherContact(e.target.value)}
                  />
                </div>
                <div className="field-group">
                  <label>Highest Education</label>
                  <select
                    className="pill-select"
                    value={fatherEducation}
                    onChange={e => setFatherEducation(e.target.value)}
                  >
                    <option value="">- select Highest Education -</option>
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
                  <input
                    className="pill-input"
                    type="text"
                    value={fatherOccupation}
                    onChange={e => setFatherOccupation(e.target.value)}
                  />
                </div>
                <div className="field-group">
                  <label>Employer</label>
                  <input
                    className="pill-input"
                    type="text"
                    value={fatherEmployer}
                    onChange={e => setFatherEmployer(e.target.value)}
                  />
                </div>
                <div className="field-group">
                  <label>Employer Address</label>
                  <input
                    className="pill-input"
                    type="text"
                    value={fatherEmployerAddress}
                    onChange={e => setFatherEmployerAddress(e.target.value)}
                  />
                </div>
                <div className="field-group">
                  <label>Income Bracket per month</label>
                  <select
                    className="pill-select"
                    value={fatherIncome}
                    onChange={e => setFatherIncome(e.target.value)}
                  >
                    <option value="">- select salary -</option>
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
                  <input
                    className="pill-input"
                    type="text"
                    value={motherName}
                    onChange={e => setMotherName(e.target.value)}
                  />
                </div>
                <div className="field-group">
                  <label>Contact Number</label>
                  <input
                    className="pill-input"
                    type="text"
                    value={motherContact}
                    onChange={e => setMotherContact(e.target.value)}
                  />
                </div>
                <div className="field-group">
                  <label>Highest Education</label>
                  <select
                    className="pill-select"
                    value={motherEducation}
                    onChange={e => setMotherEducation(e.target.value)}
                  >
                    <option value="">- select Highest Education -</option>
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
                  <input
                    className="pill-input"
                    type="text"
                    value={motherOccupation}
                    onChange={e => setMotherOccupation(e.target.value)}
                  />
                </div>
                <div className="field-group">
                  <label>Employer</label>
                  <input
                    className="pill-input"
                    type="text"
                    value={motherEmployer}
                    onChange={e => setMotherEmployer(e.target.value)}
                  />
                </div>
                <div className="field-group">
                  <label>Employer Address</label>
                  <input
                    className="pill-input"
                    type="text"
                    value={motherEmployerAddress}
                    onChange={e => setMotherEmployerAddress(e.target.value)}
                  />
                </div>
                <div className="field-group">
                  <label>Income Bracket per month</label>
                  <select
                    className="pill-select"
                    value={motherIncome}
                    onChange={e => setMotherIncome(e.target.value)}
                  >
                    <option value="">- select salary -</option>
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
                  <input
                    className="pill-input"
                    type="text"
                    value={guardianName}
                    onChange={e => setGuardianName(e.target.value)}
                  />
                </div>
                <div className="field-group">
                  <label>Complete Address</label>
                  <input
                    className="pill-input"
                    type="text"
                    value={guardianAddress}
                    onChange={e => setGuardianAddress(e.target.value)}
                  />
                </div>
                <div className="field-group">
                  <label>Contact Number</label>
                  <input
                    className="pill-input"
                    type="text"
                    value={guardianContact}
                    onChange={e => setGuardianContact(e.target.value)}
                  />
                </div>
                <div className="field-group">
                  <label>Highest Education</label>
                  <select
                    className="pill-select"
                    value={guardianEducation}
                    onChange={e => setGuardianEducation(e.target.value)}
                  >
                    <option value="">- select Highest Education -</option>
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
                  <input
                    className="pill-input"
                    type="text"
                    value={guardianOccupation}
                    onChange={e => setGuardianOccupation(e.target.value)}
                  />
                </div>
                <div className="field-group">
                  <label>Employer</label>
                  <input
                    className="pill-input"
                    type="text"
                    value={guardianEmployer}
                    onChange={e => setGuardianEmployer(e.target.value)}
                  />
                </div>
                <div className="field-group">
                  <label>Employer Address</label>
                  <input
                    className="pill-input"
                    type="text"
                    value={guardianEmployerAddress}
                    onChange={e => setGuardianEmployerAddress(e.target.value)}
                  />
                </div>
                <div className="field-group">
                  <label>Relationship</label>
                  <input
                    className="pill-input"
                    type="text"
                    value={guardianRelationship}
                    onChange={e => setGuardianRelationship(e.target.value)}
                  />
                </div>
                <div className="field-group">
                  <label>Income Bracket per month</label>
                  <select
                    className="pill-select"
                    value={guardianIncome}
                    onChange={e => setGuardianIncome(e.target.value)}
                  >
                    <option value="">- select salary -</option>
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
                    <option value="">- select sibling -</option>
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
                    <option value="">Not more than 100k</option>
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
                  <input
                    className="pill-input"
                    type="text"
                    value={schoolLastAttended}
                    onChange={e => setSchoolLastAttended(e.target.value)}
                    placeholder="School name"
                  />
                </div>

                <div className="field-group">
                  <label>School Address</label>
                  <input
                    className="pill-input"
                    type="text"
                    value={schoolAddress}
                    onChange={e => setSchoolAddress(e.target.value)}
                    placeholder="School address"
                  />
                </div>

                <div className="field-group">
                  <label>Course / Program</label>
                  <input
                    className="pill-input"
                    type="text"
                    value={courseProgram}
                    onChange={e => setCourseProgram(e.target.value)}
                    placeholder="Course / Program"
                  />
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
                    />
                    <span>K–12</span>
                  </label>
                  <label className="radio-pill">
                    <input
                      type="radio"
                      name="curriculumCategory"
                      checked={curriculumCategory === 'old'}
                      onChange={() => setCurriculumCategory('old')}
                    />
                    <span>Old Curriculum</span>
                  </label>
                  <label className="radio-pill">
                    <input
                      type="radio"
                      name="curriculumCategory"
                      checked={curriculumCategory === 'college_bg'}
                      onChange={() => setCurriculumCategory('college_bg')}
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
                    <input
                      className="pill-input"
                      type="text"
                      value={basicCalculus}
                      onChange={e => setBasicCalculus(e.target.value)}
                    />
                  </div>
                  <div className="field-group">
                    <label>Pre-Calculus</label>
                    <input
                      className="pill-input"
                      type="text"
                      value={preCalculus}
                      onChange={e => setPreCalculus(e.target.value)}
                    />
                  </div>
                  <div className="field-group">
                    <label>General Math</label>
                    <input
                      className="pill-input"
                      type="text"
                      value={generalMath}
                      onChange={e => setGeneralMath(e.target.value)}
                    />
                  </div>
                  <div className="field-group">
                    <label>Probability &amp; Statistics</label>
                    <input
                      className="pill-input"
                      type="text"
                      value={probStat}
                      onChange={e => setProbStat(e.target.value)}
                    />
                  </div>
                  <div className="field-group">
                    <label>Solid Geometry</label>
                    <input
                      className="pill-input"
                      type="text"
                      value={solidGeometry}
                      onChange={e => setSolidGeometry(e.target.value)}
                    />
                  </div>
                </div>

                <div className="education-subject-column">
                  <h3 className="education-subject-heading">Science</h3>
                  <div className="field-group">
                    <label>Gen. Chemistry I</label>
                    <input
                      className="pill-input"
                      type="text"
                      value={genChem1}
                      onChange={e => setGenChem1(e.target.value)}
                    />
                  </div>
                  <div className="field-group">
                    <label>Gen. Chemistry II</label>
                    <input
                      className="pill-input"
                      type="text"
                      value={genChem2}
                      onChange={e => setGenChem2(e.target.value)}
                    />
                  </div>
                  <div className="field-group">
                    <label>Gen. Physics I</label>
                    <input
                      className="pill-input"
                      type="text"
                      value={genPhysics1}
                      onChange={e => setGenPhysics1(e.target.value)}
                    />
                  </div>
                  <div className="field-group">
                    <label>Biology</label>
                    <input
                      className="pill-input"
                      type="text"
                      value={biology}
                      onChange={e => setBiology(e.target.value)}
                    />
                  </div>
                </div>

                <div className="education-subject-column">
                  <h3 className="education-subject-heading">English</h3>
                  <div className="field-group">
                    <label>Reading and Writing</label>
                    <input
                      className="pill-input"
                      type="text"
                      value={readingWriting}
                      onChange={e => setReadingWriting(e.target.value)}
                    />
                  </div>
                  <div className="field-group">
                    <label>Oral Communication</label>
                    <input
                      className="pill-input"
                      type="text"
                      value={oralComm}
                      onChange={e => setOralComm(e.target.value)}
                    />
                  </div>
                  <div className="field-group">
                    <label>English for Analytics</label>
                    <input
                      className="pill-input"
                      type="text"
                      value={englishAnalytics}
                      onChange={e => setEnglishAnalytics(e.target.value)}
                    />
                  </div>
                  <div className="field-group">
                    <label>English Efficiency</label>
                    <input
                      className="pill-input"
                      type="text"
                      value={englishEfficiency}
                      onChange={e => setEnglishEfficiency(e.target.value)}
                    />
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
                  <input
                    className="pill-input"
                    type="text"
                    value={companyName}
                    onChange={e => setCompanyName(e.target.value)}
                  />
                </div>
                <div className="field-group">
                  <label>Position</label>
                  <input
                    className="pill-input"
                    type="text"
                    value={companyPosition}
                    onChange={e => setCompanyPosition(e.target.value)}
                  />
                </div>
                <div className="field-group">
                  <label>Inclusive Dates</label>
                  <input
                    className="pill-input"
                    type="text"
                    value={inclusiveDates}
                    onChange={e => setInclusiveDates(e.target.value)}
                    placeholder="e.g., 2022–2024"
                  />
                </div>
              </div>

              <div className="employment-grid employment-grid-middle">
                <div className="field-group">
                  <label>Duration (Years / Months)</label>
                  <input
                    className="pill-input"
                    type="text"
                    value={duration}
                    onChange={e => setDuration(e.target.value)}
                  />
                </div>
                <div className="field-group">
                  <label>Title Awards</label>
                  <input
                    className="pill-input"
                    type="text"
                    value={titleAwards}
                    onChange={e => setTitleAwards(e.target.value)}
                  />
                </div>
                <div className="field-group">
                  <label>Sponsor</label>
                  <input
                    className="pill-input"
                    type="text"
                    value={sponsor}
                    onChange={e => setSponsor(e.target.value)}
                  />
                </div>
                <div className="field-group">
                  <label>Date Awarded</label>
                  <input
                    className="pill-input"
                    type="text"
                    value={dateAwarded}
                    onChange={e => setDateAwarded(e.target.value)}
                    placeholder="MM / DD / YYYY"
                  />
                </div>
              </div>

              <div className="employment-grid employment-grid-bottom">
                <div className="field-group">
                  <label>Name</label>
                  <input
                    className="pill-input"
                    type="text"
                    value={refName}
                    onChange={e => setRefName(e.target.value)}
                  />
                </div>
                <div className="field-group">
                  <label>Position</label>
                  <input
                    className="pill-input"
                    type="text"
                    value={refPosition}
                    onChange={e => setRefPosition(e.target.value)}
                  />
                </div>
                <div className="field-group">
                  <label>Company</label>
                  <input
                    className="pill-input"
                    type="text"
                    value={refCompany}
                    onChange={e => setRefCompany(e.target.value)}
                  />
                </div>
                <div className="field-group">
                  <label>City</label>
                  <input
                    className="pill-input"
                    type="text"
                    value={refCity}
                    onChange={e => setRefCity(e.target.value)}
                  />
                </div>
                <div className="field-group">
                  <label>Contact Number</label>
                  <input
                    className="pill-input"
                    type="text"
                    value={refContact}
                    onChange={e => setRefContact(e.target.value)}
                  />
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
