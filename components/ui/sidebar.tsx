"use client"

import Link from "next/link"
import { cn } from "@/lib/utils"
import { ThemeToggle } from "@/components/theme-toggle"

import {
  LayoutGrid,
  BookOpen,
  CheckCircle,
  Users,
  FileText,
  Settings,
  LogOut,
  Home,
} from "lucide-react"

const navLinks = [
  // {
  //   href: "/dashboard/",
  //   label: "Home",
  //   icon: Home,
  // },
  {
    href: "/dashboard/quizzes",
    label: "Quizzes",
    icon: LayoutGrid,
  },
  // {
  //   href: "/dashboard/sessions",
  //   label: "Sessions",
  //   icon: BookOpen,
  // },
  // {
  //   href: "/dashboard/results",
  //   label: "Results",
  //   icon: CheckCircle,
  // },
  // {
  //   href: "/dashboard/masters",
  //   label: "Masters",
  //   icon: Users,
  // },
  // {
  //   href: "/dashboard/feedback",
  //   label: "Feedback",
  //   icon: FileText,
  // },
]

const Sidebar = () => {
  return (
    <aside className="flex flex-col h-screen w-64 bg-background border-r border-border justify-between">
      {/* Top profile section */}
      <div>
        <div className="px-6 py-5 border-b border-border">
          <div className="font-medium text-foreground">QuizMaster</div>
          <div className="text-xs text-muted-foreground truncate">support@quizmast.com</div>
        </div>
        <nav className="flex flex-col gap-1 p-2">
          {navLinks.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex items-center gap-3 px-4 py-2 rounded-lg font-medium text-sm transition-colors",
                "hover:bg-accent hover:text-accent-foreground",
                // Optionally: highlight active link
                // pathname === href ? "bg-primary/10 text-primary" : "text-muted-foreground"
                "text-muted-foreground"
              )}
            >
              <Icon className="h-5 w-5" />
              <span>{label}</span>
            </Link>
          ))}
        </nav>
      </div>
      {/* Bottom section */}
      <div className="space-y-2 p-2">
        <div className="px-2">
          <ThemeToggle />
        </div>
        <div className="border-t border-border pt-2">
          <Link
            href="#"
            className="flex items-center gap-3 px-4 py-2 rounded-lg text-sm text-muted-foreground hover:bg-accent hover:text-accent-foreground"
          >
            <Settings className="h-4 w-4" />
            Preferences
          </Link>
          <Link
            href="#"
            className="flex items-center gap-3 px-4 py-2 rounded-lg text-sm text-muted-foreground hover:bg-accent hover:text-accent-foreground"
          >
            <LogOut className="h-4 w-4" />
            Sign out
          </Link>
        </div>
      </div>
    </aside>
  )
}


export default Sidebar
