import { Bell, Search, User, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { useAuth } from '@/hooks/useAuth';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export function TopNav() {
  const { signOut, user } = useAuth();

  return (
    <header className="border-b border-border/30 backdrop-blur-xl bg-background/90 sticky top-0 z-50 shadow-[0_4px_20px_rgba(0,0,0,0.3)]">
      <div className="flex items-center justify-between h-16 px-6">
        <div className="flex items-center gap-4 flex-1">
          <SidebarTrigger className="text-foreground hover:text-primary transition-colors" />
          <div className="relative max-w-md w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input 
              placeholder="Search members, records..." 
              className="pl-10 bg-muted/30 border-border/30 focus:border-primary/50 backdrop-blur-sm rounded-xl transition-all"
            />
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <Button 
            variant="ghost" 
            size="icon"
            className="relative hover:bg-primary/10 hover:text-primary transition-all rounded-xl"
          >
            <Bell className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-primary rounded-full animate-glow-pulse shadow-[0_0_8px_rgba(0,212,255,0.8)]" />
          </Button>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="ghost" 
                size="icon"
                className="hover:bg-primary/10 hover:text-primary transition-all rounded-xl"
              >
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary/30 to-accent/30 flex items-center justify-center border border-primary/30">
                  <User className="w-4 h-4" />
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="glass-card border-border/30 backdrop-blur-xl min-w-[200px] z-[60]">
              <DropdownMenuLabel className="text-base font-semibold">
                {user?.email || 'Account'}
              </DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-border/30" />
              <DropdownMenuItem onClick={() => signOut()} className="text-destructive cursor-pointer hover:bg-destructive/10 rounded-lg transition-all">
                <LogOut className="w-4 h-4 mr-2" />
                Sign Out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
