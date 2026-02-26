import { MarkdownComponent } from '@/components/MarkdownComponent'
import { SvgIcon } from '@mui/material'
import Chip from '@mui/material/Chip'
import { grey } from '@mui/material/colors'
import Divider from '@mui/material/Divider'
import Link from '@mui/material/Link'
import Stack from '@mui/material/Stack'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import clsx from 'clsx'
import { Github, Linkedin, Mail, Phone } from 'lucide-react'
import type { CSSProperties, FC, ReactNode } from 'react'
import { Fragment } from 'react'
import educations from './resumeDB/educations.json'
import experiences from './resumeDB/experiences.json'
import projects from './resumeDB/projects.json'

const resumeTheme = createTheme({
  typography: {
    /** Name */
    h1: {
      fontFamily: '"Poppins", sans-serif',
      fontSize: 32,
      fontWeight: 700,
    },

    /** Section Headings */
    h2: {
      paddingBottom: 4,
      fontFamily: '"Poppins", sans-serif',
      fontSize: 18,
      fontWeight: 600,
    },

    /** Job title / Company */
    h3: {
      fontFamily: '"Poppins", sans-serif',
      fontSize: 16,
      fontWeight: 500,
      verticalAlign: 'middle',
    },

    /** Body Text / Bullet Points */
    body1: {
      color: grey[800],
      fontFamily: '"Lato", sans-serif',
      fontSize: 15,
      fontWeight: 400,
      letterSpacing: '1.2px',
    },

    /** Dates / Locations */
    body2: {
      fontFamily: '"Lato", sans-serif',
      fontSize: 14.5,
      fontWeight: 300,
      fontStyle: 'italic',
      verticalAlign: 'middle',
    },
  },

  components: {
    MuiDivider: {
      styleOverrides: {
        root: {
          borderColor: grey[400],
        },
      },
    },
    MuiLink: {
      styleOverrides: {
        root: {
          color: grey[800],
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          border: `1px solid ${grey[500]}`,
          borderRadius: 6,
          gap: 1,
          '&:has(.only-icon)': {
            width: 24,
            display: 'flex',
            jusitifyContent: 'center',
          },
        },
        label: {
          display: 'flex',
          gap: 1,
          alignItems: 'center',
          '&:has(.only-icon)': {
            paddingInline: 0,
            svg: {
              fontSize: 15,
            },
          },
        },
        sizeSmall: {
          height: 24,
          backgroundColor: 'transparent',
          fontSize: 13,
          svg: {
            fontSize: 14,
          },
        },
      },
    },
  },
})

export const ResumePage: FC = () => {
  return (
    <ThemeProvider theme={resumeTheme}>
      <Typography
        component="div"
        marginInline="auto"
        maxWidth={1024}
        padding={2}
      >
        <ResumeSectionHeader className="section" />
        <ResumeSectionExperience className="section mt-6" />
        <ResumeSectionProject className="section mt-6" />
        <ResumeSectionEducation className="section mt-6" />
      </Typography>
    </ThemeProvider>
  )
}

const SectionMarkdown: FC<{
  content?: string | Array<{ name: string; href: string }>
}> = ({ content }) => {
  if (!content) {
    return null
  }
  if (typeof content === 'string') {
    return <MarkdownComponent>{content}</MarkdownComponent>
  }
  return (
    <>
      {content.map(({ name, href }, i) => (
        <Fragment key={`${i}-${name}`}>
          <Link href={href} target="_blank">
            {name}
          </Link>
          {i < content.length - 1 && ' | '}
        </Fragment>
      ))}
    </>
  )
}

const SectionItem: FC<{
  name: string | ReactNode
  location: string | ReactNode
  items?: Array<{
    left: string | ReactNode
    right?: string | ReactNode
    children?: string | ReactNode
  }>
  className?: string
  style?: CSSProperties
}> = ({ name, location, items, className, style }) => {
  const CLS = 'SectionItem'
  return (
    <div className={clsx(CLS, '[&+&]:mt-4', className)} style={style}>
      <div className="flex items-center justify-between">
        <Typography variant="h3" className={`${CLS}_name`}>
          {name}
        </Typography>
        <Typography variant="body2" className={`${CLS}_location`}>
          {location}
        </Typography>
      </div>
      {!!items?.length && (
        <div className={clsx(`${CLS}_items`, 'mt-1')}>
          {items.map(({ left, right, children }, idx) => {
            return (
              <div key={`${idx}`} className="[&+&]:mt-2">
                <div className="flex items-center justify-between">
                  <Typography className={clsx(`${CLS}_left`, 'italic')}>
                    {left}
                  </Typography>
                  <Typography
                    variant="body2"
                    className={clsx(`${CLS}_right`, 'font-semibold!')}
                  >
                    {right}
                  </Typography>
                </div>
                {children}
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

const SectionItemList: FC<{
  items?: Array<string | Record<string, Array<string>>>
  isChildren?: boolean
  className?: string
  style?: CSSProperties
}> = ({ items, isChildren, className, style }) => {
  const CLS = 'SectionItems'
  if (!items || !items.length) {
    return null
  }
  return (
    <Typography
      component="ul"
      className={clsx(`${CLS}_list`, className, 'pl-5 [&>li+li]:mt-1', {
        [`${CLS}_children list-[circle]`]: isChildren,
        'list-disc': !isChildren,
      })}
      style={style}
    >
      {items.map((item, idx) => {
        if (typeof item === 'string') {
          return (
            <li
              key={`${item}-${idx}`}
              className={clsx(`${CLS}_item`)}
              dangerouslySetInnerHTML={{ __html: item }}
            />
          )
        }
        return Object.keys(item).map((i) => {
          if (Array.isArray(item[i]) && item[i]?.length) {
            return (
              <li key={`${idx} - ${i}`} className={clsx(`${CLS}_item`)}>
                <Typography
                  component="span"
                  dangerouslySetInnerHTML={{ __html: i }}
                />
                <SectionItemList items={item[i]} isChildren />
              </li>
            )
          }
          return (
            <li
              key={`${idx} - ${i}`}
              className={clsx(`${CLS}_item`)}
              dangerouslySetInnerHTML={{ __html: i }}
            />
          )
        })
      })}
    </Typography>
  )
}

const ResumeSectionHeader: FC<{
  className?: string
  style?: CSSProperties
}> = ({ className, style }) => {
  const CLS = 'section--header'
  return (
    <section className={clsx(CLS, className)} style={style}>
      <div className="flex items-start justify-between">
        <div className={clsx(`${CLS}_left`)}>
          <Typography variant="h1" marginBottom={1}>
            NGUYEN THIEN NHAN
          </Typography>
          <Typography variant="h3" className={clsx(`${CLS}_role`, 'italic')}>
            Front-End Engineer with 7+ years of experience
          </Typography>
          <Typography variant="body2">
            Ho Chi Minh City, Vietnam - GMT+7
          </Typography>
          <Stack direction="row" marginTop={1} gap={0.5}>
            <Chip
              clickable
              bgcolor="transparent"
              size="small"
              href="tel:+84 987 527 544"
              component={Link}
              label={
                <>
                  <Phone size={14} className="mr-0.5" />
                  +84 987 527 544
                </>
              }
            />
            <Chip
              clickable
              bgcolor="transparent"
              size="small"
              href="mailto:ntnhan0605@gmail.com"
              component={Link}
              label={
                <>
                  <Mail size={14} className="mr-0.5" />
                  ntnhan0605@gmail.com
                </>
              }
            />
            <Chip
              clickable
              bgcolor="transparent"
              size="small"
              href="https://www.linkedin.com/in/ntnhan65/"
              component={Link}
              label={<SvgIcon component={Linkedin} className="only-icon" />}
            />
            <Chip
              clickable
              bgcolor="transparent"
              size="small"
              href="https://github.com/ntnhan0605"
              component={Link}
              label={<SvgIcon component={Github} className="only-icon" />}
            />
          </Stack>
        </div>
        <div className={clsx(`${CLS}_right`)}>
          <img
            src="./resume-avatar.jpg"
            alt="Nguyen Thien Nhan - Front-end Engineer"
            className="w-26 h-26 object-cover object-top rounded-lg"
          />
        </div>
      </div>
    </section>
  )
}

const ResumeSectionExperience: FC<{
  className?: string
  style?: CSSProperties
}> = ({ className, style }) => {
  const CLS = 'section--experience'
  return (
    <section className={clsx(CLS, className)} style={style}>
      <Typography component="h2" variant="h2" className={clsx(`${CLS}_title`)}>
        Experiences
      </Typography>
      <Divider />
      <div className={clsx(`${CLS}_list`, 'mt-4')}>
        {experiences.map(({ company, location, terms }, idx) => {
          return (
            <SectionItem
              key={`${idx}`}
              name={company}
              location={location}
              items={terms.map(
                ({ term, employment_type, role, responsibilities }) => ({
                  left: `${role} - ${employment_type}`,
                  right: term,
                  children: !!responsibilities?.length && (
                    <SectionItemList
                      items={responsibilities}
                      className="mt-2"
                    />
                  ),
                }),
              )}
            />
          )
        })}
      </div>
    </section>
  )
}

const ResumeSectionProject: FC<{
  className?: string
  style?: CSSProperties
}> = ({ className, style }) => {
  const CLS = 'section--education'
  return (
    <section className={clsx(CLS, className)} style={style}>
      <Typography component="h2" variant="h2" className={clsx(`${CLS}_title`)}>
        Projects
      </Typography>
      <Divider />
      <div className={clsx(`${CLS}_list`, 'mt-4')}>
        {projects.map(({ company, location, projects }, idx) => {
          return (
            <SectionItem
              key={`${idx}`}
              name={company}
              location={location}
              items={projects.map(({ name, term, details }) => ({
                left: <SectionMarkdown content={name} />,
                right: term,
                children: <SectionItemList items={details} />,
              }))}
            />
          )
        })}
      </div>
    </section>
  )
}

const ResumeSectionEducation: FC<{
  className?: string
  style?: CSSProperties
}> = ({ className, style }) => {
  const CLS = 'section--education'
  return (
    <section className={clsx(CLS, className)} style={style}>
      <Typography component="h2" variant="h2" className={clsx(`${CLS}_title`)}>
        Educations
      </Typography>
      <Divider />
      <div className={clsx(`${CLS}_list`, 'mt-4')}>
        {educations.map(({ school, location, terms }, idx) => {
          return (
            <SectionItem
              key={`${idx}`}
              name={school}
              location={location}
              items={terms.map(({ term, degree, field_of_study, gpa }) => ({
                left: (
                  <>
                    {field_of_study} - {degree}
                    {!!gpa && (
                      <span className="font-semibold"> | GPA: {gpa}</span>
                    )}
                  </>
                ),
                right: term,
              }))}
            />
          )
        })}
      </div>
    </section>
  )
}
