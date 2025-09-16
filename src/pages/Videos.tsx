import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { 
  Play, 
  Search, 
  Filter, 
  Clock, 
  User, 
  Calendar,
  Grid3X3,
  List,
  Eye,
  Download
} from 'lucide-react';

const Videos = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBatch, setSelectedBatch] = useState('all');
  const [selectedStyle, setSelectedStyle] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Mock video data
  const videos = [
    {
      id: 1,
      title: 'Floor Work Fundamentals',
      description: 'Learn the basic floor work techniques for contemporary dance',
      instructor: 'Sarah Chen',
      duration: '12:45',
      uploadDate: '2024-01-15',
      batch: 'Contemporary Advanced',
      style: 'Contemporary',
      views: 45,
      thumbnail: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=400&h=250&fit=crop',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
    },
    {
      id: 2,
      title: 'Arm Movements & Flow',
      description: 'Developing fluid arm movements and connecting them with body flow',
      instructor: 'Maria Rodriguez',
      duration: '8:30',
      uploadDate: '2024-01-12',
      batch: 'Contemporary Advanced',
      style: 'Contemporary',
      views: 32,
      thumbnail: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=400&h=250&fit=crop',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
    },
    {
      id: 3,
      title: 'Performance Preparation',
      description: 'Preparing for your end-of-term performance with stage presence tips',
      instructor: 'David Kim',
      duration: '15:20',
      uploadDate: '2024-01-10',
      batch: 'All Batches',
      style: 'Performance',
      views: 67,
      thumbnail: 'https://images.unsplash.com/photo-1547153760-18fc86324498?w=400&h=250&fit=crop',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
    },
    {
      id: 4,
      title: 'Ballet Barre Basics',
      description: 'Foundation barre exercises for building strength and technique',
      instructor: 'Elena Petrov',
      duration: '18:15',
      uploadDate: '2024-01-08',
      batch: 'Ballet Intermediate',
      style: 'Ballet',
      views: 28,
      thumbnail: 'https://images.unsplash.com/photo-1594736797933-d0401ba364fe?w=400&h=250&fit=crop',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
    },
    {
      id: 5,
      title: 'Jazz Choreography Combo',
      description: 'High-energy jazz combination focusing on sharp movements and isolations',
      instructor: 'Marcus Johnson',
      duration: '10:45',
      uploadDate: '2024-01-05',
      batch: 'Jazz Advanced',
      style: 'Jazz',
      views: 41,
      thumbnail: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=250&fit=crop',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
    },
    {
      id: 6,
      title: 'Stretching & Recovery',
      description: 'Essential stretches for dancers to improve flexibility and prevent injury',
      instructor: 'Sarah Chen',
      duration: '20:30',
      uploadDate: '2024-01-03',
      batch: 'All Batches',
      style: 'Conditioning',
      views: 89,
      thumbnail: 'https://images.unsplash.com/photo-1506629905607-c60e754d1178?w=400&h=250&fit=crop',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
    }
  ];

  const batches = ['All Batches', 'Contemporary Advanced', 'Ballet Intermediate', 'Jazz Advanced'];
  const styles = ['Contemporary', 'Ballet', 'Jazz', 'Performance', 'Conditioning'];

  const filteredVideos = videos.filter(video => {
    const matchesSearch = video.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         video.instructor.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesBatch = selectedBatch === 'all' || video.batch === selectedBatch;
    const matchesStyle = selectedStyle === 'all' || video.style === selectedStyle;
    
    return matchesSearch && matchesBatch && matchesStyle;
  });

  const VideoCard = ({ video, index }: { video: typeof videos[0], index: number }) => (
    <Card className="dance-card group hover:shadow-xl transition-all duration-300" 
          style={{animationDelay: `${index * 0.1}s`}}>
      <div className="relative overflow-hidden rounded-t-lg">
        <img 
          src={video.thumbnail} 
          alt={video.title}
          className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
        />
        <Dialog>
          <DialogTrigger asChild>
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 cursor-pointer">
              <Play className="w-16 h-16 text-white drop-shadow-lg" />
            </div>
          </DialogTrigger>
          <DialogContent className="max-w-4xl w-full h-[80vh]">
            <div className="w-full h-full">
              <iframe 
                src={video.videoUrl}
                className="w-full h-full rounded-lg"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </DialogContent>
        </Dialog>
        
        <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
          {video.duration}
        </div>
        <div className="absolute top-2 left-2">
          <Badge variant="secondary">{video.style}</Badge>
        </div>
      </div>
      
      <CardContent className="p-4">
        <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors">
          {video.title}
        </h3>
        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
          {video.description}
        </p>
        
        <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
          <div className="flex items-center">
            <User className="w-3 h-3 mr-1" />
            {video.instructor}
          </div>
          <div className="flex items-center">
            <Eye className="w-3 h-3 mr-1" />
            {video.views} views
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center text-xs text-muted-foreground">
            <Calendar className="w-3 h-3 mr-1" />
            {new Date(video.uploadDate).toLocaleDateString()}
          </div>
          <Badge variant="outline" className="text-xs">
            {video.batch}
          </Badge>
        </div>
      </CardContent>
    </Card>
  );

  const VideoListItem = ({ video, index }: { video: typeof videos[0], index: number }) => (
    <Card className="dance-card hover:shadow-lg transition-all duration-300" 
          style={{animationDelay: `${index * 0.05}s`}}>
      <CardContent className="p-4">
        <div className="flex items-start space-x-4">
          <div className="relative flex-shrink-0">
            <img 
              src={video.thumbnail} 
              alt={video.title}
              className="w-32 h-20 object-cover rounded-lg"
            />
            <Dialog>
              <DialogTrigger asChild>
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity cursor-pointer rounded-lg">
                  <Play className="w-8 h-8 text-white" />
                </div>
              </DialogTrigger>
              <DialogContent className="max-w-4xl w-full h-[80vh]">
                <div className="w-full h-full">
                  <iframe 
                    src={video.videoUrl}
                    className="w-full h-full rounded-lg"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              </DialogContent>
            </Dialog>
            <div className="absolute bottom-1 right-1 bg-black/70 text-white text-xs px-1 py-0.5 rounded">
              {video.duration}
            </div>
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between mb-2">
              <h3 className="font-semibold text-lg hover:text-primary transition-colors cursor-pointer">
                {video.title}
              </h3>
              <Badge variant="secondary">{video.style}</Badge>
            </div>
            
            <p className="text-sm text-muted-foreground mb-3">
              {video.description}
            </p>
            
            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
              <div className="flex items-center">
                <User className="w-4 h-4 mr-1" />
                {video.instructor}
              </div>
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-1" />
                {new Date(video.uploadDate).toLocaleDateString()}
              </div>
              <div className="flex items-center">
                <Eye className="w-4 h-4 mr-1" />
                {video.views} views
              </div>
              <Badge variant="outline">
                {video.batch}
              </Badge>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="p-6 space-y-6">
      <div className="fade-in-up">
        <h1 className="text-3xl font-bold text-foreground mb-2">My Videos</h1>
        <p className="text-muted-foreground">Access your dance tutorial library and practice materials</p>
      </div>

      {/* Filters and Search */}
      <Card className="dance-card fade-in-up">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Filter className="w-5 h-5 mr-2" />
            Filter & Search
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Search videos or instructors..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <Select value={selectedBatch} onValueChange={setSelectedBatch}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Select Batch" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Batches</SelectItem>
                {batches.map(batch => (
                  <SelectItem key={batch} value={batch}>{batch}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Select value={selectedStyle} onValueChange={setSelectedStyle}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Select Style" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Styles</SelectItem>
                {styles.map(style => (
                  <SelectItem key={style} value={style}>{style}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <div className="flex border border-border rounded-lg p-1">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('grid')}
              >
                <Grid3X3 className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('list')}
              >
                <List className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Video Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="dance-card slide-in-left">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-primary mb-1">{filteredVideos.length}</div>
            <p className="text-sm text-muted-foreground">Available Videos</p>
          </CardContent>
        </Card>
        
        <Card className="dance-card slide-in-left" style={{animationDelay: '0.1s'}}>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-secondary mb-1">
              {videos.reduce((total, video) => total + video.views, 0)}
            </div>
            <p className="text-sm text-muted-foreground">Total Views</p>
          </CardContent>
        </Card>
        
        <Card className="dance-card slide-in-left" style={{animationDelay: '0.2s'}}>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-primary mb-1">
              {Math.floor(videos.reduce((total, video) => {
                const [minutes, seconds] = video.duration.split(':').map(Number);
                return total + minutes + seconds / 60;
              }, 0))} min
            </div>
            <p className="text-sm text-muted-foreground">Total Duration</p>
          </CardContent>
        </Card>
      </div>

      {/* Video Content */}
      <div className="fade-in-up">
        {filteredVideos.length === 0 ? (
          <Card className="dance-card">
            <CardContent className="p-12 text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-muted rounded-full flex items-center justify-center">
                <Search className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-semibold mb-2">No videos found</h3>
              <p className="text-muted-foreground">Try adjusting your search terms or filters</p>
            </CardContent>
          </Card>
        ) : viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredVideos.map((video, index) => (
              <VideoCard key={video.id} video={video} index={index} />
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredVideos.map((video, index) => (
              <VideoListItem key={video.id} video={video} index={index} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Videos;