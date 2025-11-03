import { Home, Users, Calendar, Bell, MessageSquare, Activity } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarHeader,
} from '@/components/ui/sidebar';

const menuItems = [
  { title: 'Dashboard', url: '/', icon: Home },
  { title: 'Family Members', url: '/members', icon: Users },
  { title: 'Appointments', url: '/appointments', icon: Calendar },
  { title: 'Reminders', url: '/reminders', icon: Bell },
  { title: 'VitaBot', url: '/vitabot', icon: MessageSquare },
  { title: 'Activity', url: '/activity', icon: Activity },
];

export function AppSidebar() {
  return (
    <Sidebar className="border-r border-border/50 backdrop-blur-xl">
      <SidebarHeader className="border-b border-border/30 p-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/30 to-accent/20 flex items-center justify-center glow-border-primary shadow-[0_0_20px_rgba(0,212,255,0.3)]">
            <Activity className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h1 className="text-xl font-bold glow-text-primary">VitalSense</h1>
            <p className="text-xs text-muted-foreground font-medium">AI Health Companion</p>
          </div>
        </div>
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-muted-foreground text-xs uppercase tracking-wider">
            Main Menu
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <NavLink 
                    to={item.url}
                    end={item.url === '/'}
                    className={({ isActive }) => 
                      `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                        isActive 
                          ? 'bg-primary/15 text-primary border border-primary/40 shadow-[0_0_20px_rgba(0,212,255,0.25)]' 
                          : 'text-muted-foreground hover:bg-muted/30 hover:text-foreground hover:border hover:border-border/30'
                      }`
                    }
                  >
                    <item.icon className="w-5 h-5" />
                    <span className="font-medium">{item.title}</span>
                  </NavLink>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
