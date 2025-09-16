import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Bell, 
  Check, 
  CheckCheck, 
  Clock, 
  AlertCircle, 
  Info, 
  Calendar,
  Video,
  Users,
  Star,
  Trash2
} from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface NotificationItem {
  id: number;
  title: string;
  message: string;
  type: 'announcement' | 'class' | 'video' | 'system' | 'urgent';
  timestamp: string;
  isRead: boolean;
  isImportant: boolean;
}

const Notifications = () => {
  const [notifications, setNotifications] = useState<NotificationItem[]>([
    {
      id: 1,
      title: 'Holiday Schedule Update',
      message: 'Classes will be rescheduled for next week due to studio maintenance. New schedule will be posted tomorrow.',
      type: 'urgent',
      timestamp: '2024-01-15T14:30:00Z',
      isRead: false,
      isImportant: true
    },
    {
      id: 2,
      title: 'New Video Upload: Floor Work Techniques',
      message: 'Sarah Chen has uploaded a new tutorial focusing on contemporary floor work fundamentals.',
      type: 'video',
      timestamp: '2024-01-14T18:45:00Z',
      isRead: false,
      isImportant: false
    },
    {
      id: 3,
      title: 'Class Reminder: Contemporary Advanced',
      message: 'Your Contemporary Advanced class with Sarah Chen starts in 2 hours (6:00 PM, Studio A).',
      type: 'class',
      timestamp: '2024-01-14T16:00:00Z',
      isRead: true,
      isImportant: false
    },
    {
      id: 4,
      title: 'Performance Showcase Auditions',
      message: 'Auditions for the spring performance showcase are open! Sign up by January 25th.',
      type: 'announcement',
      timestamp: '2024-01-13T10:00:00Z',
      isRead: false,
      isImportant: true
    },
    {
      id: 5,
      title: 'Welcome to Dance Academy!',
      message: 'Welcome to your student portal! Here you can track attendance, watch tutorials, and stay updated.',
      type: 'system',
      timestamp: '2024-01-12T09:00:00Z',
      isRead: true,
      isImportant: false
    },
    {
      id: 6,
      title: 'Master Class with Guest Artist',
      message: 'Join us for a special master class with renowned choreographer Maria Santos on January 28th.',
      type: 'announcement',
      timestamp: '2024-01-11T15:20:00Z',
      isRead: true,
      isImportant: true
    },
    {
      id: 7,
      title: 'Makeup Class Available',
      message: 'A makeup session for last week\'s cancelled Contemporary class is scheduled for this Saturday.',
      type: 'class',
      timestamp: '2024-01-10T11:30:00Z',
      isRead: true,
      isImportant: false
    },
    {
      id: 8,
      title: 'New Conditioning Video Series',
      message: 'Elena Petrov has started a new conditioning video series. Check out the first episode!',
      type: 'video',
      timestamp: '2024-01-09T20:15:00Z',
      isRead: true,
      isImportant: false
    }
  ]);

  const getTypeIcon = (type: string) => {
    const icons = {
      announcement: <Bell className="w-4 h-4" />,
      class: <Calendar className="w-4 h-4" />,
      video: <Video className="w-4 h-4" />,
      system: <Info className="w-4 h-4" />,
      urgent: <AlertCircle className="w-4 h-4" />
    };
    return icons[type as keyof typeof icons] || <Bell className="w-4 h-4" />;
  };

  const getTypeColor = (type: string) => {
    const colors = {
      announcement: 'text-blue-500',
      class: 'text-green-500',
      video: 'text-purple-500',
      system: 'text-gray-500',
      urgent: 'text-red-500'
    };
    return colors[type as keyof typeof colors] || 'text-gray-500';
  };

  const getTypeBadge = (type: string) => {
    const variants = {
      announcement: 'default',
      class: 'secondary',
      video: 'outline',
      system: 'outline',
      urgent: 'destructive'
    } as const;
    
    return (
      <Badge variant={variants[type as keyof typeof variants] || 'default'} className="capitalize">
        {type}
      </Badge>
    );
  };

  const markAsRead = (id: number) => {
    setNotifications(prev =>
      prev.map(notif =>
        notif.id === id ? { ...notif, isRead: true } : notif
      )
    );
    toast({
      title: "Notification marked as read",
    });
  };

  const markAllAsRead = () => {
    setNotifications(prev =>
      prev.map(notif => ({ ...notif, isRead: true }))
    );
    toast({
      title: "All notifications marked as read",
    });
  };

  const deleteNotification = (id: number) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
    toast({
      title: "Notification deleted",
    });
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) {
      const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
      return `${diffInMinutes} minutes ago`;
    } else if (diffInHours < 24) {
      return `${diffInHours} hours ago`;
    } else {
      const diffInDays = Math.floor(diffInHours / 24);
      return `${diffInDays} days ago`;
    }
  };

  const unreadNotifications = notifications.filter(n => !n.isRead);
  const importantNotifications = notifications.filter(n => n.isImportant);

  const NotificationCard = ({ notification, index }: { notification: NotificationItem, index: number }) => (
    <Card 
      className={`dance-card transition-all duration-300 hover:shadow-lg ${
        !notification.isRead ? 'border-l-4 border-l-primary bg-accent/30' : ''
      }`}
      style={{animationDelay: `${index * 0.05}s`}}
    >
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-start space-x-3 flex-1">
            <div className={`${getTypeColor(notification.type)} mt-1`}>
              {getTypeIcon(notification.type)}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-2 mb-1">
                <h3 className={`font-semibold text-sm ${!notification.isRead ? 'text-foreground' : 'text-muted-foreground'}`}>
                  {notification.title}
                </h3>
                {notification.isImportant && (
                  <Star className="w-4 h-4 text-yellow-500 fill-current" />
                )}
                {!notification.isRead && (
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                )}
              </div>
              <p className="text-sm text-muted-foreground mb-3">
                {notification.message}
              </p>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  {getTypeBadge(notification.type)}
                  <div className="flex items-center text-xs text-muted-foreground">
                    <Clock className="w-3 h-3 mr-1" />
                    {formatTimestamp(notification.timestamp)}
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-2 ml-4">
            {!notification.isRead && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => markAsRead(notification.id)}
                className="h-8 w-8 p-0 hover:bg-primary/10"
              >
                <Check className="w-4 h-4" />
              </Button>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => deleteNotification(notification.id)}
              className="h-8 w-8 p-0 text-destructive hover:bg-destructive/10"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="p-6 space-y-6">
      <div className="fade-in-up">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Notifications</h1>
            <p className="text-muted-foreground">Stay updated with academy announcements and class updates</p>
          </div>
          {unreadNotifications.length > 0 && (
            <Button onClick={markAllAsRead} className="dance-button">
              <CheckCheck className="w-4 h-4 mr-2" />
              Mark All Read
            </Button>
          )}
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="dance-card slide-in-left">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-primary mb-1">{unreadNotifications.length}</div>
            <p className="text-sm text-muted-foreground">Unread</p>
          </CardContent>
        </Card>
        
        <Card className="dance-card slide-in-left" style={{animationDelay: '0.1s'}}>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-yellow-600 mb-1">{importantNotifications.length}</div>
            <p className="text-sm text-muted-foreground">Important</p>
          </CardContent>
        </Card>
        
        <Card className="dance-card slide-in-left" style={{animationDelay: '0.2s'}}>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-secondary mb-1">{notifications.length}</div>
            <p className="text-sm text-muted-foreground">Total</p>
          </CardContent>
        </Card>
      </div>

      {/* Notifications Content */}
      <Tabs defaultValue="all" className="fade-in-up">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="all">All ({notifications.length})</TabsTrigger>
          <TabsTrigger value="unread">Unread ({unreadNotifications.length})</TabsTrigger>
          <TabsTrigger value="important">Important ({importantNotifications.length})</TabsTrigger>
          <TabsTrigger value="announcements">Announcements</TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          <div className="space-y-4">
            {notifications.length === 0 ? (
              <Card className="dance-card">
                <CardContent className="p-12 text-center">
                  <Bell className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No notifications</h3>
                  <p className="text-muted-foreground">You're all caught up!</p>
                </CardContent>
              </Card>
            ) : (
              notifications.map((notification, index) => (
                <NotificationCard key={notification.id} notification={notification} index={index} />
              ))
            )}
          </div>
        </TabsContent>

        <TabsContent value="unread">
          <div className="space-y-4">
            {unreadNotifications.length === 0 ? (
              <Card className="dance-card">
                <CardContent className="p-12 text-center">
                  <CheckCheck className="w-16 h-16 text-green-500 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">All caught up!</h3>
                  <p className="text-muted-foreground">No unread notifications</p>
                </CardContent>
              </Card>
            ) : (
              unreadNotifications.map((notification, index) => (
                <NotificationCard key={notification.id} notification={notification} index={index} />
              ))
            )}
          </div>
        </TabsContent>

        <TabsContent value="important">
          <div className="space-y-4">
            {importantNotifications.length === 0 ? (
              <Card className="dance-card">
                <CardContent className="p-12 text-center">
                  <Star className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No important notifications</h3>
                  <p className="text-muted-foreground">Nothing urgent at the moment</p>
                </CardContent>
              </Card>
            ) : (
              importantNotifications.map((notification, index) => (
                <NotificationCard key={notification.id} notification={notification} index={index} />
              ))
            )}
          </div>
        </TabsContent>

        <TabsContent value="announcements">
          <div className="space-y-4">
            {notifications
              .filter(n => n.type === 'announcement' || n.type === 'urgent')
              .map((notification, index) => (
                <NotificationCard key={notification.id} notification={notification} index={index} />
              ))
            }
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Notifications;