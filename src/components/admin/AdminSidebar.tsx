import * as React from "react"
import {
  LayoutDashboard,
  Package,
  Users,
  ShoppingCart,
  Settings,
  LogOut,
  ChevronRight,
  Sparkles,
  PieChart,
  BarChart3,
  Search,
} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarGroup,
  SidebarGroupLabel,
} from "@/components/ui/sidebar"
import { Link, useLocation } from "react-router-dom"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const data = {
  user: {
    name: "Admin User",
    email: "admin@lumina.com",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=100",
  },
  navMain: [
    {
      title: "ড্যাশবোর্ড",
      url: "/admin",
      icon: LayoutDashboard,
      isActive: true,
      items: [
        { title: "ওভারভিউ", url: "/admin" },
        { title: "অ্যানালিটিক্স", url: "/admin/analytics" },
      ],
    },
    {
      title: "সুগন্ধি ব্যবস্থাপনা",
      url: "/admin/products",
      icon: Package,
      items: [
        { title: "সব প্রোডাক্ট", url: "/admin/products" },
        { title: "নতুন যোগ করুন", url: "/admin/products/new" },
        { title: "ক্যাটাগরি", url: "/admin/categories" },
      ],
    },
    {
      title: "অর্ডার",
      url: "/admin/orders",
      icon: ShoppingCart,
      items: [
        { title: "সব অর্ডার", url: "/admin/orders" },
        { title: "পেন্ডিং", url: "/admin/orders?status=pending" },
      ],
    },
    {
      title: "গ্রাহক",
      url: "/admin/customers",
      icon: Users,
    },
  ],
  secondary: [
    {
      title: "সেটিংস",
      url: "/admin/settings",
      icon: Settings,
    },
  ],
}

export function AdminSidebar() {
  const location = useLocation();

  return (
    <Sidebar variant="inset" className="bg-brand-black border-r border-white/5">
      <SidebarHeader className="p-6">
        <Link to="/" className="flex items-center gap-2">
          <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-brand-gold text-brand-black">
            <Sparkles className="size-4" />
          </div>
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-serif font-bold italic text-white text-lg">লুমিনা</span>
            <span className="truncate text-[10px] uppercase tracking-widest text-brand-gold/60 font-bold">অ্যাডমিন প্যানেল</span>
          </div>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-white/20 text-[10px] uppercase tracking-widest font-bold px-6 mb-2">প্রধান মেনু</SidebarGroupLabel>
          <SidebarMenu className="px-3">
            {data.navMain.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton 
                  asChild 
                  tooltip={item.title}
                  isActive={location.pathname === item.url}
                  className="hover:bg-white/5 hover:text-brand-gold transition-colors py-6"
                >
                  <Link to={item.url}>
                    <item.icon className="size-5" />
                    <span className="font-medium">{item.title}</span>
                  </Link>
                </SidebarMenuButton>
                {item.items && (
                  <SidebarMenuSub>
                    {item.items.map((subItem) => (
                      <SidebarMenuSubItem key={subItem.title}>
                        <SidebarMenuSubButton asChild isActive={location.pathname === subItem.url} className="hover:text-brand-gold">
                          <Link to={subItem.url}>{subItem.title}</Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                )}
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
        
        <SidebarGroup className="mt-auto">
          <SidebarMenu className="px-3">
            {data.secondary.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild size="sm" className="hover:bg-white/5 hover:text-brand-gold py-6">
                  <Link to={item.url}>
                    <item.icon className="size-5" />
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="p-4 border-t border-white/5">
        <SidebarMenu>
          <SidebarMenuItem>
            <div className="flex items-center gap-3 p-2">
              <Avatar className="h-8 w-8 border border-brand-gold/20">
                <AvatarImage src={data.user.avatar} />
                <AvatarFallback className="bg-brand-gold/10 text-brand-gold text-xs">AD</AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-xs leading-tight">
                <span className="truncate font-medium text-white">{data.user.name}</span>
                <span className="truncate text-white/40 text-[10px]">{data.user.email}</span>
              </div>
              <button className="text-white/20 hover:text-red-400 transition-colors">
                <LogOut className="size-4" />
              </button>
            </div>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
