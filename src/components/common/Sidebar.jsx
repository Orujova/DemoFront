"use client";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  UsersRound,
  FileText, 
  BarChart2,
  GraduationCap,
  Activity,
  CalendarDays,
  Plane,
  Newspaper,
  Gift,
  Package,
  RefreshCw,
  UserCog,
  Building2,
  Clock,
  ScrollText,
  BookOpenCheck,
  User,
  ChevronRight,
  FileSignature,
  Target
} from "lucide-react";
import { employeeService } from '@/services/newsService';

const Sidebar = ({ collapsed = false }) => {
  const pathname = usePathname();
  const router = useRouter();
  const [employeeId, setEmployeeId] = useState(null);
  const [hoveredItem, setHoveredItem] = useState(null);
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const storedEmployeeId = localStorage.getItem('employee_id');
    if (storedEmployeeId) {
      setEmployeeId(storedEmployeeId);
    } else {
      fetchEmployeeId();
    }
    
    fetchUserRole();
  }, []);

  const fetchEmployeeId = async () => {
    try {
      const userEmail = localStorage.getItem('user_email');
      if (!userEmail) return;

      const profileResponse = await employeeService.getMyProfile();
      
      if (profileResponse.employee?.id) {
        const empId = profileResponse.employee.id;
        setEmployeeId(empId);
        localStorage.setItem('employee_id', empId);
      }
    } catch (error) {
      console.error('Error fetching employee ID:', error);
    }
  };

  const fetchUserRole = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/job-descriptions/my_access_info/`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        if (data.is_admin) {
          setUserRole('admin');
        } else if (data.is_manager) {
          setUserRole('manager');
        } else {
          setUserRole('employee');
        }
      }
    } catch (error) {
      console.error('Error fetching user role:', error);
      setUserRole('employee');
    }
  };

  const handleProfileClick = (e) => {
    e.preventDefault();
    
    if (employeeId) {
      router.push(`/structure/employee/${employeeId}/`);
    } else {
      const storedId = localStorage.getItem('employee_id');
      if (storedId) {
        router.push(`/structure/employee/${storedId}/`);
      } else {
        router.push('/dashboard');
      }
    }
  };

  const getFilteredMenuItems = () => {
    const allMenuItems = [
     
      { 
        type: "section", 
        label: "STRUCTURE"
      }, 
      {
        label: "Org Structure",
        icon: <Building2 className="w-4 h-4" />,
        path: "/structure/org-structure",
        id: "org-structure"
      },
      {
        label: "Headcount Table",
        icon: <UsersRound className="w-4 h-4" />,
        path: "/structure/headcount-table",
        id: "headcount-table",
        requiredRole: ['admin', 'manager']
      },
      {
        label: "Job Descriptions",
        icon: <FileText className="w-4 h-4" />,
        path: "/structure/job-descriptions",
        id: "job-descriptions",
        requiredRole: ['admin', 'manager']
      },
      {
        label: "Competency Matrix",
        icon: <BarChart2 className="w-4 h-4" />,
        path: "/structure/comp-matrix",
        id: "comp-matrix"
      },
      {
        label: "Job Catalog",
        icon: <ScrollText className="w-4 h-4" />,
        path: "/structure/job-catalog",
        id: "job-catalog",
        requiredRole: ['admin']
      },
      {
        label: "Grading System",
        icon: <GraduationCap className="w-4 h-4" />,
        path: "/structure/grading",
        id: "grading",
        requiredRole: ['admin']
      },
      { 
        type: "section", 
        label: "EFFICIENCY"
      },
      {
        label: "Performance Mng",
        icon: <Activity className="w-4 h-4" />,
        path: "/efficiency/performance-mng",
        id: "performance-mng"
      },
      {
        label: "Skills Matrix",
        icon: <Target className="w-4 h-4" />,
        path: "/efficiency/self-assessment",
        id: "self-assessment",
        requiredRole: ['admin']
      },
      { 
        type: "section", 
        label: "TRAINING"
      },
      {
        label: "Training",
        icon: <BookOpenCheck className="w-4 h-4" />,
        path: "/training",
        id: "training"
      },
      { 
        type: "section", 
        label: "REQUESTS"
      },
      
      {
        label: "Resignation & Offboarding",
        icon: <FileText className="w-4 h-4" />,
        path: "/requests/resignation",
        id: "resignation",
      
      },
      {
        label: "Vacation Request",
        icon: <CalendarDays className="w-4 h-4" />,
        path: "/requests/vacation",
        id: "vacation"
      },
      {
        label: "Handover/Takeover",
        icon: <RefreshCw className="w-4 h-4" />,
        path: "/requests/handover-takeover",
        id: "handover-takeover"
      },
      {
        label: "Business Trip",
        icon: <Plane className="w-4 h-4" />,
        path: "/requests/business-trip",
        id: "business-trip"
      },
      {
        label: "Time Off Request",
        icon: <Clock className="w-4 h-4" />,
        path: "/requests/time-off",
        id: "time-off"
      },
      { 
        type: "section", 
        label: "COMMUNICATION"
      },
      {
        label: "Company News",
        icon: <Newspaper className="w-4 h-4" />,
        path: "/communication/company-news",
        id: "company-news"
      },
      {
        label: "Celebrations",
        icon: <Gift className="w-4 h-4" />,
        path: "/communication/celebrations",
        id: "celebrations"
      }, 
      { 
        type: "section", 
        label: "DOCUMENTS"
      },
      {
        label: "Company Policies",
        icon: <ScrollText className="w-4 h-4" />,
        path: "/company-policies",
        id: "policies"
      }, 
      {
        label: " Procedures",
        icon: <FileText className="w-4 h-4" />,
        path: "/company-procedures",
        id: "procedures"
      }, 
      { 
        type: "section", 
        label: "SETTINGS",
        requiredRole: ['admin']
      },
      {
        label: "Asset Management",
        icon: <Package className="w-4 h-4" />,
        path: "/settings/asset-mng",
        id: "asset-mng",
        requiredRole: ['admin']
      },
      {
        label: "Role Management",
        icon: <UserCog className="w-4 h-4" />,
        path: "/settings/role-mng",
        id: "role-mng",
        requiredRole: ['admin']
      }
    ];

    return allMenuItems.filter(item => {
      if (item.type === "section") return true;
      if (!item.requiredRole) return true;
      return item.requiredRole.includes(userRole);
    });
  };

  const menuItems = getFilteredMenuItems();

return (
  <div className="h-full bg-gradient-to-b from-white to-gray-50 dark:from-almet-cloud-burst dark:to-almet-cloud-burst border-r border-gray-200 dark:border-almet-comet flex flex-col w-full shadow-lg">
    
    {/* Logo Section */}
    <Link 
      href="/" 
      className={`flex items-center ${collapsed ? 'justify-center px-2' : 'px-4'} py-4 border-b border-gray-200 dark:border-almet-comet group transition-all duration-300 hover:bg-gray-50 dark:hover:bg-almet-comet/30`}
    >
      <div className="flex items-center gap-3">
        {collapsed ? (
          <div className="bg-gradient-to-br from-almet-sapphire to-blue-700 text-white h-10 w-10 rounded-lg flex items-center justify-center font-bold shadow-md transform transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg">
            <span className="text-sm">UP</span>
          </div>
        ) : (
          <>
            <div className="bg-gradient-to-br from-almet-sapphire to-blue-700 text-white h-10 w-10 rounded-lg flex items-center justify-center font-bold shadow-md transform transition-all duration-300 group-hover:scale-105">
              <span className="text-sm">UP</span>
            </div>
            <div className="flex flex-col">
              <span className="text-gray-900 dark:text-white font-bold text-base tracking-tight">
                UP Intranet
              </span>
              <span className="text-gray-500 dark:text-almet-santas-gray text-[10px] font-medium">
                Almet Holding
              </span>
            </div>
          </>
        )}
      </div>
    </Link>

    {/* Navigation */}
    <div className="overflow-y-auto flex-1 py-3 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-gray-300 dark:scrollbar-thumb-almet-comet">
      <nav className="px-2 space-y-1">
        {menuItems.map((item, index) => 
          item.type === "section" ? (
            !collapsed && (
              <div key={index} className="pt-4 pb-2 first:pt-0">
                <div className="px-3 flex items-center gap-2">
                  <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-gray-300 dark:via-almet-comet to-transparent"></div>
                  <p className="text-[10px] font-semibold text-gray-500 dark:text-almet-santas-gray uppercase tracking-widest">
                    {item.label}
                  </p>
                  <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-gray-300 dark:via-almet-comet to-transparent"></div>
                </div>
              </div>
            )
          ) : item.isProfile ? (
            <button
              key={index}
              onClick={handleProfileClick}
              onMouseEnter={() => setHoveredItem(item.id)}
              onMouseLeave={() => setHoveredItem(null)}
              className={`w-full flex items-center ${collapsed ? 'justify-center px-2' : 'justify-between px-3'} py-2.5 text-sm font-medium rounded-lg transition-all duration-300 group relative overflow-hidden ${
                pathname.includes('/structure/employee/') && employeeId && pathname.includes(employeeId)
                  ? "bg-gradient-to-r from-almet-sapphire to-blue-700 text-white shadow-lg transform scale-[1.02]" 
                  : "text-gray-700 dark:text-almet-bali-hai hover:bg-white dark:hover:bg-almet-comet hover:shadow-md"
              }`}
              title={collapsed ? item.label : ''}
            >
              {/* Hover effect background */}
              <div className={`absolute inset-0 bg-gradient-to-r from-almet-sapphire/10 to-blue-700/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
                pathname.includes('/structure/employee/') && employeeId && pathname.includes(employeeId) ? 'hidden' : ''
              }`}></div>
              
              <div className="flex items-center gap-3 relative z-10">
                <span className={`transition-all duration-300 ${
                  pathname.includes('/structure/employee/') && employeeId && pathname.includes(employeeId)
                    ? "text-white" 
                    : "text-almet-sapphire dark:text-gray-400"
                } ${hoveredItem === item.id ? 'transform scale-110' : ''}`}>
                  {item.icon}
                </span>
                {!collapsed && <span className="font-medium">{item.label}</span>}
              </div>
              
              {!collapsed && (
                <ChevronRight className={`w-4 h-4 transition-all duration-300 relative z-10 ${
                  pathname.includes('/structure/employee/') && employeeId && pathname.includes(employeeId)
                    ? 'opacity-100 translate-x-0' 
                    : 'opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0'
                }`} />
              )}
            </button>
          ) : (
            <Link 
              key={index}
              href={item.path}
              onMouseEnter={() => setHoveredItem(item.id)}
              onMouseLeave={() => setHoveredItem(null)}
              className={`flex items-center ${collapsed ? 'justify-center px-2' : 'justify-between px-3'} py-2.5 text-sm font-medium rounded-lg transition-all duration-300 group relative overflow-hidden ${
                pathname.startsWith(item.path) 
                  ? "bg-gradient-to-r from-almet-sapphire to-blue-700 text-white shadow-lg transform scale-[1.02]" 
                  : "text-gray-700 dark:text-almet-bali-hai hover:bg-white dark:hover:bg-almet-comet hover:shadow-md"
              }`}
              title={collapsed ? item.label : ''}
            >
              {/* Hover effect background */}
              <div className={`absolute inset-0 bg-gradient-to-r from-almet-sapphire/10 to-blue-700/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
                pathname.startsWith(item.path) ? 'hidden' : ''
              }`}></div>
              
              <div className="flex items-center gap-3 relative z-10">
                <span className={`transition-all duration-300 ${
                  pathname.startsWith(item.path) 
                    ? "text-white" 
                    : "text-almet-sapphire dark:text-gray-400"
                } ${hoveredItem === item.id ? 'transform scale-110' : ''}`}>
                  {item.icon}
                </span>
                {!collapsed && <span className="font-medium">{item.label}</span>}
              </div>
              
              {!collapsed && (
                <ChevronRight className={`w-4 h-4 transition-all duration-300 relative z-10 ${
                  pathname.startsWith(item.path) 
                    ? 'opacity-100 translate-x-0' 
                    : 'opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0'
                }`} />
              )}
            </Link>
          )
        )}
      </nav>
    </div>

    {/* Footer Section (optional) */}
    {!collapsed && (
      <div className="border-t border-gray-200 dark:border-almet-comet px-4 py-3 bg-gray-50 dark:bg-almet-comet/30">
        <p className="text-[10px] text-gray-500 dark:text-almet-santas-gray text-center">
          © 2025 Almet Holding
        </p>
      </div>
    )}
  </div>
);
}
export default Sidebar;