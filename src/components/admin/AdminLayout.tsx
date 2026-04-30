import * as React from "react"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { AdminSidebar } from "./AdminSidebar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import { useLocation, Link } from "react-router-dom"

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  return (
    <SidebarProvider>
      <AdminSidebar />
      <SidebarInset className="bg-brand-black min-h-screen">
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12 border-b border-white/5 bg-brand-black/50 backdrop-blur-md sticky top-0 z-10">
          <div className="flex items-center gap-2 px-4 w-full">
            <SidebarTrigger className="-ml-1 text-brand-gold hover:bg-white/5" />
            <Separator orientation="vertical" className="mr-2 h-4 bg-white/10" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink asChild>
                    <Link to="/admin" className="text-white/40 hover:text-brand-gold text-[10px] uppercase font-bold tracking-widest transition-colors">অ্যাডমিন</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                {pathnames.slice(1).map((value, index) => {
                  const to = `/admin/${pathnames.slice(1, index + 2).join("/")}`;
                  const isLast = index === pathnames.length - 2;

                  return (
                    <React.Fragment key={to}>
                      <BreadcrumbSeparator className="hidden md:block text-white/20" />
                      <BreadcrumbItem>
                        {isLast ? (
                          <BreadcrumbPage className="text-brand-gold text-[10px] uppercase font-bold tracking-widest">{value}</BreadcrumbPage>
                        ) : (
                          <BreadcrumbLink asChild>
                            <Link to={to} className="text-white/40 hover:text-brand-gold text-[10px] uppercase font-bold tracking-widest transition-colors">{value}</Link>
                          </BreadcrumbLink>
                        )}
                      </BreadcrumbItem>
                    </React.Fragment>
                  );
                })}
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-8 p-6 md:p-10">
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
