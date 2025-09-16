import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar } from '@/components/ui/calendar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Calendar as CalendarIcon, 
  Clock, 
  MapPin, 
  User, 
  ChevronLeft, 
  ChevronRight,
  Star,
  Users,
  BookOpen,
  AlertCircle
} from 'lucide-react';

const Classes = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [currentWeek, setCurrentWeek] = useState(new Date());

  // Mock class data
  const classes = [
    {
      id: 1,
      title: 'Contemporary Advanced',
      instructor: 'Sarah Chen',
      date: '2024-01-15',
      time: '6:00 PM - 7:30 PM',
      duration: 90,
      location: 'Studio A',
      level: 'Advanced',
      capacity: 15,
      enrolled: 12,
      description: 'Advanced contemporary techniques focusing on floor work and emotional expression',
      isUpcoming: true,
      isRecurring: true,
      color: 'bg-primary'
    },
    {
      id: 2,
      title: 'Floor Work Masterclass',
      instructor: 'Maria Rodriguez',
      date: '2024-01-16',
      time: '5:00 PM - 6:00 PM',
      duration: 60,
      location: 'Studio B',
      level: 'Intermediate',
      capacity: 12,
      enrolled: 8,
      description: 'Specialized class focusing on floor work techniques and transitions',
      isUpcoming: true,
      isRecurring: false,
      color: 'bg-secondary'
    },
    {
      id: 3,
      title: 'Performance Preparation',
      instructor: 'David Kim',
      date: '2024-01-17',
      time: '7:00 PM - 8:30 PM',
      duration: 90,
      location: 'Main Hall',
      level: 'All Levels',
      capacity: 20,
      enrolled: 18,
      description: 'Preparation for the upcoming showcase performance',
      isUpcoming: true,
      isRecurring: false,
      color: 'bg-orange-500'
    },
    {
      id: 4,
      title: 'Contemporary Advanced',
      instructor: 'Sarah Chen',
      date: '2024-01-18',
      time: '6:00 PM - 7:30 PM',
      duration: 90,
      location: 'Studio A',
      level: 'Advanced',
      capacity: 15,
      enrolled: 13,
      description: 'Advanced contemporary techniques focusing on floor work and emotional expression',
      isUpcoming: true,
      isRecurring: true,
      color: 'bg-primary'
    },
    {
      id: 5,
      title: 'Conditioning & Flexibility',
      instructor: 'Elena Petrov',
      date: '2024-01-19',
      time: '4:00 PM - 5:00 PM',
      duration: 60,
      location: 'Studio C',
      level: 'All Levels',
      capacity: 16,
      enrolled: 10,
      description: 'Strength and flexibility training for dancers',
      isUpcoming: true,
      isRecurring: true,
      color: 'bg-green-500'
    }
  ];

  const getWeekDates = (date: Date) => {
    const week = [];
    const startDate = new Date(date);
    const day = startDate.getDay();
    const diff = startDate.getDate() - day + (day === 0 ? -6 : 1); // Adjust when day is Sunday
    startDate.setDate(diff);

    for (let i = 0; i < 7; i++) {
      const weekDate = new Date(startDate);
      weekDate.setDate(startDate.getDate() + i);
      week.push(weekDate);
    }
    return week;
  };

  const weekDates = getWeekDates(currentWeek);

  const navigateWeek = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentWeek);
    newDate.setDate(newDate.getDate() + (direction === 'next' ? 7 : -7));
    setCurrentWeek(newDate);
  };

  const getClassesForDate = (date: Date) => {
    const dateStr = date.toISOString().split('T')[0];
    return classes.filter(cls => cls.date === dateStr);
  };

  const getLevelBadgeVariant = (level: string) => {
    switch (level) {
      case 'Beginner':
        return 'default';
      case 'Intermediate':
        return 'secondary';
      case 'Advanced':
        return 'destructive';
      default:
        return 'outline';
    }
  };

  const ClassCard = ({ classItem, compact = false }: { classItem: typeof classes[0], compact?: boolean }) => (
    <Card className={`dance-card group hover:shadow-lg transition-all duration-300 ${compact ? 'p-2' : ''}`}>
      <CardContent className={compact ? 'p-3' : 'p-4'}>
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <h3 className={`font-semibold group-hover:text-primary transition-colors ${compact ? 'text-sm' : 'text-lg'} mb-1`}>
              {classItem.title}
            </h3>
            <div className="flex items-center text-muted-foreground text-sm mb-2">
              <User className="w-4 h-4 mr-1" />
              {classItem.instructor}
            </div>
          </div>
          <div className="flex flex-col items-end space-y-1">
            <Badge variant={getLevelBadgeVariant(classItem.level)}>
              {classItem.level}
            </Badge>
            {classItem.isRecurring && (
              <Badge variant="outline" className="text-xs">
                Recurring
              </Badge>
            )}
          </div>
        </div>

        {!compact && (
          <p className="text-sm text-muted-foreground mb-4">
            {classItem.description}
          </p>
        )}

        <div className="space-y-2">
          <div className="flex items-center text-sm">
            <Clock className="w-4 h-4 mr-2 text-primary" />
            {classItem.time}
          </div>
          <div className="flex items-center text-sm">
            <MapPin className="w-4 h-4 mr-2 text-secondary" />
            {classItem.location}
          </div>
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center">
              <Users className="w-4 h-4 mr-2 text-muted-foreground" />
              {classItem.enrolled}/{classItem.capacity} enrolled
            </div>
            <div className="w-20 bg-muted rounded-full h-2">
              <div 
                className="bg-primary h-2 rounded-full transition-all duration-300"
                style={{ width: `${(classItem.enrolled / classItem.capacity) * 100}%` }}
              />
            </div>
          </div>
        </div>

        {classItem.isUpcoming && (
          <div className="mt-4 p-3 bg-accent/50 rounded-lg flex items-center">
            <AlertCircle className="w-4 h-4 mr-2 text-primary" />
            <span className="text-sm">
              {classItem.isRecurring ? 'Regular class schedule' : 'Special workshop'}
            </span>
          </div>
        )}
      </CardContent>
    </Card>
  );

  return (
    <div className="p-6 space-y-6">
      <div className="fade-in-up">
        <h1 className="text-3xl font-bold text-foreground mb-2">My Classes</h1>
        <p className="text-muted-foreground">View your class schedule and upcoming sessions</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="dance-card slide-in-left">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-primary mb-1">{classes.length}</div>
            <p className="text-sm text-muted-foreground">This Week</p>
          </CardContent>
        </Card>
        
        <Card className="dance-card slide-in-left" style={{animationDelay: '0.1s'}}>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-secondary mb-1">
              {classes.filter(c => c.isUpcoming).length}
            </div>
            <p className="text-sm text-muted-foreground">Upcoming</p>
          </CardContent>
        </Card>
        
        <Card className="dance-card slide-in-left" style={{animationDelay: '0.2s'}}>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-primary mb-1">
              {Math.round(classes.reduce((total, cls) => total + cls.duration, 0) / 60)}h
            </div>
            <p className="text-sm text-muted-foreground">Total Hours</p>
          </CardContent>
        </Card>
        
        <Card className="dance-card slide-in-left" style={{animationDelay: '0.3s'}}>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-secondary mb-1">
              {new Set(classes.map(c => c.instructor)).size}
            </div>
            <p className="text-sm text-muted-foreground">Instructors</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="week" className="fade-in-up">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="week" className="flex items-center gap-2">
            <CalendarIcon className="w-4 h-4" />
            Week View
          </TabsTrigger>
          <TabsTrigger value="calendar" className="flex items-center gap-2">
            <BookOpen className="w-4 h-4" />
            Calendar View
          </TabsTrigger>
        </TabsList>

        <TabsContent value="week">
          <div className="space-y-6">
            {/* Week Navigation */}
            <Card className="dance-card">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center">
                    Week of {weekDates[0].toLocaleDateString('en-US', { month: 'long', day: 'numeric' })} - 
                    {weekDates[6].toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                  </CardTitle>
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm" onClick={() => navigateWeek('prev')}>
                      <ChevronLeft className="w-4 h-4" />
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => setCurrentWeek(new Date())}
                    >
                      Today
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => navigateWeek('next')}>
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
            </Card>

            {/* Weekly Schedule Grid */}
            <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
              {weekDates.map((date, index) => {
                const dayClasses = getClassesForDate(date);
                const isToday = date.toDateString() === new Date().toDateString();
                
                return (
                  <div key={index} className="space-y-3">
                    <div className={`text-center p-3 rounded-lg transition-colors ${
                      isToday ? 'bg-primary text-primary-foreground' : 'bg-muted'
                    }`}>
                      <div className="text-sm font-medium">
                        {date.toLocaleDateString('en-US', { weekday: 'short' })}
                      </div>
                      <div className="text-lg font-bold">
                        {date.getDate()}
                      </div>
                    </div>
                    
                    <div className="space-y-2 min-h-[200px]">
                      {dayClasses.map((classItem) => (
                        <div 
                          key={classItem.id}
                          className={`p-3 rounded-lg text-white text-sm ${classItem.color} hover:opacity-90 transition-opacity cursor-pointer`}
                        >
                          <div className="font-semibold mb-1">{classItem.title}</div>
                          <div className="text-xs opacity-90 mb-1">{classItem.time.split(' - ')[0]}</div>
                          <div className="text-xs opacity-75">{classItem.instructor}</div>
                          <div className="text-xs opacity-75">{classItem.location}</div>
                        </div>
                      ))}
                      {dayClasses.length === 0 && (
                        <div className="text-center text-muted-foreground text-sm py-8">
                          No classes
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="calendar">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Card className="dance-card">
                <CardHeader>
                  <CardTitle>Class Calendar</CardTitle>
                </CardHeader>
                <CardContent>
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    className="rounded-md border w-full"
                    components={{
                      Day: ({ date, ...props }) => {
                        const dayClasses = getClassesForDate(date);
                        const hasClasses = dayClasses.length > 0;
                        
                        return (
                          <button 
                            className={`relative w-full h-full flex items-center justify-center rounded-md ${
                              hasClasses ? 'bg-primary/10 border border-primary/20 hover:bg-primary/20' : ''
                            }`} 
                            {...props}
                          >
                            {date.getDate()}
                            {hasClasses && (
                              <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2">
                                <div className="w-2 h-2 bg-primary rounded-full"></div>
                              </div>
                            )}
                          </button>
                        );
                      },
                    }}
                  />
                </CardContent>
              </Card>
            </div>

            <div className="space-y-4">
              {selectedDate && (
                <Card className="dance-card">
                  <CardHeader>
                    <CardTitle className="text-lg">
                      {selectedDate.toLocaleDateString('en-US', { 
                        weekday: 'long',
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {getClassesForDate(selectedDate).length > 0 ? (
                      <div className="space-y-3">
                        {getClassesForDate(selectedDate).map((classItem) => (
                          <ClassCard key={classItem.id} classItem={classItem} compact />
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <CalendarIcon className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
                        <p className="text-muted-foreground">No classes scheduled</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}

              <Card className="dance-card">
                <CardHeader>
                  <CardTitle className="text-lg">Upcoming Classes</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {classes
                      .filter(cls => cls.isUpcoming)
                      .slice(0, 3)
                      .map((classItem, index) => (
                        <div key={classItem.id} className={`p-3 rounded-lg border border-border hover:border-primary/50 transition-colors cursor-pointer`}>
                          <div className="flex items-center justify-between mb-2">
                            <div className="font-semibold text-sm">{classItem.title}</div>
                            <Badge variant="outline" className="text-xs">
                              {new Date(classItem.date).toLocaleDateString('en-US', { weekday: 'short' })}
                            </Badge>
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {classItem.time.split(' - ')[0]} • {classItem.location}
                          </div>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Classes;