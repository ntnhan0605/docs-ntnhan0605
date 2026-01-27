import { MAIN_MENUITEMS } from '@/constants/menuItems/mainMenuItems'
import { type FC, type PropsWithChildren } from 'react'
import { HeaderMainComponent } from './HeaderMainComponent'

export type LayoutMainComponentProps = {}
export const LayoutMainComponent: FC<
  PropsWithChildren<LayoutMainComponentProps>
> = (props) => {
  const { children } = props

  return (
    <>
      <HeaderMainComponent items={MAIN_MENUITEMS} />
      {children}
    </>
  )
}
