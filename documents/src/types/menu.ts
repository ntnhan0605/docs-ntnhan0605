import type { ReactNode } from 'react'
import type { IMuiSvgIcon } from './routes'

export type IMenuItem = {
  key: string
  label: string | ReactNode
  href?: string
  icon?: IMuiSvgIcon
  onClick?: () => void
  children?: IMenuItem[]
  itemId?: string
}
