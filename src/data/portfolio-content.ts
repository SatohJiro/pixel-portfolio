import {
  AwardItem,
  ContactInfo,
  EducationItem,
  ProjectItem,
  StrengthCategory,
  SummaryInfo,
  WorkExperience,
} from "@/types";

export const contactData: ContactInfo = {
  phone: "(+84) 98 970 2459",
  email: "trananhq2345@gmail.com",
  linkedin: "https://www.linkedin.com/in/satohjiro/",
  github: "https://github.com/SatohJiro",
  portfolio: "https://satohjiro.github.io/",
  location: {
    en: "Ho Chi Minh City, Vietnam",
    vi: "TP. Hồ Chí Minh, Việt Nam",
  },
};

export const summaryData: SummaryInfo = {
  en: [
    "Software Engineer holding a Bachelor of Engineering Degree in Information Technology from Nong Lam University, graduating with an Excellent rating (GPA 3.6/4.0) as the Class Valedictorian.",
    "Over 3 years of professional engineering experience in frontend and web application development. Proficient in ReactJS, Next.js, Vue.js, TypeScript, state management (Redux, Zustand), with practical project experience in micro-frontend architecture (ahamo NTT Docomo), backend APIs (Java Spring Boot, Python FastAPI), and AI integration (GPT-4).",
  ],
  vi: [
    "Kỹ sư Công nghệ Thông tin tốt nghiệp loại Xuất sắc (GPA 3.6/4.0) và đạt danh hiệu Thủ khoa tốt nghiệp toàn khóa 2019 tại Trường Đại học Nông Lâm TP.HCM.",
    "Hơn 3 năm kinh nghiệm thực tế phát triển giao diện và ứng dụng Web. Thế mạnh về ReactJS, Next.js, Vue.js, TypeScript, quản lý State (Redux, Zustand), cùng kinh nghiệm làm việc thực tế với kiến trúc Micro-frontend (dự án ahamo NTT Docomo), Backend APIs (Java Spring Boot, Python FastAPI) và ứng dụng AI (GPT-4).",
  ],
};

export const statsData = {
  yearsExperience: "3+",
  gpa: "3.6/4.0",
  valedictorianRank: "#1 Top",
  awardsCount: "3",
  performanceGain: "+30%",
};

export const skillsData: StrengthCategory[] = [
  {
    id: "frontend",
    label: {
      en: "Frontend & Core Web (Core Strength)",
      vi: "Frontend & Web Nòng Cốt (Thế Mạnh)",
    },
    description: {
      en: "Primary expertise in building modern, modular, and responsive web interfaces",
      vi: "Chuyên sâu xây dựng giao diện web hiện đại, module hóa và tối ưu hiển thị",
    },
    skills: [
      {
        name: "ReactJS",
        category: "frontend",
        highlight: true,
        tag: { en: "Core", vi: "Chính" },
        description: {
          en: "Custom hooks, component lifecycle, virtual DOM optimization, clean architecture",
          vi: "Hook nâng cao, tối ưu render, cấu trúc component sạch và tái sử dụng",
        },
      },
      {
        name: "Next.js",
        category: "frontend",
        highlight: true,
        tag: { en: "Core", vi: "Chính" },
        description: {
          en: "App Router, SSR, SSG, Static Export, SEO and web performance optimization",
          vi: "App Router, SSR, SSG, Static Export, tối ưu SEO và tốc độ tải trang",
        },
      },
      {
        name: "Vue.js (Vue 2/3)",
        category: "frontend",
        highlight: true,
        tag: { en: "Hands-on", vi: "Thực tế" },
        description: {
          en: "Composition API, Options API, Vuex, production integration for Japanese clients",
          vi: "Composition API, Vuex, triển khai trong các dự án đối tác Nhật Bản",
        },
      },
      {
        name: "TypeScript & JavaScript (ES6+)",
        category: "frontend",
        highlight: true,
        tag: { en: "Core", vi: "Chính" },
        description: {
          en: "Strict type safety, modern async patterns, DOM APIs, ES6+ standards",
          vi: "Kiểu dữ liệu chặt chẽ, xử lý bất đồng bộ, DOM APIs, chuẩn ES6+",
        },
      },
      {
        name: "HTML5 / CSS3 / SCSS / Tailwind",
        category: "frontend",
        tag: { en: "Proficient", vi: "Thành thạo" },
        description: {
          en: "Semantic markup, Flexbox/Grid layouts, Glassmorphism, animations, responsive design",
          vi: "HTML ngữ nghĩa, layout linh hoạt, Glassmorphism, animation, chuẩn responsive",
        },
      },
    ],
  },
  {
    id: "state",
    label: {
      en: "State Management & Performance",
      vi: "Quản Lý State & Tối Ưu Hiệu Năng",
    },
    description: {
      en: "Organizing state flows and eliminating unnecessary component re-renders",
      vi: "Tổ chức luồng dữ liệu minh bạch, hạn chế render thừa và tăng tốc độ xử lý",
    },
    skills: [
      {
        name: "Redux Toolkit & Zustand",
        category: "state",
        highlight: true,
        tag: { en: "+30% Boost", vi: "+30% Tốc độ" },
        description: {
          en: "Normalized state, slice architecture, lightweight local store caching",
          vi: "Chuẩn hóa state, chia slice rõ ràng, kết hợp Zustand giảm re-render hiệu quả",
        },
      },
      {
        name: "Context API & Custom Hooks",
        category: "state",
        tag: { en: "Proficient", vi: "Thành thạo" },
        description: {
          en: "Scoped state sharing, separation of concerns, reusable UI & data logic hooks",
          vi: "Chia sẻ state cục bộ, phân tách logic nghiệp vụ và UI độc lập",
        },
      },
      {
        name: "Web Performance Profiling",
        category: "state",
        tag: { en: "Experience", vi: "Kinh nghiệm" },
        description: {
          en: "Chrome DevTools profiling, memoization (useMemo/useCallback), re-render reduction",
          vi: "Đo lường DevTools, chống re-render thừa, tối ưu trải nghiệm mượt mà",
        },
      },
    ],
  },
  {
    id: "backend",
    label: {
      en: "Architecture & Backend (Applied Experience)",
      vi: "Kiến Trúc & Backend (Đã Làm Việc Qua)",
    },
    description: {
      en: "Architectural patterns and backend services applied across software projects",
      vi: "Các kiến trúc và dịch vụ backend đã trực tiếp áp dụng trong các dự án thực tế",
    },
    skills: [
      {
        name: "Micro-Frontend Architecture",
        category: "backend",
        tag: { en: "ahamo NTT Docomo", vi: "Dự án ahamo" },
        description: {
          en: "Experience with modular UI feature separation and CMS Webrelease integration",
          vi: "Kinh nghiệm phân rã module giao diện độc lập kết hợp nền tảng CMS Webrelease",
        },
      },
      {
        name: "Java Spring Boot",
        category: "backend",
        tag: { en: "Projects", vi: "Dự án" },
        description: {
          en: "RESTful API development, Spring Security, JPA/Hibernate, relational mapping",
          vi: "Xây dựng RESTful API, Spring Security, JPA kết nối cơ sở dữ liệu quan hệ",
        },
      },
      {
        name: "Python (FastAPI)",
        category: "backend",
        tag: { en: "AI Tools", vi: "Công cụ AI" },
        description: {
          en: "Asynchronous endpoints, Pydantic data schemas, background task orchestration",
          vi: "API bất đồng bộ, xử lý dữ liệu với Pydantic và điều phối tác vụ",
        },
      },
      {
        name: "Node.js (NestJS / Express)",
        category: "backend",
        tag: { en: "Projects", vi: "Dự án" },
        description: {
          en: "Modular server architecture, dependency injection, REST API contracts",
          vi: "Cấu trúc module backend, routing và xử lý logic nghiệp vụ server",
        },
      },
      {
        name: "Firebase & Supabase",
        category: "backend",
        tag: { en: "BaaS", vi: "BaaS" },
        description: {
          en: "Authentication, Firestore / Realtime DB, Cloud Storage, hosting services",
          vi: "Xác thực người dùng, CSDL thời gian thực, lưu trữ file và hosting",
        },
      },
    ],
  },
  {
    id: "ai",
    label: {
      en: "AI Integration & Asynchronous Messaging",
      vi: "Tích Hợp AI & Xử Lý Bất Đồng Bộ",
    },
    description: {
      en: "Practical experience integrating AI models and message brokers into web systems",
      vi: "Kinh nghiệm thực tế tích hợp mô hình AI và hàng đợi thông điệp",
    },
    skills: [
      {
        name: "OpenAI GPT-4 API Integration",
        category: "ai",
        highlight: true,
        tag: { en: "Award Winner", vi: "Đoạt giải" },
        description: {
          en: "Prompt engineering, structured outputs, natural language to code transformation",
          vi: "Thiết kế prompt tối ưu, xử lý output có cấu trúc, chuyển ngôn ngữ tự nhiên sang mã",
        },
      },
      {
        name: "RabbitMQ Message Queues",
        category: "ai",
        tag: { en: "Applied", vi: "Thực tế" },
        description: {
          en: "Decoupled asynchronous worker queues for background AI tasks",
          vi: "Điều phối hàng đợi xử lý tác vụ nền bất đồng bộ, tránh nghẽn luồng HTTP",
        },
      },
      {
        name: "NLP & Algorithms (Doc2Vec / Genetic)",
        category: "ai",
        tag: { en: "Academic", vi: "Học thuật" },
        description: {
          en: "Semantic similarity detection with Doc2Vec; optimization with Genetic Algorithms",
          vi: "Phân tích tương đồng ngữ nghĩa bằng Doc2Vec; tối ưu hóa với Giải thuật Di truyền",
        },
      },
    ],
  },
  {
    id: "devops",
    label: {
      en: "Databases, DevOps & Tools",
      vi: "Cơ Sở Dữ Liệu, DevOps & Công Cụ",
    },
    description: {
      en: "Database design, version control workflows, containerization, and developer tooling",
      vi: "Thiết kế CSDL, quản lý mã nguồn, đóng gói ứng dụng và công cụ phát triển",
    },
    skills: [
      {
        name: "PostgreSQL, MySQL & MongoDB",
        category: "devops",
        tag: { en: "Relational & NoSQL", vi: "SQL & NoSQL" },
        description: {
          en: "Relational schema design, queries, indexing, and NoSQL document storage",
          vi: "Thiết kế bảng quan hệ, tối ưu truy vấn, đánh chỉ mục và lưu trữ tài liệu",
        },
      },
      {
        name: "Docker & Containerization",
        category: "devops",
        tag: { en: "Containers", vi: "Containers" },
        description: {
          en: "Containerizing web services, Dockerfiles, local development setup",
          vi: "Đóng gói ứng dụng web, viết Dockerfile và chuẩn hóa môi trường làm việc",
        },
      },
      {
        name: "Git, GitHub & CMS Webrelease",
        category: "devops",
        tag: { en: "Workflows", vi: "Quy trình" },
        description: {
          en: "Git branching workflows, pull request reviews, CMS release management",
          vi: "Quy trình nhánh Git, review code, quản lý phát hành nội dung CMS",
        },
      },
      {
        name: "Figma & Adobe XD",
        category: "tools",
        tag: { en: "UI Translation", vi: "Thiết kế UI" },
        description: {
          en: "Translating UI/UX design mockups into responsive web components",
          vi: "Chuyển đổi thiết kế từ mockup sang giao diện thực tế chuẩn responsive",
        },
      },
    ],
  },
];

export const experienceData: WorkExperience[] = [
  {
    id: "hero-solutions",
    company: "Hero Solutions",
    location: {
      en: "Phu Nhuan, Ho Chi Minh City",
      vi: "Phú Nhuận, TP. Hồ Chí Minh",
    },
    period: "09/2024 - Present",
    current: true,
    title: {
      en: "Frontend Developer",
      vi: "Lập trình viên Frontend",
    },
    duration: {
      en: "Sep 2024 - Present",
      vi: "Tháng 09/2024 - Hiện tại",
    },
    projectHighlights: [
      {
        name: "ahamo Platform (NTT Docomo Japan)",
        client: {
          en: "NTT Docomo (Japan)",
          vi: "NTT Docomo (Nhật Bản)",
        },
        description: {
          en: "Frontend development for 'ahamo', the online mobile service from NTT Docomo.",
          vi: "Phát triển giao diện cho nền tảng dịch vụ di động trực tuyến 'ahamo' của NTT Docomo (Nhật Bản).",
        },
        role: {
          en: "Frontend Developer",
          vi: "Lập trình viên Frontend",
        },
        responsibilities: {
          en: [
            "Coordinated with Japanese partners to understand business requirements, scope tasks, and review technical feasibility.",
            "Developed and maintained responsive user interfaces using Vue.js (Vue 2/3), ReactJS, and CMS Webrelease within a modular micro-frontend architecture.",
            "Authored test specifications and documentation, upholding code quality standards to ensure zero regression releases.",
          ],
          vi: [
            "Trao đổi cùng đối tác Nhật Bản để làm rõ yêu cầu nghiệp vụ, ước tính thời gian và đánh giá giải pháp kỹ thuật.",
            "Xây dựng và tối ưu các thành phần giao diện responsive bằng Vue.js, ReactJS trên kiến trúc Micro-frontend kết hợp CMS Webrelease.",
            "Soạn thảo tài liệu kiểm thử (test specs) và hướng dẫn vận hành, tuân thủ tiêu chuẩn chất lượng và đảm bảo release không lỗi hồi quy.",
          ],
        },
        impacts: {
          en: [
            "Maintained zero-regression across production releases.",
            "Ensured smooth cross-device compatibility.",
          ],
          vi: [
            "Duy trì chất lượng release ổn định, không phát sinh lỗi hồi quy.",
            "Đảm bảo giao diện hiển thị mượt mà và tương thích tốt trên nhiều thiết bị.",
          ],
        },
        technologies: ["Vue.js", "ReactJS", "JavaScript", "Micro-frontend", "CMS Webrelease", "Responsive Design", "Git"],
      },
    ],
  },
  {
    id: "nexus-zone",
    company: "Nexus Zone",
    location: {
      en: "District 7, Ho Chi Minh City",
      vi: "Quận 7, TP. Hồ Chí Minh",
    },
    period: "01/2024 - 09/2024",
    title: {
      en: "Frontend Developer",
      vi: "Lập trình viên Frontend",
    },
    duration: {
      en: "Jan 2024 - Sep 2024",
      vi: "Tháng 01/2024 - Tháng 09/2024",
    },
    projectHighlights: [
      {
        name: "Salesforce-CRM Web Platform",
        description: {
          en: "CRM web platform providing customer lifecycle tracking, sales management, and dashboards.",
          vi: "Nền tảng CRM cung cấp công cụ quản lý khách hàng, theo dõi giao dịch và báo cáo số liệu.",
        },
        role: {
          en: "Frontend Developer",
          vi: "Lập trình viên Frontend",
        },
        responsibilities: {
          en: [
            "Built modular UI components in ReactJS and TypeScript for customer workflows.",
            "Optimized state management using Redux Toolkit and Zustand, reducing unnecessary component re-renders.",
            "Integrated RESTful API endpoints with robust data validation and error handling.",
          ],
          vi: [
            "Phát triển hệ thống UI components dạng module bằng ReactJS và TypeScript hỗ trợ các luồng quản lý khách hàng.",
            "Tối ưu hóa State Management với Redux Toolkit kết hợp Zustand, giảm số lần re-render không cần thiết.",
            "Tích hợp các RESTful APIs, kiểm tra tính hợp lệ dữ liệu và xử lý lỗi phía giao diện.",
          ],
        },
        impacts: {
          en: [
            "Improved frontend interaction performance by over 30%.",
          ],
          vi: [
            "Cải thiện hơn 30% tốc độ tương tác và tải dữ liệu trên các màn hình chính.",
          ],
        },
        technologies: ["ReactJS", "TypeScript", "Redux Toolkit", "Zustand", "RESTful API", "SCSS", "Performance Profiling"],
      },
    ],
  },
  {
    id: "tma-solutions",
    company: "TMA Solutions",
    location: {
      en: "District 12, Ho Chi Minh City",
      vi: "Quận 12, TP. Hồ Chí Minh",
    },
    period: "01/2023 - 12/2023",
    title: {
      en: "Fullstack Developer / Software Engineer",
      vi: "Lập trình viên Fullstack / Kỹ sư Phần mềm",
    },
    duration: {
      en: "Jan 2023 - Dec 2023",
      vi: "Tháng 01/2023 - Tháng 12/2023",
    },
    projectHighlights: [
      {
        name: "GPT Code Generator (AI Project)",
        description: {
          en: "AI development tool translating natural language prompts into working web code previews in real time.",
          vi: "Dự án ứng dụng AI hỗ trợ sinh mã nguồn website từ câu lệnh ngôn ngữ tự nhiên và xem thử trực tiếp.",
        },
        role: {
          en: "Fullstack Developer & AI Researcher",
          vi: "Lập trình viên Fullstack",
        },
        responsibilities: {
          en: [
            "Integrated OpenAI GPT-4 API with prompt templates for code generation.",
            "Built asynchronous task processing pipelines with Python FastAPI and RabbitMQ message queues.",
            "Developed Next.js user interface and integrated Firebase/Supabase for real-time state and storage.",
          ],
          vi: [
            "Kết nối OpenAI GPT-4 API và tối ưu prompt để sinh mã giao diện tự động.",
            "Thiết kế luồng xử lý tác vụ bất đồng bộ bằng Python FastAPI và RabbitMQ để điều phối yêu cầu.",
            "Xây dựng giao diện Next.js và tích hợp Firebase/Supabase lưu trữ dữ liệu thời gian thực.",
          ],
        },
        impacts: {
          en: [
            "Completed prototype and won 3rd Place at AI Got Talent 2023 competition.",
          ],
          vi: [
            "Hoàn thành sản phẩm và đạt giải Ba trong cuộc thi công nghệ AI Got Talent 2023.",
          ],
        },
        technologies: ["Next.js", "Python (FastAPI)", "OpenAI GPT-4", "RabbitMQ", "Firebase", "Supabase"],
      },
      {
        name: "NFT Marketplaces & GBST Wealth Management",
        description: {
          en: "Participated in development of marketplace APIs and wealth management features.",
          vi: "Tham gia phát triển API cho sàn giao dịch số và bảo trì module quản lý tài sản.",
        },
        role: {
          en: "Software Engineer",
          vi: "Lập trình viên",
        },
        responsibilities: {
          en: [
            "Built backend REST APIs with NestJS, Java Spring Boot, and PostgreSQL databases.",
            "Developed reusable components in ReactJS and maintained system stability.",
          ],
          vi: [
            "Xây dựng REST APIs với NestJS, Java Spring Boot và cơ sở dữ liệu PostgreSQL.",
            "Phát triển các component giao diện ReactJS và khắc phục các vấn đề phát sinh.",
          ],
        },
        impacts: {
          en: ["Maintained system reliability and robust transaction workflows."],
          vi: ["Đảm bảo hệ thống vận hành ổn định và dữ liệu giao dịch chính xác."],
        },
        technologies: ["ReactJS", "Java Spring Boot", "NestJS", "PostgreSQL", "Solidity"],
      },
    ],
  },
];

export const projectsData: ProjectItem[] = [
  {
    id: "gpt-code-generator",
    name: {
      en: "GPT Code Generator (AI Web Tool)",
      vi: "GPT Code Generator (Công Cụ Sinh Mã AI)",
    },
    category: "ai",
    featured: true,
    organization: {
      en: "TMA Solutions",
      vi: "TMA Solutions",
    },
    year: {
      en: "2023",
      vi: "2023",
    },
    badge: {
      en: "3rd Place Award",
      vi: "Giải Ba Cuộc Thi",
    },
    description: {
      en: "AI web application translating natural language descriptions into live interactive web interface previews.",
      vi: "Ứng dụng AI hỗ trợ chuyển đổi mô tả ngôn ngữ tự nhiên thành mã giao diện website và xem trước trực tiếp.",
    },
    challengesSolved: {
      en: [
        "Handled AI inference through asynchronous queue processing using RabbitMQ and Python FastAPI.",
        "Built an interactive preview sandbox for generated HTML/JS/CSS code with real-time editing.",
      ],
      vi: [
        "Xử lý các tác vụ AI thông qua hàng đợi bất đồng bộ với RabbitMQ và Python FastAPI.",
        "Xây dựng khu vực sandbox cho phép xem thử và chỉnh sửa trực tiếp mã nguồn được sinh ra.",
      ],
    },
    highlights: {
      en: [
        "Asynchronous task queues with FastAPI & RabbitMQ",
        "Next.js frontend with live code sandbox preview",
        "Firebase & Supabase real-time database integration",
      ],
      vi: [
        "Xử lý hàng đợi bất đồng bộ với FastAPI & RabbitMQ",
        "Giao diện Next.js với khung xem thử code trực tiếp",
        "Tích hợp cơ sở dữ liệu thời gian thực Firebase & Supabase",
      ],
    },
    architecture: {
      en: "Next.js UI -> FastAPI Async Gateway -> RabbitMQ Task Queue -> GPT-4 Model -> Firebase / Supabase Storage",
      vi: "Giao diện Next.js -> FastAPI Gateway -> Hàng đợi RabbitMQ -> Mô hình GPT-4 -> CSDL Firebase / Supabase",
    },
    technologies: ["Next.js", "Python", "FastAPI", "OpenAI GPT-4", "RabbitMQ", "Firebase", "Supabase", "TypeScript"],
    githubUrl: "https://github.com/SatohJiro",
  },
  {
    id: "ahamo-docomo",
    name: {
      en: "ahamo NTT Docomo Web Platform",
      vi: "Nền Tảng Viễn Thông ahamo (NTT Docomo)",
    },
    category: "web",
    featured: true,
    organization: {
      en: "Hero Solutions / NTT Docomo",
      vi: "Hero Solutions / NTT Docomo",
    },
    year: {
      en: "2024 - Present",
      vi: "2024 - Hiện tại",
    },
    badge: {
      en: "Production Project",
      vi: "Dự Án Thực Tế",
    },
    description: {
      en: "Frontend interface for ahamo — NTT Docomo's online mobile service in Japan.",
      vi: "Phát triển giao diện cho ahamo - dịch vụ gói cước trực tuyến của nhà mạng NTT Docomo Nhật Bản.",
    },
    challengesSolved: {
      en: [
        "Worked with modular UI feature components in a micro-frontend architecture combined with CMS Webrelease.",
        "Followed Japanese test specifications and quality standards ensuring zero regression releases.",
      ],
      vi: [
        "Làm việc với các module giao diện độc lập trong kiến trúc Micro-frontend kết hợp CMS Webrelease.",
        "Tuân thủ quy trình kiểm thử và tiêu chuẩn chất lượng để đảm bảo release không phát sinh lỗi hồi quy.",
      ],
    },
    highlights: {
      en: [
        "Micro-frontend component workflows with CMS Webrelease",
        "Zero-regression quality standard compliance",
        "Responsive Vue.js & ReactJS user interface",
      ],
      vi: [
        "Quy trình phát triển Micro-frontend trên CMS Webrelease",
        "Đảm bảo tiêu chuẩn chất lượng không lỗi hồi quy",
        "Giao diện responsive với Vue.js và ReactJS",
      ],
    },
    architecture: {
      en: "Micro-frontend Shell -> Feature Modules (Vue.js / ReactJS) -> CMS Webrelease -> CDN Delivery",
      vi: "Shell Micro-frontend -> Các module tính năng (Vue/React) -> CMS Webrelease -> Mạng phân phối CDN",
    },
    technologies: ["Vue.js", "ReactJS", "JavaScript", "Micro-frontend", "CMS Webrelease", "Responsive Design"],
    liveUrl: "https://ahamo.com",
  },
  {
    id: "salesforce-crm",
    name: {
      en: "Salesforce-CRM Web Platform",
      vi: "Nền Tảng Quản Trị Khách Hàng CRM",
    },
    category: "web",
    featured: true,
    organization: {
      en: "Nexus Zone",
      vi: "Nexus Zone",
    },
    year: {
      en: "2024",
      vi: "2024",
    },
    badge: {
      en: "+30% Performance",
      vi: "+30% Tốc Độ",
    },
    description: {
      en: "CRM web application offering customer tracking, sales workflows, and analytics screens.",
      vi: "Ứng dụng web CRM cung cấp công cụ theo dõi khách hàng, quy trình bán hàng và bảng thống kê.",
    },
    challengesSolved: {
      en: [
        "Restructured state management using Redux Toolkit and Zustand, eliminating redundant component re-renders.",
        "Integrated RESTful API endpoints with clean validation and error states.",
      ],
      vi: [
        "Tái cấu trúc State Management với Redux Toolkit và Zustand, giảm render thừa trên các màn hình phức tạp.",
        "Tích hợp hệ thống RESTful API an toàn và xử lý lỗi người dùng rõ ràng.",
      ],
    },
    highlights: {
      en: [
        "Over 30% speedup across core customer screens",
        "Modular TypeScript component architecture",
      ],
      vi: [
        "Cải thiện hơn 30% tốc độ tương tác giao diện",
        "Xây dựng thư viện component TypeScript module hóa",
      ],
    },
    architecture: {
      en: "ReactJS + TypeScript -> Redux Toolkit / Zustand Stores -> REST API Gateway",
      vi: "ReactJS + TypeScript -> Redux Toolkit / Zustand Stores -> API Gateway",
    },
    technologies: ["ReactJS", "TypeScript", "Redux Toolkit", "Zustand", "RESTful API", "SCSS"],
    githubUrl: "https://github.com/SatohJiro",
  },
  {
    id: "thesis-management-system",
    name: {
      en: "Graduation Thesis Management System",
      vi: "Hệ Thống Quản Lý Khóa Luận Tốt Nghiệp",
    },
    category: "academic",
    featured: true,
    organization: {
      en: "IT Department - Nong Lam University",
      vi: "Khoa CNTT - ĐH Nông Lâm TP.HCM",
    },
    year: {
      en: "2023",
      vi: "2023",
    },
    badge: {
      en: "NLP Integrated",
      vi: "Tích Hợp NLP",
    },
    description: {
      en: "Web management system digitizing the graduation thesis registration and review process for the IT Department of Nong Lam University.",
      vi: "Hệ thống số hóa quy trình đăng ký, thẩm định và quản lý khóa luận tốt nghiệp cho Khoa CNTT Trường ĐH Nông Lâm TP.HCM.",
    },
    challengesSolved: {
      en: [
        "Integrated a Doc2Vec NLP model to detect semantic similarity between thesis proposals, helping prevent topic duplication.",
        "Implemented role-based access control (RBAC) for students, lecturers, and faculty council members.",
      ],
      vi: [
        "Ứng dụng mô hình Doc2Vec phân tích độ tương đồng ngữ nghĩa giữa các đề tài, hỗ trợ cảnh báo trùng lặp ý tưởng.",
        "Thiết lập phân quyền (RBAC) cho sinh viên, giảng viên hướng dẫn và hội đồng khoa học.",
      ],
    },
    highlights: {
      en: [
        "Doc2Vec NLP model for semantic duplicate detection",
        "Role-Based Access Control (RBAC) security layer",
        "Digitized graduation thesis workflows",
      ],
      vi: [
        "Ứng dụng Doc2Vec phát phát hiện tương đồng ngữ nghĩa",
        "Phân quyền người dùng đa vai trò (RBAC)",
        "Số hóa toàn diện quy trình quản lý khóa luận",
      ],
    },
    architecture: {
      en: "ReactJS Client -> Java Spring Boot REST API -> Python NLP Service -> MySQL Database",
      vi: "Giao diện ReactJS -> API Java Spring Boot -> Service NLP Python -> CSDL MySQL",
    },
    technologies: ["ReactJS", "Java Spring Boot", "MySQL", "Doc2Vec NLP", "Python", "RESTful API"],
    githubUrl: "https://github.com/SatohJiro",
  },
  {
    id: "genetic-sudoku-solver",
    name: {
      en: "Sudoku Solver with Genetic Algorithms",
      vi: "Trình Giải Sudoku Bằng Giải Thuật Di Truyền",
    },
    category: "academic",
    featured: false,
    organization: {
      en: "Algorithm Research",
      vi: "Nghiên Cứu Thuật Toán",
    },
    year: {
      en: "2022 - 2023",
      vi: "2022 - 2023",
    },
    description: {
      en: "Optimization program applying genetic algorithms (chromosome encoding, fitness function, mutation) to solve Sudoku puzzles.",
      vi: "Chương trình tối ưu hóa áp dụng giải thuật di truyền (mã hóa nhiễm sắc thể, hàm fitness, đột biến) để giải các ma trận Sudoku.",
    },
    challengesSolved: {
      en: [
        "Designed custom chromosome representation and adaptive fitness functions to avoid local minima traps.",
      ],
      vi: [
        "Thiết kế cấu trúc mã hóa gen và hàm thích nghi phù hợp để tránh rơi vào cực trị cục bộ.",
      ],
    },
    highlights: {
      en: [
        "Chromosome encoding & fitness evaluation",
        "Rapid convergence on complex puzzles",
        "Object-Oriented Design in Java",
      ],
      vi: [
        "Mã hóa gen và hàm đánh giá thích nghi",
        "Hội tụ nhanh trên các câu đố phức tạp",
        "Thiết kế hướng đối tượng (OOP) bằng Java",
      ],
    },
    technologies: ["Java", "Genetic Algorithms", "OOP", "Data Structures"],
    githubUrl: "https://github.com/SatohJiro",
  },
  {
    id: "graph-theory-suite",
    name: {
      en: "Graph Theory Visualization Suite",
      vi: "Ứng Dụng Trực Quan Hóa Lý Thuyết Đồ Thị",
    },
    category: "academic",
    featured: false,
    organization: {
      en: "Academic Software",
      vi: "Phần Mềm Học Thuật",
    },
    year: {
      en: "2022",
      vi: "2022",
    },
    description: {
      en: "Desktop tool demonstrating graph algorithms including Eulerian/Hamiltonian paths, Kruskal/Prim MST, and Dijkstra shortest path.",
      vi: "Ứng dụng trực quan hóa các thuật toán đồ thị: chu trình Euler, Hamilton, cây khung nhỏ nhất (MST) và đường đi ngắn nhất (Dijkstra).",
    },
    challengesSolved: {
      en: [
        "Built visual step-by-step animations for algorithm execution and node traversals.",
      ],
      vi: [
        "Xây dựng giao diện minh họa các bước duyệt đỉnh và cập nhật trạng thái thuật toán.",
      ],
    },
    highlights: {
      en: [
        "Eulerian & Hamiltonian cycle discovery",
        "Minimum Spanning Trees (Kruskal & Prim)",
        "Dijkstra Shortest Path visualization",
      ],
      vi: [
        "Tìm chu trình Euler & Hamilton",
        "Cây khung nhỏ nhất Kruskal & Prim",
        "Trực quan hóa thuật toán Dijkstra",
      ],
    },
    technologies: ["Java", "Java Swing GUI", "Graph Algorithms", "Data Structures"],
    githubUrl: "https://github.com/SatohJiro",
  },
];

export const awardsData: AwardItem[] = [
  {
    id: "valedictorian",
    title: {
      en: "1st Place — Valedictorian of Class 2019",
      vi: "Thủ Khoa Tốt Nghiệp Khóa 2019",
    },
    organization: {
      en: "Nong Lam University, Ho Chi Minh City",
      vi: "Trường Đại học Nông Lâm TP.HCM",
    },
    year: "2023",
    badgeText: {
      en: "Rank 1 / IT Cohort (GPA 3.6/4.0)",
      vi: "Hạng 1 Toàn Khóa CNTT (GPA 3.6/4.0)",
    },
    description: {
      en: "Awarded Certificate of Merit by the University President (Decision No. 4478/QĐ-ĐHNL-CTSV) for graduating as the top student across the Information Technology cohort.",
      vi: "Nhận Giấy khen của Hiệu trưởng Nhà trường (Quyết định số 4478/QĐ-ĐHNL-CTSV ngày 21/11/2023) với thành tích tốt nghiệp đứng đầu toàn khóa Công nghệ Thông tin.",
    },
    iconName: "Trophy",
  },
  {
    id: "ai-got-talent",
    title: {
      en: "3rd Place — AI Got Talent 2023",
      vi: "Giải Ba — AI Got Talent 2023",
    },
    organization: {
      en: "TMA Solutions",
      vi: "Tập đoàn TMA Solutions",
    },
    year: "2023",
    badgeText: {
      en: "GPT Code Generator Project",
      vi: "Dự Án GPT Code Generator",
    },
    description: {
      en: "Recognized for developing the GPT Code Generator application leveraging OpenAI GPT-4 with asynchronous backend processing.",
      vi: "Đạt giải Ba trong cuộc thi công nghệ tại công ty với sản phẩm 'GPT Code Generator' ứng dụng mô hình OpenAI GPT-4.",
    },
    iconName: "Sparkles",
  },
  {
    id: "rookie-of-the-year",
    title: {
      en: "Rookie of the Year 2024",
      vi: "Nhân Viên Mới Xuất Sắc 2024",
    },
    organization: {
      en: "Nexus Zone",
      vi: "Công ty Nexus Zone",
    },
    year: "2024",
    badgeText: {
      en: "Frontend Performance Delivery",
      vi: "Đóng Góp Kỹ Thuật Frontend",
    },
    description: {
      en: "Honored for rapid problem solving, on-time sprint deliveries, and contributing to a 30%+ performance gain on the Salesforce-CRM platform.",
      vi: "Vinh danh cá nhân hoàn thành tốt các deadline sprint và đóng góp cải thiện hơn 30% hiệu năng giao diện CRM.",
    },
    iconName: "Medal",
  },
];

export const educationData: EducationItem = {
  school: {
    en: "Nong Lam University, Ho Chi Minh City",
    vi: "Trường Đại học Nông Lâm TP. Hồ Chí Minh",
  },
  degree: {
    en: "Degree of Engineer in Information Technology",
    vi: "Bằng Kỹ sư Công nghệ Thông tin (Hệ chính quy)",
  },
  major: {
    en: "Software Engineering",
    vi: "Chuyên ngành Kỹ thuật Phần mềm",
  },
  duration: {
    en: "2019 - 2023",
    vi: "2019 - 2023",
  },
  gpa: {
    en: "3.6 / 4.0 (Excellent)",
    vi: "3.6 / 4.0 (Xuất sắc)",
  },
  honors: {
    en: "Class Valedictorian (Ranked 1st across IT Cohort)",
    vi: "Thủ khoa tốt nghiệp Khóa 2019 (Xếp hạng 1 toàn khóa CNTT)",
  },
  highlights: {
    en: [
      "Degree of Engineer with Excellent rating (GPA 3.6/4.0)",
      "Ranked #1 out of IT cohort (Valedictorian)",
      "Certificate of Merit by University President (Decision No. 4478/QĐ-ĐHNL-CTSV)",
    ],
    vi: [
      "Bằng Kỹ sư Công nghệ Thông tin xếp loại Xuất sắc (GPA 3.6/4.0)",
      "Thủ khoa tốt nghiệp toàn khóa 2019",
      "Giấy khen của Hiệu trưởng Trường ĐH Nông Lâm TP.HCM (QĐ số 4478/QĐ-ĐHNL-CTSV)",
    ],
  },
};
