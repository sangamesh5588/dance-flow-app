import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Calendar } from '@/components/ui/calendar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  BarChart3, 
  Download, 
  Calendar as CalendarIcon, 
  Clock, 
  CheckCircle, 
  XCircle, 
  AlertCircle,
  TrendingUp
} from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const Attendance = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());

  // Mock attendance data
  const attendanceData = [
    { id: 1, date: '2024-01-15', class: 'Contemporary Advanced', status: 'Present', time: '6:00 PM', instructor: 'Sarah Chen' },
    { id: 2, date: '2024-01-12', class: 'Floor Work', status: 'Present', time: '5:00 PM', instructor: 'Maria Rodriguez' },
    { id: 3, date: '2024-01-10', class: 'Contemporary Advanced', status: 'Late', time: '6:00 PM', instructor: 'Sarah Chen' },
    { id: 4, date: '2024-01-08', class: 'Performance Prep', status: 'Present', time: '7:00 PM', instructor: 'David Kim' },
    { id: 5, date: '2024-01-05', class: 'Contemporary Advanced', status: 'Absent', time: '6:00 PM', instructor: 'Sarah Chen' },
    { id: 6, date: '2024-01-03', class: 'Floor Work', status: 'Present', time: '5:00 PM', instructor: 'Maria Rodriguez' },
    { id: 7, date: '2024-01-01', class: 'Contemporary Advanced', status: 'Present', time: '6:00 PM', instructor: 'Sarah Chen' },
  ];

  const monthlyStats = {
    total: 24,
    present: 20,
    late: 2,
    absent: 2,
    percentage: 91.7
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Present':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'Late':
        return <AlertCircle className="w-4 h-4 text-yellow-500" />;
      case 'Absent':
        return <XCircle className="w-4 h-4 text-red-500" />;
      default:
        return null;
    }
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      'Present': 'default',
      'Late': 'secondary',
      'Absent': 'destructive'
    } as const;
    
    return (
      <Badge variant={variants[status as keyof typeof variants] || 'default'} className="flex items-center gap-1">
        {getStatusIcon(status)}
        {status}
      </Badge>
    );
  };

  const handleDownloadReport = () => {
    toast({
      title: "Report Downloaded",
      description: "Your attendance report has been downloaded successfully.",
    });
  };

  // Calendar dates with attendance
  const attendanceDates = attendanceData.reduce((acc, record) => {
    const date = new Date(record.date).getDate();
    acc[date] = record.status;
    return acc;
  }, {} as Record<number, string>);

  return (
    <div className="p-6 space-y-6">
      <div className="fade-in-up">
        <h1 className="text-3xl font-bold text-foreground mb-2">My Attendance</h1>
        <p className="text-muted-foreground">Track your class attendance and progress</p>
      </div>

      {/* Monthly Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="dance-card slide-in-left">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center">
              <TrendingUp className="w-4 h-4 mr-2 text-primary" />
              Overall Rate
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary mb-2">{monthlyStats.percentage}%</div>
            <Progress value={monthlyStats.percentage} className="h-2" />
          </CardContent>
        </Card>

        <Card className="dance-card slide-in-left" style={{animationDelay: '0.1s'}}>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center">
              <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
              Present
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{monthlyStats.present}</div>
            <p className="text-xs text-muted-foreground">classes attended</p>
          </CardContent>
        </Card>

        <Card className="dance-card slide-in-left" style={{animationDelay: '0.2s'}}>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center">
              <AlertCircle className="w-4 h-4 mr-2 text-yellow-500" />
              Late
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{monthlyStats.late}</div>
            <p className="text-xs text-muted-foreground">late arrivals</p>
          </CardContent>
        </Card>

        <Card className="dance-card slide-in-left" style={{animationDelay: '0.3s'}}>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center">
              <XCircle className="w-4 h-4 mr-2 text-red-500" />
              Absent
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{monthlyStats.absent}</div>
            <p className="text-xs text-muted-foreground">classes missed</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="table" className="fade-in-up">
        <div className="flex items-center justify-between mb-6">
          <TabsList>
            <TabsTrigger value="table" className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4" />
              Table View
            </TabsTrigger>
            <TabsTrigger value="calendar" className="flex items-center gap-2">
              <CalendarIcon className="w-4 h-4" />
              Calendar View
            </TabsTrigger>
          </TabsList>
          
          <Button onClick={handleDownloadReport} className="dance-button">
            <Download className="w-4 h-4 mr-2" />
            Download Report
          </Button>
        </div>

        <TabsContent value="table">
          <Card className="dance-card">
            <CardHeader>
              <CardTitle>Attendance History</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-3 px-4 font-medium">Date</th>
                      <th className="text-left py-3 px-4 font-medium">Class</th>
                      <th className="text-left py-3 px-4 font-medium">Time</th>
                      <th className="text-left py-3 px-4 font-medium">Instructor</th>
                      <th className="text-left py-3 px-4 font-medium">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {attendanceData.map((record, index) => (
                      <tr 
                        key={record.id} 
                        className="border-b border-border/50 hover:bg-accent/50 transition-colors"
                        style={{animationDelay: `${index * 0.05}s`}}
                      >
                        <td className="py-3 px-4">
                          <div className="flex items-center">
                            <CalendarIcon className="w-4 h-4 mr-2 text-muted-foreground" />
                            {new Date(record.date).toLocaleDateString('en-US', { 
                              month: 'short', 
                              day: 'numeric' 
                            })}
                          </div>
                        </td>
                        <td className="py-3 px-4 font-medium">{record.class}</td>
                        <td className="py-3 px-4">
                          <div className="flex items-center">
                            <Clock className="w-4 h-4 mr-2 text-muted-foreground" />
                            {record.time}
                          </div>
                        </td>
                        <td className="py-3 px-4 text-muted-foreground">{record.instructor}</td>
                        <td className="py-3 px-4">{getStatusBadge(record.status)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="calendar">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Card className="dance-card">
                <CardHeader>
                  <CardTitle>Attendance Calendar</CardTitle>
                </CardHeader>
                <CardContent>
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    className="rounded-md border w-full"
                    components={{
                      Day: ({ date, ...props }) => {
                        const day = date.getDate();
                        const status = attendanceDates[day];
                        const baseClass = "relative w-full h-full flex items-center justify-center";
                        
                        let statusClass = "";
                        if (status === 'Present') statusClass = "bg-green-100 text-green-800 border-green-200";
                        if (status === 'Late') statusClass = "bg-yellow-100 text-yellow-800 border-yellow-200";
                        if (status === 'Absent') statusClass = "bg-red-100 text-red-800 border-red-200";
                        
                        return (
                          <button className={`${baseClass} ${statusClass} rounded-md border`} {...props}>
                            {day}
                            {status && (
                              <div className="absolute -top-1 -right-1">
                                {getStatusIcon(status)}
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

            <div>
              <Card className="dance-card">
                <CardHeader>
                  <CardTitle>Legend</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-green-100 border border-green-200 rounded"></div>
                    <span className="text-sm">Present</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-yellow-100 border border-yellow-200 rounded"></div>
                    <span className="text-sm">Late</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-red-100 border border-red-200 rounded"></div>
                    <span className="text-sm">Absent</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-muted border border-border rounded"></div>
                    <span className="text-sm">No Class</span>
                  </div>
                </CardContent>
              </Card>

              {selectedDate && (
                <Card className="dance-card mt-4">
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
                    {attendanceDates[selectedDate.getDate()] ? (
                      <div>
                        <p className="text-sm text-muted-foreground mb-2">Class Status:</p>
                        {getStatusBadge(attendanceDates[selectedDate.getDate()])}
                      </div>
                    ) : (
                      <p className="text-sm text-muted-foreground">No class scheduled</p>
                    )}
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Attendance;