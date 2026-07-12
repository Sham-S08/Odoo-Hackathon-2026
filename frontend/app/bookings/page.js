"use client";

import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import AppShell from "@/components/layout/AppShell";
import { 
  Calendar as CalendarIcon,
  Clock,
  Search,
  Plus,
  Filter,
  ChevronLeft,
  ChevronRight,
  Users,
  MapPin,
  CheckCircle,
  XCircle,
  Clock as ClockIcon,
  AlertCircle,
  Edit2,
  Trash2,
  Eye,
  X,
  Calendar,
  User,
  Mail,
  Phone,
  Building2,
  Tag,
  Repeat,
  Bell,
  Download,
  Printer,
  RefreshCw,
  Check,
  ArrowRight,
  MoreVertical,
  Grid3x3,
  List
} from "lucide-react";

// Mock data
const mockResources = [
  { id: 1, name: "Conference Room A3", type: "Room", capacity: 12, location: "Floor 1 - East", status: "Available", amenities: ["Projector", "Whiteboard", "Video Conference"], image: null },
  { id: 2, name: "Conference Room B2", type: "Room", capacity: 8, location: "Floor 2 - West", status: "Available", amenities: ["Whiteboard", "TV Screen"], image: null },
  { id: 3, name: "Training Room C1", type: "Room", capacity: 20, location: "Floor 3 - North", status: "Booked", amenities: ["Projector", "Audio System", "Whiteboard"], image: null },
  { id: 4, name: "Toyota Innova", type: "Vehicle", capacity: 7, location: "Garage - Bay 2", status: "Available", amenities: ["AC", "GPS", "Dual AC"], image: null },
  { id: 5, name: "Digital Whiteboard", type: "Equipment", capacity: 1, location: "Storage Room A", status: "Maintenance", amenities: ["Stylus", "Screen Share"], image: null },
  { id: 6, name: "Projector Kit", type: "Equipment", capacity: 1, location: "AV Room", status: "Available", amenities: ["Projector", "Screen", "Cables"], image: null },
  { id: 7, name: "Meeting Room D4", type: "Room", capacity: 6, location: "Floor 1 - South", status: "Available", amenities: ["Whiteboard", "Video Conference"], image: null },
  { id: 8, name: "Hyundai Creta", type: "Vehicle", capacity: 5, location: "Garage - Bay 1", status: "Booked", amenities: ["AC", "GPS"], image: null },
];

const mockBookings = [
  { 
    id: 1, 
    resource: "Conference Room A3", 
    resourceId: 1,
    bookedBy: "Priya Sharma",
    department: "IT",
    date: "2026-07-13",
    startTime: "09:00",
    endTime: "10:30",
    purpose: "Team Standup Meeting",
    status: "Upcoming",
    attendees: 8,
    notes: "Weekly sync with development team"
  },
  { 
    id: 2, 
    resource: "Conference Room B2", 
    resourceId: 2,
    bookedBy: "Raj Patel",
    department: "Marketing",
    date: "2026-07-13",
    startTime: "11:00",
    endTime: "12:30",
    purpose: "Marketing Campaign Review",
    status: "Ongoing",
    attendees: 5,
    notes: "Q3 campaign review"
  },
  { 
    id: 3, 
    resource: "Toyota Innova", 
    resourceId: 4,
    bookedBy: "Ananya Reddy",
    department: "Finance",
    date: "2026-07-12",
    startTime: "14:00",
    endTime: "18:00",
    purpose: "Client Visit",
    status: "Completed",
    attendees: 3,
    notes: "Pick up client from airport"
  },
  { 
    id: 4, 
    resource: "Training Room C1", 
    resourceId: 3,
    bookedBy: "Vikram Singh",
    department: "HR",
    date: "2026-07-14",
    startTime: "10:00",
    endTime: "16:00",
    purpose: "Employee Training Session",
    status: "Upcoming",
    attendees: 15,
    notes: "New hire orientation"
  },
  { 
    id: 5, 
    resource: "Digital Whiteboard", 
    resourceId: 5,
    bookedBy: "Neha Gupta",
    department: "Operations",
    date: "2026-07-13",
    startTime: "15:00",
    endTime: "16:30",
    purpose: "Project Planning",
    status: "Cancelled",
    attendees: 4,
    notes: "Cancelled due to schedule conflict"
  },
  { 
    id: 6, 
    resource: "Meeting Room D4", 
    resourceId: 7,
    bookedBy: "Amit Kumar",
    department: "Sales",
    date: "2026-07-14",
    startTime: "09:30",
    endTime: "11:00",
    purpose: "Sales Pipeline Review",
    status: "Upcoming",
    attendees: 6,
    notes: "Weekly sales review"
  },
];

const statusColors = {
  Upcoming: "bg-blue-50 text-blue-700 border-blue-200",
  Ongoing: "bg-green-50 text-green-700 border-green-200",
  Completed: "bg-gray-50 text-gray-700 border-gray-200",
  Cancelled: "bg-red-50 text-red-700 border-red-200",
  Available: "bg-green-50 text-green-700 border-green-200",
  Booked: "bg-amber-50 text-amber-700 border-amber-200",
  Maintenance: "bg-orange-50 text-orange-700 border-orange-200",
};

const statusIcons = {
  Upcoming: <ClockIcon size={12} />,
  Ongoing: <CheckCircle size={12} />,
  Completed: <Check size={12} />,
  Cancelled: <XCircle size={12} />,
  Available: <CheckCircle size={12} />,
  Booked: <ClockIcon size={12} />,
  Maintenance: <AlertCircle size={12} />,
};

const resourceTypes = ["All", "Room", "Vehicle", "Equipment"];

export default function BookingsPage() {
  const { user } = useAuth();
  const [viewMode, setViewMode] = useState("list"); // list | grid
  const [activeTab, setActiveTab] = useState("bookings"); // bookings | resources
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("All");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split("T")[0]);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  const getStatusBadge = (status) => {
    return (
      <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium border ${statusColors[status] || statusColors.Available}`}>
        {statusIcons[status] || statusIcons.Available}
        {status}
      </span>
    );
  };

  const formatDate = (date) => {
    if (!date) return "—";
    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric"
    });
  };

  const formatTime = (time) => {
    if (!time) return "—";
    return new Date(`2000-01-01T${time}`).toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true
    });
  };

  const isOverlapping = (booking1, booking2) => {
    if (booking1.date !== booking2.date) return false;
    const start1 = booking1.startTime;
    const end1 = booking1.endTime;
    const start2 = booking2.startTime;
    const end2 = booking2.endTime;
    return start1 < end2 && start2 < end1;
  };

  // Filter bookings
  const filteredBookings = mockBookings.filter(booking => {
    const matchesSearch = 
      booking.resource.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.bookedBy.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.purpose.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.department.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = selectedStatus === "All" || booking.status === selectedStatus;
    const matchesDate = booking.date === selectedDate;
    
    return matchesSearch && matchesStatus && matchesDate;
  });

  // Filter resources
  const filteredResources = mockResources.filter(resource => {
    const matchesSearch = 
      resource.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resource.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resource.location.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = selectedType === "All" || resource.type === selectedType;
    
    return matchesSearch && matchesType;
  });

  // Get bookings for a specific resource on a date
  const getResourceBookings = (resourceId) => {
    return mockBookings.filter(b => b.resourceId === resourceId && b.date === selectedDate && b.status !== "Cancelled");
  };

  // Check if resource is available at a specific time
  const isResourceAvailable = (resourceId, startTime, endTime) => {
    const bookings = getResourceBookings(resourceId);
    const newBooking = { date: selectedDate, startTime, endTime };
    return !bookings.some(b => isOverlapping(b, newBooking));
  };

  return (
    <AppShell title="Resource Booking">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-brand-800">Resource Booking</h2>
        <p className="text-[#5F5E5A] mt-1">
          Book and manage shared resources across your organization
        </p>
      </div>

      {/* Date Selector */}
      <div className="flex flex-wrap items-center gap-4 mb-6">
        <div className="flex items-center gap-2 bg-white rounded-xl border border-brand-100 p-1">
          <button 
            onClick={() => {
              const date = new Date(selectedDate);
              date.setDate(date.getDate() - 1);
              setSelectedDate(date.toISOString().split("T")[0]);
            }}
            className="p-2 rounded-lg hover:bg-brand-50 transition-colors"
          >
            <ChevronLeft size={18} />
          </button>
          <div className="relative">
            <CalendarIcon size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#5F5E5A]" />
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="pl-10 pr-4 py-2 rounded-lg border-0 bg-transparent text-sm font-medium text-brand-800 focus:outline-none"
            />
          </div>
          <button 
            onClick={() => {
              const date = new Date(selectedDate);
              date.setDate(date.getDate() + 1);
              setSelectedDate(date.toISOString().split("T")[0]);
            }}
            className="p-2 rounded-lg hover:bg-brand-50 transition-colors"
          >
            <ChevronRight size={18} />
          </button>
          <button 
            onClick={() => setSelectedDate(new Date().toISOString().split("T")[0])}
            className="px-3 py-1.5 text-xs font-medium text-brand-600 hover:bg-brand-50 rounded-lg transition-colors"
          >
            Today
          </button>
        </div>
        <span className="text-sm text-[#5F5E5A]">
          {formatDate(selectedDate)}
        </span>
      </div>

      {/* Tabs */}
      <div className="border-b border-brand-100 mb-6">
        <div className="flex gap-1">
          <button
            onClick={() => setActiveTab("bookings")}
            className={`flex items-center gap-2 px-6 py-3 text-sm font-medium border-b-2 transition-all ${
              activeTab === "bookings"
                ? "border-brand-500 text-brand-700"
                : "border-transparent text-[#5F5E5A] hover:text-brand-600 hover:border-brand-300"
            }`}
          >
            <CalendarIcon size={18} />
            Bookings
          </button>
          <button
            onClick={() => setActiveTab("resources")}
            className={`flex items-center gap-2 px-6 py-3 text-sm font-medium border-b-2 transition-all ${
              activeTab === "resources"
                ? "border-brand-500 text-brand-700"
                : "border-transparent text-[#5F5E5A] hover:text-brand-600 hover:border-brand-300"
            }`}
          >
            <Grid3x3 size={18} />
            Resources
          </button>
        </div>
      </div>

      {/* Search and Actions */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div className="relative flex-1 max-w-md">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#5F5E5A]" />
          <input
            type="text"
            placeholder={`Search ${activeTab === "bookings" ? "bookings..." : "resources..."}`}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-brand-100 focus:border-brand-400 focus:ring-2 focus:ring-brand-200 outline-none transition-all text-sm"
          />
        </div>
        <div className="flex items-center gap-3">
          {activeTab === "bookings" && (
            <select 
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-3 py-2.5 rounded-xl border border-brand-100 text-sm focus:border-brand-400 focus:ring-2 focus:ring-brand-200 outline-none transition-all"
            >
              <option value="All">All Status</option>
              <option value="Upcoming">Upcoming</option>
              <option value="Ongoing">Ongoing</option>
              <option value="Completed">Completed</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          )}
          {activeTab === "resources" && (
            <select 
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="px-3 py-2.5 rounded-xl border border-brand-100 text-sm focus:border-brand-400 focus:ring-2 focus:ring-brand-200 outline-none transition-all"
            >
              {resourceTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          )}
          <button 
            onClick={() => setIsBookingModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-brand-500 to-brand-600 text-white text-sm font-medium hover:shadow-lg hover:shadow-brand-500/30 transition-all hover:-translate-y-0.5"
          >
            <Plus size={16} />
            New Booking
          </button>
        </div>
      </div>

      {/* Bookings Tab */}
      {activeTab === "bookings" && (
        <div className="space-y-4">
          <div className="bg-white rounded-xl border border-brand-100 overflow-hidden">
            <table className="w-full text-left text-sm">
              <thead className="bg-brand-50/50">
                <tr>
                  <th className="px-6 py-4 text-xs font-semibold text-[#5F5E5A] uppercase tracking-wider">Resource</th>
                  <th className="px-6 py-4 text-xs font-semibold text-[#5F5E5A] uppercase tracking-wider">Booked By</th>
                  <th className="px-6 py-4 text-xs font-semibold text-[#5F5E5A] uppercase tracking-wider">Time</th>
                  <th className="px-6 py-4 text-xs font-semibold text-[#5F5E5A] uppercase tracking-wider">Purpose</th>
                  <th className="px-6 py-4 text-xs font-semibold text-[#5F5E5A] uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-xs font-semibold text-[#5F5E5A] uppercase tracking-wider text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-brand-100">
                {filteredBookings.map((booking) => (
                  <tr 
                    key={booking.id} 
                    className="hover:bg-brand-50/30 transition-colors cursor-pointer"
                    onClick={() => {
                      setSelectedBooking(booking);
                      setIsDetailOpen(true);
                    }}
                  >
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-medium text-brand-800">{booking.resource}</p>
                        <p className="text-xs text-[#5F5E5A]">{booking.department}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="h-7 w-7 rounded-full bg-brand-50 flex items-center justify-center text-xs font-medium text-brand-600">
                          {booking.bookedBy.split(" ").map(n => n[0]).join("")}
                        </div>
                        <span className="text-[#5F5E5A]">{booking.bookedBy}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Clock size={14} className="text-[#5F5E5A]" />
                        <span className="text-[#5F5E5A]">
                          {formatTime(booking.startTime)} - {formatTime(booking.endTime)}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-[#5F5E5A] max-w-[150px] truncate">{booking.purpose}</td>
                    <td className="px-6 py-4">{getStatusBadge(booking.status)}</td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedBooking(booking);
                            setIsDetailOpen(true);
                          }}
                          className="p-1.5 rounded-lg hover:bg-brand-100 transition-colors"
                        >
                          <Eye size={16} className="text-[#5F5E5A] hover:text-brand-600" />
                        </button>
                        {booking.status !== "Completed" && booking.status !== "Cancelled" && (
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              // Handle edit
                            }}
                            className="p-1.5 rounded-lg hover:bg-brand-100 transition-colors"
                          >
                            <Edit2 size={16} className="text-[#5F5E5A] hover:text-brand-600" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filteredBookings.length === 0 && (
              <div className="px-6 py-12 text-center text-[#5F5E5A]">
                <CalendarIcon size={48} className="mx-auto text-brand-200 mb-4" />
                <p className="text-lg font-medium text-brand-800">No bookings found</p>
                <p className="text-sm mt-1">Try adjusting your search or filters</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Resources Tab */}
      {activeTab === "resources" && (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredResources.map((resource) => {
            const bookings = getResourceBookings(resource.id);
            const isBooked = bookings.length > 0;
            return (
              <div 
                key={resource.id}
                className="bg-white rounded-xl border border-brand-100 p-4 hover:shadow-xl transition-all hover:-translate-y-1"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <p className="font-medium text-brand-800 text-sm">{resource.name}</p>
                    <p className="text-xs text-[#5F5E5A]">{resource.type}</p>
                  </div>
                  {getStatusBadge(resource.status)}
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <MapPin size={14} className="text-[#5F5E5A]" />
                    <span className="text-xs text-[#5F5E5A]">{resource.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users size={14} className="text-[#5F5E5A]" />
                    <span className="text-xs text-[#5F5E5A]">Capacity: {resource.capacity}</span>
                  </div>
                  {resource.amenities && (
                    <div className="flex flex-wrap gap-1">
                      {resource.amenities.map((amenity, index) => (
                        <span key={index} className="px-1.5 py-0.5 rounded bg-brand-50 text-[9px] text-brand-600 border border-brand-100">
                          {amenity}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                {isBooked && (
                  <div className="mt-3 pt-3 border-t border-brand-100">
                    <p className="text-xs font-medium text-brand-600 mb-1">Today's Bookings:</p>
                    <div className="space-y-1">
                      {bookings.map((booking, index) => (
                        <div key={index} className="flex items-center justify-between text-xs">
                          <span className="text-[#5F5E5A]">
                            {formatTime(booking.startTime)} - {formatTime(booking.endTime)}
                          </span>
                          <span className="font-medium text-brand-800">{booking.bookedBy}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                <button 
                  onClick={() => setIsBookingModalOpen(true)}
                  className="mt-3 w-full px-4 py-2 rounded-lg bg-gradient-to-r from-brand-500 to-brand-600 text-white text-xs font-medium hover:shadow-lg hover:shadow-brand-500/30 transition-all hover:-translate-y-0.5"
                >
                  Book Now
                </button>
              </div>
            );
          })}
          {filteredResources.length === 0 && (
            <div className="col-span-full px-6 py-12 text-center text-[#5F5E5A]">
              <Grid3x3 size={48} className="mx-auto text-brand-200 mb-4" />
              <p className="text-lg font-medium text-brand-800">No resources found</p>
              <p className="text-sm mt-1">Try adjusting your search or filters</p>
            </div>
          )}
        </div>
      )}

      {/* Booking Detail Modal */}
      {isDetailOpen && selectedBooking && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-brand-800/25 backdrop-blur-sm">
          <div className="w-[560px] max-w-[90vw] max-h-[90vh] bg-white rounded-2xl shadow-2xl overflow-hidden animate-slide-up">
            <div className="p-6 border-b border-brand-100">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-brand-50 flex items-center justify-center">
                    <CalendarIcon size={20} className="text-brand-500" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-brand-800">Booking Details</h3>
                    <p className="text-sm text-[#5F5E5A]">{selectedBooking.resource}</p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setIsDetailOpen(false);
                    setSelectedBooking(null);
                  }}
                  className="p-1.5 rounded-lg hover:bg-brand-100 transition-colors"
                >
                  <X size={20} className="text-[#5F5E5A]" />
                </button>
              </div>
            </div>

            <div className="p-6 overflow-y-auto max-h-[calc(90vh-180px)]">
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="space-y-1">
                  <p className="text-xs text-[#5F5E5A]">Resource</p>
                  <p className="text-sm font-medium text-brand-800">{selectedBooking.resource}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-[#5F5E5A]">Status</p>
                  <div>{getStatusBadge(selectedBooking.status)}</div>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-[#5F5E5A]">Booked By</p>
                  <p className="text-sm font-medium text-brand-800">
                    <User size={14} className="inline mr-1 text-[#5F5E5A]" />
                    {selectedBooking.bookedBy}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-[#5F5E5A]">Department</p>
                  <p className="text-sm font-medium text-brand-800">
                    <Building2 size={14} className="inline mr-1 text-[#5F5E5A]" />
                    {selectedBooking.department}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-[#5F5E5A]">Date</p>
                  <p className="text-sm font-medium text-brand-800">
                    <Calendar size={14} className="inline mr-1 text-[#5F5E5A]" />
                    {formatDate(selectedBooking.date)}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-[#5F5E5A]">Time</p>
                  <p className="text-sm font-medium text-brand-800">
                    <Clock size={14} className="inline mr-1 text-[#5F5E5A]" />
                    {formatTime(selectedBooking.startTime)} - {formatTime(selectedBooking.endTime)}
                  </p>
                </div>
                <div className="space-y-1 col-span-2">
                  <p className="text-xs text-[#5F5E5A]">Purpose</p>
                  <p className="text-sm font-medium text-brand-800">{selectedBooking.purpose}</p>
                </div>
                <div className="space-y-1 col-span-2">
                  <p className="text-xs text-[#5F5E5A]">Attendees</p>
                  <p className="text-sm font-medium text-brand-800">
                    <Users size={14} className="inline mr-1 text-[#5F5E5A]" />
                    {selectedBooking.attendees} people
                  </p>
                </div>
                <div className="space-y-1 col-span-2">
                  <p className="text-xs text-[#5F5E5A]">Notes</p>
                  <p className="text-sm text-[#5F5E5A]">{selectedBooking.notes || "No additional notes"}</p>
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-brand-100 bg-brand-50/30">
              <div className="flex items-center gap-3">
                {selectedBooking.status === "Upcoming" && (
                  <>
                    <button className="flex-1 px-4 py-2.5 rounded-xl bg-gradient-to-r from-brand-500 to-brand-600 text-white text-sm font-medium hover:shadow-lg hover:shadow-brand-500/30 transition-all hover:-translate-y-0.5">
                      <Edit2 size={16} className="inline mr-2" />
                      Reschedule
                    </button>
                    <button className="flex-1 px-4 py-2.5 rounded-xl bg-red-50 text-red-600 text-sm font-medium hover:bg-red-100 transition-colors">
                      <X size={16} className="inline mr-2" />
                      Cancel Booking
                    </button>
                  </>
                )}
                {selectedBooking.status === "Ongoing" && (
                  <button className="flex-1 px-4 py-2.5 rounded-xl bg-gradient-to-r from-green-500 to-green-600 text-white text-sm font-medium hover:shadow-lg hover:shadow-green-500/30 transition-all hover:-translate-y-0.5">
                    <Check size={16} className="inline mr-2" />
                    Mark as Completed
                  </button>
                )}
                <button className="px-4 py-2.5 rounded-xl border border-brand-100 text-sm text-[#5F5E5A] hover:bg-brand-50 transition-colors">
                  <Bell size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* New Booking Modal */}
      {isBookingModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-brand-800/25 backdrop-blur-sm">
          <div className="w-[560px] max-w-[90vw] max-h-[90vh] bg-white rounded-2xl shadow-2xl overflow-hidden animate-slide-up">
            <div className="p-6 border-b border-brand-100">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-brand-800">New Booking</h3>
                <button
                  onClick={() => setIsBookingModalOpen(false)}
                  className="p-1.5 rounded-lg hover:bg-brand-100 transition-colors"
                >
                  <X size={20} className="text-[#5F5E5A]" />
                </button>
              </div>
            </div>

            <div className="p-6 overflow-y-auto max-h-[calc(90vh-160px)]">
              <form className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-[#5F5E5A] mb-1.5">Select Resource</label>
                  <select className="w-full px-4 py-2.5 rounded-xl border border-brand-100 focus:border-brand-400 focus:ring-2 focus:ring-brand-200 outline-none transition-all text-sm">
                    <option>Conference Room A3 - Floor 1</option>
                    <option>Conference Room B2 - Floor 2</option>
                    <option>Toyota Innova - Garage</option>
                    <option>Projector Kit - AV Room</option>
                    <option>Meeting Room D4 - Floor 1</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-[#5F5E5A] mb-1.5">Date</label>
                  <input type="date" className="w-full px-4 py-2.5 rounded-xl border border-brand-100 focus:border-brand-400 focus:ring-2 focus:ring-brand-200 outline-none transition-all text-sm" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-[#5F5E5A] mb-1.5">Start Time</label>
                    <input type="time" className="w-full px-4 py-2.5 rounded-xl border border-brand-100 focus:border-brand-400 focus:ring-2 focus:ring-brand-200 outline-none transition-all text-sm" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-[#5F5E5A] mb-1.5">End Time</label>
                    <input type="time" className="w-full px-4 py-2.5 rounded-xl border border-brand-100 focus:border-brand-400 focus:ring-2 focus:ring-brand-200 outline-none transition-all text-sm" />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-medium text-[#5F5E5A] mb-1.5">Purpose</label>
                  <input type="text" className="w-full px-4 py-2.5 rounded-xl border border-brand-100 focus:border-brand-400 focus:ring-2 focus:ring-brand-200 outline-none transition-all text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-[#5F5E5A] mb-1.5">Expected Attendees</label>
                  <input type="number" className="w-full px-4 py-2.5 rounded-xl border border-brand-100 focus:border-brand-400 focus:ring-2 focus:ring-brand-200 outline-none transition-all text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-[#5F5E5A] mb-1.5">Notes</label>
                  <textarea rows={3} className="w-full px-4 py-2.5 rounded-xl border border-brand-100 focus:border-brand-400 focus:ring-2 focus:ring-brand-200 outline-none transition-all text-sm" />
                </div>
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-3">
                  <div className="flex items-start gap-2">
                    <AlertCircle size={16} className="text-amber-600 flex-shrink-0 mt-0.5" />
                    <p className="text-xs text-amber-700">
                      Please check resource availability before booking. Overlapping bookings will be rejected automatically.
                    </p>
                  </div>
                </div>
              </form>
            </div>

            <div className="p-6 border-t border-brand-100 bg-brand-50/30">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setIsBookingModalOpen(false)}
                  className="flex-1 px-4 py-2.5 rounded-xl border border-brand-100 text-sm text-[#5F5E5A] hover:bg-brand-50 transition-colors"
                >
                  Cancel
                </button>
                <button className="flex-1 px-4 py-2.5 rounded-xl bg-gradient-to-r from-brand-500 to-brand-600 text-white text-sm font-medium hover:shadow-lg hover:shadow-brand-500/30 transition-all hover:-translate-y-0.5">
                  <CalendarIcon size={16} className="inline mr-2" />
                  Book Resource
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </AppShell>
  );
}