import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { 
  Home, 
  Calendar, 
  Video, 
  BarChart3, 
  Bell, 
  User, 
  LogOut, 
  Music,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { useState } from 'react';

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

const navigationItems = [
  { path: '/dashboard', icon: Home, label: 'Dashboard' },
  { path: '/attendance', icon: BarChart3, label: 'My Attendance' },
  { path: '/videos', icon: Video, label: 'My Videos' },
  { path: '/classes', icon: Calendar, label: 'My Classes' },
  { path: '/notifications', icon: Bell, label: 'Notifications' },
  { path: '/profile', icon: User, label: 'Profile' },
];

const Sidebar: React.FC<SidebarProps> = ({ collapsed, onToggle }) => {
  const { user, logout } = useAuth();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const getNavClasses = (path: string) => {
    const baseClasses = "w-full justify-start transition-all duration-300 group";
    return isActive(path) 
      ? `${baseClasses} bg-primary text-primary-foreground shadow-md`
      : `${baseClasses} hover:bg-accent hover:text-accent-foreground`;
  };

  return (
    <div className={`h-full bg-card border-r border-border transition-all duration-300 ${
      collapsed ? 'w-16' : 'w-64'
    } flex flex-col`}>
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          {!collapsed && (
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                <Music className="w-4 h-4 text-white" />
              </div>
              <span className="font-bold text-lg bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Dance Academy
              </span>
            </div>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggle}
            className="hover:bg-accent"
          >
            {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </Button>
        </div>
      </div>

      {/* User Profile */}
      {user && (
        <div className="p-4 border-b border-border">
          <div className="flex items-center space-x-3">
            <Avatar className="ring-2 ring-primary/20">
              <AvatarImage src={user.profileImage} alt={user.name} />
              <AvatarFallback className="bg-gradient-to-br from-primary to-secondary text-white">
                {user.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            {!collapsed && (
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{user.name}</p>
                <p className="text-xs text-muted-foreground truncate">{user.batch}</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <div className="space-y-2">
          {navigationItems.map((item) => (
            <NavLink key={item.path} to={item.path}>
              <Button
                variant="ghost"
                className={getNavClasses(item.path)}
                size={collapsed ? "sm" : "default"}
              >
                <item.icon className={`w-4 h-4 ${collapsed ? '' : 'mr-3'}`} />
                {!collapsed && (
                  <span className="group-hover:translate-x-1 transition-transform duration-200">
                    {item.label}
                  </span>
                )}
              </Button>
            </NavLink>
          ))}
        </div>
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-border">
        <Button
          variant="ghost"
          className="w-full justify-start text-destructive hover:text-destructive hover:bg-destructive/10"
          onClick={logout}
          size={collapsed ? "sm" : "default"}
        >
          <LogOut className={`w-4 h-4 ${collapsed ? '' : 'mr-3'}`} />
          {!collapsed && 'Logout'}
        </Button>
      </div>
    </div>
  );
};

export default Sidebar;