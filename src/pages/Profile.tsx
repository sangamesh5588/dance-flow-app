import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  User, 
  Mail, 
  Phone, 
  Calendar,
  Users,
  Edit,
  Save,
  X,
  Camera,
  Shield,
  Clock,
  Award,
  TrendingUp
} from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const Profile = () => {
  const { user, updateProfile, logout } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    newPassword: '',
    confirmPassword: ''
  });

  // Mock profile stats
  const profileStats = {
    totalClasses: 124,
    attendanceRate: 91,
    monthsActive: 8,
    favoriteInstructor: 'Sarah Chen',
    currentLevel: 'Advanced',
    nextMilestone: '150 Classes',
    joinDate: user?.joinDate || '2023-09-15'
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSaveProfile = async () => {
    if (formData.newPassword && formData.newPassword !== formData.confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords do not match",
        variant: "destructive"
      });
      return;
    }

    const updateData: any = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone
    };

    const success = await updateProfile(updateData);
    
    if (success) {
      toast({
        title: "Profile Updated",
        description: "Your profile has been successfully updated",
      });
      setIsEditing(false);
      setFormData(prev => ({
        ...prev,
        newPassword: '',
        confirmPassword: ''
      }));
    } else {
      toast({
        title: "Update Failed",
        description: "Failed to update profile. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleCancelEdit = () => {
    setFormData({
      name: user?.name || '',
      email: user?.email || '',
      phone: user?.phone || '',
      newPassword: '',
      confirmPassword: ''
    });
    setIsEditing(false);
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-6 space-y-6">
      <div className="fade-in-up">
        <h1 className="text-3xl font-bold text-foreground mb-2">My Profile</h1>
        <p className="text-muted-foreground">Manage your personal information and account settings</p>
      </div>

      {/* Profile Header */}
      <Card className="dance-card fade-in-up">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6">
            <div className="relative">
              <Avatar className="w-24 h-24 ring-4 ring-primary/20">
                <AvatarImage src={user.profileImage} alt={user.name} />
                <AvatarFallback className="bg-gradient-to-br from-primary to-secondary text-white text-2xl">
                  {user.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <Button
                size="sm"
                className="absolute -bottom-2 -right-2 rounded-full w-8 h-8 p-0 dance-button"
              >
                <Camera className="w-4 h-4" />
              </Button>
            </div>
            
            <div className="flex-1 text-center md:text-left">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                <div>
                  <h2 className="text-2xl font-bold mb-2">{user.name}</h2>
                  <div className="flex flex-wrap justify-center md:justify-start gap-2 mb-3">
                    <Badge variant="secondary" className="flex items-center gap-1">
                      <Users className="w-3 h-3" />
                      {user.batch}
                    </Badge>
                    <Badge variant="outline" className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      Since {new Date(user.joinDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                    </Badge>
                    <Badge variant="outline" className="flex items-center gap-1">
                      <Award className="w-3 h-3" />
                      {profileStats.currentLevel}
                    </Badge>
                  </div>
                </div>
                
                <div className="flex space-x-2">
                  {!isEditing ? (
                    <Button 
                      onClick={() => setIsEditing(true)}
                      className="dance-button"
                    >
                      <Edit className="w-4 h-4 mr-2" />
                      Edit Profile
                    </Button>
                  ) : (
                    <>
                      <Button 
                        onClick={handleSaveProfile}
                        className="dance-button"
                      >
                        <Save className="w-4 h-4 mr-2" />
                        Save Changes
                      </Button>
                      <Button 
                        onClick={handleCancelEdit}
                        variant="outline"
                      >
                        <X className="w-4 h-4 mr-2" />
                        Cancel
                      </Button>
                    </>
                  )}
                </div>
              </div>
              
              {/* Quick Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-primary">{profileStats.totalClasses}</div>
                  <div className="text-xs text-muted-foreground">Total Classes</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-secondary">{profileStats.attendanceRate}%</div>
                  <div className="text-xs text-muted-foreground">Attendance</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-primary">{profileStats.monthsActive}</div>
                  <div className="text-xs text-muted-foreground">Months Active</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-secondary">15</div>
                  <div className="text-xs text-muted-foreground">Until Next Milestone</div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Content */}
      <Tabs defaultValue="personal" className="fade-in-up">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="personal">Personal Info</TabsTrigger>
          <TabsTrigger value="stats">Statistics</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
        </TabsList>

        <TabsContent value="personal">
          <Card className="dance-card">
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>
                Update your personal details and contact information
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <div className="flex items-center">
                    <User className="w-4 h-4 mr-3 text-muted-foreground" />
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      disabled={!isEditing}
                      className="flex-1"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <div className="flex items-center">
                    <Mail className="w-4 h-4 mr-3 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      disabled={!isEditing}
                      className="flex-1"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <div className="flex items-center">
                    <Phone className="w-4 h-4 mr-3 text-muted-foreground" />
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      disabled={!isEditing}
                      className="flex-1"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label>Current Batch</Label>
                  <div className="flex items-center">
                    <Users className="w-4 h-4 mr-3 text-muted-foreground" />
                    <Input value={user.batch} disabled className="flex-1" />
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h4 className="font-semibold">Academy Information</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <span className="text-sm font-medium">Join Date</span>
                    <span className="text-sm text-muted-foreground">
                      {new Date(user.joinDate).toLocaleDateString('en-US', { 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <span className="text-sm font-medium">Current Level</span>
                    <Badge variant="secondary">{profileStats.currentLevel}</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <span className="text-sm font-medium">Favorite Instructor</span>
                    <span className="text-sm text-muted-foreground">{profileStats.favoriteInstructor}</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <span className="text-sm font-medium">Next Milestone</span>
                    <span className="text-sm text-muted-foreground">{profileStats.nextMilestone}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="stats">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="dance-card">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TrendingUp className="w-5 h-5 mr-2 text-primary" />
                  Performance Overview
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span>Total Classes Attended</span>
                  <span className="font-bold text-primary">{profileStats.totalClasses}</span>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <span>Overall Attendance Rate</span>
                  <span className="font-bold text-secondary">{profileStats.attendanceRate}%</span>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <span>Months as Student</span>
                  <span className="font-bold text-primary">{profileStats.monthsActive}</span>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <span>Current Streak</span>
                  <span className="font-bold text-secondary">5 classes</span>
                </div>
              </CardContent>
            </Card>

            <Card className="dance-card">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Award className="w-5 h-5 mr-2 text-yellow-500" />
                  Achievements
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-3 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                  <Award className="w-6 h-6 text-yellow-500" />
                  <div>
                    <div className="font-semibold text-sm">Perfect Month</div>
                    <div className="text-xs text-muted-foreground">100% attendance in December</div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <Users className="w-6 h-6 text-blue-500" />
                  <div>
                    <div className="font-semibold text-sm">Class Regular</div>
                    <div className="text-xs text-muted-foreground">Attended 100+ classes</div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <Clock className="w-6 h-6 text-green-500" />
                  <div>
                    <div className="font-semibold text-sm">Early Bird</div>
                    <div className="text-xs text-muted-foreground">Always on time for class</div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3 p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg border-2 border-dashed border-purple-200">
                  <div className="w-6 h-6 rounded-full bg-muted flex items-center justify-center">
                    <span className="text-xs">?</span>
                  </div>
                  <div>
                    <div className="font-semibold text-sm">Next Achievement</div>
                    <div className="text-xs text-muted-foreground">Reach 150 total classes</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="security">
          <Card className="dance-card">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Shield className="w-5 h-5 mr-2" />
                Security Settings
              </CardTitle>
              <CardDescription>
                Manage your password and account security
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {isEditing && (
                <>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="newPassword">New Password</Label>
                      <Input
                        id="newPassword"
                        type="password"
                        value={formData.newPassword}
                        onChange={(e) => handleInputChange('newPassword', e.target.value)}
                        placeholder="Enter new password (optional)"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">Confirm New Password</Label>
                      <Input
                        id="confirmPassword"
                        type="password"
                        value={formData.confirmPassword}
                        onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                        placeholder="Confirm new password"
                      />
                    </div>
                  </div>
                  <Separator />
                </>
              )}
              
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                  <div>
                    <div className="font-semibold">Password</div>
                    <div className="text-sm text-muted-foreground">Last changed 3 months ago</div>
                  </div>
                  {!isEditing && (
                    <Button variant="outline" onClick={() => setIsEditing(true)}>
                      Change Password
                    </Button>
                  )}
                </div>
                
                <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                  <div>
                    <div className="font-semibold">Two-Factor Authentication</div>
                    <div className="text-sm text-muted-foreground">Add an extra layer of security</div>
                  </div>
                  <Badge variant="outline">Coming Soon</Badge>
                </div>
                
                <div className="flex items-center justify-between p-4 border border-destructive/20 bg-destructive/5 rounded-lg">
                  <div>
                    <div className="font-semibold text-destructive">Sign Out</div>
                    <div className="text-sm text-muted-foreground">Sign out from your account</div>
                  </div>
                  <Button variant="destructive" onClick={logout}>
                    Sign Out
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Profile;