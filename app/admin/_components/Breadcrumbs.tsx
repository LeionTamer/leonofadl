'use client'

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Fragment } from 'react'

type MappedPathType = {
  url: string
  name: string
}

function Breadcrumbs() {
  const pathName = usePathname().split('/').slice(1, -1)

  if (!pathName) return null

  const pathMap: MappedPathType[] = []
  let currentPath = '/'
  pathName.forEach((path) => {
    currentPath += `${path}/`
    pathMap.push({ url: currentPath, name: path })
  })

  return (
    <div className="mx-auto max-w-5xl py-2">
      <Breadcrumb>
        <BreadcrumbList>
          {pathMap.map((path, index) => (
            <Fragment key={index}>
              {index !== 0 && <BreadcrumbSeparator />}
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href={`${path.url}`}>{path.name}</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
            </Fragment>
          ))}
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  )
}

export default Breadcrumbs
