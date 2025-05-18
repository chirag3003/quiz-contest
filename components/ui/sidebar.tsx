"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/theme-toggle";
import {
	LayoutGrid,
	BookOpen,
	CheckCircle,
	Users,
	FileText,
	Settings,
	LogOut,
	Home,
	Menu,
	X,
} from "lucide-react";
import {
	Sheet,
	SheetContent,
	SheetTrigger,
	SheetClose,
	SheetTitle,
} from "@/components/ui/sheet";

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
];

export function Sidebar() {
	return (
		<aside className="hidden md:flex flex-col h-screen w-64 bg-background border-r border-border justify-between">
			{/* Desktop header */}
			<div className="flex items-center justify-between p-4 border-b">
				<div className="flex items-center space-x-3">
					<div className="h-10 w-10 rounded-full bg-muted" />
					<div>
						<p className="font-medium">John Doe</p>
						<p className="text-sm text-muted-foreground">Admin</p>
					</div>
				</div>
				<ThemeToggle />
			</div>

			{/* Navigation */}
			<nav className="flex-1 overflow-y-auto">
				<ul className="space-y-1">
					{navLinks.map((link) => (
						<li key={link.href}>
							<Link
								href={link.href}
								className="flex items-center px-4 py-3 text-sm font-medium rounded-md hover:bg-muted transition-colors"
							>
								<link.icon className="h-5 w-5 mr-3" />
								{link.label}
							</Link>
						</li>
					))}
				</ul>
			</nav>

			{/* Bottom section */}
			<div className="border-t p-4">
				<button
					type="button"
					className="flex items-center space-x-2 w-full text-sm font-medium text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-md p-3 transition-colors"
				>
					<LogOut className="h-5 w-5" />
					<span>Logout</span>
				</button>
			</div>
		</aside>
	);
}

export function SidebarTrigger() {
	return (
		<Sheet>
			<SheetTrigger asChild>
				<button
					type="button"
					className="flex items-center space-x-2 p-2 rounded-md hover:bg-muted"
				>
					<Menu className="h-5 w-5" />
					<span className="text-sm">Menu</span>
				</button>
			</SheetTrigger>
		</Sheet>
	);
}

export function MobileSidebar() {
	return (
		<Sheet>
			<SheetTrigger asChild>
				<button type="button" className="md:hidden fixed top-4 left-4 z-50 p-2 rounded-md hover:bg-muted">
					<Menu className="h-5 w-5" />
				</button>
			</SheetTrigger>
			<SheetContent side="left" className="w-full max-w-sm p-0">
				<SheetTitle className="sr-only">Navigation Menu</SheetTitle>
				<div className="flex flex-col h-full">
					{/* Mobile header - same as desktop */}
					<div className="flex items-center justify-between p-4 border-b">
						<div className="flex items-center space-x-3">
							<div className="h-10 w-10 rounded-full bg-muted" />
							<div>
								<p className="font-medium">John Doe</p>
								<p className="text-sm text-muted-foreground">Admin</p>
							</div>
						</div>
						<SheetClose asChild>
							<button type="button" className="p-2 rounded-md hover:bg-muted">
								<X className="h-5 w-5" />
							</button>
						</SheetClose>
					</div>
					
					{/* Navigation - same structure as desktop */}
					<nav className="flex-1 overflow-y-auto">
						<ul className="space-y-1 p-4">
							{navLinks.map((link) => (
								<li key={link.href}>
									<SheetClose asChild>
										<Link
											href={link.href}
											className="flex items-center px-4 py-3 text-sm font-medium rounded-md hover:bg-muted transition-colors"
										>
											<link.icon className="h-5 w-5 mr-3" />
											{link.label}
										</Link>
									</SheetClose>
								</li>
							))}
						</ul>
					</nav>
					
					{/* Bottom section - same as desktop */}
					<div className="border-t p-4 space-y-2">
						<div className="flex items-center justify-between px-4 py-3 rounded-md hover:bg-muted transition-colors">
							<span className="text-sm font-medium">Theme</span>
							<ThemeToggle />
						</div>
						<button
							type="button"
							className="flex items-center space-x-2 w-full text-sm font-medium text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-md p-3 transition-colors"
						>
							<LogOut className="h-5 w-5" />
							<span>Logout</span>
						</button>
					</div>
				</div>
			</SheetContent>
		</Sheet>
	);
}

// Default export with both desktop and mobile sidebars
export default function SidebarWrapper() {
  return (
    <>
      <aside className="hidden md:flex flex-col h-screen w-64 bg-background border-r border-border">
        {/* Desktop header */}
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center space-x-3">
            <div className="h-10 w-10 rounded-full bg-muted" />
            <div>
              <p className="font-medium">John Doe</p>
              <p className="text-sm text-muted-foreground">Admin</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto">
          <ul className="space-y-1 p-4">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="flex items-center px-4 py-3 text-sm font-medium rounded-md hover:bg-muted transition-colors"
                >
                  <link.icon className="h-5 w-5 mr-3" />
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Bottom section */}
        <div className="border-t p-4 space-y-2">
          <div className="flex items-center justify-between px-4 py-3 rounded-md hover:bg-muted transition-colors">
            <span className="text-sm font-medium">Theme</span>
            <ThemeToggle />
          </div>
          <button
            type="button"
            className="flex items-center space-x-2 w-full text-sm font-medium text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-md p-3 transition-colors"
          >
            <LogOut className="h-5 w-5" />
            <span>Logout</span>
          </button>
        </div>
      </aside>
      <MobileSidebar />
    </>
  );
}
