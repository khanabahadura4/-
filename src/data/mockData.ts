import { UserProfile, Post, JobCircular, Company, University, Message, NotificationItem, AdminPendingItem } from '../types';

export const PRELOADED_UNIVERSITIES: University[] = [
  { id: 'u1', name: 'Bangladesh University of Textiles (BUTEX)', shortName: 'BUTEX', type: 'public_university', logo: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=150&h=150&fit=crop', coverImage: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1000&h=300&fit=crop', about: 'The premier public textile engineering university in Bangladesh located in Tejgaon, Dhaka.', location: 'Tejgaon, Dhaka', studentCount: 3500, alumniCount: 18000, website: 'https://butex.edu.bd', isApproved: true },
  { id: 'u2', name: 'BGMEA University of Fashion & Technology (BUFT)', shortName: 'BUFT', type: 'private_university', logo: 'https://images.unsplash.com/photo-1562774053-701939374585?w=150&h=150&fit=crop', coverImage: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1000&h=300&fit=crop', about: 'Leading specialized private university in Bangladesh for fashion, apparel & textile engineering.', location: 'Uttara, Dhaka', studentCount: 6200, alumniCount: 14000, website: 'https://buft.edu.bd', isApproved: true },
  { id: 'u3', name: 'Primeasia University (Textile Dept)', shortName: 'PAU', type: 'private_university', logo: 'https://images.unsplash.com/photo-1592280771190-3e2e4d571952?w=150&h=150&fit=crop', coverImage: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=1000&h=300&fit=crop', about: 'Renowned department of textile engineering located in Banani, Dhaka.', location: 'Banani, Dhaka', studentCount: 2800, alumniCount: 9500, website: 'https://primeasia.edu.bd', isApproved: true },
  { id: 'u4', name: 'Ahsanullah University of Science & Technology (AUST)', shortName: 'AUST', type: 'private_university', logo: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=150&h=150&fit=crop', coverImage: 'https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?w=1000&h=300&fit=crop', about: 'Top-tier engineering university offering specialized BSc in Textile Engineering.', location: 'Tejgaon, Dhaka', studentCount: 4200, alumniCount: 11000, website: 'https://aust.edu', isApproved: true },
  { id: 'u5', name: 'Khulna University of Engineering & Technology (KUET - Textile)', shortName: 'KUET', type: 'public_university', logo: 'https://images.unsplash.com/photo-1562774053-701939374585?w=150&h=150&fit=crop', coverImage: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1000&h=300&fit=crop', about: 'Department of Textile Engineering at KUET.', location: 'Khulna', studentCount: 800, alumniCount: 2500, website: 'https://kuet.ac.bd', isApproved: true },
  { id: 'u6', name: 'Rajshahi University of Engineering & Technology (RUET - Textile)', shortName: 'RUET', type: 'public_university', logo: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=150&h=150&fit=crop', coverImage: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=1000&h=300&fit=crop', about: 'Department of Textile Engineering at RUET.', location: 'Rajshahi', studentCount: 750, alumniCount: 2100, website: 'https://ruet.ac.bd', isApproved: true },
  { id: 'u7', name: 'Chittagong University of Engineering & Technology (CUET - Textile)', shortName: 'CUET', type: 'public_university', logo: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=150&h=150&fit=crop', coverImage: 'https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?w=1000&h=300&fit=crop', about: 'Department of Textile Engineering at CUET.', location: 'Chattogram', studentCount: 700, alumniCount: 1900, website: 'https://cuet.ac.bd', isApproved: true },
  { id: 'u8', name: 'Green University of Bangladesh (GUB Textile)', shortName: 'GUB', type: 'private_university', logo: 'https://images.unsplash.com/photo-1592280771190-3e2e4d571952?w=150&h=150&fit=crop', coverImage: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1000&h=300&fit=crop', about: 'Department of Textile Engineering at Green University.', location: 'Purbachal, Dhaka', studentCount: 2100, alumniCount: 5000, website: 'https://green.edu.bd', isApproved: true },
  { id: 'u9', name: 'Southeast University (SEU Textile)', shortName: 'SEU', type: 'private_university', logo: 'https://images.unsplash.com/photo-1562774053-701939374585?w=150&h=150&fit=crop', coverImage: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=1000&h=300&fit=crop', about: 'Department of Textile Engineering at Southeast University.', location: 'Tejgaon, Dhaka', studentCount: 2600, alumniCount: 7200, website: 'https://seu.edu.bd', isApproved: true },

  // Government Textile Engineering Colleges & Institutes
  { id: 'u10', name: 'Textile Engineering College, Dinajpur', shortName: 'TEC Dinajpur', type: 'govt_textile_institute', logo: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=150&h=150&fit=crop', coverImage: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1000&h=300&fit=crop', about: 'Government Textile Engineering College in Dinajpur affiliated with BUTEX.', location: 'Dinajpur', studentCount: 1200, alumniCount: 4500, website: 'https://tecd.gov.bd', isApproved: true },
  { id: 'u11', name: 'Textile Engineering College, Tangail', shortName: 'TEC Tangail', type: 'govt_textile_institute', logo: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=150&h=150&fit=crop', coverImage: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1000&h=300&fit=crop', about: 'Government Textile Engineering College in Tangail (BGCTEC).', location: 'Tangail', studentCount: 1100, alumniCount: 4200, website: 'https://tect.gov.bd', isApproved: true },
  { id: 'u12', name: 'Textile Engineering College, Noakhali', shortName: 'TEC Noakhali', type: 'govt_textile_institute', logo: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=150&h=150&fit=crop', coverImage: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1000&h=300&fit=crop', about: 'Government Textile Engineering College in Noakhali.', location: 'Noakhali', studentCount: 1000, alumniCount: 3800, website: 'https://tecn.gov.bd', isApproved: true },
  { id: 'u13', name: 'Textile Engineering College, Pabna', shortName: 'TEC Pabna', type: 'govt_textile_institute', logo: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=150&h=150&fit=crop', coverImage: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1000&h=300&fit=crop', about: 'Pabna Textile Engineering College affiliated with BUTEX.', location: 'Pabna', studentCount: 1250, alumniCount: 4900, website: 'https://ptec.gov.bd', isApproved: true },
  { id: 'u14', name: 'Textile Engineering College, Chattogram', shortName: 'TEC Chattogram', type: 'govt_textile_institute', logo: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=150&h=150&fit=crop', coverImage: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1000&h=300&fit=crop', about: 'Government Textile Engineering College in Zorarganj, Chattogram.', location: 'Chattogram', studentCount: 1150, alumniCount: 4300, website: 'https://ctec.gov.bd', isApproved: true },
  { id: 'u15', name: 'Textile Engineering College, Barishal', shortName: 'TEC Barishal', type: 'govt_textile_institute', logo: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=150&h=150&fit=crop', coverImage: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1000&h=300&fit=crop', about: 'Government Textile Engineering College in Barishal.', location: 'Barishal', studentCount: 950, alumniCount: 3100, website: 'https://btec.gov.bd', isApproved: true },
  { id: 'u16', name: 'Textile Engineering College, Rangpur', shortName: 'TEC Rangpur', type: 'govt_textile_institute', logo: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=150&h=150&fit=crop', coverImage: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1000&h=300&fit=crop', about: 'Government Textile Engineering College in Rangpur.', location: 'Rangpur', studentCount: 900, alumniCount: 2900, website: 'https://rtec.gov.bd', isApproved: true },
  { id: 'u17', name: 'Textile Institute Khulna', shortName: 'TI Khulna', type: 'govt_textile_institute', logo: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=150&h=150&fit=crop', coverImage: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1000&h=300&fit=crop', about: 'Government Textile Institute offering Diploma in Textile Engineering in Khulna.', location: 'Khulna', studentCount: 1400, alumniCount: 6500, website: 'https://tik.gov.bd', isApproved: true },
  { id: 'u18', name: 'Textile Institute Jessore', shortName: 'TI Jessore', type: 'govt_textile_institute', logo: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=150&h=150&fit=crop', coverImage: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1000&h=300&fit=crop', about: 'Government Textile Institute offering Diploma in Textile Engineering in Jessore.', location: 'Jessore', studentCount: 1300, alumniCount: 5800, website: 'https://tij.gov.bd', isApproved: true },
];

export const PRELOADED_FACTORIES = [
  { id: 'f1', name: 'DBL Group', category: 'Composite Textile & Garments', logo: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=150&h=150&fit=crop', coverImage: 'https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?w=1000&h=300&fit=crop', about: 'A diversified conglomerate and one of Bangladesh largest vertically integrated textile & apparel manufacturers.', locations: ['Kashimpur, Gazipur', 'Mymensingh', 'Narayanganj'], website: 'https://dbl-group.com', hrContact: 'hr@dbl-group.com', employeeCount: 42000, followersCount: 38000, isApproved: true },
  { id: 'f2', name: 'Babylon Group', category: 'Garments, Trims & Washing', logo: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=150&h=150&fit=crop', coverImage: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=1000&h=300&fit=crop', about: 'Pioneer garment manufacturer with dedicated Aboni Textile, Babylon Trims, and Babylon Washing units.', locations: ['Mirpur, Dhaka', 'Hemayetpur, Savar'], website: 'https://babylon-bd.com', hrContact: 'careers@babylon-bd.com', employeeCount: 18000, followersCount: 22000, isApproved: true },
  { id: 'f3', name: 'Aboni Textile Ltd. (Babylon Group)', category: 'Dyeing & Finishing', logo: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=150&h=150&fit=crop', coverImage: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=1000&h=300&fit=crop', about: 'Advanced fabric dyeing and processing unit under Babylon Group.', locations: ['Savar, Dhaka'], website: 'https://babylon-bd.com/aboni', hrContact: 'hr.aboni@babylon-bd.com', employeeCount: 3500, followersCount: 8900, isApproved: true },
  { id: 'f4', name: 'Beximco Textile & Apparel Zone', category: 'Composite Textile, Denim & Garments', logo: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=150&h=150&fit=crop', coverImage: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?w=1000&h=300&fit=crop', about: 'State-of-the-art Beximco Industrial Park in Sarabo, Kashimpur spanning over 300 acres.', locations: ['Kashimpur, Gazipur'], website: 'https://beximco.com', hrContact: 'hr@beximcotex.com', employeeCount: 35000, followersCount: 45000, isApproved: true },
  { id: 'f5', name: 'Envoy Textiles Ltd.', category: 'Denim Manufacturing', logo: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=150&h=150&fit=crop', coverImage: 'https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?w=1000&h=300&fit=crop', about: 'World-first LEED Platinum-certified denim mill in Bangladesh.', locations: ['Bhaluka, Mymensingh'], website: 'https://envoytextiles.com', hrContact: 'hr@envoytextiles.com', employeeCount: 8500, followersCount: 19500, isApproved: true },
  { id: 'f6', name: 'Epyllion Group', category: 'Knit Composite & Garments', logo: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=150&h=150&fit=crop', coverImage: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=1000&h=300&fit=crop', about: 'Leading knit composite manufacturer known for sustainable manufacturing and innovation.', locations: ['Narayanganj', 'Gazipur'], website: 'https://epylliongroup.com', hrContact: 'career@epylliongroup.com', employeeCount: 24000, followersCount: 31000, isApproved: true },
  { id: 'f7', name: 'Square Textile Ltd.', category: 'Spinning & Yarn', logo: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=150&h=150&fit=crop', coverImage: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?w=1000&h=300&fit=crop', about: 'Top-quality yarn spinning unit of Square Group producing specialized cotton and synthetic yarns.', locations: ['Sreepur, Gazipur', 'Habiganj'], website: 'https://squaretextile.com', hrContact: 'hr@squaretextile.com', employeeCount: 12000, followersCount: 27000, isApproved: true },
  { id: 'f8', name: 'Pacific Jeans Group', category: 'Premium Denim Manufacturing', logo: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=150&h=150&fit=crop', coverImage: 'https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?w=1000&h=300&fit=crop', about: 'World renowned denim design & manufacturing hub based in CEPZ Chattogram.', locations: ['CEPZ, Chattogram'], website: 'https://pacificjeans.com', hrContact: 'hr@pacificjeans.com', employeeCount: 31000, followersCount: 29000, isApproved: true },
  { id: 'f9', name: 'Ha-Meem Group', category: 'Composite Garments & Washing', logo: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=150&h=150&fit=crop', coverImage: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=1000&h=300&fit=crop', about: 'One of Bangladesh largest woven garments exporters catering to US & European fashion giants.', locations: ['Tongi, Gazipur', 'Tejgaon, Dhaka'], website: 'https://hameemgroup.com', hrContact: 'hr@hameemgroup.com', employeeCount: 50000, followersCount: 39000, isApproved: true },
  { id: 'f10', name: 'Viyellatex Group', category: 'Knit & Garments Composite', logo: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=150&h=150&fit=crop', coverImage: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?w=1000&h=300&fit=crop', about: 'Eco-friendly LEED certified garment producer focused on premium quality apparel.', locations: ['Tongi, Gazipur'], website: 'https://viyellatex.com', hrContact: 'careers@viyellatex.com', employeeCount: 16000, followersCount: 25000, isApproved: true },
  { id: 'f11', name: 'Fakir Group (Fakir Apparels)', category: 'Knit Composite', logo: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=150&h=150&fit=crop', coverImage: 'https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?w=1000&h=300&fit=crop', about: 'Massive knit composite complex located in Fatullah, Narayanganj.', locations: ['Fatullah, Narayanganj'], website: 'https://fakirgroup.com', hrContact: 'hr@fakirgroup.com', employeeCount: 22000, followersCount: 18000, isApproved: true },
  { id: 'f12', name: 'Masco Group', category: 'Knit, Dyeing & Garments', logo: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=150&h=150&fit=crop', coverImage: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=1000&h=300&fit=crop', about: 'Integrated manufacturer of knit fabrics and custom apparel.', locations: ['Tongi, Gazipur'], website: 'https://mascogroup.com', hrContact: 'hr@mascogroup.com', employeeCount: 15000, followersCount: 14000, isApproved: true }
];

export const MOCK_UNIVERSITIES_FULL: University[] = PRELOADED_UNIVERSITIES;
export const MOCK_COMPANIES_FULL: Company[] = PRELOADED_FACTORIES;

export const PRELOADED_DEPARTMENTS = [
  'Testing Laboratory',
  'Dyeing',
  'Knitting',
  'Weaving',
  'Finishing',
  'Garments',
  'Merchandising',
  'Production',
  'Quality Assurance',
  'Quality Control',
  'Industrial Engineering',
  'Compliance',
  'Planning',
  'Commercial',
  'Supply Chain',
  'HR',
  'Maintenance',
  'Research & Development',
  'Fabric Development',
  'Sample Development',
  'Accounts',
  'Administration',
  'Marketing'
];

export const PRELOADED_DESIGNATIONS = [
  'Intern',
  'Trainee',
  'Lab Assistant',
  'Lab Technician',
  'Executive',
  'Senior Executive',
  'Officer',
  'Senior Officer',
  'Assistant Manager',
  'Deputy Manager',
  'Manager',
  'Senior Manager',
  'AGM',
  'DGM',
  'GM',
  'Head of Department',
  'Director',
  'Vice President',
  'President'
];

export const MOCK_USERS: UserProfile[] = [
  {
    id: 'usr-1',
    firstName: 'Tanvir',
    lastName: 'Hossain',
    headline: 'Senior Merchandiser at DBL Group | BUTEX Batch 38 | Fabric Development Specialist',
    role: 'professional',
    profilePhoto: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&h=300&fit=crop',
    coverPhoto: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=1000&h=300&fit=crop',
    mobile: '+8801711223344',
    mobileVerified: true,
    email: 'tanvir.butex@dbl-group.com',
    emailVerified: true,
    dob: '1995-04-12',
    gender: 'male',
    bloodGroup: 'B+',
    nationality: 'Bangladeshi',
    currentAddress: 'Sector 11, Uttara, Dhaka',
    permanentAddress: 'Kishoreganj Sadar, Kishoreganj',
    district: 'Dhaka',
    about: 'Dynamic Textile Engineer with 7+ years of experience in knit merchandising, fabric development, and buyer management for European apparel brands at DBL Group. BUTEX Batch 38 alumnus.',
    educations: [
      {
        id: 'edu-1',
        institutionName: 'Bangladesh University of Textiles (BUTEX)',
        institutionType: 'public_university',
        degree: 'B.Sc. in Textile Engineering',
        department: 'Yarn & Fabric Engineering',
        batch: '38',
        startYear: '2013',
        endYear: '2017',
        current: false,
        isApproved: true
      }
    ],
    experiences: [
      {
        id: 'exp-1',
        factoryName: 'DBL Group',
        companyGroup: 'DBL Group',
        department: 'Merchandising',
        designation: 'Senior Executive',
        employmentType: 'full_time',
        location: 'Kashimpur, Gazipur',
        startDate: '2020-01-10',
        currentWorkplace: true,
        isApproved: true
      },
      {
        id: 'exp-2',
        factoryName: 'Babylon Group',
        companyGroup: 'Babylon Group',
        department: 'Merchandising',
        designation: 'Executive',
        employmentType: 'full_time',
        location: 'Mirpur, Dhaka',
        startDate: '2017-06-01',
        endDate: '2019-12-30',
        currentWorkplace: false,
        isPreviousWorkplace: true,
        isApproved: true
      }
    ],
    skills: ['Fabric Analysis', 'FastReact ERP', 'Knit Dyeing Costing', 'AATCC Testing', 'Buyer Handling', 'GOTS Compliance'],
    certificates: [
      { title: 'Certified Textile Costing Professional', issuer: 'BUTEX Continuing Education', year: '2021' },
      { title: 'LEED Green Manufacturing Associate', issuer: 'USGBC', year: '2022' }
    ],
    awards: [
      { title: 'Best Merchandiser of the Year', year: '2023', description: 'Awarded by DBL Group for achieving 99.4% on-time shipment rating.' }
    ],
    resumeUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    resumeName: 'Tanvir_Hossain_Textile_CV.pdf',
    portfolioUrl: 'https://linkedin.com/in/tanvir-textile-bd',
    contactEmail: 'tanvir.butex@dbl-group.com',
    contactPhone: '+8801711223344',
    followersCount: 1420,
    connectionsCount: 890,
    connectionStatus: 'connected',
    availableForJob: false,
    totalExperienceYears: 7
  },
  {
    id: 'usr-2',
    firstName: 'Nusrat',
    lastName: 'Jahan',
    headline: 'Assistant QA Manager at Babylon Group | Lab Testing & ISO 17025 Expert',
    role: 'professional',
    profilePhoto: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&h=300&fit=crop',
    coverPhoto: 'https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?w=1000&h=300&fit=crop',
    mobile: '+8801812345678',
    mobileVerified: true,
    email: 'nusrat.qa@babylon-bd.com',
    emailVerified: true,
    dob: '1996-09-20',
    gender: 'female',
    bloodGroup: 'O+',
    nationality: 'Bangladeshi',
    currentAddress: 'Mirpur DOHS, Dhaka',
    permanentAddress: 'Cumilla Sadar, Cumilla',
    district: 'Dhaka',
    about: 'Quality Assurance & Testing Laboratory professional with deep knowledge of ISO 17025 lab accreditation, color fastness, tear strength, and OEKO-TEX Standard 100 compliance.',
    educations: [
      {
        id: 'edu-2',
        institutionName: 'Primeasia University (Textile Dept)',
        institutionType: 'private_university',
        degree: 'B.Sc. in Textile Engineering',
        department: 'Wet Processing Engineering',
        batch: '34',
        startYear: '2014',
        endYear: '2018',
        current: false,
        isApproved: true
      }
    ],
    experiences: [
      {
        id: 'exp-3',
        factoryName: 'Babylon Group',
        companyGroup: 'Babylon Group',
        department: 'Testing Laboratory',
        designation: 'Senior Officer',
        employmentType: 'full_time',
        location: 'Mirpur, Dhaka',
        startDate: '2019-02-15',
        currentWorkplace: true,
        isApproved: true
      }
    ],
    skills: ['Testing Laboratory', 'ISO 17025', 'Spectrophotometer Datacolor', 'Color Fastness', 'Chemical Safety', 'AQL Inspection'],
    certificates: [
      { title: 'ISO 17025 Lead Auditor', issuer: 'SGS Bangladesh', year: '2022' }
    ],
    awards: [],
    resumeUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    resumeName: 'Nusrat_Jahan_QA_Resume.pdf',
    contactEmail: 'nusrat.qa@babylon-bd.com',
    followersCount: 890,
    connectionsCount: 450,
    connectionStatus: 'none',
    availableForJob: true,
    totalExperienceYears: 6
  },
  {
    id: 'usr-3',
    firstName: 'Rafiqul',
    lastName: 'Islam',
    headline: 'Textile Engineering Student at BUFT (Batch 211) | Aspiring Garments IE & Automation Specialist',
    role: 'student',
    profilePhoto: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop',
    coverPhoto: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1000&h=300&fit=crop',
    mobile: '+8801911998877',
    mobileVerified: true,
    email: 'rafiq.buft211@gmail.com',
    emailVerified: true,
    dob: '2001-11-05',
    gender: 'male',
    bloodGroup: 'A+',
    nationality: 'Bangladeshi',
    currentAddress: 'Uttara Model Town, Dhaka',
    permanentAddress: 'Tangail Sadar, Tangail',
    district: 'Dhaka',
    about: 'Final-year B.Sc. student in Apparel Engineering at BGMEA University of Fashion & Technology (BUFT). Seeking graduate internship in Industrial Engineering or Supply Chain.',
    educations: [
      {
        id: 'edu-3',
        institutionName: 'BGMEA University of Fashion & Technology (BUFT)',
        institutionType: 'private_university',
        degree: 'B.Sc. in Apparel Manufacturing & Technology',
        department: 'Garments Engineering',
        batch: '211',
        startYear: '2022',
        endYear: '2026',
        current: true,
        isApproved: true
      }
    ],
    experiences: [],
    skills: ['Industrial Engineering', 'SMV Calculation', 'Line Balancing', 'AutoCAD Textile', 'Garments Production'],
    certificates: [],
    awards: [{ title: 'Runner up - National Textile Innovation Challenge 2024', year: '2024', description: 'Developed bio-degradable eco-print thickener.' }],
    followersCount: 310,
    connectionsCount: 180,
    connectionStatus: 'none',
    availableForJob: true,
    totalExperienceYears: 0
  },
  {
    id: 'usr-4',
    firstName: 'Sharmeen',
    lastName: 'Akter',
    headline: 'Senior HR Manager at Viyellatex Group | Textile Recruitment & Compliance Leader',
    role: 'hr',
    profilePhoto: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=300&h=300&fit=crop',
    coverPhoto: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?w=1000&h=300&fit=crop',
    mobile: '+8801555443322',
    mobileVerified: true,
    email: 'sharmeen.hr@viyellatex.com',
    emailVerified: true,
    dob: '1988-03-14',
    gender: 'female',
    bloodGroup: 'AB+',
    nationality: 'Bangladeshi',
    currentAddress: 'Gulshan 2, Dhaka',
    permanentAddress: 'Barishal Sadar, Barishal',
    district: 'Dhaka',
    about: '12+ years in HR strategy, executive search, labor law compliance, and campus recruitment for top Bangladeshi RMG groups. Hiring top textile engineers, merchandisers, and lab chemists.',
    educations: [
      {
        id: 'edu-4',
        institutionName: 'Dhaka University (Textile Related Departments)',
        institutionType: 'public_university',
        degree: 'MBA in Human Resource Management',
        department: 'Administration',
        startYear: '2008',
        endYear: '2012',
        current: false,
        isApproved: true
      }
    ],
    experiences: [
      {
        id: 'exp-4',
        factoryName: 'Viyellatex Group',
        companyGroup: 'Viyellatex Group',
        department: 'HR',
        designation: 'Senior Manager',
        employmentType: 'full_time',
        location: 'Tongi, Gazipur',
        startDate: '2018-05-01',
        currentWorkplace: true,
        isApproved: true
      }
    ],
    skills: ['Talent Acquisition', 'RMG Labor Law', 'BSCI Compliance', 'HR Audit', 'Payroll Management'],
    certificates: [],
    awards: [],
    followersCount: 3890,
    connectionsCount: 2400,
    connectionStatus: 'none',
    availableForJob: false,
    totalExperienceYears: 12
  },
  {
    id: 'usr-admin',
    firstName: 'Admin',
    lastName: 'System',
    headline: 'Textile Connect BD Platform Moderator & Verification Officer',
    role: 'admin',
    profilePhoto: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop',
    coverPhoto: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=1000&h=300&fit=crop',
    mobile: '+8801700000000',
    mobileVerified: true,
    email: 'admin@textileconnectbd.com',
    emailVerified: true,
    dob: '1990-01-01',
    gender: 'male',
    nationality: 'Bangladeshi',
    currentAddress: 'Dhaka',
    permanentAddress: 'Dhaka',
    district: 'Dhaka',
    about: 'Official system administrator and database content reviewer for Textile Connect BD.',
    educations: [],
    experiences: [],
    skills: ['Platform Moderation', 'Database Administration'],
    certificates: [],
    awards: [],
    followersCount: 10000,
    connectionsCount: 5000,
    connectionStatus: 'none',
    availableForJob: false,
    totalExperienceYears: 10
  }
];

export const MOCK_POSTS: Post[] = [
  {
    id: 'post-1',
    authorId: 'usr-1',
    authorName: 'Tanvir Hossain',
    authorTitle: 'Senior Merchandiser at DBL Group',
    authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&h=300&fit=crop',
    authorUniversity: 'Bangladesh University of Textiles (BUTEX)',
    authorBatch: '38',
    authorFactory: 'DBL Group',
    authorDepartment: 'Merchandising',
    content: 'Proud to announce that our team at DBL Group successfully developed a new batch of 100% Organic Cotton slub knit fabric with ZERO shade variation across 5,000 kg dyeing batch! A big shoutout to our Dyeing & QC team at Kashimpur unit for this benchmark accomplishment. 🧵🇧🇩 #TextileEngineering #DBLGroup #BUTEX #RMG #MadeInBangladesh',
    images: ['https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800&h=500&fit=crop'],
    privacy: 'public',
    likes: [
      { od: 'l1', userId: 'usr-2', userName: 'Nusrat Jahan', type: 'celebrate' },
      { od: 'l2', userId: 'usr-3', userName: 'Rafiqul Islam', type: 'like' }
    ],
    commentsCount: 14,
    sharesCount: 8,
    createdAt: '2 hours ago',
    savedBy: []
  },
  {
    id: 'post-2',
    authorId: 'usr-2',
    authorName: 'Nusrat Jahan',
    authorTitle: 'Assistant QA Manager at Babylon Group',
    authorAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&h=300&fit=crop',
    authorUniversity: 'Primeasia University (Textile Dept)',
    authorFactory: 'Babylon Group',
    authorDepartment: 'Testing Laboratory',
    content: 'Attention Testing Lab Professionals! What is your standard procedure when performing Color Fastness to Washing (ISO 105-C06) on elastane blended knits? Are you noticing staining on nylon multifiber strips above 40°C?',
    poll: {
      question: 'Primary issue in Color Fastness ISO 105-C06 testing:',
      options: [
        { id: 'opt-1', text: 'Staining on Nylon multifiber strip', votes: ['usr-1', 'usr-2'] },
        { id: 'opt-2', text: 'Color change in dark reactive shades', votes: ['usr-3'] },
        { id: 'opt-3', text: 'Elastane degradation at high temp', votes: [] },
        { id: 'opt-4', text: 'pH variation in wash liquor', votes: [] }
      ]
    },
    privacy: 'same_department',
    targetFilterValue: 'Testing Laboratory',
    likes: [
      { od: 'l3', userId: 'usr-1', userName: 'Tanvir Hossain', type: 'like' }
    ],
    commentsCount: 6,
    sharesCount: 2,
    createdAt: '5 hours ago',
    savedBy: ['usr-1']
  },
  {
    id: 'post-3',
    authorId: 'usr-1',
    authorName: 'Tanvir Hossain',
    authorTitle: 'Senior Merchandiser at DBL Group',
    authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&h=300&fit=crop',
    authorUniversity: 'Bangladesh University of Textiles (BUTEX)',
    authorBatch: '38',
    content: 'Calling all BUTEX Batch 38 mates! We are organizing a mini reunion at Tejgaon Campus next Friday after Juma. Let us catch up on industry updates and alumni initiatives.',
    privacy: 'same_university',
    targetFilterValue: 'Bangladesh University of Textiles (BUTEX)',
    likes: [{ od: 'l4', userId: 'usr-1', userName: 'Tanvir Hossain', type: 'love' }],
    commentsCount: 19,
    sharesCount: 5,
    createdAt: '1 day ago'
  }
];

export const MOCK_JOBS: JobCircular[] = [
  {
    id: 'job-1',
    title: 'Senior Merchandiser (Knitwear)',
    companyName: 'DBL Group',
    companyLogo: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=150&h=150&fit=crop',
    location: 'Kashimpur, Gazipur',
    department: 'Merchandising',
    experienceRequired: '5 - 8 Years',
    salaryRange: 'BDT 80,000 - 110,000 / month',
    jobType: 'Full-time',
    description: 'Looking for a seasoned Senior Merchandiser to manage key European buyers (H&M, PUMA, G-Star). Must have strong fabric sourcing, yarn costing, and FastReact ERP skills.',
    requirements: [
      'B.Sc in Textile Engineering from BUTEX / BUFT / AUST or recognized institute',
      'Minimum 5 years experience in knitwear merchandising',
      'Proficiency in yarn & fabric costing, consumption calculations',
      'Excellent command over written and spoken English'
    ],
    deadline: '2026-08-25',
    postedBy: 'usr-4',
    createdAt: '3 days ago',
    applicantsCount: 42
  },
  {
    id: 'job-2',
    title: 'Assistant Quality Assurance Manager',
    companyName: 'Babylon Group',
    companyLogo: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=150&h=150&fit=crop',
    location: 'Mirpur, Dhaka',
    department: 'Quality Assurance',
    experienceRequired: '4 - 6 Years',
    salaryRange: 'BDT 65,000 - 85,000 / month',
    jobType: 'Full-time',
    description: 'Responsible for leading physical & chemical testing lab, ISO 17025 compliance, and AQL 1.5 final inspections for export garments.',
    requirements: [
      'B.Sc in Textile / Wet Processing Engineering',
      'Hands-on experience with spectrophotometer, color fastness, and AATCC standards',
      'Strong leadership skills'
    ],
    deadline: '2026-08-30',
    postedBy: 'usr-4',
    createdAt: '1 day ago',
    applicantsCount: 28
  },
  {
    id: 'job-3',
    title: 'Industrial Engineering Intern (IE)',
    companyName: 'Viyellatex Group',
    companyLogo: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=150&h=150&fit=crop',
    location: 'Tongi, Gazipur',
    department: 'Industrial Engineering',
    experienceRequired: 'Fresh Graduate / Student',
    salaryRange: 'BDT 18,000 - 22,000 / month',
    jobType: 'Internship',
    description: 'Great learning opportunity for fresh textile engineering graduates or final year students in Line Balancing, SMV calculation, and Lean Manufacturing.',
    requirements: [
      'Final year student or recent graduate in Textile / Garments Engineering',
      'Basic knowledge of GSD (General Sewing Data) and time study',
      'Analytical mindset and team player'
    ],
    deadline: '2026-09-05',
    postedBy: 'usr-4',
    createdAt: 'Just now',
    applicantsCount: 15
  }
];

export const MOCK_MESSAGES: Message[] = [
  {
    id: 'msg-1',
    senderId: 'usr-1',
    receiverId: 'usr-2',
    text: 'Salam Nusrat, hope you are well. Are you free to review the new shade continuity test results for Babylon order #402?',
    seen: true,
    createdAt: 'Yesterday 10:30 AM'
  },
  {
    id: 'msg-2',
    senderId: 'usr-2',
    receiverId: 'usr-1',
    text: 'Walaikum Assalam Tanvir bhai! Yes, I tested the batch under D65 light source. Delta E is 0.42 which is well within 0.8 tolerance limit.',
    seen: true,
    createdAt: 'Yesterday 10:35 AM'
  }
];

export const MOCK_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif-1',
    userId: 'usr-1',
    senderId: 'usr-2',
    senderName: 'Nusrat Jahan',
    senderAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&h=300&fit=crop',
    type: 'comment',
    content: 'commented on your post about 100% Organic Cotton slub knit fabric dyeing.',
    read: false,
    createdAt: '1 hour ago'
  },
  {
    id: 'notif-2',
    userId: 'usr-1',
    senderId: 'usr-3',
    senderName: 'Rafiqul Islam',
    senderAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop',
    type: 'connection_request',
    content: 'sent you a connection request.',
    read: false,
    createdAt: '3 hours ago'
  }
];

export const MOCK_ADMIN_PENDING: AdminPendingItem[] = [
  {
    id: 'pnd-1',
    type: 'factory',
    name: 'Smart Textile & Spinning Mills Ltd',
    submittedBy: 'usr-3',
    submittedAt: '2026-07-28',
    status: 'pending',
    details: 'Spinning Mill located in Mawna, Gazipur.'
  },
  {
    id: 'pnd-2',
    type: 'university',
    name: 'Textile Institute Bogura',
    submittedBy: 'usr-2',
    submittedAt: '2026-07-29',
    status: 'pending',
    details: 'Government Textile Institute in Bogura offering Diploma in Textile Engineering.'
  }
];
