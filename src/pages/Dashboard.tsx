import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  Calendar,
  Video,
  Bell,
  BarChart3,
  Clock,
  Users,
  Play,
  TrendingUp,
  Star
} from 'lucide-react';

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  // Mock data
  const attendancePercentage = 87;
  const totalClasses = 24;
  const attendedClasses = 21;
  
  const nextClass = {
    title: 'Contemporary Advanced',
    date: 'Tomorrow',
    time: '6:00 PM',
    instructor: 'Sarah Chen',
    room: 'Studio A'
  };

  const recentVideos = [
    {
      id: 1,
      title: 'Floor Work Techniques',
      instructor: 'Sarah Chen',
      duration: '12:45',
      uploadDate: '2 days ago',
      thumbnail: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=300&h=200&fit=crop'
    },
    {
      id: 2,
      title: 'Arm Movements & Flow',
      instructor: 'Maria Rodriguez',
      duration: '8:30',
      uploadDate: '4 days ago',
      thumbnail: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=300&h=200&fit=crop'
    },
    {
      id: 3,
      title: 'Performance Preparation',
      instructor: 'Sarah Chen',
      duration: '15:20',
      uploadDate: '1 week ago',
      thumbnail: 'https://images.unsplash.com/photo-1547153760-18fc86324498?w=300&h=200&fit=crop'
    }
  ];

  const latestNotification = {
    title: 'Holiday Schedule Update',
    message: 'Classes will be rescheduled for next week due to studio maintenance.',
    time: '2 hours ago',
    type: 'important'
  };

  return (
    <div className="p-6 space-y-6">
      {/* Welcome Section */}
      <div className="fade-in-up">
        <h1 className="text-3xl font-bold text-foreground mb-2">
          Welcome back, {user?.name.split(' ')[0]}! 👋
        </h1>
        <p className="text-muted-foreground">
          Here's what's happening in your dance journey today.
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="dance-card slide-in-left">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Attendance Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{attendancePercentage}%</div>
            <Progress value={attendancePercentage} className="mt-2" />
            <p className="text-xs text-muted-foreground mt-2">
              {attendedClasses} of {totalClasses} classes
            </p>
          </CardContent>
        </Card>

        <Card className="dance-card slide-in-left" style={{animationDelay: '0.1s'}}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Next Class</CardTitle>
            <Clock className="h-4 w-4 text-secondary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-secondary">{nextClass.time}</div>
            <p className="text-xs text-muted-foreground">
              {nextClass.date} • {nextClass.room}
            </p>
          </CardContent>
        </Card>

        <Card className="dance-card slide-in-left" style={{animationDelay: '0.2s'}}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">New Videos</CardTitle>
            <Video className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{recentVideos.length}</div>
            <p className="text-xs text-muted-foreground">
              This week
            </p>
          </CardContent>
        </Card>

        <Card className="dance-card slide-in-left" style={{animationDelay: '0.3s'}}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Current Batch</CardTitle>
            <Users className="h-4 w-4 text-secondary" />
          </CardHeader>
          <CardContent>
            <div className="text-sm font-bold text-secondary">{user?.batch}</div>
            <p className="text-xs text-muted-foreground">
              Active enrollment
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Next Class Details */}
        <Card className="dance-card fade-in-up">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Upcoming Class</CardTitle>
              <Badge variant="secondary">{nextClass.date}</Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold text-primary">{nextClass.title}</h3>
              <p className="text-sm text-muted-foreground">with {nextClass.instructor}</p>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="w-4 h-4 text-secondary" />
              <span className="text-sm">{nextClass.time} • {nextClass.room}</span>
            </div>
            <Button 
              className="w-full dance-button"
              onClick={() => navigate('/classes')}
            >
              <Calendar className="w-4 h-4 mr-2" />
              View Schedule
            </Button>
          </CardContent>
        </Card>

        {/* Attendance Overview */}
        <Card className="dance-card fade-in-up" style={{animationDelay: '0.1s'}}>
          <CardHeader>
            <CardTitle className="text-lg">Attendance Overview</CardTitle>
            <CardDescription>Your progress this month</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm">This Month</span>
              <span className="text-lg font-bold text-primary">{attendancePercentage}%</span>
            </div>
            <Progress value={attendancePercentage} className="h-3" />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Attended: {attendedClasses}</span>
              <span>Total: {totalClasses}</span>
            </div>
            <Button 
              variant="outline" 
              className="w-full transition-all hover:bg-primary/5"
              onClick={() => navigate('/attendance')}
            >
              <BarChart3 className="w-4 h-4 mr-2" />
              View Details
            </Button>
          </CardContent>
        </Card>

        {/* Latest Notification */}
        <Card className="dance-card fade-in-up" style={{animationDelay: '0.2s'}}>
          <CardHeader>
            <CardTitle className="text-lg">Latest Update</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex items-start justify-between mb-2">
                <Badge variant={latestNotification.type === 'important' ? 'destructive' : 'default'}>
                  {latestNotification.type}
                </Badge>
                <span className="text-xs text-muted-foreground">{latestNotification.time}</span>
              </div>
              <h3 className="font-semibold mb-2">{latestNotification.title}</h3>
              <p className="text-sm text-muted-foreground">{latestNotification.message}</p>
            </div>
            <Button 
              variant="outline" 
              className="w-full transition-all hover:bg-secondary/5"
              onClick={() => navigate('/notifications')}
            >
              <Bell className="w-4 h-4 mr-2" />
              All Notifications
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Recent Videos Section */}
      <Card className="dance-card fade-in-up">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">Recent Video Uploads</CardTitle>
            <Button 
              variant="outline"
              onClick={() => navigate('/videos')}
              className="transition-all hover:bg-primary/5"
            >
              View All Videos
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {recentVideos.map((video, index) => (
              <div 
                key={video.id} 
                className="group cursor-pointer transition-all hover:scale-105"
                style={{animationDelay: `${index * 0.1}s`}}
              >
                <div className="relative rounded-lg overflow-hidden mb-3">
                  <img 
                    src={video.thumbnail} 
                    alt={video.title}
                    className="w-full h-32 object-cover transition-transform group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Play className="w-8 h-8 text-white" />
                  </div>
                  <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                    {video.duration}
                  </div>
                </div>
                <h4 className="font-medium text-sm mb-1 group-hover:text-primary transition-colors">
                  {video.title}
                </h4>
                <p className="text-xs text-muted-foreground">{video.instructor} • {video.uploadDate}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;