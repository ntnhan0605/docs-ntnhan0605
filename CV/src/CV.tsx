import clsx from 'clsx';
import { FC, ReactNode } from 'react';
import styles from './CV.module.scss';

//#region
const infos: Record<string, ReactNode> = {
  'Date of Birth': '06/05/1994',
  Phone: (
    <a href="tel:0987 527 544" className={styles.link} target="_blank">
      0987 527 544
    </a>
  ),
  Email: (
    <a href="mailto:ntnhan0605@gmail.com" className={styles.link}>
      ntnhan0605@gmail.com
    </a>
  ),
  'Linked In': (
    <a
      href="https://www.linkedin.com/in/ntnhan65/"
      className={styles.link}
      target="_blank"
    >
      https://www.linkedin.com/in/ntnhan65/
    </a>
  ),
  Address:
    '74/25/5C (Alley 242/23/17) An Duong Vuong Street, Ward 16, District 8, Ho Chi Minh City',
};

const objectives: string[] = [
  'Motivated Senior Front-End Engineer with strong experience in React and modern UI libraries, actively pursuing growth into a Full-Stack Developer role. Eager to expand skills in back-end technologies such as Node.js, Express, MongoDB, and PostgreSQL, while gaining hands-on experience in mobile development with React Native. Also interested in working with cloud services like Firebase and AWS to build scalable, end-to-end web and mobile applications.',
];

const educations: Record<string, { title: string; list: string[] }> = {
  'Dec 2019 – Apr 2020': {
    title: 'Information Technology Center',
    list: [
      'HCMC University of Science',
      'Basic Programming & Database',
      'GPA: 9.5',
    ],
  },
  'Sep 2012 – Sep 2015': {
    title: 'HCMC University of Technology and Education',
    list: ['Automotive Engineering Technology', 'GPA: 7.8'],
  },
};

const workExperiences: Record<
  string,
  { company: string; position: string; list: string[] }
> = {
  'May 2021 – Now': {
    company: 'Hello Health Group',
    position: 'Senior Front-End Engineer',
    list: [
      'Developed responsive user interfaces using ReactJS and NextJS, styled with modern UI frameworks including MUI, Ant Design, Mantine, and Tailwind CSS to ensure consistent design and mobile-first responsiveness.',
      'Collaborated with backend engineers to integrate RESTful APIs, ensuring seamless data flow between the front-end interface and server-side services.',
      'Maintained and supported legacy applications while actively contributing to the development of new features to enhance functionality and user experience.',
      'Leveraged WordPress REST API to build a responsive, dynamic UI for a content platform, ensuring seamless data integration and optimized performance.',
      'Translated Figma designs into pixel-perfect, responsive UI components while working closely with UX teams.',
    ],
  },
  'Feb 2020 – Apr 2021': {
    company: 'Zivas',
    position: 'Front-End Developer',
    list: [
      'Built responsive websites using a mobile-first concept, ensuring seamless display and performance on smartphones, tablets, and desktops.',
      'Implemented a WordPress theme from Figma/Adobe XD UI/UX and created custom post types with category-based filtering for improved content management.',
    ],
  },
  'Aug 2019 – Feb 2020': {
    company: 'Corsiva Lab Pte Ltd',
    position: 'Front-End Developer',
    list: [
      'Used the TypeRocket framework to build a drag-and-drop page layout system within the WordPress CMS.',
      'Built and updated WordPress themes aligned with marketing specifications, leveraging Elementor and Advanced Custom Fields (ACF).',
      'Created responsive website layouts with HTML, CSS, and JavaScript, and transformed them into WordPress themes for dynamic content management.',
    ],
  },
  'Jan 2018 – Aug 2019': {
    company: 'Munkas Agency',
    position: 'Front-End Developer',
    list: [
      'Translated Adobe Photoshop and Illustrator designs into responsive WordPress themes with drag-and-drop functionality, powered by ACF, TypeRocket, and Elementor for streamlined content editing.',
      'Maintained and updated existing WordPress websites, including theme/plugin management, and handled deployment via cPanel with full support for FTP setup, DNS configuration, and MySQL database import/export.',
    ],
  },
};

const skills: Record<string, string[]> = {
  'Technical skills': [
    'Languages: HTML5, CSS3, Javascript(ES6+), TypeScript, PHP',
    'Frameworks: NextJS',
    'Library: ReactJS, VueJS, Zustand, jQuery',
    'Styling: CSS Modules, CSS-in-JS, Ant Design, TailwindCSS, MUI, Sass, Bootstrap',
    'Version control: Git',
    'Module bundler/Build tool: Webpack, Vite, Rollup',
    'Package management: npm',
    'Others: REST APIs, gRPC, Responsive Design, Figma, Agile/Scrum, Docker, experience with Ory Hydra',
  ],
  'Soft skills': [
    'Capable of working effectively both in collaborative team environments and independently.',
    'Optimistic and open-minded with strong critical thinking skills and a high level of self-awareness.',
    'Maintain composure and efficiency in high-pressure situations.',
  ],
};

type Project = {
  name: string | string[];
  size: string | string[];
  detail: Array<string | Record<string, string[]>>;
  note?: string;
};
const projects: Record<string, Project[]> = {
  '* Project in Hello Health Group': [
    // CARE/CARE PAYMENT
    {
      name: [
        '<strong>Vaccine/Vaccine Payment(hellobacsi.com/care)</strong>',
        'Jan 2025 - Now',
        'Senior Front-End Engineer',
      ],
      size: ['2 FE', '2 BE', '1 QC', '1 PM'],
      detail: [
        'Developed React components for vaccine list, detail, and loading screens based on Figma UI/UX designs, integrating with backend APIs to enable dynamic data filtering and rendering.',
        'Integrated secure payment workflows for vaccine booking in collaboration with backend engineers, ensuring seamless API communication.',
        'Integrated voucher and referral workflows via backend APIs, including price computation before payment.',
        'Technical used: ReactJS, NextJS, Zustand, Typescript, ESlint, Prettier',
      ],
    },
    // DISCOVER
    {
      name: [
        '<strong>Discover(hellobacsi.com)</strong>',
        'May 2024 - Jan 2025',
        'Senior Front-End Engineer',
      ],
      size: ['1 FE', '1 BE', '1 QC', '1 PM'],
      detail: [
        'Built the Health Tool front-end by accurately converting Figma UI/UX into React components, styled with Tailwind CSS and MUI, animated with Framer Motion, and managed through a Storybook-driven component system.',
        'Managed multilingual content across 11 regional websites using react-intl, with features including language toggling, dynamic message loading, and SEO-friendly routing for enhanced global reach.',
        'Implemented internal and third-party tools to capture user interactions via the website UI, enabling near real-time tracking and data collection with platforms such as HealthTool, Leadgen, Subot, and Sidis.',
        'Technical used: ReactJS, NextJS, Zustand, ReactFlow, Typescript, ESlint, Prettier',
      ],
    },
    // HEALTH TOOLS, LEAD TOOLS
    {
      name: [
        '<strong>Health tools, Lead tools</strong>',
        'May 2023 - May 2024',
        'Senior Front-End Engineer',
      ],
      size: ['1 FE', '1 BE', '1 QC', '1 PM'],
      detail: [
        {
          'Maintain and develop feature of internal tools:': [
            'Used Vue.js to configure campaigns that dynamically show or hide lead capture tools based on target URLs.',
            'Worked alongside UX designers to accurately implement Figma designs in building user-facing tools.',
            'Integrated backend APIs to collect data form & tracking from health/lead tools.',
          ],
        },
        'Technical used: ReactJS, Vue.js, NextJS, Typescript, ESlint, Prettier.',
      ],
    },
    // SIDIS
    {
      name: [
        '<strong>SIDIS</strong>',
        'May 2022 - May 2023',
        'Senior Front-End Engineer',
      ],
      size: ['3 FE', '3 BE', '1 QC', '1 PM', '1 intern-PM'],
      detail: [
        'Transformed Figma designs into intuitive UI/UX that streamlined dataset segmentation workflows in BigQuery, improving user productivity.',
        'Collaborated with backend teams to build intuitive UI/UX solutions, empowering internal users to configure and launch multi-channel automation campaigns (SMS, Zalo, WhatsApp, app push, web push).',
        'Developed visual workflow components using React Flow (node-based editors and interactive diagrams) and Zustand (state management), published them as an <a href="https://www.npmjs.com/package/@ntnhan0605/hhg-workflow" target="_blank" rel="noreferrer">NPM Package</a>, and integrated the package into the SIDIS platform.',
        'Developed a dynamic dashboard using Muuri and Highcharts, allowing users to rearrange analytics widgets via drag-and-drop.',
        'Technical used: ReactJS, Ant Design, D3-Hierarchy, Zustand, TailwindCSS, Muuri, ReactFlow, Recharts, Highcharts, Docker, npm, Typescript, ESlint, Prettier',
      ],
    },
    // SUBOT/RISK SCREENER
    {
      name: [
        '<strong>SUBOT/Risk screener</strong>',
        'May 2021 - May 2022',
        'Senior Front-End Engineer',
      ],
      size: ['1 FE', '1 BE', '1 QC', '1 PM'],
      detail: [
        {
          'Built admin dashboard and internal tools: ': [
            'Used ReactFlow, Ant Design to engineered internal systems and dashboards to configure bots for each URL and control question visibility based on user selection.',
            'Translated Figma-based UI/UX designs into pixel-perfect components while collaborating with the design team.',
          ],
        },
        'Developed interactive front-end for Subot and Risk Screener to conditionally show the next question based on user responses.',
        'Technical used: ReactJS, ReactFlow, Ant Design, Docker, Typescript, ESlint, Prettier.',
      ],
    },
  ],
  '* Projects in Zivas': [
    // CRM Phu Hoang Land
    {
      name: 'CRM Phu Hoang Land',
      size: '3',
      detail: [
        {
          'Engineered UI and integrate API': [
            'Manage customer, department, employeee, project, room booking, meeting, calendar...',
            'Worked alongside UX designers to accurately implement Figma designs in building user-facing tools.',
          ],
        },
        'Technical used: HTML, CSS, Javascript, ReactJS, Ant Design.',
      ],
    },
    // Hotel UEH Edu
    {
      name: [
        '<a href="https://hotel.ueh.edu.vn/vi/" target="_blank">https://hotel.ueh.edu.vn/vi/</a>',
      ],
      size: '2',
      detail: [
        'Developed responsive WordPress themes with pixel-perfect precision from Adobe XD designs.',
        'Technical used: HTML, CSS, JS, jQuery, Swiper, Bootstrap, Wordpress, WPML, TypeRocket, Advanced Custom Field (ACF).',
      ],
    },
    // Future UEH
    {
      name: [
        '<a href="https://future.ueh.edu.vn/" target="_blank">https://future.ueh.edu.vn/</a>',
      ],
      size: '2',
      detail: [
        'Transferred Figma designs into a fully functional WordPress theme, integrating custom post types to allow users to query and filter posts by grouped categories.',
        'Used the Highcharts library to create a Sankey diagram visualizing the number of posts per category.',
        'Technical used: HTML, CSS, JS, jQuery, Swiper, Bootstrap, Wordpress, WPML, TypeRocket, Advanced Custom Field (ACF), Highchartsjs.',
      ],
    },
  ],
  '* Project in Corsiva Lab': [
    {
      name: [
        '<a href="http://www.kaimay.com.sg/" target="_blank">http://www.kaimay.com.sg/</a>',
        '<a href=" https://www.tacamsteel.com/" target="_blank">https://www.tacamsteel.com/</a>',
        '<a href="https://medelabreastfeeding.asia/sg/" target="_blank">https://medelabreastfeeding.asia/sg/</a>',
      ],
      size: '2',
      detail: [
        'Built custom WordPress themes by accurately translating Adobe XD layouts into code.',
        'Developed flexible, drag-and-drop page layout components in WordPress CMS using TypeRocket.',
        'Technical used: HTML, CSS, Javascript, jQuery, Swiper, Bootstrap, Wordpress, Woocommerce, TypeRocket, Advanced Custom Field (ACF).',
      ],
    },
    {
      name: '<a href="http://virtualwebdesign.azurewebsites.net/" target="_blank">http://virtualwebdesign.azurewebsites.net/</a>',
      size: '2',
      detail: [
        'Used HTML, CSS, and jQuery to translate Figma designs into responsive, user-friendly tools in close collaboration with UX designers.',
        "Utilized cookies to store and restore users' previous steps in multi-step processes.",
        'Technical used: HTML, CSS, Javascript, jQuery, Swiper, Bootstrap',
      ],
    },
    {
      name: '<a href="http://payabeachv19.azurewebsites.net/" target="_blank">http://payabeachv19.azurewebsites.net/</a>',
      size: '2',
      detail: [
        'Built custom WordPress themes by accurately translating Adobe XD layouts into code.',
        'Built custom page layout functionality with drag-and-drop capability in WordPress, leveraging the TypeRocket plugin.',
        'Technical used: HTML, CSS, Javascript, jQuery, Swiper, Bootstrap, Wordpress, Woocommerce, TypeRocket, Advanced Custom Field (ACF).',
      ],
    },
  ],
  '* Project in Munkas': [
    {
      name: '<a href="https://munkas.com/" target="_blank">https://munkas.com/</a>',
      size: '1',
      detail: [
        'Worked alongside UX designers to accurately implement Figma designs in building user-facing tools.',
        'Technical used: HTML, CSS, JS, jQuery, Swiper, Bootstrap, Wordpress, Advanced Custom Field (ACF).',
      ],
      note: '<i><strong>* Note:</strong></i> Munkas Agency is a social media company so each campaign has one website for each project. After the campaign ends, the site is no longer kept. So I cannot save all the domains for that project.',
    },
  ],
};

//#endregion

const ProjectName = ({ name }: { name: string | string[] }) => {
  if (typeof name === 'string') {
    return <p dangerouslySetInnerHTML={{ __html: name }} />;
  }
  if (Array.isArray(name)) {
    return name.map((n, index) => {
      return <ProjectName key={`${n}-${index}`} name={n} />;
    });
  }
  return null;
};

const ProjectSize = ({ size }: { size: string | string[] }) => {
  if (typeof size === 'string') {
    return <p dangerouslySetInnerHTML={{ __html: size }} />;
  }

  if (size?.length) {
    return (
      <ul className="p-0 m-0">
        {size.map((s) => {
          return (
            <li key={`${s}`} className="whitespace-nowrap">
              {s}
            </li>
          );
        })}
      </ul>
    );
  }

  return null;
};
const ProjectSection = ({
  title,
  projects,
}: {
  title: string;
  projects: Project[];
}) => {
  return (
    <div className={styles.project}>
      <h4 className={clsx(styles.subtitle, styles.note)}>{title}</h4>
      <table className={clsx(styles.table, styles.bordered)}>
        <tbody>
          <tr>
            <th>App/Tool Name</th>
            <th>Team size</th>
            <th>Detail</th>
          </tr>
          {projects.map((project, index) => {
            const { name, size, detail, note } = project;
            return (
              <tr key={index.toString()}>
                <td>
                  <ProjectName name={name} />
                </td>
                <td>
                  <ProjectSize size={size} />
                </td>
                <td>
                  <ul className={styles.list}>
                    {detail.map((lv0, lv0Index) => {
                      if (typeof lv0 === 'string') {
                        return (
                          <li
                            key={lv0Index.toString()}
                            dangerouslySetInnerHTML={{ __html: lv0 }}
                          />
                        );
                      }
                      return Object.keys(lv0).map((lv1, lv1Index) => {
                        const lv2s = lv0[lv1];
                        return (
                          <li key={`${lv1Index}`}>
                            <span dangerouslySetInnerHTML={{ __html: lv1 }} />
                            <ul className={styles.list}>
                              {lv2s.map((lv2, lv2Index) => {
                                return (
                                  <li
                                    key={`${lv1Index}-${lv2Index}`}
                                    dangerouslySetInnerHTML={{ __html: lv2 }}
                                  />
                                );
                              })}
                            </ul>
                          </li>
                        );
                      });
                    })}
                  </ul>
                  {!!note && <p dangerouslySetInnerHTML={{ __html: note }} />}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
export const CV: FC = () => {
  return (
    <div className={styles.main}>
      <div
        className={clsx(
          styles.cv
          // MontserratFont.variable,
          // Libre_BodoniFont.variable
        )}
      >
        {/* ******************************************* INFO ************************************************ */}
        <div className={clsx(styles.container, styles.infos)}>
          <h1 className={styles.name}>NGUYEN THIEN NHAN</h1>
          <div className={styles.divider} />
          <div className={styles.infoContainer}>
            <div className={styles.infoLeft}>
              <h3 className={styles.position}>Senior Front-End Engineer</h3>
              <ul className={styles.list}>
                {Object.keys(infos).map((k, itemIndex) => {
                  const key = k as keyof typeof infos;
                  const children = infos[key];
                  return (
                    <li key={itemIndex.toString()} className={styles.item}>
                      <label className={styles.label}>{key}:</label>
                      <span className={styles.value}>{children}</span>
                    </li>
                  );
                })}
              </ul>
            </div>
            <div className={styles.infoRight}>
              <a href="/">
                <div className={styles.avatar}>
                  <img
                    src="/CV-avatar.jpg"
                    alt="Nguyen Thien Nhan"
                    className={styles.avatarImg}
                  />
                </div>
              </a>
            </div>
          </div>
        </div>
        {/* ******************************************* OBJECTIVE ******************************************* */}
        <div className={clsx(styles.container, styles.objectives)}>
          <h2 className={styles.title}>OBJECTIVE</h2>
          <div className={styles.divider} />
          <ul className={styles.list}>
            {objectives.map((item, itemIndex) => {
              return (
                <li
                  key={itemIndex.toString()}
                  dangerouslySetInnerHTML={{ __html: item }}
                />
              );
            })}
          </ul>
        </div>
        {/* ******************************************* WORK EXPERIENCE ******************************************* */}
        <div className={clsx(styles.container, styles.workExperiences)}>
          <h2 className={styles.title}>WORK EXPERIENCE</h2>
          <div className={styles.divider} />
          <table className={styles.table}>
            <tbody>
              {Object.keys(workExperiences).map((k, index) => {
                const key = k as keyof typeof workExperiences;
                const value = workExperiences[key];
                return (
                  <tr key={index.toString()}>
                    <th className={clsx(styles.head30, styles.subtitle)}>
                      {key}
                    </th>
                    <td className={styles.col}>
                      <h4 className={styles.subtitle}>{value.company}</h4>
                      <p className={styles.description}>
                        My position: {value.position}
                      </p>
                      <h6 className={styles.listTitle}>
                        Main responsibilities:
                      </h6>
                      <ul className={styles.list}>
                        {value.list.map((item, itemIndex) => {
                          return (
                            <li
                              key={itemIndex.toString()}
                              dangerouslySetInnerHTML={{ __html: item }}
                            />
                          );
                        })}
                      </ul>
                      {Object.keys(workExperiences).length - 1 > index && (
                        <div className={styles.divider} />
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        {/* ******************************************* PROJECTS ******************************************* */}
        <div className={clsx(styles.container, styles.projects)}>
          <h2 className={styles.title}>PROJECTS</h2>
          <div className={styles.divider} />
          {Object.keys(projects).map((title, index) => {
            const prjs = projects[title as keyof typeof projects];
            return (
              <ProjectSection key={`${index}`} title={title} projects={prjs} />
            );
          })}
        </div>
        {/* ******************************************* SKILLS ******************************************* */}
        <div className={clsx(styles.container, styles.skills)}>
          <h2 className={styles.title}>SKILLS</h2>
          <div className={styles.divider} />
          {Object.keys(skills).map((k, index) => {
            const key = k as keyof typeof skills;
            const list = skills[key];
            return (
              <div key={index.toString()} className={styles.skill}>
                <h4 className={styles.subtitle}>{key}</h4>
                <ul className={styles.list}>
                  {list.map((item, itemIndex) => {
                    return (
                      <li
                        key={itemIndex.toString()}
                        dangerouslySetInnerHTML={{ __html: item }}
                      />
                    );
                  })}
                </ul>
              </div>
            );
          })}
        </div>
        {/* ******************************************* EDUCATION ******************************************* */}
        <div className={clsx(styles.container, styles.educations)}>
          <h2 className={styles.title}>EDUCATION</h2>
          <div className={styles.divider} />
          <table className={styles.table}>
            <tbody>
              {Object.keys(educations).map((k, index) => {
                const key = k as keyof typeof educations;
                const value = educations[key];
                return (
                  <tr key={index.toString()}>
                    <th className={styles.head40}>{key}</th>
                    <td className={styles.col}>
                      <h4 className={styles.subtitle}>{value.title}</h4>
                      <ul className={styles.list}>
                        {value.list.map((item, itemIndex) => {
                          return (
                            <li
                              key={itemIndex.toString()}
                              dangerouslySetInnerHTML={{ __html: item }}
                            />
                          );
                        })}
                      </ul>
                      {Object.keys(educations).length - 1 > index && (
                        <div className={styles.divider} />
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
