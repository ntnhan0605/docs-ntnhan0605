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
  'Detail-oriented Front-End Developer with 5+ years of experience in creating responsive and user-centric web applications.',
  'Seeking to leverage expertise in modern frameworks such as React, Vue.js to contribute to dynamic development teams.',
  'Committed to delivering clean, maintainable code with a strong focus on UI/UX design, performance optimization, and continuous learning in the evolving front-end landscape.',
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
    position: 'Senior Front-End developer',
    list: [
      'Developed responsive user interfaces using React and Next.js, styled with MUI, Ant Design, Mantine, and Tailwind CSS.',
      'Collaborated with backend engineers to integrate RESTful APIs.',
      'Support legacy applications and contribute new feature development.',
      'Worked closely with UI designers to implement Figma designs pixel-perfectly.',
    ],
  },
  'Feb 2020 – Apr 2021': {
    company: 'Zivas',
    position: 'Front-End Developer',
    list: [
      'Worked closely with UI designers to implement Figma designs pixel-perfectly.',
      'Created and maintained custom WordPress themes aligned with marketing requirements.',
    ],
  },
  'Aug 2019 – Feb 2020': {
    company: 'Corsiva Lab Pte Ltd',
    position: 'Web Developer',
    list: [
      'Used the TypeRocket framework to build a drag-and-drop page layout system within the WordPress CMS.',
      'Built and updated WordPress themes aligned with marketing specifications, leveraging Elementor and Advanced Custom Fields (ACF).',
    ],
  },
  'Jan 2018 – Aug 2019': {
    company: 'Munkas Agency',
    position: 'Web Developer',
    list: [
      'Implemented UI-driven updates and custom themes for WordPress marketing sites.',
      'Built custom page layouts in WordPress using the Advanced Custom Fields plugin, following provided UI designs.',
    ],
  },
};

const skills: Record<string, string[]> = {
  'Technical skills': [
    'Languages: HTML5, CSS3, JavaScript (ES6+), TypeScript, PHP',
    'Frameworks: React, Next.js, Vue.js',
    'Library: Redux, Zustand, jQuery',
    'Styling: MUI, AntDesign, TailwindCSS, Sass, Bootstrap, CSS Modules, CSS-in-JS',
    'Tools: Git, Webpack, Vite, npm',
    'Others: REST APIs, gRPC, Responsive Design, Figma, Agile/Scrum, Docker, Redis, experience with Ory Hydra',
  ],
  'Soft skills': [
    'Capable of working effectively both in collaborative team environments and independently.',
    'Optimistic and open-minded with strong critical thinking skills and a high level of self-awareness.',
    'Maintain composure and efficiency in high-pressure situations.',
    'Strong planning and time management skills to prioritize tasks and meet deadlines efficiently.',
  ],
};

type Project = {
  name: string[] | string;
  size: number;
  detail: Array<string | Record<string, string[]>>;
  note?: string;
};
const projects: Record<string, Project[]> = {
  '* Project in Hello Health Group': [
    // DISCOVER
    {
      name: [
        'Discover(hellobacsi.com)',
        'Dec 2024 - Now',
        'Senior Front-end Developer',
      ],
      size: 5,
      detail: [
        'Developed data collection forms on client websites, integrated with SIDIS to store submissions in BigQuery.',
        'Built React components that precisely matched Figma UI/UX designs for seamless front-end implementation.',
        'Performed regular maintenance and content updates for established website pages.',
        'Integrated third-party tools (Healthtool, Leadgen, Subot, Sidis) into the website to track user interactions and collect data through the UI',
        'Technial used in projects: ReactJS, NextJS, Zustand, ReactFlow, d3-hierarchy, Typescript, ESlint, Prettier',
      ],
    },
    // SIDIS
    {
      name: ['SIDIS', 'May 2023 - May 2024', 'Senior Front-end Developer'],
      size: 7,
      detail: [
        'Developed a dynamic dashboard using Muuri and Highcharts, allowing users to rearrange analytics widgets via drag-and-drop.',
        'Segmented users from large-scale datasets to enable targeted marketing and personalization.',
        'Set up automated campaigns for multi-channel messaging, including email, web push, app push, SMS, WhatsApp, and Zalo.',
        'Developed visual workflow components using React Flow (node-based editors and interactive diagrams) and Zustand (state management), published them as an <a href="https://www.npmjs.com/package/@ntnhan0605/hhg-workflow" target="_blank" rel="noreferrer">NPM Package</a>, and integrated the package into the SIDIS platform.',
        'Technial used in projects: ReactJS, AntD, D3-Hierarchy, Zustand, TailwindCSS, Muuri, ReactFlow, Recharts, Highcharts, Docker, npm, Typescript, ESlint, Prettier',
      ],
    },
    // HEALTH TOOLS, LEAD TOOLS
    {
      name: [
        'Health tools, Lead tools',
        'Jan 2022 - May 2023',
        'Senior Front-end Developer',
      ],
      size: 6,
      detail: [
        {
          'Maintain and develop feature of internal tools:': [
            'Used Vue.js to configure campaigns that dynamically show or hide lead capture tools based on target URLs.',
            'Worked alongside UX designers to accurately implement Figma designs in building user-facing tools.',
            'Integrated backend APIs to collect data form & tracking from health/lead tools.',
          ],
        },
        'Technical used in projects: ReactJS, Vue.js, NextJS, Typescript, ESlint, Prettier.',
      ],
    },
    // SUBOT/RISK SCREENER
    {
      name: [
        'SUBOT/Risk screener',
        'May 2021 - Jan 2022',
        'Senior Front-end Developer',
      ],
      size: 4,
      detail: [
        {
          'Built admin dashboard and internal tools: ': [
            'Used ReactFlow, AntD to engineered internal systems and dashboards to configure bots for each URL and control question visibility based on user selection.',
            'Translated Figma-based UI/UX designs into pixel-perfect components while collaborating with the design team.',
          ],
        },
        'Developed interactive front-end for Subot and Risk Screener to conditionally show the next question based on user responses.',
        'Technial used in projects: ReactJS, ReactFlow, AntD, Docker, Typescript, ESlint, Prettier.',
      ],
    },
  ],
  '* Projects in Zivas': [
    // CRM Phu Hoang Land
    {
      name: 'CRM Phu Hoang Land',
      size: 3,
      detail: [
        {
          'Engineered UI and integrate API': [
            'Manage customer, department, employeee, project, room booking, meeting, calendar...',
            'Worked alongside UX designers to accurately implement Figma designs in building user-facing tools.',
          ],
        },
        'Technical used in projects: ReactJS, AntD.',
      ],
    },
    // Hotel UEH Edu
    {
      name: [
        '<a href="https://hotel.ueh.edu.vn/vi/" target="_blank">https://hotel.ueh.edu.vn/vi/</a>',
      ],
      size: 2,
      detail: [
        'Developed responsive WordPress themes with pixel-perfect precision from Adobe XD designs.',
        'Technical used in projects: HTML, CSS, JS, jQuery, Swiper, Bootstrap, Wordpress, WPML, TypeRocket, Advanced Custom Field (ACF).',
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
      size: 2,
      detail: [
        'Built custom WordPress themes by accurately translating Adobe XD layouts into code.',
        'Developed flexible, drag-and-drop page layout components in WordPress CMS using TypeRocket.',
        'Technical used in projects: HTML, CSS, JS, jQuery, Swiper, Bootstrap, Wordpress, Woocommerce, TypeRocket, Advanced Custom Field (ACF).',
      ],
    },
    {
      name: '<a href="http://virtualwebdesign.azurewebsites.net/" target="_blank">http://virtualwebdesign.azurewebsites.net/</a>',
      size: 2,
      detail: [
        'Used HTML, CSS, and jQuery to translate Figma designs into responsive, user-friendly tools in close collaboration with UX designers.',
        "Utilized cookies to store and restore users' previous steps in multi-step processes.",
      ],
    },
    {
      name: '<a href="http://payabeachv19.azurewebsites.net/" target="_blank">http://payabeachv19.azurewebsites.net/</a>',
      size: 2,
      detail: [
        'Built custom WordPress themes by accurately translating Adobe XD layouts into code.',
        'Built custom page layout functionality with drag-and-drop capability in WordPress, leveraging the TypeRocket plugin.',
        'Technical used in projects: HTML, CSS, JS, jQuery, Swiper, Bootstrap, Wordpress, Woocommerce, TypeRocket, Advanced Custom Field (ACF).',
      ],
    },
  ],
  '* Project in Munkas': [
    {
      name: '<a href="https://munkas.com/" target="_blank">https://munkas.com/</a>',
      size: 1,
      detail: [
        'Worked alongside UX designers to accurately implement Figma designs in building user-facing tools.',
        'Technical used in projects: HTML, CSS, JS, jQuery, Swiper, Bootstrap, Wordpress, Advanced Custom Field (ACF).',
      ],
      note: '<i><strong>* Note:</strong></i> Munkas Agency is a social media company so each campaign has one website for each project. After the campaign ends, the site is no longer kept. So I cannot save all the domains for that project.',
    },
  ],
};

//#endregion

const ProjectSection = ({
  title,
  projects,
}: {
  title: string;
  projects: Project[];
}) => {
  const ProjectName = ({ name }: { name: string | string[] }) => {
    if (typeof name === 'string') {
      return <p dangerouslySetInnerHTML={{ __html: name }} />;
    }
    if (Array.isArray(name)) {
      return name.map((n, index) => (
        <ProjectName key={`${n}-${index}`} name={n} />
      ));
    }
    return null;
  };

  return (
    <div className={styles.project}>
      <h4 className={clsx(styles.subtitle, styles.note)}>{title}</h4>
      <table className={clsx(styles.table, styles.bordered)}>
        <tbody>
          <tr>
            <th className={styles.head30}>App/Tool Name</th>
            <th className={styles.head10}>Team size</th>
            <th className={styles.head60}>Detail</th>
          </tr>
          {projects.map((project, index) => {
            const { name, size, detail, note } = project;
            return (
              <tr key={index.toString()}>
                <td>
                  <ProjectName name={name} />
                </td>
                <td>{size}</td>
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
              <h3 className={styles.position}>Senior Front-end Developer</h3>
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
              return <li key={itemIndex.toString()}>{item}</li>;
            })}
          </ul>
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
                          return <li key={itemIndex.toString()}>{item}</li>;
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
                    <th className={styles.head30}>{key}</th>
                    <td className={styles.col}>
                      <h4 className={styles.subtitle}>{value.company}</h4>
                      <p className={styles.description}>
                        My position: <strong>{value.position}</strong>
                      </p>
                      <h6 className={styles.listTitle}>
                        Main responsibilities:
                      </h6>
                      <ul className={styles.list}>
                        {value.list.map((item, itemIndex) => {
                          return <li key={itemIndex.toString()}>{item}</li>;
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
                    return <li key={itemIndex.toString()}>{item}</li>;
                  })}
                </ul>
              </div>
            );
          })}
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
      </div>
    </div>
  );
};
