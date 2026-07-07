"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import {
  FiMenu,
  FiSun,
  FiMoon,
  FiLogOut,
  FiGrid,
  FiUsers,
  FiSettings,
  FiUser,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";
import { useAuthStore } from "@/store/auth.store";
import { useSidebarStore } from "@/store/sidebar.store";
import { AuthService } from "@/services/auth.service";
import { Button } from "@/components/ui/button";
import { Drawer, DrawerContent } from "@/components/ui/drawer";
import { APP_ROUTES } from "@/lib/constants";
import { cn } from "@/lib/utils";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const { user, clearAuth } = useAuthStore();
  const { isOpen, toggle, setOpen } = useSidebarStore();
  const [isMobileOpen, setIsMobileOpen] = React.useState(false);
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const handleLogout = async () => {
    try {
      await AuthService.logout();
    } catch (e) {
      console.error("Logout API failed, forcing state clear", e);
    } finally {
      clearAuth();
      router.push(APP_ROUTES.HOME);
    }
  };

  const menuItems = [
    {
      label: "Tổng Quan",
      path: APP_ROUTES.DASHBOARD,
      icon: <FiGrid className="w-5 h-5" />,
    },
    {
      label: "Thành Viên",
      path: "/dashboard/users",
      icon: <FiUsers className="w-5 h-5" />,
    },
    {
      label: "Tài Khoản",
      path: APP_ROUTES.PROFILE,
      icon: <FiUser className="w-5 h-5" />,
    },
    {
      label: "Cấu Hình",
      path: APP_ROUTES.SETTINGS,
      icon: <FiSettings className="w-5 h-5" />,
    },
  ];

  const sidebarContent = (
    <div className="flex flex-col h-full bg-pure-surface dark:bg-zinc-950 text-on-surface">
      {/* Sidebar Header */}
      <div className="flex items-center justify-between h-20 px-6 border-b border-whisper-border/50">
        <Link
          href={APP_ROUTES.HOME}
          className="font-bold text-xl tracking-tighter text-black dark:text-white"
        >
          VDCD <span className="text-accent-red">Group</span>
        </Link>
        <span className="hidden md:inline-block text-[10px] font-mono-label font-bold px-2 py-0.5 rounded bg-success/10 text-accent-red uppercase">
          Portal
        </span>
      </div>

      {/* Nav Menu */}
      <nav className="flex-1 px-4 py-6 space-y-2">
        {menuItems.map((item) => (
          <Link
            key={item.label}
            href={item.path}
            className={cn(
              "flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-300 font-mono-label text-xs uppercase tracking-wider text-secondary hover:text-accent-red hover:bg-secondary/5 dark:hover:bg-zinc-900/50",
              pathname === item.path &&
                "bg-success/5 text-accent-red dark:bg-zinc-900",
            )}
          >
            {item.icon}
            <span className={cn("transition-opacity", !isOpen && "md:hidden")}>
              {item.label}
            </span>
          </Link>
        ))}{" "}
      </nav>

      {/* Sidebar Footer */}
      <div className="p-4 border-t border-whisper-border/50">
        <div
          className={cn(
            "flex items-center gap-3 mb-4 px-2",
            !isOpen && "md:hidden",
          )}
        >
          <div className="w-10 h-10 rounded-full bg-success/15 flex items-center justify-center text-accent-red font-bold">
            {user?.name?.charAt(0) || "U"}
          </div>
          <div className="overflow-hidden">
            <h4 className="text-sm font-bold truncate text-black dark:text-white">
              {user?.name || "User"}
            </h4>
            <p className="text-[10px] text-secondary truncate font-mono">
              {user?.email || ""}
            </p>
          </div>
        </div>

        <Button
          onClick={handleLogout}
          color="danger"
          variant="flat"
          className="w-full font-mono-label text-xs uppercase tracking-wider justify-start px-4"
          trailingIcon={<FiLogOut className="w-4 h-4 ml-auto" />}
        >
          <span className={cn(!isOpen && "md:hidden")}>Đăng xuất</span>
        </Button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex bg-canvas-white dark:bg-zinc-900 transition-colors duration-300">
      {/* Desktop Sidebar */}
      <aside
        className={cn(
          "hidden md:block border-r border-whisper-border/50 fixed top-0 bottom-0 left-0 z-20 transition-all duration-300",
          isOpen ? "w-64" : "w-20",
        )}
      >
        {sidebarContent}
      </aside>

      {/* Mobile Drawer */}
      <Drawer isOpen={isMobileOpen} onClose={() => setIsMobileOpen(false)}>
        <DrawerContent className="p-0">
          <div className="w-64 h-full">{sidebarContent}</div>
        </DrawerContent>
      </Drawer>

      {/* Page Content Area */}
      <div
        className={cn(
          "flex-1 flex flex-col min-w-0 transition-all duration-300",
          isOpen ? "md:pl-64" : "md:pl-20",
        )}
      >
        {/* Dashboard Header */}
        <header className="h-20 bg-pure-surface dark:bg-zinc-950 border-b border-whisper-border/50 flex items-center justify-between px-6 z-10 sticky top-0 transition-colors duration-300">
          <div className="flex items-center gap-4">
            {/* Mobile Toggle */}
            <Button
              isIconOnly
              variant="light"
              className="md:hidden text-secondary"
              onClick={() => setIsMobileOpen(true)}
            >
              <FiMenu className="w-5 h-5" />
            </Button>

            {/* Desktop Toggle */}
            <Button
              isIconOnly
              variant="light"
              className="hidden md:flex text-secondary"
              onClick={toggle}
            >
              {isOpen ? (
                <FiChevronLeft className="w-5 h-5" />
              ) : (
                <FiChevronRight className="w-5 h-5" />
              )}
            </Button>

            <h1 className="text-xl font-bold tracking-tighter text-black dark:text-white">
              Hệ thống Điều hành
            </h1>
          </div>

          <div className="flex items-center gap-4">
            {/* Theme Toggle */}
            {mounted && (
              <Button
                isIconOnly
                variant="light"
                radius="full"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                aria-label="Toggle Theme"
                className="text-secondary"
              >
                {theme === "dark" ? (
                  <FiSun className="w-5 h-5" />
                ) : (
                  <FiMoon className="w-5 h-5" />
                )}
              </Button>
            )}

            <div className="w-px h-6 bg-whisper-border/50" />

            <div className="flex items-center gap-2">
              <span className="hidden sm:inline-block text-xs font-mono font-bold text-secondary">
                {user?.role === "admin" ? "ADMIN" : "USER"}
              </span>
              <div className="w-8 h-8 rounded-full bg-success/15 flex items-center justify-center text-accent-red font-bold">
                {user?.name?.charAt(0) || "U"}
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Main Workspace */}
        <main className="flex-1 p-6 md:p-8 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
