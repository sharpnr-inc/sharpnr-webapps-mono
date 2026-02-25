import { Link, useMatches } from '@tanstack/react-router'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Fragment } from 'react'



export function RouteBreadcrumbs() {
  const matches = useMatches();

  const breadcrumbs = matches
    .filter((match) => Boolean((match.staticData as any)?.breadcrumb))
    .map((match) => ({
      title: (match.staticData as any).breadcrumb,
      path: match.pathname,
    }))
    // Optional: Filter out duplicate paths (e.g., if parent and index child have same path)
    .filter((value, index, self) => 
      index === self.findIndex((t) => t.path === value.path)
    );

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {breadcrumbs.map((bc, index) => {
          const isLast = index === breadcrumbs.length - 1;
          return (
            <Fragment key={index}>
              <BreadcrumbItem>
                {isLast ? (
                  <BreadcrumbPage>{bc.title}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink asChild>
                    <Link to={bc.path}>{bc.title}</Link>
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
              {!isLast && <BreadcrumbSeparator />}
            </Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}